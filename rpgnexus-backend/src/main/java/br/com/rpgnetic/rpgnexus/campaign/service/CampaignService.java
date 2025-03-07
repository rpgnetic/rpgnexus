package br.com.rpgnetic.rpgnexus.campaign.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.rpgnetic.rpgnexus.auth.entities.User;
import br.com.rpgnetic.rpgnexus.campaign.entities.Campaign;
import br.com.rpgnetic.rpgnexus.campaign.entities.CampaignMember;
import br.com.rpgnetic.rpgnexus.campaign.enums.MemberRole;
import br.com.rpgnetic.rpgnexus.campaign.repository.CampaignMemberRepository;
import br.com.rpgnetic.rpgnexus.campaign.repository.CampaignRepository;

@Service
public class CampaignService {
    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private CampaignMemberRepository campaignMemberRepository;

    public Campaign createCampaign(Campaign campaign, User user) {
        campaign = campaignRepository.save(campaign);
        CampaignMember campaignMember = new CampaignMember(campaign, user, MemberRole.GAMEMASTER);
        campaignMemberRepository.save(campaignMember);
        return campaign;
    }

    public List<Campaign> getCampaignList(User user) {
        return campaignRepository.findByOwner(user);
    }

    public Campaign getCampaignById(UUID campaignId) {
        return campaignRepository.findById(campaignId).get();
    }

    public List<CampaignMember> getCampaignMemberList(Campaign campaign) {
        return campaignMemberRepository.findByCampaign(campaign);
    }
}
