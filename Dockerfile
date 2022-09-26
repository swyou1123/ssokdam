FRONTEND :
    FROM node:alpine
    WORKDIR "/Frontend/usr/src/app"
    COPY package.json ./
    RUN npm install --save --legacy-peer-deps
    COPY ./ ./
    CMD ["npm","run","start"]
BACKEND:
    FROM openjdk:17-jdk-alpine
    ADD /Backend/project/build/libs/project-0.0.1-SNAPSHOT.jar app.jar
    ENV JAVA_OPTS=""
    ENTRYPOINT ["java","-jar","/app.jar"]