package com.example.financeTracker.controller;

import com.example.financeTracker.dto.ActivationRequestDTO;
import com.example.financeTracker.dto.ActivationRequestResponse;
import com.example.financeTracker.service.ActivationRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/requests")
public class ActivationRequestController {

    @Autowired
    private ActivationRequestService activationRequestService;

    @PostMapping("/send")
    public ResponseEntity<String> sendRequest(@RequestBody ActivationRequestDTO dto) {
        return ResponseEntity.ok(activationRequestService.sendRequest(dto.getUserId(), dto.getMessage()));
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getPendingCount() {
        return ResponseEntity.ok(Map.of("count", activationRequestService.getPendingCount()));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ActivationRequestResponse>> getAllRequests() {
        return ResponseEntity.ok(activationRequestService.getAllRequests());
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<String> activateUser(@PathVariable Long id) {
        return ResponseEntity.ok(activationRequestService.activateUserFromRequest(id));
    }

    @PutMapping("/{id}/ignore")
    public ResponseEntity<String> ignoreRequest(@PathVariable Long id) {
        return ResponseEntity.ok(activationRequestService.ignoreRequest(id));
    }
}
