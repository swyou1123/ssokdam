package com.ssaft.project.Repository;

import com.ssaft.project.domain.IotUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IotUserRepository extends JpaRepository<IotUser, String> {

//    public List<IotUser> findByUser_email(String user_email);

    public List<IotUser> findByUserName(String user_name);

    public IotUser findByUserRt(String token);

    public List<IotUser> findByUserPhone(String phone);

}
