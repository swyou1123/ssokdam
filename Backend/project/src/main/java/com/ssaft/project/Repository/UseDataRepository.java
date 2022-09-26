package com.ssaft.project.Repository;

import com.ssaft.project.domain.IotUser;
import com.ssaft.project.domain.UseData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UseDataRepository extends JpaRepository<UseData, Integer> {

    public UseData findByIotUserAndUseDumy(IotUser id, String dumy);
}
