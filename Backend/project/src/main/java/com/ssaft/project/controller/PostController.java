package com.ssaft.project.controller;

import com.ssaft.project.Repository.CommentDataRepository;
import com.ssaft.project.Repository.IotUserRepository;
import com.ssaft.project.Repository.PostDataRepository;
import com.ssaft.project.Service.CommentService;
import com.ssaft.project.Service.PostService;
import com.ssaft.project.domain.CommentData;
import com.ssaft.project.domain.IotUser;
import com.ssaft.project.domain.PostData;
import org.hibernate.cfg.SecondaryTableSecondPass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    PostDataRepository postDataRepository;

    @Autowired
    IotUserRepository iotUserRepository;

    @Autowired
    CommentDataRepository getDataRepository;

    @Autowired
    PostService postService;

    @Autowired
    CommentService commentService;


    @GetMapping("/myAsk")                                                          // 나의 문의사항 return
    @ResponseBody
    public List<PostData> myAsk(@RequestHeader("token") String token){
        System.out.println(token);
        return postService.myAsk(token);
    }

    @PostMapping("/post")                                                   // 게시글 등록
    @ResponseBody
    public Map postPush(@RequestHeader("token") String token, @RequestBody PostData postData){
        System.out.println(postData.getFile());
        return postService.postPush(token, postData);
    }

    @PutMapping("/post/{pstSeq}")                                         //게시글 수정
    @ResponseBody
    public Map postEdit(@PathVariable("pstSeq") int pstSeq, @RequestBody PostData postData){
        return postService.postEdit(pstSeq, postData);
    }

    @DeleteMapping("/post/{pstSeq}")                                       // 게시글 삭제
    @ResponseBody
    public Map postDelete(@PathVariable("pstSeq") int pstSeq){
        return postService.postDelete(pstSeq);
    }

    @GetMapping("/admin/notice")              // 속성값 게시판 호출
    @ResponseBody()
    public List<PostData> noticeAll(){
        return postService.findAll("공지사항");
    }
    @GetMapping("/admin/complain")              // 속성값 게시판 호출
    @ResponseBody()
    public List<PostData> ComplainPAll(){
        return postService.findAll("불만사항");
    }
    @GetMapping("/admin/broken")              // 속성값 게시판 호출
    @ResponseBody()
    public List<PostData> BrokenAll(){
        return postService.findAll("고장신고");
    }

    @GetMapping("/notice/id")              // 가장 최신 공지사항
    @ResponseBody()
    public PostData noticeLsat(){
        return postService.findLast("공지사항");
    }



}
