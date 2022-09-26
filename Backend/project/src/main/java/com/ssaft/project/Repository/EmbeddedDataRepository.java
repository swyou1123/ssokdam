package com.ssaft.project.Repository;

import com.ssaft.project.domain.EmbeddedData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmbeddedDataRepository extends JpaRepository<EmbeddedData, Integer> {
    public Long countByEmbSta(String data);
}
