package com.ssaft.project.Function;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.ssaft.project.Repository.IotUserRepository;
import com.ssaft.project.domain.IotUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.UnknownHostException;
import java.security.Key;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

import javax.crypto.spec.SecretKeySpec;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class Function {
    @Autowired
    IotUserRepository iotUserRepository;

    private static final String SECRET_KEY = "111dsfsdfasadfadassdadasdasdasasdadsasdasdsfdasfasfdffasds234";

    LocalDate now = LocalDate.now();

    public static String nowDate(){
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyy-MM-dd HH:mm:ss"; //hhmmss로 시간,분,초만 뽑기도 가능
        SimpleDateFormat formatter = new SimpleDateFormat(pattern,
                currentLocale);
        return formatter.format(today);
    }


    IamportClient client = new IamportClient("8270742312861075", "dAjR0eNuEcBlF2m3jpbVAwgBg9A80aOR85pyfLpweaRqnpnynReBHOM4jTp2lvJb7Vh3XhzZOc1tjoo4");

    public Map getIamport(String uid) throws IamportResponseException, IOException {
        String birth = String.valueOf(client.certificationByImpUid(uid).getResponse().getBirth());
        String phone = client.certificationByImpUid(uid).getResponse().getPhone();
        String name = client.certificationByImpUid(uid).getResponse().getName();

        System.out.println(phone);
        String birth2[] = birth.split(" ");

        int userbitrh = Integer.parseInt(birth2[5]);
        int year = now.getYear();
        System.out.println(userbitrh);
        System.out.println(year);
        System.out.println(name);
        Map<String , Object> map = new LinkedHashMap<>();

        if(userbitrh+19 > year){
            map.put("message", "19이상 사용가능합니다.");
            return map;
        }else {

            map.put("userBirthDay", birth);
            map.put("userPhone", phone);
            map.put("userName", name);

            return map;
        }
    }

    public String getIamportAccount(){
        return "1";
    }

    public String creatToken(String subject, long expTime){
        if(expTime <= 0){
            throw new RuntimeException("ERROR");
        }

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signingKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());

        return Jwts.builder()
                .setSubject(subject)    //아이디 값 넣어주기
                .signWith(signingKey, signatureAlgorithm)  // 키값
                .setExpiration(new Date(System.currentTimeMillis() + expTime))
                .compact();
    }

    // 토큰 검증하는 메서드 boolean
    public String getSubJect(String token){
        try {
            Claims claims = Jwts.parserBuilder()
                    // 페이로드에 담기는 정보
                    .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } catch (JwtException e){
            System.out.println(e);
            return "토큰만료";
        }
    }

    public Map refreshTokenCheck(String token){
        Map<String, Object> map = new LinkedHashMap<>();
        try{
            getSubJect(token);
            IotUser iotuser = iotUserRepository.findByUserRt(token);
            map.put("Access token", creatToken(iotuser.getUserId(), (1*1000*60)));return map;
        }catch (JwtException e){
            map.put("messgae" , "Refresh 토큰 이 만료되었습니다.");
            return map;
        }
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

    public String numberGen(int len, int dupCd ) {

        Random rand = new Random();
        String numStr = ""; //난수가 저장될 변수

        for (int i = 0; i < len; i++) {

            //0~9 까지 난수 생성
            String ran = Integer.toString(rand.nextInt(10));

            if (dupCd == 1) {
                //중복 허용시 numStr에 append
                numStr += ran;
            } else if (dupCd == 2) {
                //중복을 허용하지 않을시 중복된 값이 있는지 검사한다
                if (!numStr.contains(ran)) {
                    //중복된 값이 없으면 numStr에 append
                    numStr += ran;
                } else {
                    //생성된 난수가 중복되면 루틴을 다시 실행한다
                    i -= 1;
                }
            }
        }
        return numStr;
    }

    public String getAccountName(IotUser user) throws Exception {
        String[] data = new String[10];
        IamportClient client = new IamportClient("8270742312861075", "dAjR0eNuEcBlF2m3jpbVAwgBg9A80aOR85pyfLpweaRqnpnynReBHOM4jTp2lvJb7Vh3XhzZOc1tjoo4");
        String token = client.getAuth().getResponse().getToken();
        System.out.println(token);
        String urlString = "https://api.iamport.kr/vbanks/holder?bank_code="+user.getUserBanknumber()+"&bank_num="+user.getUserAccount()+"&_token="+token;
        String line = null;
        InputStream in = null;
        BufferedReader reader = null;
        HttpsURLConnection httpsConn = null;

        try {
            // Get HTTPS URL connection
            URL url = new URL(urlString);
            httpsConn = (HttpsURLConnection) url.openConnection();

            // Set Hostname verification
            httpsConn.setHostnameVerifier(new HostnameVerifier() {
                @Override
                public boolean verify(String hostname, SSLSession session) {
                    // Ignore host name verification. It always returns true.
                    return true;
                }
            });

            // Input setting
            httpsConn.setDoInput(true);
            // Output setting
            //httpsConn.setDoOutput(true);
            // Caches setting
            httpsConn.setUseCaches(false);
            // Read Timeout Setting
            httpsConn.setReadTimeout(1000);
            // Connection Timeout setting
            httpsConn.setConnectTimeout(1000);
            // Method Setting(GET/POST)
            httpsConn.setRequestMethod("GET");
            // Header Setting


            int responseCode = httpsConn.getResponseCode();
            System.out.println("응답코드 : " + responseCode);
            System.out.println("응답메세지 : " + httpsConn.getResponseMessage());

            // SSL setting
            SSLContext context = SSLContext.getInstance("TLS");
            context.init(null, null, null); // No validation for now
            httpsConn.setSSLSocketFactory(context.getSocketFactory());

            // Connect to host
            httpsConn.connect();
            httpsConn.setInstanceFollowRedirects(true);

            // Print response from host
            if (responseCode == HttpsURLConnection.HTTP_OK) { // 정상 호출 200
                in = httpsConn.getInputStream();
            } else { // 에러 발생
                in = httpsConn.getErrorStream();
            }
            reader = new BufferedReader(new InputStreamReader(in));
            while ((line = reader.readLine()) != null) {
                data = line.split("\"");
                System.out.printf("%s\n", line);
            }

            reader.close();
        } catch (UnknownHostException e) {
            System.out.println("UnknownHostException : " + e);
        } catch (MalformedURLException e) {
            System.out.println(urlString + " is not a URL I understand");
        } catch (IOException e) {
            System.out.println("IOException :" + e);
        } catch (Exception e) {
            System.out.println("error : " + e);
        } finally {
            if (reader != null) {
                reader.close();
            }
            if (httpsConn != null) {
                httpsConn.disconnect();
            }
        }
        String name = data[9];
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < name.length(); i++) {
            if ('\\' == name.charAt(i) && 'u' == name.charAt(i + 1)) {
                Character r = (char) Integer.parseInt(name.substring(i + 2, i + 6), 16);
                sb.append(r);       i += 5;
            } else {
                sb.append(name.charAt(i));
            }
        }
        return sb.toString();
    }
}
