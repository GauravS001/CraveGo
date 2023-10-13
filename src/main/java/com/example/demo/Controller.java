package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Random;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/services")
public class Controller {
	
	@Autowired
	WOYMRepo wr;
	@Autowired
	HSTagsRepo hsr;
	@Autowired
	RestaurentsRepo rr;
	@Autowired
	MenuRepo mr;
	@Autowired
	CartRepo cr;
	@Autowired
	OrderRepo or;
	
	 @GetMapping("/{imageName:.+}")
	    public ResponseEntity<Resource> serveImage(@PathVariable String imageName) throws IOException {
	        Path imagePath = Paths.get("src/main/resources/images/").resolve(imageName); // Path to the image

	        Resource resource = new UrlResource(imagePath.toUri());

	        if (resource.exists() && resource.isReadable()) {
	            return ResponseEntity.ok()
	                .contentType(MediaType.IMAGE_JPEG) // Set the content type to the appropriate image format
	                .body(resource);
	        } else {
	            // Handle resource not found or unreadable
	            return ResponseEntity.notFound().build();
	        }
	    }
	 
	 
	 @GetMapping("/WOYM")
	 public List<WOYM> getWoym(){
		 List<WOYM> l = wr.findAll();
		 return l;
	 }

	 
	 @GetMapping("/HSTAGS")
	 public List<HStags> gethstags(){
		 List<HStags> l = hsr.findAll();
		 return l;
	 }
	 
	 @GetMapping("ALLRESTAURENTS")
	 public List<Restaurents> getAllRes(){
		 List<Restaurents> l =  rr.findAll();
		 return l;
	 }
	 
	 @GetMapping("/search")
	 public List<Restaurents> search(@RequestParam String searchkey){
		 List<Restaurents> l = rr.search(searchkey);
		 return l;
	 }
	 
	 @GetMapping("/menu")
	 public List<Menu> getMenuItems(@RequestParam String menukey){
		 List<Menu> l = mr.menuItems(menukey);
		 return l;
	 }
	 
	 @GetMapping("/AllCart")
	 public List<Cart> getAllCartItems(){
		 List<Cart> l = cr.findAll();
		 return l;
	 }
	 
	 @PostMapping("/saveToCart")
	 public void saveTC(@RequestBody Cart cart) {
		Cart c = cr.getitem(cart.getUserid(), cart.getItemname());
		
		if(c == null) {
			Cart nc = new Cart();
			nc.setUserid(cart.getUserid());
			nc.setItemname(cart.getItemname());
			nc.setQuantity(cart.getQuantity());
			nc.setPrice(cart.getPrice());
			nc.setRestaurent(cart.getRestaurent());
			
			cr.save(nc);
		}else {
			
			int qty = Integer.parseInt(c.getQuantity());
			int price = Integer.parseInt(c.getPrice());
			price = price + Integer.parseInt(cart.getPrice());
			qty++;
			c.setQuantity(String.valueOf(qty));
			c.setPrice(String.valueOf(price));
			cr.save(c);
		}
	 }
	 
	 @PostMapping("/delFromCart")
	 public void delFC(@RequestBody Cart cart) {
		 Cart c = cr.getitem(cart.getUserid(), cart.getItemname());
		 
		 if(c!=null) {
			 int qty = Integer.parseInt(c.getQuantity());
			 int price = Integer.parseInt(c.getPrice());
			 price = price - Integer.parseInt(cart.getPrice());
			 qty--;
			 
			 if(qty<=0) {
				 cr.delete(c);
			 }else {
				 c.setQuantity(String.valueOf(qty));
				 c.setPrice(String.valueOf(price));
				 cr.save(c);
			 }
			 
		 }
	 }
	 
	 @GetMapping("/CartByUser")
	 public List<Cart> getCartByUser(@RequestParam String userid){
		 List<Cart> c = cr.getItemByUser(userid);
		 return c;
	 }
	 
	 @GetMapping("/TotAmt")
	 public int getTA(@RequestParam String userid) {
		 int ta = cr.getTotalAmt(userid);
		 return ta;
	 }
	 
	 @GetMapping("/AllOrders")
	 public List<Placeorder> getAO(){
		 List<Placeorder> l = or.findAll();
		 return l;
	 }
	 
	 @PostMapping("/PlaceOrder")
	 public String placeorder(@RequestParam String userid) {
		 int tamt = 0;
		 List<Cart> l = cr.getItemByUser(userid);
		 StringBuilder sb = new StringBuilder();
		 for(int i=0; i<l.size(); i++) {
			 sb.append(l.get(i).getItemname()+ ",");
		 }
		 
		 String itm = sb.toString();
		 
		 Placeorder orr = new Placeorder();
		 orr.setItems(itm);
		 orr.setUserid(l.get(0).getUserid());
		 orr.setRes(l.get(0).getRestaurent());
		
		 for(int j=0; j<l.size(); j++) {
			 tamt = tamt + Integer.parseInt(l.get(j).getPrice());
		 }
		 
		 orr.setAmt(String.valueOf(tamt));
		 
		 or.save(orr);
		 return "Order Placed";
		 
		
		 
	 }
}
