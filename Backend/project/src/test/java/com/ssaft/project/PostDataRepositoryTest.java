package com.ssaft.project;

import com.ssaft.project.Function.Function;
import com.ssaft.project.Repository.IotUserRepository;
import com.ssaft.project.Repository.PostDataRepository;
import com.ssaft.project.Service.PostService;
import com.ssaft.project.domain.PostData;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.fail;

@SpringBootTest
@Commit
public class PostDataRepositoryTest {
    @Autowired
    PostService postService;
    @Autowired
    PostDataRepository postDataRepository;
    @Autowired
    IotUserRepository iotUserRepository;
    @Autowired
    Function function;

    @Test
    public void 게시글등록및삭제테스트(){
        PostData postData = new PostData();

        postData.setIotUser(iotUserRepository.findById("admin").get());
        postData.setPstTitle("test title 내용입니다.!!!");
        postData.setPstCtnt("test ctnt 내용입니다.");
        postData.setPstProp("공지사항");
        postService.postPush(function.creatToken("admin", (1*1000*60)),postData);

        postService.postDelete(postData.getPstSeq());
    }

    @Test
    public void 게시글수정테스트(){
        PostData postData = new PostData();
        postData.setIotUser(iotUserRepository.findById("admin").get());
        postData.setPstTitle("test title 내용입니다.!!!");
        postData.setPstCtnt("test ctnt 내용입니다.");
        postData.setPstProp("공지사항");
        postService.postPush(function.creatToken("admin", (1*1000*60)),postData);
        postData.setPstImg("수정이미지 테스트");
        postData.setPstTitle("수정타이틀 테스트");
        postData.setPstCtnt("수정내용 테스트");
        postService.postEdit(postData.getPstSeq(), postData);

        Optional<PostData> editData = postDataRepository.findById(postData.getPstSeq());
        if(editData.get().getPstCtnt().equals("수정내용 테스트")
                && editData.get().getPstTitle().equals("수정타이틀 테스트")
                && editData.get().getPstImg().equals("수정이미지 테스트")){
            postService.postDelete(postData.getPstSeq());
        }else{
            fail();
        }
    }

    @Test
    public void 각각속성게시판호출(){
        List<PostData> postData = postService.findAll("공지사항");
        for(PostData pD : postData){
            if(pD.getPstProp().equals("공지사항")){
            }else{
                fail();
            }
        }
        postData = postService.findAll("불만사항");
        for(PostData pD : postData){
            if(pD.getPstProp().equals("불만사항")){
            }else{
                fail();
            }
        }
        postData = postService.findAll("고장신고");
        for(PostData pD : postData){
            if(pD.getPstProp().equals("고장신고")){
            }else{
                fail();
            }
        }
    }
}
