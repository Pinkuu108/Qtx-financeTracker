package com.example.financeTracker.repository;

import com.example.financeTracker.entity.ActivationRequest;
import com.example.financeTracker.entity.RequestStatus;
import com.example.financeTracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivationRequestRepository extends JpaRepository<ActivationRequest, Long> {

    List<ActivationRequest> findByUser(User user);

    List<ActivationRequest> findByStatusOrderByCreatedAtDesc(RequestStatus status);

    List<ActivationRequest> findAllByOrderByCreatedAtDesc();

    long countByStatus(RequestStatus status);

    boolean existsByUserAndStatus(User user, RequestStatus status);
    List<ActivationRequest> findAllByStatusOrderByCreatedAtDesc(RequestStatus status);
}
