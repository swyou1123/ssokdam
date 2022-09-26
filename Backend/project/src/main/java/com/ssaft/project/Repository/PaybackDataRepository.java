package com.ssaft.project.Repository;

import com.ssaft.project.domain.IotUser;
import com.ssaft.project.domain.PaybackData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaybackDataRepository extends JpaRepository<PaybackData, Integer> {

    public List<PaybackData> findByPbCheck(String YorN);
}
