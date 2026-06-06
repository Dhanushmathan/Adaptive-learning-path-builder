package com.nilaapps.alp.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "learning_paths")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearningpathEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@Column(nullable = false, length = 150)
	private String name;

	@Column(length = 1000, nullable = true)
	private String description;

	@Column(nullable = false, length = 20)
	private String status;

	@Column(nullable = false)
	@Builder.Default
	private Integer version = 1;

	@Column(columnDefinition = "TEXT", nullable = false)
	private String nodesJson;

	@Column(columnDefinition = "TEXT", nullable = false)
	private String edgesJson;

	private Double canvasZoom;
	private Double canvasOffsetX;
	private Double canvasOffsetY;

	@CreationTimestamp
	private LocalDateTime createdAt;

	@UpdateTimestamp
	private LocalDateTime updatedAt;
}
