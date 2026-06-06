package com.nilaapps.alp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nilaapps.alp.dto.AvailableContentResponseDTO;
import com.nilaapps.alp.service.ComponentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/components")
@RequiredArgsConstructor
public class ComponentController {
 
    private final ComponentService componentService;
 
    @GetMapping
    public ResponseEntity<AvailableContentResponseDTO> getAllComponents() {
        return ResponseEntity.ok(componentService.getAllComponents());
    }
}
 