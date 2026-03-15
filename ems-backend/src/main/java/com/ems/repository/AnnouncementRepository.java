package com.ems.repository;

import com.ems.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, UUID> {

    @Query("SELECT a FROM Announcement a WHERE a.expiresAt IS NULL OR a.expiresAt > :now ORDER BY a.createdAt DESC")
    List<Announcement> findActiveAnnouncements(LocalDateTime now);
}
