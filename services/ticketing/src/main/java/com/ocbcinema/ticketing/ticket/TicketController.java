package com.ocbcinema.ticketing.ticket;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/ticket")
public class TicketController {

    private final TicketRepository ticketRepository;

    @GetMapping(path = "/{userId}")
    public List<Ticket> getUserTickets (@PathVariable final String userId) {
        return ticketRepository.findByBookedBy(userId);
    }
}
