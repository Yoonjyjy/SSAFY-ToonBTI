package com.ssafy.recodeli.global.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfig {

	// Swagger - API 기본 설정
	private String API_VERSION = "0.1";
	private String API_TITLE = "특화 PJT RECODELI! API Documentation";
	private String API_DESCRIPTION = "SSAFY 특화 PJT RECODELI API";

	public Docket getDocket(String groupName, boolean defaultResponseMessage,
			// Predicate<String> predicate,
			String basePackage) {
		return new Docket(DocumentationType.OAS_30).groupName(groupName)
				.useDefaultResponseMessages(defaultResponseMessage) // Swagger 에서 제공해주는 기본 응답 코드 표시 여부
				.apiInfo(apiInfo()) // apiInfo정보
				.securityContexts(Arrays.asList(securityContext()))
				.securitySchemes(Arrays.asList(apiKey()))
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.ssafy.recodeli." + basePackage + ".controller"))
				.paths(PathSelectors.any()) // 아무 경로나 가능
				.build();
	}

	public ApiInfo apiInfo() {
		return new ApiInfoBuilder().title(API_TITLE).description(API_DESCRIPTION).version(API_VERSION).build();
	}

    private ApiKey apiKey() {
        return new ApiKey("Authorization", "Authorization", "header");
    }

	private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .build();
	}

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope =
        		new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes =
        		new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(
        		new SecurityReference("Authorization", authorizationScopes));
    }

	//////////////////////////////////////////////////////////
	// DEVELOPTING
	@Bean
	public Docket user() {
		return getDocket("USER", true, "user");
	}
}