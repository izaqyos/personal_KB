---
type: reference
title: SSL and TLS
description: "Java SSL/TLS: establishing an SSL client connection, with ChatGPT answers."
tags: [java, tls, ssl, security, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#19"
---

# SSL and TLS, tags: and TLS

[↑ java-kb](/kb-java/README.md)

## 19.1 chatgpt

````text
        19.1.1 java establish ssl client connection with sslmode verify-full  also explain how to send client certificate and key and validate server certificate
| When establishing an SSL/TLS connection with mutual authentication (both the client and server authenticate each other), you need to provide a client certificate and key in addition to validating the server certificate. The PostgreSQL JDBC driver supports this by allowing you to specify client certificate-related properties.
| 
| Below is an example Java code snippet demonstrating how to send a client certificate and key while also validating the server certificate:
| 
| ```java
| import java.sql.Connection;
| import java.sql.DriverManager;
| import java.sql.SQLException;
| import java.util.Properties;
| 
| public class SSLClientWithClientCertExample {
| 
|     public static void main(String[] args) {
|         String jdbcUrl = "jdbc:postgresql://your_host:your_port/your_database";
|         String user = "your_username";
|         String password = "your_password";
|         String sslMode = "verify-full"; // Set to the desired SSLMode
|         String sslRootCert = "/path/to/root.crt"; // Path to the root CA certificate
|         String sslCert = "/path/to/client.crt"; // Path to the client certificate
|         String sslKey = "/path/to/client.key"; // Path to the client private key
| 
|         Properties properties = new Properties();
|         properties.setProperty("user", user);
|         properties.setProperty("password", password);
|         properties.setProperty("sslmode", sslMode);
|         properties.setProperty("sslrootcert", sslRootCert);
|         properties.setProperty("sslcert", sslCert);
|         properties.setProperty("sslkey", sslKey);
| 
|         try {
|             // Load the PostgreSQL JDBC driver
|             Class.forName("org.postgresql.Driver");
| 
|             // Establish the SSL client connection
|             Connection connection = DriverManager.getConnection(jdbcUrl, properties);
| 
|             // Perform database operations as needed
| 
|             // Close the connection
|             connection.close();
|         } catch (ClassNotFoundException | SQLException e) {
|             e.printStackTrace();
|         }
|     }
| }
| ```
| 
| In this example:
| 
| - **`sslrootcert`:** Points to the root CA certificate file (server certificate should be signed by this CA).
| - **`sslcert`:** Points to the client certificate file.
| - **`sslkey`:** Points to the client private key file.
| 
| Make sure to replace the placeholders (`your_host`, `your_port`, `your_database`, `your_username`, and `your_password`) with your actual PostgreSQL server details, and update the paths to the certificate and key files accordingly.
| 
| Key points:
| 
| 1. Ensure that the PostgreSQL server is configured to request client certificates (`ssl` and `require` settings in `pg_hba.conf`).
| 2. The client certificate and private key should be stored in files on the client machine.
| 3. The server certificate must be signed by the root CA certificate specified in `sslrootcert`.
| 4. This example assumes the use of the PostgreSQL JDBC driver (`org.postgresql.Driver`). Ensure you have the correct version of the driver in your classpath.
| 
| By configuring these properties, the JDBC driver will send the client certificate and key during the SSL handshake, and it will validate the server certificate against the specified root CA certificate.

    19.2

20.
````
