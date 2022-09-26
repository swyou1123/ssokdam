//package com.ssaft.project.Service;
//
//import com.ssaft.project.Repository.IotUserRepository;
//import com.ssaft.project.domain.IotUser;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.JwtException;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import javax.crypto.spec.SecretKeySpec;
//import javax.xml.bind.DatatypeConverter;
//import javax.xml.bind.JAXBException;
//import java.security.Key;
//import java.util.Date;
//import java.util.LinkedHashMap;
//import java.util.Map;
//
//@Service
//public class SecurityService {
//    private static final String SECRET_KEY = "111dsfsdfasadfadassdadasdasdasasdadsasdasdsfdasfasfdffasds234";
//
//    @Autowired
//    IotUserRepository iotUserRepository;
//
//
//    // 로그인 서비스 할때 같이
//    public String creatToken(String subject, long expTime){
//        if(expTime <= 0){
//            throw new RuntimeException("ERROR");
//        }
//
//        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
//
//        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
//        Key signingKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());
//
//        return Jwts.builder()
//
//                .setSubject(subject)    //아이디 값 넣어주기
//                .signWith(signingKey, signatureAlgorithm)  // 키값
//                .setExpiration(new Date(System.currentTimeMillis() + expTime))
//                .compact();
//    }
//
//    // 토큰 검증하는 메서드 boolean
//    public String getSubJect(String token){
//        Claims claims = Jwts.parserBuilder()
//                // 페이로드에 담기는 정보
//                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//        return claims.getSubject();
//    }
//
//    public Map refreshTokenCheck(String token){
//        Map<String, Object> map = new LinkedHashMap<>();
//        try{
//            getSubJect(token);
//            IotUser iotuser = iotUserRepository.findByUserRt(token);
//            map.put("Access token", creatToken(iotuser.getUserId(), (1*1000*60)));return map;
//        }catch (JwtException e){
//            map.put("messgae" , "Refresh 토큰 이 만료되었습니다.");
//            return map;
//        }
//    }
//
//    public String jasyptEncoding(String value) {
//
//        String key = "iotProject";
//        StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
//        pbeEnc.setAlgorithm("PBEWithMD5AndDES");
//        pbeEnc.setPassword(key);
//        return pbeEnc.encrypt(value);
//    }
//
//    public String jasyptDecoding(String value) {
//
//        String key = "iotProject";
//        StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
//        pbeEnc.setAlgorithm("PBEWithMD5AndDES");
//        pbeEnc.setPassword(key);
//        return pbeEnc.decrypt(value);
//    }
//}
