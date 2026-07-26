# Step 1: Build the application
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and source code using relative paths from repository root
COPY backend/backend/pom.xml .
COPY backend/backend/src ./src

# Build the JAR package
RUN mvn clean package -DskipTests

# Step 2: Create runtime image
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the compiled JAR
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]