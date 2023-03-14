package com.ssafy.recodeli;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
//@EnableAutoConfiguration(exclude={dataSourceScriptDatabaseInitializer.class})
public class TogetdogApplication {

	public static void main(String[] args) {
		SpringApplication.run(TogetdogApplication.class, args);
	}

}
