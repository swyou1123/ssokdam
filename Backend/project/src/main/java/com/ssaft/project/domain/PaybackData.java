package com.ssaft.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssaft.project.Function.Function;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Table(name = "tb_payback")
@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class PaybackData {
    @Id
    @Column(name = "pb_seq")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int pbSeq;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", updatable = false)
    @JsonIgnore
    private IotUser iotUser;

    @Column(name = "pb_dt")
    private String pbDt = Function.nowDate();

    @Column(name = "pb_check")
    private String pbCheck = "N";

    @Column(name = "pb_money")
    private int pbMoney;

    @Transient
    private String userId;
}