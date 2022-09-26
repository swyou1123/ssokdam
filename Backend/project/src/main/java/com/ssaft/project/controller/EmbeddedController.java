package com.ssaft.project.controller;

import com.ssaft.project.Function.Function;
import com.ssaft.project.Repository.EmbeddedDataRepository;
import com.ssaft.project.Repository.IotUserRepository;
import com.ssaft.project.Repository.UseDataRepository;
import com.ssaft.project.Service.EmbeddedService;
import com.ssaft.project.domain.EmbeddedData;
import com.ssaft.project.domain.IotUser;
import com.ssaft.project.domain.UseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class EmbeddedController {

    @Autowired
    IotUserRepository iotUserRepository;
    @Autowired
    EmbeddedService embeddedService;
    @Autowired
    EmbeddedDataRepository embeddedDataRepository;
    @Autowired
    UseDataRepository useDataRepository;

    @Autowired
    Function function;

    @GetMapping("/admin/checkDevice")              // 임베디드 기기정보 호출
    @ResponseBody()
    public List<EmbeddedData> embeddedAll(){
        return embeddedService.findAll();
    }

    @PostMapping("/embedded/emb")
    @ResponseBody
    public void test(@RequestBody EmbeddedData embeddedData){
        embeddedService.join(embeddedData);
     }


     @PostMapping("/embedded/send")     // 주기적 임베디드 센서값 업데이트
     @ResponseBody
     public void SensingSend(@RequestBody EmbeddedData sensing, String data){
        System.out.println(data);
        System.out.println(sensing);
        embeddedService.embSensingUpdate(sensing);
     }

    @GetMapping("/embedded/receive")             // qr 체크 확인 초단위 통신
    @ResponseBody
    public Map receive(@RequestParam int embId){
        return embeddedService.qrCheck(embId);
    }

    @GetMapping("/embedded/map")                 // 임베디드 기기 지역 체크
    @ResponseBody
    public List<Map<String, Object>> EmbeddedLoc(){
        return embeddedService.sendLoc();
     }


    @PostMapping("/embedded/use")
    @ResponseBody
    public void test3(@RequestBody UseData useData){
        useDataRepository.save(useData);
    }

    @PutMapping("/embedded/{userId}")
    @ResponseBody
    public void embDtUpdate(@PathVariable("userId") String userId){
        embeddedService.embDtUpdate(userId);
    }


    @PutMapping("/devices/{id}")
    @ResponseBody
    public Map<String, Object> changeState(@PathVariable("id") String id){
        return embeddedService.changeState(id);
    }

    @GetMapping("/devices/{id}")
    @ResponseBody
    public List<EmbeddedData> deviceStatus(@PathVariable("id") String id){
        return embeddedService.embeddedStatus(id);
    }

    @PostMapping("/embedded/qr")
    @ResponseBody
    public void Qr(@RequestBody EmbeddedData user){
        embeddedService.userQrCheck(user);
    }
}
