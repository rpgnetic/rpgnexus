package br.com.rpgnetic.rpgnexus.campaign.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.rpgnetic.rpgnexus.auth.entities.User;
import br.com.rpgnetic.rpgnexus.campaign.dtos.CreateCampaignRequestDTO;
import br.com.rpgnetic.rpgnexus.campaign.entities.Campaign;
import br.com.rpgnetic.rpgnexus.campaign.enums.GameSystem;
import br.com.rpgnetic.rpgnexus.campaign.service.CampaignService;

@RestController
@RequestMapping("/api/v1/campaign")
public class CampaignController {
    @Autowired
    public CampaignService campaignService;

    @PostMapping
    public ResponseEntity<Void> createCampaign(@RequestBody CreateCampaignRequestDTO campaignDTO,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        GameSystem gameSystem = GameSystem.valueOf(campaignDTO.getGameSystem());
        Campaign campaignModel = new Campaign(campaignDTO.getName(),
                campaignDTO.getDescription(), gameSystem, user);

        campaignModel = campaignService.createCampaign(campaignModel);

        return ResponseEntity.created(
            ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(campaignModel)
                .toUri()
        ).build();
    }
}
