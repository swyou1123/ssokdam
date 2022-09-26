package com.ssaft.project.Service;

import com.ssaft.project.Function.Function;
import com.ssaft.project.Repository.IotUserRepository;
import com.ssaft.project.Repository.NotionDataRepository;
import com.ssaft.project.Repository.PaybackDataRepository;
import com.ssaft.project.domain.CommentData;
import com.ssaft.project.domain.IotUser;
import com.ssaft.project.domain.NotionData;
import com.ssaft.project.domain.PaybackData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class PaybackService {

    @Autowired
    PaybackDataRepository paybackDataRepository;

    @Autowired
    IotUserRepository iotUserRepository;

    @Autowired
    NotionDataRepository notionDataRepository;
    @Autowired
    Function function;

    public List<PaybackData> paybackAll(){
        List<PaybackData> paybackData = paybackDataRepository.findAll();
        for(PaybackData pD : paybackData){
            pD.setUserId(pD.getIotUser().getUserId());
        }
        return paybackData;
    }

    public void paybackPush(PaybackData paybackData){
        Optional<IotUser> iotUser = iotUserRepository.findById(paybackData.getUserId());
        paybackData.setIotUser(iotUser.get());
        paybackDataRepository.save(paybackData);
    }

    public int findNcnt(){
        List<PaybackData> paybackData = paybackDataRepository.findByPbCheck("N");
        return paybackData.size();
    }

    public int findYmoney(){
        List<PaybackData> paybackData = paybackDataRepository.findByPbCheck("Y");
        int money =0 ;
        for(PaybackData pD : paybackData){
            money += pD.getPbMoney();
        }
        return money;
    }

    public Map exchange(String pbSeq){
        String[] id = pbSeq.split(",");
        for(String data : id){
            System.out.println(data);
            Optional<PaybackData> paybackData = paybackDataRepository.findById(Integer.valueOf(data));
            paybackData.get().setPbCheck("Y");
            Optional<IotUser> iotUser = iotUserRepository.findById(paybackData.get().getIotUser().getUserId());
            iotUser.get().setUserPoint(iotUser.get().getUserPoint()-paybackData.get().getPbMoney());
            iotUserRepository.save(iotUser.get());
            paybackDataRepository.save(paybackData.get());
            NotionData notionData = new NotionData();
            notionData.setIotUser(iotUser.get());
            notionData.setNotCtnt("환전");
            notionData.setNotMoney(paybackData.get().getPbMoney());
            notionDataRepository.save(notionData);
        }
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("ok", true);
        return map;
    }

    public Map paybackDelete(String id){
        Map<String, Object> map = new LinkedHashMap<>();
        String[] data = id.split(",");
        for(String delete : data){
            Optional<PaybackData> paybackData = paybackDataRepository.findById(Integer.valueOf(delete));
            paybackDataRepository.delete(paybackData.get());
        }
        map.put("ok", true);
        return map;
    }

    public Map paybackPush(String token, PaybackData paybackData){
        String id = function.getSubJect(token);
        Map<String, Object> map = new LinkedHashMap<>();
        if(id.equals("토큰만료")){
            map.put("ok", "토큰만료");
            return map;
        }
        Optional<IotUser> iotUser =  iotUserRepository.findById(id);
        paybackData.setIotUser(iotUser.get());
        paybackDataRepository.save(paybackData);
        map.put("ok", true);
        return map;
    }

    public List<PaybackData> paybackN(){
        List<PaybackData> paybackData = paybackDataRepository.findByPbCheck("N");
        for(PaybackData pD : paybackData){
            pD.setUserId(pD.getIotUser().getUserId());
        }
        return paybackDataRepository.findByPbCheck("N");
    }
}
