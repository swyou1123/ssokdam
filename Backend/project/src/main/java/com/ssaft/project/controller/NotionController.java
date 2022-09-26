package com.ssaft.project.controller;

import com.ssaft.project.Repository.NotionDataRepository;
import com.ssaft.project.Service.NotionService;
import com.ssaft.project.domain.NotionData;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NotionController {

    @Autowired
    NotionService notionService;


    @GetMapping("/alarm")
    @ResponseBody
    public Object userAll(@RequestHeader("token") String token){
        System.out.println(token);
        return notionService.userAll(token);
    }
}
