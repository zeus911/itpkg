package com.odong.itpkg.service.impl;

import com.odong.itpkg.service.RbacService;
import com.odong.portal.dao.rbac.OperationDao;
import com.odong.portal.dao.rbac.PermissionDao;
import com.odong.portal.dao.rbac.ResourceDao;
import com.odong.portal.dao.rbac.RoleDao;
import com.odong.portal.entity.rbac.Operation;
import com.odong.portal.entity.rbac.Permission;
import com.odong.portal.entity.rbac.Resource;
import com.odong.portal.entity.rbac.Role;
import com.odong.portal.util.TimeHelper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: flamen
 * Date: 13-7-17
 * Time: 上午10:48
 */

@Service("rbacService")
public class RbacServiceImpl implements RbacService {
    @Override
    public void bindAdmin(long user, boolean bind) {
        bindPermission(getRole(user), getOperation(OperationType.MANAGER), getResource(getSiteResourceName()), bind);
    }

    @Override
    public boolean authAdmin(long user) {
        return checkPermission(getRole(user), getOperation(OperationType.MANAGER), getResource(getSiteResourceName()));
    }

    private String getCompanyName(long article) {
        return "rbac://resource/company/" + article;  //
    }


    private String getSiteResourceName() {
        return "rbac://resource/site";
    }

    private Permission getPermission(long role, long operation, long resource) {
        Map<String, Object> map = new HashMap<>();
        map.put("role", role);
        map.put("operation", operation);
        map.put("resource", resource);
        return permissionDao.select("FROM Permission AS i WHERE i.role=:role AND i.operation=:operation AND i.resource=:resource", map);

    }

    private boolean checkPermission(long role, long operation, long resource) {
        Permission p = getPermission(role, operation, resource);
        return p != null;
    }

    private void bindPermission(long role, long operation, long resource, boolean bind) {
        Permission p = getPermission(role, operation, resource);
        if (bind) {
            if (p != null) {
                throw new IllegalArgumentException("权限[" + role + "," + operation + ","
                        + resource + "]已存在");
            }
            p = new Permission();
            p.setRole(role);
            p.setOperation(operation);
            p.setResource(resource);
            p.setStartUp(new Date());
            p.setShutDown(timeHelper.max());
            p.setCreated(new Date());
            permissionDao.insert(p);

        } else {
            if (p == null) {
                throw new IllegalArgumentException("权限[" + role + "," + operation + ","
                        + resource + "]不存在");
            }
            permissionDao.delete(p.getId());
        }
    }

    private long getResource(String name) {
        Map<String, Object> map = new HashMap<>();
        map.put("name", name);
        Resource r = resourceDao.select("FROM Resource AS i WHERE i.name=:name", map);
        if (r == null) {
            r = new Resource();
            r.setName(name);
            r.setCreated(new Date());
            resourceDao.insert(r);
        }
        return r.getId();
    }

    private long getOperation(OperationType type) {
        String key = "rbac://operation/" + type;
        Map<String, Object> map = new HashMap<>();
        map.put("name", key);
        Operation o = operationDao.select("FROM Operation AS i WHERE i.name=:name", map);
        if (o == null) {
            o = new Operation();
            o.setName(key);
            o.setCreated(new Date());
            operationDao.insert(o);
        }
        return o.getId();
    }

    private long getRole(long user) {
        String key = "rbac://role/" + user;
        Map<String, Object> map = new HashMap<>();
        map.put("name", key);
        Role r = roleDao.select("FROM Role AS i WHERE i.name=:name", map);
        if (r == null) {
            r = new Role();
            r.setName(key);
            r.setCreated(new Date());
            roleDao.insert(r);
        }
        return r.getId();

    }


    @javax.annotation.Resource
    private TimeHelper timeHelper;

    @javax.annotation.Resource
    private RoleDao roleDao;
    @javax.annotation.Resource
    private PermissionDao permissionDao;
    @javax.annotation.Resource
    private OperationDao operationDao;
    @javax.annotation.Resource
    private ResourceDao resourceDao;

    public void setTimeHelper(TimeHelper timeHelper) {
        this.timeHelper = timeHelper;
    }

    public void setRoleDao(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    public void setPermissionDao(PermissionDao permissionDao) {
        this.permissionDao = permissionDao;
    }

    public void setOperationDao(OperationDao operationDao) {
        this.operationDao = operationDao;
    }

    public void setResourceDao(ResourceDao resourceDao) {
        this.resourceDao = resourceDao;
    }
}