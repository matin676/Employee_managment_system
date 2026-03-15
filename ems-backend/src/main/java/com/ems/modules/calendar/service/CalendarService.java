package com.ems.modules.calendar.service;

import com.ems.modules.calendar.dto.response.CalendarEventResponse;
import com.ems.entity.Leave;
import com.ems.entity.Leave.LeaveStatus;
import com.ems.entity.Project;
import com.ems.entity.Project.ProjectStatus;
import com.ems.repository.LeaveRepository;
import com.ems.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarService {

        private final LeaveRepository leaveRepository;
        private final ProjectRepository projectRepository;

        @Transactional(readOnly = true)
        public List<CalendarEventResponse> getEvents(LocalDate start, LocalDate end) {
                List<CalendarEventResponse> events = new ArrayList<>();

                // Fetch Approved Leaves
                List<Leave> leaves = leaveRepository.findByStatusAndEndDateGreaterThanEqualAndStartDateLessThanEqual(
                                LeaveStatus.APPROVED, start, end);

                events.addAll(leaves.stream()
                                .map(this::mapLeaveToEvent)
                                .collect(Collectors.toList()));

                // Fetch Active Projects with Deadlines
                List<Project> projects = projectRepository.findByStatusAndDueDateBetween(
                                ProjectStatus.IN_PROGRESS, start, end);

                events.addAll(projects.stream()
                                .map(this::mapProjectToEvent)
                                .collect(Collectors.toList()));

                return events;
        }

        private CalendarEventResponse mapLeaveToEvent(Leave leave) {
                return CalendarEventResponse.builder()
                                .id(leave.getId().toString())
                                .title(leave.getEmployee().getFirstName() + " " + leave.getEmployee().getLastName()
                                                + " - "
                                                + leave.getLeaveType())
                                .type("LEAVE")
                                .start(leave.getStartDate())
                                .end(leave.getEndDate().plusDays(1)) // FullCalendar expects exclusive end date for
                                                                     // all-day events
                                .color("#EF4444") // Red for leaves (absent)
                                .description("Reason: " + leave.getReason())
                                .build();
        }

        private CalendarEventResponse mapProjectToEvent(Project project) {
                return CalendarEventResponse.builder()
                                .id(project.getId().toString())
                                .title("Deadline: " + project.getName())
                                .type("PROJECT")
                                .start(project.getDueDate())
                                .end(project.getDueDate()) // Single day event
                                .color("#3B82F6") // Blue for projects
                                .description(project.getDescription())
                                .build();
        }
}
