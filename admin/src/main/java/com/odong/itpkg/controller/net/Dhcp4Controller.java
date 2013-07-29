package com.odong.itpkg.controller.net;

import com.odong.itpkg.model.SessionItem;
import com.odong.itpkg.service.HostService;
import com.odong.itpkg.service.LogService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: flamen
 * Date: 13-7-18
 * Time: 上午11:27
 */

@Controller
@RequestMapping(value = "/net/dhcp4/{hostId}")
@SessionAttributes(SessionItem.KEY)
public class Dhcp4Controller {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    String getIndex(@PathVariable long hostId, Map<String, Object> map, @ModelAttribute(SessionItem.KEY) SessionItem si) {
        return "net/dhcp4";
    }

    @Resource
    private LogService logService;
    @Resource
    private HostService hostService;

    public void setLogService(LogService logService) {
        this.logService = logService;
    }

    public void setHostService(HostService hostService) {
        this.hostService = hostService;
    }
}
