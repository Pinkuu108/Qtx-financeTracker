package com.example.financeTracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.financeTracker.dto.TransactionRequest;
import com.example.financeTracker.entity.User;
import com.example.financeTracker.service.TransactionService;

@RestController
public class TransactionController {

	@Autowired
	private TransactionService transactionService;

	@PostMapping("/save")
	public String saveTransaction(@RequestBody TransactionRequest request) {

		User user = new User();
		user.setId(1);
		return transactionService.saveTransaction(request, user);
	}

}
