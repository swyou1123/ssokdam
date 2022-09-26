package com.ssaft.project.controller;

import com.ssaft.project.Function.Function;
import com.ssaft.project.Repository.CommentDataRepository;
import com.ssaft.project.Repository.IotUserRepository;
import com.ssaft.project.Repository.PostDataRepository;
import com.ssaft.project.Service.CommentService;
import com.ssaft.project.domain.CommentData;
import com.ssaft.project.domain.IotUser;
import com.ssaft.project.domain.PostData;
import org.hibernate.type.CharacterNCharType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    CommentDataRepository commentDataRepository;

    @Autowired
    IotUserRepository iotUserRepository;
    @Autowired
    PostDataRepository postDataRepository;

    @Autowired
    CommentService commentService;

    @PostMapping("/post/{pstSeq}/comment")                      //답변 생성
    @ResponseBody
    public Map cmtPush(@PathVariable("pstSeq") int pstSeq, @RequestBody CommentData commentData, @RequestHeader String token){
        return commentService.cmtPush(pstSeq, token, commentData);
    }

    @PutMapping("/post/{pstSeq}/comment/{cmtId}")               // 답변 수정
    @ResponseBody
    public Map cmtEdit(@PathVariable("pstSeq") int pstSeq, @PathVariable("cmtId") int cmtId, @RequestBody CommentData commentData){
        return commentService.cmtEdit(pstSeq, cmtId, commentData);
    }

    @DeleteMapping("/post/{pstSeq}/comment/{cmtId}")                     // 답변 삭제
    @ResponseBody
    public Map cmtDelete(@PathVariable("pstSeq") int pstSeq, @PathVariable("cmtId") int cmtId){
        return commentService.cmtDelete(pstSeq, cmtId);
    }

    @GetMapping("/admin/complain/{id}")              // 속성값 게시판 호출
    @ResponseBody()
    public List<CommentData> ComplainComment(@PathVariable("id") int pstSeq){
        return commentService.CommentAll(pstSeq);
    }
    @GetMapping("/admin/broken/{id}")              // 속성값 게시판 호출
    @ResponseBody()
    public List<CommentData> BrokenComment(@PathVariable("id") int pstSeq){
        return commentService.CommentAll(pstSeq);
    }

    @GetMapping("/hi")              // 속성값 게시판 호출
    @ResponseBody()
    public String gigigi(){
        return Function.nowDate();
    }

}
