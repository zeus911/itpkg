package com.odong.itpkg.entity.uc;

import com.odong.portal.entity.IdEntity;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: flamen
 * Date: 13-7-16
 * Time: 上午11:00
 */

@Entity
@Table(name = "ucLog")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Log extends IdEntity {
    public enum Type {
        ERROR, DEBUG, INFO, WARN
    }

    private static final long serialVersionUID = -3548662034390764951L;
    @Column(updatable = false)
    private Long account;
    @Lob
    @Column(nullable = false, updatable = false)
    private String message;
    @Column(nullable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private Type type;
    @Column(nullable = false, updatable = false)
    private Date created;

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Long getAccount() {
        return account;
    }

    public void setAccount(Long account) {
        this.account = account;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}