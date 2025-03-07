package br.com.rpgnetic.rpgnexus.campaign.dtos;

import java.time.LocalDateTime;

public class UserMemberResponseDTO {
    String name;
    String username;
    LocalDateTime joinedAt;
    String memberRole;

    public UserMemberResponseDTO() {
    }

    public UserMemberResponseDTO(String name, String username,
            LocalDateTime joinedAt, String memberRole) {
        this.name = name;
        this.username = username;
        this.joinedAt = joinedAt;
        this.memberRole = memberRole;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getMemberRole() {
        return memberRole;
    }
    public void setMemberRole(String memberRole) {
        this.memberRole = memberRole;
    }
    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }
}
