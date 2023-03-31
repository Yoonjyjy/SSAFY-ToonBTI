package com.ssafy.toonbti.user.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "usernbti")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserNbti {
    @Id
    @Column(name = "user_nbti_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userNbtiId;
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "nbti_id")
    private Nbti nbti;
}
