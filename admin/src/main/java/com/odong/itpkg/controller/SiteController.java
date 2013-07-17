package com.odong.itpkg.controller;

import com.odong.portal.service.SiteService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: flamen
 * Date: 13-7-16
 * Time: 下午9:30
 */
@Controller
public class SiteController {
    @RequestMapping(value = "/main", method = RequestMethod.GET)
    String getMain(Map<String, Object> map) {

        return "main";
    }

    @RequestMapping(value = "/about_me", method = RequestMethod.GET)
    String getAboutMe(Map<String, Object> map) {
        return "about_me";
    }

    @RequestMapping(value = "/status", method = RequestMethod.GET)
    @ResponseBody
    Map<String, Object> getStatus() {
        Map<String, Object> map = new HashMap<>();
        map.put("site.startup", siteService.getObject("site.startup", Date.class));
        map.put("created", new Date());
        return map;
    }

    @RequestMapping(value = "/error/{code}", method = RequestMethod.GET)
    @ResponseBody
    Map<String, Object> getError(@PathVariable int code) {
        Map<String, Object> map = new HashMap<>();
        map.put("code", code);
        switch (code) {
            case 404:
                map.put("message", "找不到文件");
                break;
            case 500:
                map.put("message", "服务器内部错误");
                break;
        }
        map.put("created", new Date());
        return map;
    }

    @Resource
    private SiteService siteService;

    public void setSiteService(SiteService siteService) {
        this.siteService = siteService;
    }

}