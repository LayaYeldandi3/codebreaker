# Step 1: Maven Build Stage
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and source code from the nested directory
COPY backend/backend/pom.xml .
COPY backend/backend/src ./src

# Build the JAR package
RUN mvn clean package -DskipTests

# Step 2: Runtime Stage
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the compiled JAR
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]