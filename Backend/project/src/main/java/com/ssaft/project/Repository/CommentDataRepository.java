package com.ssaft.project.Repository;

import com.ssaft.project.domain.CommentData;
import com.ssaft.project.domain.PostData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CommentDataRepository extends JpaRepository<CommentData, Integer> {
    public List<CommentData> findByPostData(PostData data);
}
