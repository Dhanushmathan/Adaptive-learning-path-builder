package com;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.resttestclient.TestRestTemplate;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.nilaapps.alp.dto.AvailableContentResponseDTO;
import com.nilaapps.alp.dto.LearningpathDTO;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class NillasLearningpathApplicationTests {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

	private String base() {
		return "http://localhost:" + port;
	}

	@Test
	void contextLoads() {

	}

	@Test
	void getComponents_returnsSeededData() {
		ResponseEntity<AvailableContentResponseDTO> response = restTemplate.getForEntity(base() + "/api/components",
				AvailableContentResponseDTO.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(response.getBody()).isNotNull();
		assertThat(response.getBody().getItems()).isNotEmpty();
		assertThat(response.getBody().getTotalCount()).isGreaterThan(0);
	}

	@Test
	void saveLearningPath_andReload() {
		LearningpathDTO dto = LearningpathDTO.builder().name("Test SAT Path").description("A test learning path")
				.status("draft").version(1)
				.canvas(LearningpathDTO.CanvasDTO.builder().zoom(0.7).offsetX(0.0).offsetY(0.0).build())
				.nodes(List.of(Map.of("id", "node-start", "type", "start", "label", "Start", "componentId",
						"system-start", "position", Map.of("x", 420, "y", 60))))
				.edges(List.of()).build();

		ResponseEntity<LearningpathDTO> saveResponse = restTemplate.postForEntity(base() + "/api/learning-paths", dto,
				LearningpathDTO.class);

		assertThat(saveResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
		assertThat(saveResponse.getBody()).isNotNull();
		String savedId = saveResponse.getBody().getId();
		assertThat(savedId).isNotNull();

		// Reload
		ResponseEntity<LearningpathDTO> loadResponse = restTemplate
				.getForEntity(base() + "/api/learning-paths/" + savedId, LearningpathDTO.class);

		assertThat(loadResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(loadResponse.getBody().getName()).isEqualTo("Test SAT Path");
	}

}
