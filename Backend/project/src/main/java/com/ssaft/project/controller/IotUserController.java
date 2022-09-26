package com.ssaft.project.controller;

import com.siot.IamportRestClient.exception.IamportResponseException;
import com.ssaft.project.Function.Function;
import com.ssaft.project.Repository.IotUserRepository;
import com.ssaft.project.Service.*;
import com.ssaft.project.domain.EmbeddedData;
import com.ssaft.project.domain.IotUser;
import com.ssaft.project.domain.PostData;
import io.jsonwebtoken.JwtException;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class IotUserController {


    @Autowired
    IotUserService iotUserService;   // 유저관련 서비스
    @Autowired
    IotUserRepository iotUserRepository;   // jpa

    @Autowired
    Function function;
    @Autowired
    PostService postService;
    @Autowired
    EmbeddedService embeddedService;
    @Autowired
    PaybackService paybackService;

    @GetMapping("/admin/users")                               //전체 회원 조회 (사용한다면 관리자에서)
    @ResponseBody
    public List<IotUser> test() {
        return iotUserRepository.findAll();
    }

    @PostMapping("/login")                                //로그인 기능
    @ResponseBody
    public Object jsonlogin(@RequestBody IotUser loginuser) {
        return iotUserService.login(loginuser.getUserId(), loginuser.getUserPwd());
    }
    @PostMapping("/login/findId")                          //아이디 찾기
    @ResponseBody
    public Map findId(@RequestBody IotUser user) {
        return iotUserService.findId(user);
    }

    @PostMapping("/login/findPwd")                          //비밀번호 찾기
    @ResponseBody
    public Map findPwd(@RequestBody IotUser user) {
        return iotUserService.findPwd(user);
    }

    @PostMapping("/login/phone")                          //휴대폰 인증
    @ResponseBody
    public Map<String, Object> checkPhone(@RequestBody IotUser user) throws JSONException {
        return iotUserService.phoneCheck(user);
    }

    @GetMapping("/login/phone/{number}")                          //휴대폰 인증
    @ResponseBody
    public Map<String, Object> phoneCertification(@PathVariable("number") String number, @RequestHeader String token) {
        return iotUserService.phoneCertification(token, number);
    }

    @PostMapping("/login/account")                          // 계좌번호 인증
    @ResponseBody
    public Map<String, Object> accountCertification(@RequestBody IotUser user) throws IamportResponseException, IOException {
        return iotUserService.accountCertification(user);
    }

    @PutMapping("/login/changePwd")                          // 비밀번호 변경
    @ResponseBody
    public Map changePw(@RequestBody IotUser user) {
        return iotUserService.changePw(user);
    }

    @DeleteMapping("/users/{id}")                             // 회원 삭제
    @ResponseBody
    public Map userDelete(@PathVariable("id") String id){
        return iotUserService.userDelete(id);
    }

    @PostMapping("/signup/check")                          // 회원가입 성인체크
    @ResponseBody
    public Map singUpCheck(@RequestBody IotUser user) {
        return iotUserService.singupcheck(user);
    }

    @PostMapping("/signup")                          // 회원가입 버튼
    @ResponseBody
    public Map singUp(@RequestBody IotUser user) {
        return iotUserService.singup(user);
    }

    @PostMapping("/userPoint")                  //포인트 적립
    @ResponseBody
    public Map pointpush(@RequestHeader String token, @RequestBody IotUser iotUser){
        return  iotUserService.pointPush(token, iotUser);
    }

    @GetMapping("/userinfo")                  //마이페이지 및 포인트
    @ResponseBody
    public Object pointpush(@RequestHeader String token){
        return  iotUserService.userInfo(token);
    }

    @PutMapping("/mypage/image")
    @ResponseBody
    public Map<String, Object> changeUserImage(@RequestHeader String token, @RequestBody IotUser iotUser){
        return iotUserService.changeUserImage(token, iotUser);
    }



    @GetMapping("/refreshToken")                  // 리프래쉬 토큰 체크
    @ResponseBody
    public Map RefreshToken(@RequestHeader String token){
        return iotUserService.loginRefresh(token);
    }

    //*************************************** 관리자 **************************************//
    @PostMapping("/admin/login")       //관리자 로그인
    @ResponseBody()
    public Object adminLogin(@RequestBody IotUser iotUser){
        return iotUserService.amdinLogin(iotUser.getUserId(), iotUser.getUserPwd());
    }

    @PostMapping("/admin/make")             //관리자 등록
    @ResponseBody()
    public boolean makeAdmin(@RequestBody IotUser iotUser){
        return iotUserService.makeAdmin(iotUser.getUserId());
    }



    @GetMapping("/admin")              // 관리자 메인 페이지
    @ResponseBody()
    public Map dataAll(){
        Map<String , Object> map = new LinkedHashMap<>();
        map.put("exchangeLth" , paybackService.findNcnt());
        map.put("exchangeMoney" , paybackService.findYmoney());
        map.put("deviceBroken", embeddedService.findBroken());
        map.put("deviceWarning", embeddedService.findWarning());
        map.put("userCnt", iotUserService.allUserCnt());
        map.put("complain" , postService.findAll("불만사항"));
        map.put("Broken" , postService.findAll("고장신고"));
        return map;
    }

    //*************************************** 관리자 **************************************//

    @GetMapping("/accessToken")
    @ResponseBody
    public Map accessTokenCheck(@RequestHeader String token){
        return iotUserService.accessTokenCheck(token);
    }


}
