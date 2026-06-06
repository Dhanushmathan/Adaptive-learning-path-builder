package com.nilaapps.alp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nilaapps.alp.model.ComponentEntity;

@Repository
public interface ComponentRepository extends JpaRepository<ComponentEntity, String> {

}
