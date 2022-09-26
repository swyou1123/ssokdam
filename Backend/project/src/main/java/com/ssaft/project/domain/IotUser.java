package com.ssaft.project.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name = "tb_user")
@Getter @Setter
@ToString
@Entity
@NoArgsConstructor
public class IotUser {

    @Id
    @Column(name = "user_id")
    private String userId;

    @Column(name = "user_pwd")
    private String userPwd;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_phone")
    private String userPhone;

    @Column(name = "user_birth_day")
    private String userBirthDay;

    @Column(name = "user_account")
    private String userAccount;

    @Column(name = "user_banknumber")
    @ColumnDefault("")
    private String userBanknumber;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_img")
    @ColumnDefault("")
    private String userImg = "https://firebasestorage.googleapis.com/v0/b/ssokdam-e2b32.appspot.com/o/images%2Ftest%2F1.jpg?alt=media&token=fba8fbf4-82e5-4e06-953e-9ecf16866bb3";

    @Column(name = "user_admin")
    private String userAdmin = "N";

    @Column(name = "user_point")
    @ColumnDefault("0")
    private int userPoint;

    @Column(name = "user_cnt")
    @ColumnDefault("0")
    private int userCnt;

    @Column(name = "user_health")
    @ColumnDefault("")
    private String userHealth;

    @Column(name = "user_time")
    @ColumnDefault("")
    private String userTime = "2022-01-01 00:00:00";

    @Column(name = "user_rt")
    @ColumnDefault("")
    private String userRt;


    @Column(name = "user_dumy")
    @ColumnDefault("")
    private String userDumy;

    @Transient
    private String imp_uid;

    @Transient
    private String Access_token;

    @Transient
    private String Refresh_token;

    @Transient
    private String notCheck;

    @Transient
    private boolean ok;

   /* @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private List<PostData> postDataList = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private List<UseData> useData = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private List<EmbeddedData> embeddedData = new ArrayList<>();*/
}
