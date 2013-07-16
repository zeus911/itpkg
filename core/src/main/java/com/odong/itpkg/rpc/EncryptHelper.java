package com.odong.itpkg.rpc;

import org.jasypt.util.password.StrongPasswordEncryptor;
import org.jasypt.util.text.StrongTextEncryptor;

/**
 * Created with IntelliJ IDEA.
 * User: flamen
 * Date: 13-7-16
 * Time: 上午10:54
 */
public class EncryptHelper {
    public String encode(Object plain) {
        return plain == null ? null : ste.encrypt(jsonHelper.object2json(plain));
    }

    public <T> T decode(String encrypt, Class<T> clazz) {
        return encrypt == null ? null : jsonHelper.json2object(ste.decrypt(encrypt), clazz
        );
    }

    public String encode(String plain) {
        return ste.encrypt(plain);
    }

    public String decode(String encrypt) {
        return ste.decrypt(encrypt);
    }

    public String encrypt(String plain) {
        return spe.encryptPassword(plain);
    }

    public boolean check(String plain, String encrypt) {
        return spe.checkPassword(plain, encrypt);
    }


    public void init() {
        spe = new StrongPasswordEncryptor();
        ste = new StrongTextEncryptor();
        ste.setPassword(appKey);
    }

    private StrongPasswordEncryptor spe;
    private StrongTextEncryptor ste;
    private String appKey;

    private JsonHelper jsonHelper;

    public void setAppKey(String appKey) {
        this.appKey = appKey;
    }

    public void setJsonHelper(JsonHelper jsonHelper) {
        this.jsonHelper = jsonHelper;
    }


}
