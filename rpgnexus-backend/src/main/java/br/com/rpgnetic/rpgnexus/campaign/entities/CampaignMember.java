package br.com.rpgnetic.rpgnexus.campaign.entities;

import java.time.LocalDateTime;

import br.com.rpgnetic.rpgnexus.auth.entities.User;
import br.com.rpgnetic.rpgnexus.campaign.enums.MemberRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "campaign_members",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"campaign_id", "user_id"}
    )
)
public class CampaignMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "campaign_member_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id", nullable = false)
    private Campaign campaign;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "member_role")
    private MemberRole memberRole;

    @Column(nullable = false, name = "joined_at")
    private LocalDateTime joinedAt;

    public CampaignMember() {
        this.joinedAt = LocalDateTime.now();
        this.memberRole = MemberRole.PLAYER;

    }

    public CampaignMember(Campaign campaign, User user) {
        this();
        this.campaign = campaign;
        this.user = user;
    }

    public CampaignMember(Campaign campaign, User user, MemberRole memberRole) {
        this();
        this.campaign = campaign;
        this.user = user;
        this.memberRole = memberRole;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Campaign getCampaign() {
        return campaign;
    }

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }

    public MemberRole getMemberRole() {
        return memberRole;
    }

    public void setMemberRole(MemberRole memberRole) {
        this.memberRole = memberRole;
    }
}
