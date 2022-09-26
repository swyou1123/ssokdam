package com.ssaft.project;

import com.ssaft.project.Function.Function;
import com.ssaft.project.domain.IotUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

@SpringBootTest
@Commit
public class IamportTest {

    @Autowired
    Function function;

    @Test
    public void 아임포트계좌테스트() throws Exception {
        IotUser user = new IotUser();
        user.setUserAccount("94450200079014");
        user.setUserBanknumber("004");
        try {
            String name = function.getAccountName(user);
            System.out.println(name);
        }catch (ArrayIndexOutOfBoundsException e){
            System.out.println("error");
        }
    }
}
