package com.nilaapps.alp.dto;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LearningpathDTO {

	private String id;
	private String name;
	private String description;
	private String status;
	private Integer version;
	private CanvasDTO canvas;
	private List<Map<String, Object>> nodes;
	private List<Map<String, Object>> edges;

	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@JsonInclude(JsonInclude.Include.NON_NULL)
	public static class CanvasDTO {
		private Double zoom;
		private Double offsetX;
		private Double offsetY;
	}
}
