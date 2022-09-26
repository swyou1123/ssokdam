package com.ssaft.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Table(name = "tb_embedded")
@Getter @Setter
@Entity
@ToString
@NoArgsConstructor
public class EmbeddedData {
    @Id
    @Column(name = "emb_id")
    private int embId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private IotUser iotUser;

    @Column(name = "emb_full_tra")
    private int embFullTra;

    @Column(name = "emb_full_cig")
    private int embFullCig;

    @Column(name = "emb_lat")
    private String embLat;

    @Column(name = "emb_Lng")
    private String embLng;

    @Column(name = "emb_bat")
    private int embBat;

    @Column(name = "emb_cnt")
    private String embCnt;

    @Column(name = "emb_sta")
    @ColumnDefault("N")
    private String embSta;

    @Column(name = "emb_dumy")
    private String embDumy;

    @Column(name = "emb_qr")
    @ColumnDefault("N")
    private String embQr;

//    @OneToMany(fetch = FetchType.LAZY)
//    @JoinColumn(name = "emb_id")
//    private List<UseData> useData = new ArrayList<>();

    @Transient
    private String userId;

    @Transient
    private String token;

}
