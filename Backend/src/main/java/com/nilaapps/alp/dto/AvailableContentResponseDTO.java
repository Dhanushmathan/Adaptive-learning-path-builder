package com.nilaapps.alp.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AvailableContentResponseDTO {
	private List<ComponentDTO> items;
	private Integer totalCount;
}