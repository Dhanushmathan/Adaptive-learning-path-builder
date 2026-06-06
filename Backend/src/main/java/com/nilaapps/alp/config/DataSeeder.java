package com.nilaapps.alp.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.nilaapps.alp.model.ComponentEntity;
import com.nilaapps.alp.repository.ComponentRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

	private final ComponentRepository componentRepository;

	@Override
	public void run(String... args) {
		if (componentRepository.count() > 0)
			return;

		componentRepository.saveAll(List.of(
				// Assessments
				ComponentEntity.builder().id("cmp-assess-math-1").title("Math Module 1 Assessment")
						.shortDescription("Baseline math diagnostic used to route learners.").type("assessment")
						.approximateDurationMinutes(35).maxScore(100).passingScore(50).build(),

				ComponentEntity.builder().id("cmp-assess-reading-1").title("Reading & Comprehension Assessment")
						.shortDescription("Baseline reading diagnostic to assess comprehension levels.")
						.type("assessment").approximateDurationMinutes(32).maxScore(100).passingScore(50).build(),

				// Units - Easy
				ComponentEntity.builder().id("cmp-unit-math-2-easy").title("Math Module 2 - Easy")
						.shortDescription("Foundational math remediation unit for learners below passing score.")
						.type("unit").approximateDurationMinutes(35).recommendedMinutes(30).build(),

				ComponentEntity.builder().id("cmp-unit-reading-2-easy").title("R&C Module 2 - Easy")
						.shortDescription("Foundational reading comprehension unit for lower scorers.").type("unit")
						.approximateDurationMinutes(32).recommendedMinutes(28).build(),

				// Units - Advanced
				ComponentEntity.builder().id("cmp-unit-math-2-advanced").title("Math Module 2 - Advanced")
						.shortDescription("Advanced math unit for learners who passed the baseline assessment.")
						.type("unit").approximateDurationMinutes(35).recommendedMinutes(30).build(),

				ComponentEntity.builder().id("cmp-unit-reading-2-advanced").title("R&C Module 2 - Advanced")
						.shortDescription("Advanced reading comprehension unit for higher scorers.").type("unit")
						.approximateDurationMinutes(32).recommendedMinutes(28).build(),

				// More units
				ComponentEntity.builder().id("cmp-unit-math-3").title("Math Module 3")
						.shortDescription("Intermediate algebra and problem solving module.").type("unit")
						.approximateDurationMinutes(40).recommendedMinutes(35).build(),

				ComponentEntity.builder().id("cmp-unit-reading-3").title("Reading & Comp Module 3")
						.shortDescription("Advanced reading strategies and critical analysis.").type("unit")
						.approximateDurationMinutes(38).recommendedMinutes(32).build()));

		System.out.println("✅ Seed data loaded: " + componentRepository.count() + " components");
	}
}
