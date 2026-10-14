---
type: reference
title: "Activating Profiles: Profiles can be activated in various ways, depending on your application's setup. Here are a few common methods"
description: Section 2 of the legacy java-kb notes.
tags: [kb-java]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#2"
---

# Activating Profiles: Profiles can be activated in various ways, depending on your application's setup. Here are a few common methods:

[↑ java-kb](/kb-java/README.md)

````text
   - Via Configuration: You can set the active profiles using configuration properties, such as in the `application.properties` or `application.yml` file:

     ```
     spring.profiles.active=development,anotherProfile
     ```

   - Programmatically: You can programmatically activate profiles during application startup by using the `ConfigurableEnvironment` or `SpringApplication` APIs:

     ```java
     SpringApplication app = new SpringApplication(MyApplication.class);
     ConfigurableEnvironment environment = app.getEnvironment();
     environment.setActiveProfiles("development");
     app.run(args);
     ```

   - Using Command Line Arguments: You can specify active profiles as command line arguments:

     ```
     java -jar myapp.jar --spring.profiles.active=development
     ```
````
