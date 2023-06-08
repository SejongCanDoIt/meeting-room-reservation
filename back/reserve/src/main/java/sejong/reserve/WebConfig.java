package sejong.reserve;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import sejong.reserve.security.JwtAuthenticationFilter;
import sejong.reserve.security.JwtTokenProvider;
import sejong.reserve.service.AdminService;
import sejong.reserve.service.MemberService;
import sejong.reserve.web.argumentresolver.LoginMemberArgumentResolver;
import sejong.reserve.web.interceptor.AdminCheckInterceptor;
import sejong.reserve.web.interceptor.LogInterceptor;
import sejong.reserve.web.interceptor.LoginCheckInterceptor;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {


    private final MemberService memberService;
    private final AdminService adminService;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LogInterceptor())
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/css/**", "/*.ico", "/error","/excel/**");

//        registry.addInterceptor(new LoginCheckInterceptor())
//                .order(2)
//                .addPathPatterns("/**")
//                .excludePathPatterns(
//                        "/", "/auth/login",
//                        "/auth/checkLogin",
//                        "/auth/logout", "/css/**", "/*.ico", "/error","/excel/**",
//                        "/room/list", "/room/detail/**", "/notice/list", "/notice/detail/**",
//                        "/reserve/today-reserve-cnt-all");
//
//        registry.addInterceptor(new AdminCheckInterceptor())
//                .order(2)
//                .addPathPatterns("/**")
//                .excludePathPatterns(
//                        "/", "/auth/login",
//                        "/auth/checkLogin",
//                        "/auth/logout", "/css/**", "/*.ico", "/error","/excel/**",
//                        "/member/**", "/reserve/**", "/notice/list", "/notice/detail/**",
//                        "/room/list", "/room/detail/**", "/reserve/today-reserve-cnt-all");
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new LoginMemberArgumentResolver(memberService, adminService));
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(
                        "/", "/auth/login", "/auth/checkLogin", "/auth/logout", "/css/**", "/*.ico", "/error", "/excel/**",
                        "/room/list", "/room/detail/**", "/notice/list", "/notice/detail/**", "/reserve/today-reserve-cnt-all"
                ).permitAll()
                .antMatchers(
                        "/manage/update", "/manage/member",  "/manage/date",
                        "/notice/insert", "/notice/delete/**"
                ).hasAuthority("ROLE_ADMIN")
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}