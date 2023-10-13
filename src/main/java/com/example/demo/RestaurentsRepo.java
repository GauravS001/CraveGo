package com.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RestaurentsRepo extends JpaRepository<Restaurents, Long>{

	@Query(value="select * from restaurents where type LIKE %?1%", nativeQuery=true)
	public List<Restaurents> search(@Param("searchkey") String searchkey);
}

