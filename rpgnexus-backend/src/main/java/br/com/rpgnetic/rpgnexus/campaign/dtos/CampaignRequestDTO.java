package br.com.rpgnetic.rpgnexus.campaign.dtos;

public class CampaignRequestDTO {
    private String name;
    private String description;
    private String gameSystem;

    public CampaignRequestDTO() {
    }

    public CampaignRequestDTO(String name, String description, String gameSystem) {
        this.name = name;
        this.description = description;
        this.gameSystem = gameSystem;
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
}
