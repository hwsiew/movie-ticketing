package com.ocbcinema.ticketing.slot;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class SlotService {

    private final SlotDAO slotDAO;

    public Slot findById(final String slotId){
        return slotDAO.findById(slotId);
    }
}
