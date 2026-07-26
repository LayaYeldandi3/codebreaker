# Step 1: Build the application
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the entire repository
COPY . .

# Move into the nested directory where pom.xml actually lives!
WORKDIR /app/backend/backend

# Build the JAR package
RUN mvn clean package -DskipTests

# Step 2: Create the lightweight runtime image
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the compiled JAR from the nested build stage
COPY --from=build /app/backend/backend/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]