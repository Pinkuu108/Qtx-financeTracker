package com.example.financeTracker.service;

import com.example.financeTracker.dto.ActivationRequestResponse;
import com.example.financeTracker.entity.ActivationRequest;
import com.example.financeTracker.entity.RequestStatus;
import com.example.financeTracker.entity.User;
import com.example.financeTracker.repository.ActivationRequestRepository;
import com.example.financeTracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivationRequestService {

    @Autowired
    private ActivationRequestRepository activationRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public String sendRequest(Long userId, String message) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (activationRequestRepository.existsByUserAndStatus(user, RequestStatus.PENDING)) {
            return "Request already sent";
        }

        ActivationRequest request = new ActivationRequest();
        request.setUser(user);
        request.setMessage(message);
        request.setStatus(RequestStatus.PENDING);
        activationRequestRepository.save(request);

        return "Request sent successfully";
    }

    public long getPendingCount() {
        return activationRequestRepository.countByStatus(RequestStatus.PENDING);
    }

    public List<ActivationRequestResponse> getAllRequests() {
       
        return activationRequestRepository.findAllByStatusOrderByCreatedAtDesc(RequestStatus.PENDING)
                .stream()
                .map(r -> new ActivationRequestResponse(
                        r.getId(),
                        r.getUser().getId(),
                        r.getUser().getEmail(),
                        r.getUser().getFullName(),
                        r.getMessage(),
                        r.getStatus().name(),
                        r.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public String activateUserFromRequest(Long requestId) {
        ActivationRequest request = activationRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        User user = request.getUser();
        user.setActive(true);
        userRepository.save(user);

        request.setStatus(RequestStatus.ACTIVATED);
        activationRequestRepository.save(request);

        return "User activated successfully";
    }

    public String ignoreRequest(Long requestId) {
        ActivationRequest request = activationRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(RequestStatus.IGNORED);
        activationRequestRepository.save(request);

        return "Request ignored";
    }
}