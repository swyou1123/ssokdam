package com.ssaft.project.domain;

import com.ssaft.project.Function.Function;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;

@Table(name = "tb_use")
@Getter @Setter
@Entity
@ToString
@NoArgsConstructor
public class UseData {

    @Id
    @Column(name = "use_cnt")
    private int useCnt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", updatable = false)
    private IotUser iotUser;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "emb_id", updatable = false)
    private EmbeddedData embeddedData;

    @Column(name = "use_check")
    private String useCheck;

    @Column(name = "use_time")
    private String useTime = Function.nowDate();

    @Column(name = "use_dumy")
    private String useDumy = "N";

    @Transient
    private String userId;

    @Transient
    private int embId;
}
