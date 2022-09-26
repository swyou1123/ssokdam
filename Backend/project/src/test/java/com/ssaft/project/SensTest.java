package com.ssaft.project;

import com.ssaft.project.Function.Function;
import com.ssaft.project.Function.SMSFunction;
import org.json.JSONException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Controller;
import org.springframework.test.annotation.Commit;

@SpringBootTest
@Commit
public class SensTest {
    @Autowired
    SMSFunction smsFunction;
    @Autowired
    Function function;

    @Test
    public void 핸드폰sms테스트() throws JSONException {
//        smsFunction.sendSMS("01056389909", function.numberGen(4,2));
    }
}
