package com.odong.itpkg.job;

import com.odong.itpkg.entity.Task;
import com.odong.itpkg.rpc.RpcHelper;
import com.odong.itpkg.service.TaskService;
import com.odong.itpkg.util.DBHelper;
import com.odong.itpkg.util.EncryptHelper;
import com.odong.itpkg.util.JsonHelper;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created with IntelliJ IDEA.
 * User: flamen
 * Date: 13-6-4
 * Time: 下午12:46
 */
@Component("job.taskTarget")
public class TaskJob {
    public void execute() {
        for (Task t : taskService.listTimerTask()) {
            taskExecutor.execute(new TaskRunner(
                    t.getId(),
                    taskService,
                    jsonHelper,
                    encryptHelper,
                    rpcHelper,
                    dbHelper)
            );
        }
    }

    @Resource
    private RpcHelper rpcHelper;
    @Resource
    private TaskService taskService;
    @Resource
    private TaskExecutor taskExecutor;
    @Resource
    private JsonHelper jsonHelper;
    @Resource
    private DBHelper dbHelper;
    @Resource
    private EncryptHelper encryptHelper;

    public void setEncryptHelper(EncryptHelper encryptHelper) {
        this.encryptHelper = encryptHelper;
    }

    public void setTaskExecutor(TaskExecutor taskExecutor) {
        this.taskExecutor = taskExecutor;
    }

    public void setJsonHelper(JsonHelper jsonHelper) {
        this.jsonHelper = jsonHelper;
    }

    public void setDbHelper(DBHelper dbHelper) {
        this.dbHelper = dbHelper;
    }

    public void setTaskService(TaskService taskService) {
        this.taskService = taskService;
    }
}