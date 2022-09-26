package com.ssaft.project;

import com.siot.IamportRestClient.exception.IamportResponseException;
import com.ssaft.project.Function.Function;
import com.ssaft.project.Repository.IotUserRepository;
import com.ssaft.project.Service.IotUserService;
import com.ssaft.project.domain.IotUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.fail;

@SpringBootTest
@Commit
public class IotUserRepositoryTest {

    @Autowired
    private IotUserRepository iotUserRepository;

    @Autowired
    private  IotUserService iotUserService;

    @Autowired
    Function function;

//    @AfterEach
//    public void afterEach(){
//        IotUser iotuser = new IotUser();
//        iotuser.setUserId("swyou");
//        iotUserRepository.delete(iotuser);
//    }



    @Test
    public void 회원가입() throws Exception {
        IotUser iotuser = new IotUser();
        iotuser.setUserId("test4");
        iotuser.setUserPwd(function.jasyptEncoding("test4"));
        iotuser.setUserName("김도원");
        iotuser.setUserPhone("01044444444");
        iotuser.setUserBirthDay("1997-11-04");
        iotuser.setUserEmail("swyou4444@naver.com");
        iotuser.setUserAccount("94450200079014");
        iotUserRepository.save(iotuser);
    }

    @Test
    public void 아이디로_회원삭제() throws IamportResponseException, IOException {
        IotUser iotuser = new IotUser();
        iotuser.setUserId("swyou");
        iotuser.setUserPwd(function.jasyptEncoding("test4"));
        iotuser.setUserName("유승우");
        iotuser.setUserPhone("010-5638-9909");
        iotuser.setUserBirthDay("1997-11-04");
        iotuser.setUserEmail("swyou1123@naver.com");
        iotuser.setUserAccount("94450200079014");
        iotUserRepository.save(iotuser);

        IotUser iotUser = new IotUser();
        iotUser.setUserId("swyou");
        iotUserRepository.delete(iotUser);
    }

    @Test
    public void 아이디로_중복검사() throws IamportResponseException, IOException {
        IotUser iotuser = new IotUser();
        iotuser.setUserId("swyou");
        iotuser.setUserPwd(function.jasyptEncoding("test4"));
        iotuser.setUserName("유승우");
        iotuser.setUserPhone("010-5638-9909");
        iotuser.setUserBirthDay("1997-11-04");
        iotuser.setUserEmail("swyou1123@naver.com");
        iotuser.setUserAccount("94450200079014");

        iotUserRepository.save(iotuser);
        try{
            iotUserRepository.save(iotuser);
        }catch (IllegalStateException e){
            assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
        }
        IotUser iotUser = new IotUser();
        iotUser.setUserId("swyou");
        iotUserRepository.delete(iotUser);
    }

    @Test
    public void 로그인_성공and실패_테스트() throws IamportResponseException, IOException {
        IotUser iotuser = new IotUser();
        iotuser.setUserId("swyou");
        iotuser.setUserPwd(function.jasyptEncoding("test4"));
        iotuser.setUserName("유승우");
        iotuser.setUserPhone("010-5638-9909");
        iotuser.setUserBirthDay("1997-11-04");
        iotuser.setUserEmail("swyou1123@naver.com");
        iotuser.setUserAccount("94450200079014");
        iotUserRepository.save(iotuser);

        iotUserService.login("swyou", "1234");
        try{
            iotUserService.login("실패테스트값", "&&^&#@$ㅁㅉㅁ!@#");
            fail();
        }catch (NoSuchElementException e){
            assertThat(e.getMessage()).isEqualTo("No value present");
        }
        IotUser iotUser = new IotUser();
        iotUser.setUserId("swyou");
        iotUserRepository.delete(iotUser);
    }

    @Test
    public void 회원아이디_비밀번호찾기(){
        IotUser iotUser = new IotUser();
        iotUser.setUserName("관리자");
        iotUser.setUserPhone("01055555555");
        Map<String, Object> map = new LinkedHashMap<>();
        map = iotUserService.findId(iotUser);
        if(map.containsKey("message")){
            fail();
        }
        iotUser.setUserId((String) map.get("userId"));
        map = iotUserService.findPwd(iotUser);
        if(map.containsKey("error")){
            fail();
        }
    }

}
