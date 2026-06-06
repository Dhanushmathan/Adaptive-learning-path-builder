package com.nilaapps.alp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "components")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComponentEntity {

	@Id
	@Column(nullable = false, unique = true, length = 100)
	private String id;

	@Column(nullable = false, length = 150)
	private String title;

	@Column(nullable = false, length = 280)
	private String shortDescription;

	@Column(nullable = false, length = 20)
	private String type;

	@Column(nullable = false)
	private Integer approximateDurationMinutes;

	private Integer maxScore;
	private Integer passingScore;

	private Integer recommendedMinutes;

}
