package com.ems.repository;

import com.ems.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {

    List<Event> findByEventDateBetween(LocalDate start, LocalDate end);

    Page<Event> findByEventType(Event.EventType type, Pageable pageable);
}
