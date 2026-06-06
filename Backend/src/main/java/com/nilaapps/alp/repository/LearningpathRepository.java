package com.nilaapps.alp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nilaapps.alp.model.LearningpathEntity;

@Repository
public interface LearningpathRepository extends JpaRepository<LearningpathEntity, String> {

}
