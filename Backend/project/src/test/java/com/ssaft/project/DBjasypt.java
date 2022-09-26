package com.ssaft.project;

import com.ssaft.project.Function.Function;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class DBjasypt {
    @Autowired
    Function function;

    @Test
    void DB정보암호화() {
        String url = "jdbc:mysql://3.36.78.244:3306/project?useSSL=false&useUnicode=true&serverTimezone=Asia/Seoul";
        String username = "swyou";
        String password = "qudrlxksdir1!";

        String accessKey = "j4byR0Dz2ZWgoRgh07VR";                     	// 네이버 클라우드 플랫폼 회원에게 발급되는 개인 인증키			// Access Key : https://www.ncloud.com/mypage/manage/info > 인증키 관리 > Access Key ID
        String secretKey = "WY1AhLT9iWipVeLs9ru9Y1c66t9RELJJjZKTYzE1";  // 2차 인증을 위해 서비스마다 할당되는 service secret key	// Service Key : https://www.ncloud.com/mypage/manage/info > 인증키 관리 > Access Key ID
        String serviceId = "ncp:sms:kr:260201597605:ssokdam";

        String username2 = function.jasyptEncoding(username);
        System.out.println(function.jasyptEncoding(url));
        System.out.println(username2);
        System.out.println(function.jasyptDecoding(username2));
        System.out.println(function.jasyptEncoding(password));
        System.out.println(function.jasyptEncoding(accessKey));
        System.out.println(function.jasyptEncoding(secretKey));
        System.out.println(function.jasyptEncoding(serviceId));
    }

    public String jasyptEncoding(String value) {

        String key = "iotProject";
        StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
        pbeEnc.setAlgorithm("PBEWithMD5AndDES");
        pbeEnc.setPassword(key);
        return pbeEnc.encrypt(value);
    }

    public String jasyptDecoding(String value) {

        String key = "iotProject";
        StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
        pbeEnc.setAlgorithm("PBEWithMD5AndDES");
        pbeEnc.setPassword(key);
        return pbeEnc.decrypt(value);
    }

   /* @Test
    public void encryptSimpleTest() {
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setPassword("iotProject");
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        encryptor.setSaltGenerator(new StringFixedSaltGenerator("someFixedSalt"));
        String str = "testString";
        String encStr = encryptor.encrypt(str);
        String decStr = encryptor.decrypt(encStr);
        log.debug("str : {}, encStr : {}, decStr : {}", str, encStr, decStr);
    }*/

}
