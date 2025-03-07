package br.com.rpgnetic.rpgnexus.campaign.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.rpgnetic.rpgnexus.campaign.entities.Campaign;
import br.com.rpgnetic.rpgnexus.campaign.repository.CampaignRepository;

@Service
public class CampaignService {
    @Autowired
    private CampaignRepository campaignRepository;

    public Campaign createCampaign(Campaign campaign) {
        return campaignRepository.save(campaign);
    }
}
