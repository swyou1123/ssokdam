package com.ssaft.project;

import com.ssaft.project.Function.Function;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.fail;

@SpringBootTest
public class TokenTest {

    @Autowired
    Function function;

    @Test
    void 로그인서비스_토큰(){  // 토큰이 잘생성되고 가져올때 생성한 토큰이 맞는지 테스트
        String token = function.creatToken("유승우" , (2*1000*60));
        if("유승우".equals(function.getSubJect(token))){
            System.out.println("토큰 서비스 생성 및 확인 성공");
        }else{
            fail();
        }
    }
}
