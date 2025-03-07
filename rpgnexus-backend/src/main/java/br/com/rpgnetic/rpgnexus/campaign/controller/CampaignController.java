package br.com.rpgnetic.rpgnexus.campaign.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.rpgnetic.rpgnexus.auth.entities.User;
import br.com.rpgnetic.rpgnexus.campaign.dtos.CampaignRequestDTO;
import br.com.rpgnetic.rpgnexus.campaign.dtos.CampaignResponseDTO;
import br.com.rpgnetic.rpgnexus.campaign.entities.Campaign;
import br.com.rpgnetic.rpgnexus.campaign.enums.GameSystem;
import br.com.rpgnetic.rpgnexus.campaign.service.CampaignService;

@RestController
@RequestMapping("/api/v1/campaign")
public class CampaignController {
    @Autowired
    public CampaignService campaignService;

    @GetMapping
    public ResponseEntity<List<CampaignResponseDTO>> getCampaignList(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<Campaign> campaignList = campaignService.getCampaignList(user);
        List<CampaignResponseDTO> campaignListDto = campaignList.stream()
                .map(campaign -> {
                    String gameSystem = campaign.getGameSystem().label;
                    return new CampaignResponseDTO(campaign.getCampaignId(),
                            campaign.getName(), campaign.getDescription(),
                            gameSystem, campaign.getInviteCode());
                }).collect(Collectors.toList());
        return ResponseEntity.ok(campaignListDto);
    }

    @PostMapping
    public ResponseEntity<Void> createCampaign(@RequestBody CampaignRequestDTO campaignDTO,
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
                .buildAndExpand(campaignModel.getCampaignId())
                .toUri()
        ).build();
    }
}
