package com.nilaapps.alp.service;

import com.nilaapps.alp.dto.AvailableContentResponseDTO;
import com.nilaapps.alp.dto.ComponentDTO;
import com.nilaapps.alp.model.ComponentEntity;
import com.nilaapps.alp.repository.ComponentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ComponentService {

	private final ComponentRepository componentRepository;

	public AvailableContentResponseDTO getAllComponents() {
		List<ComponentEntity> components = componentRepository.findAll();
		System.out.println("DEBUG: Found " + components.size() + " components in DB");

		List<ComponentDTO> dtos = new ArrayList<>();
		for (ComponentEntity c : components) {
			try {
				ComponentDTO dto = toDTO(c);
				dtos.add(dto);
				System.out.println("DEBUG: Mapped -> " + dto.getId() + " | " + dto.getTitle());
			} catch (Exception e) {
				System.err.println("ERROR mapping component " + c.getId() + ": " + e.getMessage());
				e.printStackTrace();
			}
		}

		System.out.println("DEBUG: Returning " + dtos.size() + " DTOs");
		return AvailableContentResponseDTO.builder().items(dtos).totalCount(dtos.size()).build();
	}

	private ComponentDTO toDTO(ComponentEntity c) {
		ComponentDTO.MetadataDTO metadata = null;

		if ("assessment".equals(c.getType()) && c.getMaxScore() != null) {
			metadata = ComponentDTO.MetadataDTO.builder().assessment(ComponentDTO.AssessmentMetaDTO.builder()
					.maxScore(c.getMaxScore()).passingScore(c.getPassingScore()).build()).build();
		} else if ("unit".equals(c.getType()) && c.getRecommendedMinutes() != null) {
			metadata = ComponentDTO.MetadataDTO.builder()
					.unit(ComponentDTO.UnitMetaDTO.builder().recommendedMinutes(c.getRecommendedMinutes()).build())
					.build();
		}

		return ComponentDTO.builder().id(c.getId()).title(c.getTitle()).shortDescription(c.getShortDescription())
				.type(c.getType()).approximateDurationMinutes(c.getApproximateDurationMinutes()).metadata(metadata)
				.build();
	}
}