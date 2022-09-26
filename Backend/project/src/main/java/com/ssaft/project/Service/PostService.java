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

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PostService {

    @Autowired
    PostDataRepository postDataRepository;

    @Autowired
    CommentDataRepository commentDataRepository;
    @Autowired
    Function function;

    @Autowired
    IotUserRepository iotUserRepository;

    public List<PostData> findAll(String pstProp){          // 공지사항 전체 리턴
        List<Map<String ,Object>> map = new ArrayList<Map<String, Object>>();
        List<PostData> postData = postDataRepository.findByPstProp(pstProp);
        for(PostData pd : postData){
            pd.setUserId(pd.getIotUser().getUserId());
        }
        return postData;
    }

    public List<PostData> myAsk(String token){                      // 내가 쓴 게시글 리턴
        String id = function.getSubJect(token);
        Optional<IotUser> iotUser =  iotUserRepository.findById(id);
        return postDataRepository.findByIotUser(iotUser.get());
    }

    public Map postPush(String token, PostData postData){            // 게시글 등록
        String id = function.getSubJect(token);
        Map<String, Object> map = new LinkedHashMap<>();
        if(id.equals("토큰만료")){
            map.put("ok", "토큰만료");
            return map;
        }
        Optional<IotUser> iotUser =  iotUserRepository.findById(id);
        postData.setIotUser(iotUser.get());
        postDataRepository.save(postData);
        map.put("ok", true);
        return map;
    }

    public Map postEdit(int pstSeq, PostData postData){   // 게시판 수정
        Map<String , Object> map = new LinkedHashMap<>();
        try {
            Optional<PostData> editPost = postDataRepository.findById(pstSeq);
            editPost.get().setPstTitle(postData.getPstTitle());
            editPost.get().setPstCtnt(postData.getPstCtnt());
            editPost.get().setPstImg(postData.getPstImg());
            postDataRepository.save(editPost.get());
            map.put("ok", true);
        }catch (NoSuchElementException e){
            map.put("ok", false);
        }
        return map;
    }
    public Map postDelete(int pstSeq){                              //게시글 삭제
        Map<String, Object> map = new LinkedHashMap<>();
        try{
            Optional<PostData> postData = postDataRepository.findById(pstSeq);
            List<CommentData> commentDataList = commentDataRepository.findByPostData(postData.get());
            for(CommentData CD : commentDataList){
                commentDataRepository.delete(CD);
            }
            postDataRepository.delete(postData.get());

            map.put("ok", true);
        } catch (NoSuchElementException e){
            map.put("ok", false);
        }
        return map;
    }

    public PostData findLast(String notice){
        PostData postData = postDataRepository.findTopByPstProp(notice);
        System.out.println(postData);
        Map<String, Object> map = new LinkedHashMap<>();
        return postData;
    }
}
