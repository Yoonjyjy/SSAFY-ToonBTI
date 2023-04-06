package com.ssafy.toonbti.webtoon.model.entity;

import com.ssafy.toonbti.user.model.entity.User;
import com.ssafy.toonbti.webtoon.model.entity.Webtoon;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "userwebtoon")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserWebtoon {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="webtoon_id")
    private Webtoon webtoon;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
