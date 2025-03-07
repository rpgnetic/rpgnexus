package br.com.rpgnetic.rpgnexus.campaign.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.rpgnetic.rpgnexus.campaign.entities.Campaign;
import br.com.rpgnetic.rpgnexus.campaign.entities.CampaignMember;
import java.util.List;


@Repository
public interface CampaignMemberRepository extends JpaRepository<CampaignMember, Long> {
    List<CampaignMember> findByCampaign(Campaign campaign);
}
