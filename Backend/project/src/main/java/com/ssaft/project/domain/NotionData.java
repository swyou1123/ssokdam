package com.ssaft.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssaft.project.Function.Function;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Table(name = "tb_notion")
@Getter @Setter
@ToString
@NoArgsConstructor
@Entity
public class NotionData {
    @Id
    @Column(name = "not_seq")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int notSeq;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", updatable = false)
    @JsonIgnore
    private IotUser iotUser;

    @Column(name = "not_dt")
    private String notDt = Function.nowDate();

    @Column(name = "not_ctnt")
    private String notCtnt;

    @Column(name = "not_money")
    private int notMoney;

    @Column(name = "not_check")
    private String notCheck = "N";

    @Transient
    private String userId;
}
