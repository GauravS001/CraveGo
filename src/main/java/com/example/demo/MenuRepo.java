package com.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MenuRepo extends JpaRepository<Menu, Long>{

	@Query(value="select * from menu where restaurent = ?1", nativeQuery=true)
	public List<Menu> menuItems(@Param("menukey") String menukey);
}
