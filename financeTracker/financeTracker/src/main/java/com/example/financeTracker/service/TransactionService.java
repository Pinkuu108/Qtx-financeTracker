package com.example.financeTracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.financeTracker.dto.TransactionRequest;
import com.example.financeTracker.entity.User;
import com.example.financeTracker.entity.UserTransaction;
import com.example.financeTracker.repository.TransactionRepository;
@Service
public class TransactionService {

	@Autowired
	private TransactionRepository transactionRepository;

	public String saveTransaction(TransactionRequest request, User user) {

		UserTransaction transaction = new UserTransaction();
		transaction.setUser(user);
		transaction.setAmount(request.getAmount());
		transaction.setTransdate(request.getTransdate());
		transaction.setTransDetailes(request.getTransDetailes());
		transactionRepository.save(transaction);

		return "Transaction Sucessfull";

	}

}
