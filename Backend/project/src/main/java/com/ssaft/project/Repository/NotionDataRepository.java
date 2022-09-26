package com.ssaft.project.Repository;

import com.ssaft.project.domain.IotUser;
import com.ssaft.project.domain.NotionData;
import org.aspectj.weaver.ast.Not;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotionDataRepository extends JpaRepository<NotionData, String> {

    public List<NotionData> findByIotUser(IotUser id);

    public List<NotionData> findByNotCheckAndIotUser(String check, IotUser iotUser);
}
