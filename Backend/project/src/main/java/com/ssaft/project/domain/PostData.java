package com.ssaft.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssaft.project.Function.Function;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name = "tb_post")
@Getter @Setter
@Entity
@ToString
@NoArgsConstructor
public class PostData {

    @Id
    @Column(name = "pst_seq")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int pstSeq;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", updatable = false)
    @JsonIgnore
    private IotUser iotUser;

    @CreatedDate
    @Column(name = "pst_dt")
    private String pstDt = Function.nowDate();

    @Column(name = "pst_title")
    private String pstTitle;

    @Column(name = "pst_ctnt")
    private String pstCtnt;

    @Column(name = "pst_prop")
    private String pstProp;

    @Column(name = "pst_check")
    private String pstCheck = "N";

    @Column(name = "pst_img")
    private String pstImg;

    @Column(name = "pst_dumy")
    private String pstDumy;

//    @OneToMany(fetch = FetchType.LAZY)
//    @JoinColumn(name = "pst_seq")
//    private List<PostData> postDataList = new ArrayList<>();

    @Transient
    private String userId;

    @Transient
    private MultipartFile file;

    @Transient
    private MultipartFile fromData;

}
