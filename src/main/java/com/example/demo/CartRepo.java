package com.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartRepo extends JpaRepository<Cart, Long>{

	
	@Query(value="select * from cart where userid = ?1 and itemname = ?2", nativeQuery=true)
	Cart getitem(String userid, String itemname);
	
	@Query(value="select * from cart where userid = ?1", nativeQuery=true)
	List<Cart> getItemByUser(String userid);
	
	@Query(value="select sum(price) as totalAmount where userid = ?1", nativeQuery=true)
	int getTotalAmt(String userid);
}
