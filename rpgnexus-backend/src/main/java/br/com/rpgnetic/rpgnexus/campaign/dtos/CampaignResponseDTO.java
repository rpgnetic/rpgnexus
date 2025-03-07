package br.com.rpgnetic.rpgnexus.campaign.dtos;

import java.util.UUID;

public class CampaignResponseDTO {
    private UUID campaignId;
    private String name;
    private String description;
    private String gameSystem;
    private String inviteCode;
    
    public CampaignResponseDTO() {
    }
    
    public CampaignResponseDTO(UUID campaignId, String name, String description, String gameSystem, String inviteCode) {
        this.campaignId = campaignId;
        this.name = name;
        this.description = description;
        this.gameSystem = gameSystem;
        this.inviteCode = inviteCode;
    }

    public UUID getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(UUID campaignId) {
        this.campaignId = campaignId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGameSystem() {
        return gameSystem;
    }

    public void setGameSystem(String gameSystem) {
        this.gameSystem = gameSystem;
    }

    public String getInviteCode() {
        return inviteCode;
    }

    public void setInviteCode(String inviteCode) {
        this.inviteCode = inviteCode;
    }
}
