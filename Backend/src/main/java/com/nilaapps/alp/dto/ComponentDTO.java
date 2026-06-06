package com.nilaapps.alp.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ComponentDTO {

	private String id;
	private String title;
	private String shortDescription;
	private String type;
	private Integer approximateDurationMinutes;

	private MetadataDTO metadata;

	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@JsonInclude(JsonInclude.Include.NON_NULL)
	public static class MetadataDTO {
		private AssessmentMetaDTO assessment;
		private UnitMetaDTO unit;
	}

	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class AssessmentMetaDTO {
		private Integer maxScore;
		private Integer passingScore;
	}

	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class UnitMetaDTO {
		private Integer recommendedMinutes;
	}
}
