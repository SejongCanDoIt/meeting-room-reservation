package sejong.reserve;

import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ReserveApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReserveApplication.class, args);
	}

	@Bean
	Hibernate5Module hibernate5Module() {
		return new Hibernate5Module();
	}
}
