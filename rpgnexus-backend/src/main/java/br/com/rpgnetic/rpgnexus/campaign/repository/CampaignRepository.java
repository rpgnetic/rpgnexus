package br.com.rpgnetic.rpgnexus.campaign.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.rpgnetic.rpgnexus.campaign.entities.Campaign;
import java.util.List;
import br.com.rpgnetic.rpgnexus.auth.entities.User;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, UUID> {
    List<Campaign> findByOwner(User owner);
}
