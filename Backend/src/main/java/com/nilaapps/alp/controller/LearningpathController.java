package com.nilaapps.alp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nilaapps.alp.dto.LearningpathDTO;
import com.nilaapps.alp.service.LearningpathService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/learning-paths")
@RequiredArgsConstructor
public class LearningpathController {

	private final LearningpathService learningPathService;

	@PostMapping
	public ResponseEntity<LearningpathDTO> save(@RequestBody LearningpathDTO dto) {
		LearningpathDTO saved = learningPathService.save(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(saved);
	}

	@GetMapping("/{id}")
	public ResponseEntity<LearningpathDTO> getById(@PathVariable String id) {
		return ResponseEntity.ok(learningPathService.getById(id));
	}
}
