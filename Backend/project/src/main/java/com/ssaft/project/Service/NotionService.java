package com.ssaft.project.Service;


import com.ssaft.project.Function.Function;
import com.ssaft.project.Repository.IotUserRepository;
import com.ssaft.project.Repository.NotionDataRepository;
import com.ssaft.project.domain.IotUser;
import com.ssaft.project.domain.NotionData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class NotionService {

    @Autowired
    NotionDataRepository notionDataRepository;
    @Autowired
    Function function;
    @Autowired
    IotUserRepository iotUserRepository;

    public Object userAll(String token){
        String id = function.getSubJect(token);
        List<NotionData> notionData;
        if(id.equals("토큰만료")){
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("ok", "토큰만료");
            return map;
        }
        System.out.println(id);
        try {
            Optional<IotUser> iotUser = iotUserRepository.findById(id);
            notionData = notionDataRepository.findByIotUser(iotUser.get());

            for(NotionData nD : notionData){
                nD.setUserId(nD.getIotUser().getUserId());
                if(nD.getNotCheck().equals("N")){
                    nD.setNotCheck("Y");
                    notionDataRepository.save(nD);
                }
            }
        }catch (NoSuchElementException e){
            throw new IllegalStateException(e);
        }
        return notionData;
    }

    public void notionPush(String id, String type, int money){
        NotionData notionData = new NotionData();
        notionData.setIotUser(iotUserRepository.findById(id).get());
        notionData.setNotDt(Function.nowDate());
        if(type.equals("cig")){
            notionData.setNotCtnt("포인트 적립");
            notionData.setNotMoney(money);
        }else{
            notionData.setNotCtnt("환전");
            notionData.setNotMoney(money);
        }
        notionDataRepository.save(notionData);
    }

    public boolean notionCheck(String id){
        try {
            List<NotionData> notionData = notionDataRepository.findByNotCheckAndIotUser("N", iotUserRepository.findById(id).get());
            System.out.println(notionData.size());
            if(notionData.size()==0){
                return false;
            }else{
                return true;
            }
        }catch (NoSuchElementException e){
            return false;
        }
    }
}
