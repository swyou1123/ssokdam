package com.ssaft.project.Service;

import com.siot.IamportRestClient.exception.IamportResponseException;
import com.ssaft.project.Function.Function;
import com.ssaft.project.Function.SMSFunction;
import com.ssaft.project.Repository.IotUserRepository;
import com.ssaft.project.domain.IotUser;
import io.jsonwebtoken.JwtException;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.NonUniqueResultException;
import java.io.IOException;
import java.util.*;

@Service
public class IotUserService {
    private final IotUserRepository iotUserRepository;

    public IotUserService(IotUserRepository iotUserRepository) {
        this.iotUserRepository = iotUserRepository;
    }


    @Autowired
    Function function;

    @Autowired
    SMSFunction smsFunction;

    @Autowired
    NotionService notionService;


    public Object login(String id, String password) {    //로그인
        String token = "error";
        Optional<IotUser> iotuser = iotUserRepository.findById(id);
        Map<String, Object> map = new LinkedHashMap<>();
        if (iotuser != null) {
            if (function.jasyptDecoding(iotuser.get().getUserPwd()).equals(password)) {
                token = function.creatToken(id, (60 * 1000 * 60));
                String token2 = function.creatToken(id, (10800 * 1000 * 60));
                iotuser.get().setUserRt(token2);
                iotUserRepository.save(iotuser.get());
                iotuser.get().setAccess_token(token);
                iotuser.get().setRefresh_token(token2);
                iotuser.get().setOk(true);
                if(notionService.notionCheck(id)){
                    iotuser.get().setNotCheck("Y");
                }else{
                    iotuser.get().setNotCheck("N");
                }
                return iotuser.get();
            } else {
                map.put("message", "비밀번호가 틀렸습니다.");
            }
        } else {
            map.put("message", "존재하지 않는 회원입니다.");
        }

        return map;
    }

    public Map loginRefresh(String token) {
        Map<String, Object> map = new LinkedHashMap<>();
        String id = function.getSubJect(token);
        if(id.equals("토큰만료")){
            map.put("ok", "토큰만료");
            return map;
        }
        Optional<IotUser> iotUser = iotUserRepository.findById(id);
        if (iotUser.get().getUserRt().equals(token)) {
            String Accesstoken = function.creatToken(iotUser.get().getUserId(), (60 * 1000 * 60));
            map.put("Access_token", Accesstoken);
        }
        return map;
    }

    public Map findId(IotUser user) {                      //아이디 찾기
        Map<String, Object> map = new LinkedHashMap<>();

        List<IotUser> iotUser = iotUserRepository.findByUserName(user.getUserName());
        System.out.println(iotUser);
        for (IotUser id : iotUser) {
            if (id.getUserPhone().equals(user.getUserPhone())) {
                map.put("userId", id.getUserId());
                return map;
            }
        }
        map.put("message", "존재하지 않는 회원입니다.");
        return map;

    }

