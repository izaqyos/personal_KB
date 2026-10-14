---
type: reference
title: Build java projects
description: "Building Java projects with Maven, following Spring guides."
tags: [maven, java, build, howto, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#4"
---

# Build java projects

[↑ java-kb](/kb-java/README.md)

## 4.1 Build java projects with maven

### 4.1.1 Build java projects with maven spring tutorial

```text
https://spring.io/guides/gs/maven/

Create the directory structure

In a project directory of your choosing, create the following subdirectory structure; for example, with mkdir -p src/main/java/hello on *nix systems:
$ mkdir -p src/main/java/hello 
create these two classes: HelloWorld.java and Greeter.java.

src/main/java/hello/HelloWorld.java

package hello;

public class HelloWorld {
  public static void main(String[] args) {
    Greeter greeter = new Greeter();
    System.out.println(greeter.sayHello());
  }
}

src/main/java/hello/Greeter.java

package hello;

public class Greeter {
  public String sayHello() {
    return "Hello world!";
  }
}

Now that you have a project that is ready to be built with Maven, the next step is to install Maven.

(already done)
$ mvn -v
Apache Maven 3.6.2 (40f52333136460af0dc0d7232c0dc0bcf0d9e117; 2019-08-27T18:06:16+03:00)
Maven home: /usr/local/Cellar/maven/3.6.2/libexec
Java version: 13.0.1, vendor: Oracle Corporation, runtime: /Library/Java/JavaVirtualMachines/openjdk-13.0.1.jdk/Contents/Home
Default locale: en_IL, platform encoding: UTF-8
OS name: "mac os x", version: "10.15.2", arch: "x86_64", family: "mac"

Define a simple Maven build

Now that Maven is installed, you need to create a Maven project definition. Maven projects are defined with an XML file named pom.xml. Among other things, this file gives the project’s name, version, and dependencies that it has on external libraries.

Create a file named pom.xml at the root of the project (i.e. put it next to the src folder) and give it the following contents:

pom.xml

<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.springframework</groupId>
    <artifactId>gs-maven</artifactId>
    <packaging>jar</packaging>
    <version>0.1.0</version>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>2.1</version>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                        <configuration>
                            <transformers>
                                <transformer
                                    implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                    <mainClass>hello.HelloWorld</mainClass>
                                </transformer>
                            </transformers>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>

With the exception of the optional <packaging> element, this is the simplest possible pom.xml file necessary to build a Java project. It includes the following details of the project configuration:

<modelVersion>. POM model version (always 4.0.0).
<groupId>. Group or organization that the project belongs to. Often expressed as an inverted domain name.
<artifactId>. Name to be given to the project’s library artifact (for example, the name of its JAR or WAR file).
<version>. Version of the project that is being built.
<packaging> - How the project should be packaged. Defaults to "jar" for JAR file packaging. Use "war" for WAR file packaging.
When it comes to choosing a versioning scheme, Spring recommends the semantic versioning approach.
At this point you have a minimal, yet capable Maven project defined.

$ mvn compile
[INFO] Scanning for projects...
[INFO] 
[INFO] --------------------< org.springframework:gs-maven >--------------------
[INFO] Building gs-maven 0.1.0
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ gs-maven ---
[WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[INFO] skip non existing resourceDirectory /Users/<user>/work/code/java/helloWorld/src/main/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ gs-maven ---
[INFO] Changes detected - recompiling the module!
[WARNING] File encoding has not been set, using platform encoding UTF-8, i.e. build is platform dependent!
[INFO] Compiling 2 source files to /Users/<user>/work/code/java/helloWorld/target/classes
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  1.082 s
[INFO] Finished at: 2020-01-19T17:48:34+02:00
[INFO] ------------------------------------------------------------------------
$ find . -name '*.class'
./target/classes/hello/HelloWorld.class
./target/classes/hello/Greeter.class

$ mvn package
$ java -jar target/HelloWorld-0.1.0.jar 
Hello world!

Maven also maintains a repository of dependencies on your local machine (usually in a .m2/repository directory in your home directory) for quick access to project dependencies. If you’d like to install your project’s JAR file to that local repository, then you should invoke the install goal:

mvn install
The install goal will compile, test, and package your project’s code and then copy it into the local dependency repository, ready for another project to reference it as a dependency.

Speaking of dependencies, now it’s time to declare dependencies in the Maven build.

Declare Dependencies

The simple Hello World sample is completely self-contained and does not depend on any additional libraries. Most applications, however, depend on external libraries to handle common and complex functionality.

For example, suppose that in addition to saying "Hello World!", you want the application to print the current date and time. While you could use the date and time facilities in the native Java libraries, you can make things more interesting by using the Joda Time libraries.

First, change HelloWorld.java to look like this:

src/main/java/hello/HelloWorld.java

package hello;

import org.joda.time.LocalTime;

public class HelloWorld {
  public static void main(String[] args) {
    LocalTime currentTime = new LocalTime();
    System.out.println("The current local time is: " + currentTime);
    Greeter greeter = new Greeter();
    System.out.println(greeter.sayHello());
  }
}
Here HelloWorld uses Joda Time’s LocalTime class to get and print the current time.

If you were to run mvn compile to build the project now, the build would fail because you’ve not declared Joda Time as a compile dependency in the build.
ex:
$ mvn compile
[INFO] Scanning for projects...
[INFO] 
[INFO] -------------------------< com.sap:HelloWorld >-------------------------
[INFO] Building HelloWorld 0.1.0
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ HelloWorld ---
[WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[INFO] skip non existing resourceDirectory /Users/<user>/work/code/java/helloWorld/src/main/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ HelloWorld ---
[INFO] Changes detected - recompiling the module!
[WARNING] File encoding has not been set, using platform encoding UTF-8, i.e. build is platform dependent!
[INFO] Compiling 2 source files to /Users/<user>/work/code/java/helloWorld/target/classes
[INFO] -------------------------------------------------------------
[ERROR] COMPILATION ERROR : 
[INFO] -------------------------------------------------------------
[ERROR] /Users/<user>/work/code/java/helloWorld/src/main/java/hello/HelloWorld.java:[3,21] package org.joda.time does not exist
[ERROR] /Users/<user>/work/code/java/helloWorld/src/main/java/hello/HelloWorld.java:[7,5] cannot find symbol
...


You can fix that by adding the following lines to pom.xml (within the <project> element):

<dependencies>
		<dependency>
			<groupId>joda-time</groupId>
			<artifactId>joda-time</artifactId>
			<version>2.9.2</version>
		</dependency>
</dependencies>
This block of XML declares a list of dependencies for the project. Specifically, it declares a single dependency for the Joda Time library. Within the <dependency> element, the dependency coordinates are defined by three sub-elements:

<groupId> - The group or organization that the dependency belongs to.
<artifactId> - The library that is required.
<version> - The specific version of the library that is required.
By default, all dependencies are scoped as compile dependencies. That is, they should be available at compile-time (and if you were building a WAR file, including in the /WEB-INF/libs folder of the WAR). Additionally, you may specify a <scope> element to specify one of the following scopes:

provided - Dependencies that are required for compiling the project code, but that will be provided at runtime by a container running the code (e.g., the Java Servlet API).
test - Dependencies that are used for compiling and running tests, but not required for building or running the project’s runtime code.
Now if you run mvn compile or mvn package, Maven should resolve the Joda Time dependency from the Maven Central repository and the build will be successful.

Write a Test

First add JUnit as a dependency to your pom.xml, in the test scope:

<dependency>
	<groupId>junit</groupId>
	<artifactId>junit</artifactId>
	<version>4.12</version>
	<scope>test</scope>
</dependency>

Note that junit depends on hamcrest, in my case mvn did not resolve that
dependancy b/c I accidently put the test file in src dir.
dependancey, (
$mvn install
...
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.1:compile (default-compile) on project HelloWorld: Compilation failure: Compilation failure: 
[ERROR] /Users/<user>/work/code/java/helloWorld/src/main/java/hello/GreeterTest.java:[3,27] package org.hamcrest does not exist
)
putting the test file in test/... dir fixes the issue

Then create a test case like this:

src/test/java/hello/GreeterTest.java

package hello;

import static org.hamcrest.CoreMatchers.containsString;
import static org.junit.Assert.*;

import org.junit.Test;

public class GreeterTest {

  private Greeter greeter = new Greeter();

  @Test
  public void greeterSaysHello() {
    assertThat(greeter.sayHello(), containsString("Hello"));
  }

}
Maven uses a plugin called "surefire" to run unit tests. The default configuration of this plugin compiles and runs all classes in src/test/java with a name matching *Test. You can run the tests on the command line like this

mvn test
or just use mvn install step as we already showed above (there is a lifecycle definition where "test" is included as a stage in "install").
```

### 4.1.2 maven

#### 4.1.2.1 getting started

#### 4.1.2.1.1 Create project

```text
Create Java project with below maven command:
mvn archetype:generate
-DgroupId=org.yourcompany.project
-DartifactId=application
Create web project with below maven command:
mvn archetype:generate
-DgroupId=org.yourcompany.project
-DartifactId=application
-DarchetypeArtifactId=maven-archetype-webapp
Create archetype from existing project
mvn archetype:create-from-project
```

#### 4.1.2.1.2 . Main phases

```text
clean — delete target directory
validate — validate, if the project is correct
compile — compile source code, classes stored in target/classes
test — run tests
package — take the compiled code and package it in its distributable format, e.g. JAR, WAR
verify — run any checks to verify the package is valid and meets quality criteria
install — install the package into the local repository
deploy — copies the final package to the remote repository
```

#### 4.1.2.1.3 . Maven phase commands(Project Build Commands)

```text
clean project: This command will delete target directory
mvn clean
validate project: validate the project is correct and all necessary information is available
mvn validate
compile project: compile source code, classes stored in target/classes
mvn compile
test project: run tests using a suitable unit testing framework
mvn test
package project: take the compiled code and package it in its distributable format, such as a JAR /WAR
mvn package
verify project: run any checks to verify the package is valid and meets quality criteria
mvn verify
install project: install the package into the local repository, for use as a dependency in other projects locally
mvn install
deploy project: done in an integration or release environment, copies the final package to the remote repository for sharing with other developers and projects
mvn deploy
```

#### 4.1.2.1.4 Skip running tests

```text
Compiles the tests, but skips running them.
mvn install -DskipTests=true 
Skips compiling the tests and does not run them.
mvn install -Dmaven.test.skip=true 
```

#### 4.1.2.1.5 Project Site Generation

```text
Generate site without tests reports (tests are not executed):
mvn site:site
Generate site with unit tests reports:
mvn test site:site
Generate site with unit and integration tests reports:
mvn verify site:site
```

#### 4.1.2.1.6 Code quality analysis

```text
Analyse code quality with Sonar:
mvn clean install -DskipTests=true
mvn sonar:sonar
Read Sonar configuration guide.
```

#### 4.1.2.1.7 Code coverage reporting

```text
Notice:
It is much more feasible to generate code coverage reports directly from IDE than from Maven. Write test, write code, run coverage for separated test, and check that all important branches are covered.
Generate Clover reports for unit tests:
mvn clover2:setup test clover2:aggregate clover2:clover
Generate clover reports for unit and integration tests:
mvn clover2:setup verify clover2:aggregate clover2:clover
Read Clover configuration guide.
```

#### 4.1.2.1.8 Dependency Management

```text
Check dependencies for newer versions:
mvn versions:display-dependency-updates
Check plugins for newer versions:
mvn versions:display-plugin-updates
Check for newer versions defined as properties:
mvn versions:display-property-updates
Display project dependencies:
mvn dependency:tree
Analyze project dependencies:
mvn dependency:analyze
```

#### 4.1.2.1.9 Getting Help

```text
Display effective Maven settings:
mvn help:effective-settings
Display effective POM:
mvn help:effective-pom
Display all profiles (from settings.xml and POMs hierarchy):
mvn help:active-profiles
Display plugin goals (for m-compiler-p in the example below):
mvn compiler:help
Display plugin's goal description (for goal compile in m-compiler-p in the example below):
mvn compiler:help -Dgoal=compile -Ddetail
```

#### 4.1.2.2 commonly use CLI

```text
generate dependancey tree:  mvn dependency:tree
check updated versions: mvn versions:display-dependency-updates
            4.1.2.3

        4.1.3

    4.2
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [antKB](/ant/ant-kb.md)
<!-- backlinks:end -->
