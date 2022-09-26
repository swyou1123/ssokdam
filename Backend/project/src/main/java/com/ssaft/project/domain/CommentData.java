package com.ssaft.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssaft.project.Function.Function;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;

import java.util.Date;

@Table(name = "tb_comment")
@Getter @Setter
@Entity
@NoArgsConstructor
@ToString
public class CommentData {

    @Id
    @Column(name = "cmt_seq")
    private int cmtSeq;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "pst_seq", updatable = false)
    @JsonIgnore
    private PostData postData;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", updatable = false)
    @JsonIgnore
    private IotUser iotUser;

    @Column(name = "cmt_sub")
    private int cmtSub = 0;

    @Column(name = "cmt_dt")
    private String cmtDt = Function.nowDate();

    @Column(name = "cmt_ctnt")
    private String cmtCtnt;

    @Column(name = "cmt_dumy")
    private String vDumy;

    @Transient
    private int pstSeq;

    @Transient
    private String userId;
}
