package com.example.financeTracker.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "User-Transaction")
public class UserTransaction {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	private double amount;

	private LocalDateTime transdate;

	private String transDetailes;
	@Enumerated(EnumType.STRING)
	private TransactionType type;

	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public LocalDateTime getTransdate() {
		return transdate;
	}

	public void setTransdate(LocalDateTime transdate) {
		this.transdate = transdate;
	}

	public String getTransDetailes() {
		return transDetailes;
	}

	public void setTransDetailes(String transDetailes) {
		this.transDetailes = transDetailes;
	}
	
	public TransactionType getType() {
	    return type;
	}

	public void setType(TransactionType type) {
	    this.type = type;
	}

	public Category getCategory() {
	    return category;
	}

	public void setCategory(Category category) {
	    this.category = category;
	}

}
