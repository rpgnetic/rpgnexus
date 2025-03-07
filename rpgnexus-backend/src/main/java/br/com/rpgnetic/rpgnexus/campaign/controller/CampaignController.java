package br.com.rpgnetic.rpgnexus.campaign.controller;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.rpgnetic.rpgnexus.auth.entities.User;
import br.com.rpgnetic.rpgnexus.auth.services.UserService;
import br.com.rpgnetic.rpgnexus.campaign.dtos.CampaignRequestDTO;
import br.com.rpgnetic.rpgnexus.campaign.dtos.CampaignResponseDTO;
import br.com.rpgnetic.rpgnexus.campaign.dtos.UserMemberResponseDTO;
import br.com.rpgnetic.rpgnexus.campaign.entities.Campaign;
import br.com.rpgnetic.rpgnexus.campaign.entities.CampaignMember;
import br.com.rpgnetic.rpgnexus.campaign.enums.GameSystem;
import br.com.rpgnetic.rpgnexus.campaign.service.CampaignService;

@RestController
@RequestMapping("/api/v1/campaign")
public class CampaignController {
    @Autowired
    public CampaignService campaignService;

    @Autowired
    public UserService userService;

    @PostMapping("/join/{inviteCode}")
    public ResponseEntity<Void> joinCampaign(@PathVariable String inviteCode, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Campaign campaign = campaignService.getCampaignByInviteCode(inviteCode);
        campaignService.addUserToCampaign(campaign, user);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/members/{campaignId}")
    public ResponseEntity<List<UserMemberResponseDTO>> getMemberList(@PathVariable UUID campaignId) {
        Campaign campaign = campaignService.getCampaignById(campaignId);
        List<CampaignMember> campaignMembersList = campaignService.getCampaignMemberList(campaign);
        List<UserMemberResponseDTO> userMemberResponse = campaignMembersList.stream()
                .map(userMember -> {
                    User user = userMember.getUser();
                    
                    return new UserMemberResponseDTO(user.getName(),
                        user.getUsername(), userMember.getJoinedAt(),
                        userMember.getMemberRole().name());
                }).collect(Collectors.toList());
        return ResponseEntity.ok(userMemberResponse);
    }
    

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

        campaignModel = campaignService.createCampaign(campaignModel, user);

        return ResponseEntity.created(
            ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(campaignModel.getCampaignId())
                .toUri()
        ).build();
    }
}
