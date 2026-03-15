package com.ems.modules.calendar.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class CalendarEventResponse {
    private String id;
    private String title;
    private String type; // LEAVE, PROJECT, HOLIDAY
    private LocalDate start;
    private LocalDate end;
    private String color; // hex code or tailwind class
    private String description;
}
