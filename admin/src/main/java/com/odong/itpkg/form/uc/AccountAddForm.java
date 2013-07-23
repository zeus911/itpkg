package com.odong.itpkg.form.uc;

import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * User: flamen
 * Date: 13-7-21
 * Time: 下午4:21
 */
public class AccountAddForm implements Serializable {
    private static final long serialVersionUID = -1643556979599003713L;
    @Email
    @NotNull
    private String email;
    @NotNull
    private String username;
    @NotNull
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}