    public Map<String, Object> findPwd(IotUser user) {
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            Optional<IotUser> iotUser = iotUserRepository.findById(user.getUserId());
            if (iotUser.get().getUserPhone().equals(user.getUserPhone())) {
                map.put("ok", true);
                return map;
            }
            map.put("ok", false);
        }catch (NoSuchElementException e){
            map.put("ok", false);
        }
        return map;
    }


    public Map changePw(IotUser user) {
        Map<String, Object> map = new LinkedHashMap<>();
        Optional<IotUser> iotUser = iotUserRepository.findById(user.getUserId());
        iotUser.get().setUserPwd(function.jasyptEncoding(user.getUserPwd()));
        iotUserRepository.save(iotUser.get());
        map.put("messge", "비밀번호 변경 완료!!");
        return map;
    }

    public Map singupcheck(IotUser iotUser){
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            map = function.getIamport(iotUser.getImp_uid());
            if(map.containsKey("message")){
                map.put("ok", false);
            }else{
                map.put("ok", true);
            }
        } catch (IamportResponseException | IOException e) {
            map.put("ok", false);
            throw new RuntimeException(e);
        }
        return map;
    }

    public Map singup(IotUser user) {          //회원가입
        String pwd = function.jasyptEncoding(user.getUserPwd());    //비밀번호 암호화
        user.setUserPwd(pwd);

        if(user.getUserBanknumber().equals("004")) user.setUserAccount("국민 "+user.getUserAccount());
        if(user.getUserBanknumber().equals("034")) user.setUserAccount("광주 "+user.getUserAccount());
        if(user.getUserBanknumber().equals("030")) user.setUserAccount("기업 "+user.getUserAccount());
        if(user.getUserBanknumber().equals("090")) user.setUserAccount("카카오 "+user.getUserAccount());
        if(user.getUserBanknumber().equals("011")) user.setUserAccount("농협 "+user.getUserAccount());
        if(user.getUserBanknumber().equals("088")) user.setUserAccount("신한 "+user.getUserAccount());


        Map<String ,Object> map = new LinkedHashMap<>();

        try {
            map = function.getIamport(user.getImp_uid());
            System.out.println(map);
        } catch (IamportResponseException | IOException e) {
            throw new RuntimeException(e);
        }
        user.setUserPhone((String) map.get("userPhone"));
        user.setUserBirthDay((String) map.get("userBirthDay"));
        user.setUserName((String) map.get("userName"));
        map.clear();

        try {
            CheckId(user.getUserId());
            String token = function.creatToken(user.getUserId(), (60 * 1000 * 60));
            map.put("Access_token" , token);
            token = function.creatToken(user.getUserId(), (10800 * 1000 * 60));
            user.setUserRt(token);
            iotUserRepository.save(user);
            map.put("Refresh_token" , token);
            map.put("userName", user.getUserName());
            map.put("userEmail", user.getUserEmail());
            map.put("userPoint", user.getUserPoint());
            map.put("userCnt", user.getUserCnt());
            map.put("userImg", user.getUserImg());
            map.put("userTime", user.getUserTime());
            return map;
        }catch (IllegalStateException e) {

            map.put("message", e);
            return map;
        }
    }

    public Map userDelete(String data){
        String[] id = data.split(",");
        for(String Did : id){
            iotUserRepository.delete(iotUserRepository.findById(Did).get());
        }
        Map<String ,Object> map = new LinkedHashMap<>();
        map.put("ok", true);
        return map;
    }

    public Map pointPush(String token, IotUser iotUser){
        String id = function.getSubJect(token);
        Map<String, Object> map = new LinkedHashMap<>();
        if(id.equals("토큰만료")){
            map.put("ok", "토큰만료");
        }
        Optional<IotUser> realUser = iotUserRepository.findById(id);
        realUser.get().setUserPoint(realUser.get().getUserPoint()+iotUser.getUserPoint());
        iotUserRepository.save(realUser.get());
        map.put("ok", true);
        return map;
    }

    public Object amdinLogin(String id, String password){ // 관리자 로그인
        Optional<IotUser> iotUser = iotUserRepository.findById(id);
        Map<String, Object> map = new LinkedHashMap<>();
        if(iotUser.get().getUserAdmin().equals("N")){
            map.put("ok", false);
            return map;
        }
        return  login(id, password);
    }

    public Object userInfo(String token){                 // 토큰의 사용자 정보 리턴
        String id = function.getSubJect(token);
        Map<String, Object> map = new LinkedHashMap<>();
        if(id.equals("토큰만료")){
            map.put("ok", "토큰만료");
            return map;
        }
        Optional<IotUser> iotUser = iotUserRepository.findById(id);
        if(notionService.notionCheck(id)){
            iotUser.get().setNotCheck("Y");
        }else{
            iotUser.get().setNotCheck("N");
        }
        return iotUser.get();
    }

    public Map<String, Object> phoneCheck(IotUser user) throws JSONException {           // 핸드폰 인증 토큰 생성 및 sms 문자 보내기
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            List<IotUser> iotUser = iotUserRepository.findByUserPhone(user.getUserPhone());
            if(iotUser.size()==0) throw new NoSuchElementException();
            String result = function.numberGen(4, 2);
            smsFunction.sendSMS(user.getUserPhone(), result);
            String token = function.creatToken(result, (3 * 1000 * 60));
            map.put("Phone_token", token);
        }catch (NoSuchElementException e){
            map.put("ok", false);
        }
            return map;
    }

    public Map<String, Object> phoneCertification(String token, String number){             // 핸드폰 인증 번호 확인
        String Phone_token = function.getSubJect(token);
        Map<String, Object> map = new LinkedHashMap<>();
        System.out.println(Phone_token);
        System.out.println(number);
        if(Phone_token.equals("토큰만료")){
            map.put("ok", false);
            return map;
        }
        if(Phone_token.equals(number)){
            map.put("ok", true);
        }else{
            map.put("ok", false);
        }
        return map;
    }

    public Map<String, Object> accountCertification(IotUser iotUser) throws IamportResponseException, IOException {             // 계좌 확인
        Map<String, Object> map = new LinkedHashMap<>();
        map = function.getIamport(iotUser.getImp_uid());
        String phoneName = (String) map.get("userName");
        try {
            String accountName = function.getAccountName(iotUser);
            if(phoneName.equals(accountName)){
                map.put("ok", true);
            }else{
                map.put("ok", false);
            }
        }catch (Exception e){
            map.put("ok", false);
        }

        return map;
    }

    public void cigPush(String id){
        Optional<IotUser> iotUser = iotUserRepository.findById(id);
        iotUser.get().setUserPoint(iotUser.get().getUserPoint()+25);
        iotUser.get().setUserTime(Function.nowDate());
        System.out.println(Function.nowDate());
        iotUser.get().setUserCnt(iotUser.get().getUserCnt()+1);
        iotUserRepository.save(iotUser.get());
    }

    public int allUserCnt(){
        return (int) iotUserRepository.count();
    }

    public Map changeUserImage(String token, IotUser image){
        String id = function.getSubJect(token);
        Map<String, Object> map = new LinkedHashMap<>();
        if(id.equals("토큰만료")){
            map.put("ok", "토큰만료");
        }
        Optional<IotUser> iotUser = iotUserRepository.findById(id);
        iotUser.get().setUserImg(image.getUserImg());
        iotUserRepository.save(iotUser.get());
        map.put("ok", true);
        return map;
    }





    public boolean makeAdmin(String id){         //관리자 생성
        try {
            Optional<IotUser> iotUser = iotUserRepository.findById(id);
            iotUser.get().setUserAdmin("Y");
            iotUserRepository.save(iotUser.get());
            return  true;
        }catch (NegativeArraySizeException e){
            return false;
        }
    }

    public Map accessTokenCheck(String accesstoken){     //accesstoken 체크
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            String id = function.getSubJect(accesstoken);
        } catch (JwtException e){
            map.put("ok", false);
        }
        return map;
    }


    public void CheckId(String id){                   // 회원가입 - 중복검사
        iotUserRepository.findById(id)
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }



}
