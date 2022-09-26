//package com.ssaft.project.Service;
//
//import com.siot.IamportRestClient.IamportClient;
//import com.siot.IamportRestClient.exception.IamportResponseException;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//import java.time.LocalDate;
//import java.util.LinkedHashMap;
//import java.util.Map;
//
//@Service
//public class IamportService {
//
//    LocalDate now = LocalDate.now();
//
//    IamportClient client = new IamportClient("8270742312861075", "dAjR0eNuEcBlF2m3jpbVAwgBg9A80aOR85pyfLpweaRqnpnynReBHOM4jTp2lvJb7Vh3XhzZOc1tjoo4");
//
//    public Map getIamport(String uid) throws IamportResponseException, IOException {
//        String birth = String.valueOf(client.certificationByImpUid(uid).getResponse().getBirth());
//        String phone = client.certificationByImpUid(uid).getResponse().getPhone();
//        String name = client.certificationByImpUid(uid).getResponse().getName();
//
//
//        System.out.println(phone);
//        String birth2[] = birth.split(" ");
//
//        int userbitrh = Integer.parseInt(birth2[5]);
//        int year = now.getYear();
//        System.out.println(userbitrh);
//        System.out.println(year);
//        System.out.println(name);
//        Map<String , Object> map = new LinkedHashMap<>();
//
//        if(userbitrh+19 > year){
//            map.put("message", "19이상 사용가능합니다.");
//            return map;
//        }else {
//
//            map.put("userBirthDay", birth);
//            map.put("userPhone", phone);
//            map.put("userName", name);
//
//            return map;
//        }
//    }
//}
