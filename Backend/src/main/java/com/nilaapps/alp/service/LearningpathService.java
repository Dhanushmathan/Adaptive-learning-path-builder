package com.nilaapps.alp.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nilaapps.alp.dto.LearningpathDTO;
import com.nilaapps.alp.model.LearningpathEntity;
import com.nilaapps.alp.repository.LearningpathRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LearningpathService {

	private final LearningpathRepository learningpathRepository;
	private final ObjectMapper objectMapper;

	public LearningpathDTO save(LearningpathDTO dto) {
		try {
			String nodesJson = objectMapper.writeValueAsString(dto.getNodes());
			String edgesJson = objectMapper.writeValueAsString(dto.getEdges());

			// If id provided AND already exists → update, else create new
			if (dto.getId() != null && learningpathRepository.existsById(dto.getId())) {
				LearningpathEntity existing = learningpathRepository.findById(dto.getId()).get();
				existing.setName(dto.getName());
				existing.setDescription(dto.getDescription());
				existing.setStatus(dto.getStatus() != null ? dto.getStatus() : "draft");
				existing.setVersion(dto.getVersion() != null ? dto.getVersion() : 1);
				existing.setNodesJson(nodesJson);
				existing.setEdgesJson(edgesJson);
				existing.setCanvasZoom(dto.getCanvas() != null ? dto.getCanvas().getZoom() : 1.0);
				existing.setCanvasOffsetX(dto.getCanvas() != null ? dto.getCanvas().getOffsetX() : 0.0);
				existing.setCanvasOffsetY(dto.getCanvas() != null ? dto.getCanvas().getOffsetY() : 0.0);
				LearningpathEntity saved = learningpathRepository.save(existing);
				return toDTO(saved);
			}

			// New record
			LearningpathEntity entity = LearningpathEntity.builder().name(dto.getName())
					.description(dto.getDescription() != null ? dto.getDescription() : "")
					.status(dto.getStatus() != null ? dto.getStatus() : "draft")
					.version(dto.getVersion() != null ? dto.getVersion() : 1).nodesJson(nodesJson).edgesJson(edgesJson)
					.canvasZoom(dto.getCanvas() != null ? dto.getCanvas().getZoom() : 1.0)
					.canvasOffsetX(dto.getCanvas() != null ? dto.getCanvas().getOffsetX() : 0.0)
					.canvasOffsetY(dto.getCanvas() != null ? dto.getCanvas().getOffsetY() : 0.0).build();

			LearningpathEntity saved = learningpathRepository.save(entity);
			return toDTO(saved);

		} catch (Exception e) {
			throw new RuntimeException("Failed to save learning path: " + e.getMessage(), e);
		}
	}

	public LearningpathDTO getById(String id) {
		LearningpathEntity entity = learningpathRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Learning path not found: " + id));
		return toDTO(entity);
	}

	private LearningpathDTO toDTO(LearningpathEntity entity) {
		try {
			List<Map<String, Object>> nodes = objectMapper.readValue(entity.getNodesJson(), new TypeReference<>() {
			});
			List<Map<String, Object>> edges = objectMapper.readValue(entity.getEdgesJson(), new TypeReference<>() {
			});

			return LearningpathDTO.builder().id(entity.getId()).name(entity.getName())
					.description(entity.getDescription()).status(entity.getStatus()).version(entity.getVersion())
					.canvas(LearningpathDTO.CanvasDTO.builder().zoom(entity.getCanvasZoom())
							.offsetX(entity.getCanvasOffsetX()).offsetY(entity.getCanvasOffsetY()).build())
					.nodes(nodes).edges(edges).build();
		} catch (Exception e) {
			throw new RuntimeException("Failed to parse learning path: " + e.getMessage(), e);
		}
	}
}