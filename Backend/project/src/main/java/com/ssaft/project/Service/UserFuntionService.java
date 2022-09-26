//package com.ssaft.project.Service;
//
//import com.ssaft.project.Repository.IotUserRepository;
//import com.ssaft.project.domain.IotUser;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.LinkedHashMap;
//import java.util.Map;
//import java.util.Optional;
//
//@Service
//public class UserFuntionService {
//
//    @Autowired
//    SecurityService securityService;
//
//    @Autowired
//    IotUserRepository iotUserRepository;
//
//    public Map myPage(String token){
//        String id = securityService.getSubJect(token);
//        Optional<IotUser> user = iotUserRepository.findById(id);
//        Map<String, Object> map = new LinkedHashMap<>();
//        map.put("userName", user.get().getUserName());
//        return map;
//    }
//}
