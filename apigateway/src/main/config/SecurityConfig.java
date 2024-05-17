package config;

import org.springframework.boot.autoconfigure.integration.IntegrationProperties.RSocket.Server;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityWebFilterChain(ServerHttpSecurity ServerHttpSecurity){
        serverHttpSecurity.csrf()
            .disable()
            .authorizeExchange(exchange -> exchange
                .pathMatchers("eureka/**")
                .permitAll()
                .anyExchange()
                .authenticated()
            )
            .oauth2ResourceServer(ServerHttpSecurity.OAuth2ResourceServerSpec::jwt);
    return serverHttpSecurity.build();
    }
    
}
