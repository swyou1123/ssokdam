package com.ssaft.project.Service;

import com.ssaft.project.Function.Function;
import com.ssaft.project.Repository.CommentDataRepository;
import com.ssaft.project.Repository.IotUserRepository;
import com.ssaft.project.Repository.PostDataRepository;
import com.ssaft.project.domain.CommentData;
import com.ssaft.project.domain.IotUser;
import com.ssaft.project.domain.PostData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CommentService {
    @Autowired
    IotUserRepository iotUserRepository;
    @Autowired
    PostDataRepository postDataRepository;
    @Autowired
    CommentDataRepository commentDataRepository;
    @Autowired
    Function function;
    public Map cmtPush(int pstSeq,String token,CommentData commentData) {
        String id = function.getSubJect(token);
        Map<String, Object> map = new LinkedHashMap<>();
        if(id.equals("토큰만료")){
            map.put("ok", "토큰만료");
            return map;
        }
        Optional<IotUser> user = iotUserRepository.findById(id);
        Optional<PostData> data2 = postDataRepository.findById(pstSeq);
        int cnt;
        try {
            List<CommentData> data = commentDataRepository.findByPostData(data2.get());
            cnt = data.size();
            cnt = cnt + 1;
        }catch (NoSuchElementException e){
            cnt = 1;
        }
        commentData.setIotUser(user.get());
        commentData.setPostData(data2.get());
        commentData.setCmtSub(cnt);
        data2.get().setPstCheck("Y");
        postDataRepository.save(data2.get());
        commentDataRepository.save(commentData);

        map.put("ok", true);
        return map;
    }

    public Map cmtEdit(int pstSeq, int cmtId, CommentData commentData){
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("ok", true);

        Optional<CommentData> commentEdit =  commentDataRepository.findById(cmtId);
        commentEdit.get().setCmtCtnt(commentData.getCmtCtnt());
        commentDataRepository.save(commentEdit.get());

        return map;
    }
    public Map cmtDelete(int pstSeq,int cmtSeq){
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("ok", true);
        Optional<CommentData> commentData = commentDataRepository.findById(cmtSeq);
        Optional<PostData> postData = postDataRepository.findById(pstSeq);
        postData.get().setPstCheck("N");
        postDataRepository.save(postData.get());
        commentDataRepository.delete(commentData.get());
        return map;
    }

    public List<CommentData> CommentAll(int pstSeq){
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("ok", true);
        Optional<PostData> postData = postDataRepository.findById(pstSeq);
        List<CommentData> commentData = commentDataRepository.findByPostData(postData.get());
        for(CommentData CD : commentData){
            CD.setUserId(CD.getIotUser().getUserId());
            CD.setPstSeq(CD.getPostData().getPstSeq());
        }
        return commentData;
    }
}

