package com.ssaft.project.Service;

import com.ssaft.project.Function.Function;
import com.ssaft.project.Repository.EmbeddedDataRepository;
import com.ssaft.project.Repository.IotUserRepository;
import com.ssaft.project.Repository.UseDataRepository;
import com.ssaft.project.domain.IotUser;
import com.ssaft.project.domain.UseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UseService {
    @Autowired
    IotUserService iotUserService;
    @Autowired
    NotionService notionService;

    @Autowired
    UseDataRepository useDataRepository;

    @Autowired
    IotUserRepository iotUserRepository;
    @Autowired
    EmbeddedDataRepository embeddedDataRepository;

    @Autowired
    Function function;

    public void usePush(UseData useData){                  // 담배 판별 'Y' 'N' 에 따라 작업 수행
        if(useData.getUseCheck().equals("Y")){
            iotUserService.cigPush(useData.getUserId());
            notionService.notionPush(useData.getUserId(), "cig", 25);
        }
        useData.setIotUser(iotUserRepository.findById(useData.getUserId()).get());
        System.out.println(useData.getEmbId());
        useData.setEmbeddedData(embeddedDataRepository.findById(useData.getEmbId()).get());
        System.out.println(useData);
        useDataRepository.save(useData);
    }

    public Map<String, Object>  useCheck(String token){
        Map<String, Object> map = new LinkedHashMap<>();
        String id = function.getSubJect(token);
        if(id.equals("토큰만료")){
            map.put("ok", "토큰만료");
            return map;
        }
        Optional<IotUser> iotUser = iotUserRepository.findById(id);
        UseData useData = new UseData();
        useData.setIotUser(iotUser.get());
        useData.setUseDumy("N");
        try {
            UseData uD = useDataRepository.findByIotUserAndUseDumy(iotUser.get(), "N");
            System.out.println(uD);
            map.put("ok", uD.getUseCheck());
            uD.setUseDumy("Y");
            useDataRepository.save(uD);
        }catch (NullPointerException e){
            map.put("ok", 'P');
        }


        return map;
    }
}
