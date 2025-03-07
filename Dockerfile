FROM gradle:8.13-jdk21 AS builder
WORKDIR /app
COPY --chown=gradle:gradle rpgnexus-backend .
RUN gradle clean build -x test
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
