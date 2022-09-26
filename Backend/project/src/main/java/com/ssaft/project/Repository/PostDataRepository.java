package com.ssaft.project.Repository;

import com.ssaft.project.domain.IotUser;
import com.ssaft.project.domain.NotionData;
import com.ssaft.project.domain.PostData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PostDataRepository  extends JpaRepository<PostData, Integer> {

    public List<PostData> findByPstProp(String pstProp);


    public List<PostData> findByIotUser(IotUser id);

    public PostData findTopByPstProp(String prop);

}
