---
type: reference
title: RDBMS traites
description: "SQL tutorial note on RDBMS traites, with syntax and examples."
tags: [sql, database, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#3.1.4"
---

# 3.1.4 RDBMS traites

[↑ Basic](/kb-db/03-sql-syntax/01-basic/README.md)

#### 3.1.4.1 constraints

```text
Constraints are the rules enforced on data columns on a table. These are used to limit the type of data that can go into a table. This ensures the accuracy and reliability of the data in the database.

Constraints can either be column level or table level. Column level constraints are applied only to one column whereas, table level constraints are applied to the entire table.

Following are some of the most commonly used constraints available in SQL −

                3.1.4.1.1 NOT NULL Constraint − Ensures that a column cannot have a NULL value.
By default, a column can hold NULL values. If you do not want a column to have a NULL value, then you need to define such a constraint on this column specifying that NULL is now not allowed for that column.

A NULL is not the same as no data, rather, it represents unknown data.

Example
For example, the following SQL query creates a new table called CUSTOMERS and adds five columns, three of which, are ID NAME and AGE, In this we specify not to accept NULLs −

CREATE TABLE CUSTOMERS(
   ID   INT              NOT NULL,
   NAME VARCHAR (20)     NOT NULL,
   AGE  INT              NOT NULL,
   ADDRESS  CHAR (25) ,
   SALARY   DECIMAL (18, 2),       
   PRIMARY KEY (ID)
);
If CUSTOMERS table has already been created, then to add a NOT NULL constraint to the SALARY column in Oracle and MySQL, you would write a query like the one that is shown in the following code block.

ALTER TABLE CUSTOMERS
   MODIFY SALARY  DECIMAL (18, 2) NOT NULL;


                3.1.4.1.2 DEFAULT Constraint − Provides a default value for a column when none is specified.
The DEFAULT constraint provides a default value to a column when the INSERT INTO statement does not provide a specific value.

Example
For example, the following SQL creates a new table called CUSTOMERS and adds five columns. Here, the SALARY column is set to 5000.00 by default, so in case the INSERT INTO statement does not provide a value for this column, then by default this column would be set to 5000.00.

CREATE TABLE CUSTOMERS(
   ID   INT              NOT NULL,
   NAME VARCHAR (20)     NOT NULL,
   AGE  INT              NOT NULL,
   ADDRESS  CHAR (25) ,
   SALARY   DECIMAL (18, 2) DEFAULT 5000.00,       
   PRIMARY KEY (ID)
);
If the CUSTOMERS table has already been created, then to add a DEFAULT constraint to the SALARY column, you would write a query like the one which is shown in the code block below.

ALTER TABLE CUSTOMERS
MODIFY SALARY  DECIMAL (18, 2) DEFAULT 5000.00; 
Drop Default Constraint
To drop a DEFAULT constraint, use the following SQL query.

ALTER TABLE CUSTOMERS
   ALTER COLUMN SALARY DROP DEFAULT;

                3.1.4.1.3 UNIQUE Constraint − Ensures that all the values in a column are different.
The UNIQUE Constraint prevents two records from having identical values in a column. In the CUSTOMERS table, for example, you might want to prevent two or more people from having an identical age.

Example
For example, the following SQL query creates a new table called CUSTOMERS and adds five columns. Here, the AGE column is set to UNIQUE, so that you cannot have two records with the same age.

CREATE TABLE CUSTOMERS(
   ID   INT              NOT NULL,
   NAME VARCHAR (20)     NOT NULL,
   AGE  INT              NOT NULL UNIQUE,
   ADDRESS  CHAR (25) ,
   SALARY   DECIMAL (18, 2),       
   PRIMARY KEY (ID)
);
If the CUSTOMERS table has already been created, then to add a UNIQUE constraint to the AGE column. You would write a statement like the query that is given in the code block below.

ALTER TABLE CUSTOMERS
   MODIFY AGE INT NOT NULL UNIQUE;
You can also use the following syntax, which supports naming the constraint in multiple columns as well.

ALTER TABLE CUSTOMERS
   ADD CONSTRAINT myUniqueConstraint UNIQUE(AGE, SALARY);
DROP a UNIQUE Constraint
To drop a UNIQUE constraint, use the following SQL query.

ALTER TABLE CUSTOMERS
   DROP CONSTRAINT myUniqueConstraint;
If you are using MySQL, then you can use the following syntax −

ALTER TABLE CUSTOMERS
   DROP INDEX myUniqueConstraint;
```

#### 3.1.4.1.4 PRIMARY Key − Uniquely identifies each row/record in a database table.

```text
A primary key is a field in a table which uniquely identifies each row/record in a database table. Primary keys must contain unique values. A primary key column cannot have NULL values.

A table can have only one primary key, which may consist of single or multiple fields. When multiple fields are used as a primary key, they are called a composite key.

If a table has a primary key defined on any field(s), then you cannot have two records having the same value of that field(s).

Note − You would use these concepts while creating database tables.

Create Primary Key
Here is the syntax to define the ID attribute as a primary key in a CUSTOMERS table.

CREATE TABLE CUSTOMERS(
   ID   INT              NOT NULL,
   NAME VARCHAR (20)     NOT NULL,
   AGE  INT              NOT NULL,
   ADDRESS  CHAR (25) ,
   SALARY   DECIMAL (18, 2),       
   PRIMARY KEY (ID)
);
To create a PRIMARY KEY constraint on the "ID" column when the CUSTOMERS table already exists, use the following SQL syntax −

ALTER TABLE CUSTOMER ADD PRIMARY KEY (ID);
NOTE − If you use the ALTER TABLE statement to add a primary key, the primary key column(s) should have already been declared to not contain NULL values (when the table was first created).

For defining a PRIMARY KEY constraint on multiple columns, use the SQL syntax given below.

CREATE TABLE CUSTOMERS(
   ID   INT              NOT NULL,
   NAME VARCHAR (20)     NOT NULL,
   AGE  INT              NOT NULL,
   ADDRESS  CHAR (25) ,
   SALARY   DECIMAL (18, 2),        
   PRIMARY KEY (ID, NAME)
);
To create a PRIMARY KEY constraint on the "ID" and "NAMES" columns when CUSTOMERS table already exists, use the following SQL syntax.

ALTER TABLE CUSTOMERS 
   ADD CONSTRAINT PK_CUSTID PRIMARY KEY (ID, NAME);
Delete Primary Key
You can clear the primary key constraints from the table with the syntax given below.

ALTER TABLE CUSTOMERS DROP PRIMARY KEY ;
```

#### 3.1.4.1.5 FOREIGN Key − Uniquely identifies a row/record in any another database table.

```text
A foreign key is a key used to link two tables together. This is sometimes also called as a referencing key.

A Foreign Key is a column or a combination of columns whose values match a Primary Key in a different table.

The relationship between 2 tables matches the Primary Key in one of the tables with a Foreign Key in the second table.

If a table has a primary key defined on any field(s), then you cannot have two records having the same value of that field(s).

Example
Consider the structure of the following two tables.

CUSTOMERS table

CREATE TABLE CUSTOMERS(
   ID   INT              NOT NULL,
   NAME VARCHAR (20)     NOT NULL,
   AGE  INT              NOT NULL,
   ADDRESS  CHAR (25) ,
   SALARY   DECIMAL (18, 2),       
   PRIMARY KEY (ID)
);
ORDERS table

CREATE TABLE ORDERS (
   ID          INT        NOT NULL,
   DATE        DATETIME, 
   CUSTOMER_ID INT references CUSTOMERS(ID),
   AMOUNT     double,
   PRIMARY KEY (ID)
);
If the ORDERS table has already been created and the foreign key has not yet been set, the use the syntax for specifying a foreign key by altering a table.

ALTER TABLE ORDERS 
   ADD FOREIGN KEY (Customer_ID) REFERENCES CUSTOMERS (ID);
DROP a FOREIGN KEY Constraint
To drop a FOREIGN KEY constraint, use the following SQL syntax.

ALTER TABLE ORDERS
   DROP FOREIGN KEY;
                3.1.4.1.6 CHECK Constraint − The CHECK constraint ensures that all values in a column satisfy certain conditions.
The CHECK Constraint enables a condition to check the value being entered into a record. If the condition evaluates to false, the record violates the constraint and isn't entered the table.

Example
For example, the following program creates a new table called CUSTOMERS and adds five columns. Here, we add a CHECK with AGE column, so that you cannot have any CUSTOMER who is below 18 years.

CREATE TABLE CUSTOMERS(
   ID   INT              NOT NULL,
   NAME VARCHAR (20)     NOT NULL,
   AGE  INT              NOT NULL CHECK (AGE >= 18),
   ADDRESS  CHAR (25) ,
   SALARY   DECIMAL (18, 2),       
   PRIMARY KEY (ID)
);
If the CUSTOMERS table has already been created, then to add a CHECK constraint to AGE column, you would write a statement like the one given below.

ALTER TABLE CUSTOMERS
   MODIFY AGE INT NOT NULL CHECK (AGE >= 18 );
You can also use the following syntax, which supports naming the constraint in multiple columns as well −

ALTER TABLE CUSTOMERS
   ADD CONSTRAINT myCheckConstraint CHECK(AGE >= 18);
DROP a CHECK Constraint
To drop a CHECK constraint, use the following SQL syntax. This syntax does not work with MySQL.

ALTER TABLE CUSTOMERS
   DROP CONSTRAINT myCheckConstraint;
                3.1.4.1.7 INDEX − Used to create and retrieve data from the database very quickly.
The INDEX is used to create and retrieve data from the database very quickly. An Index can be created by using a single or group of columns in a table. When the index is created, it is assigned a ROWID for each row before it sorts out the data.

Proper indexes are good for performance in large databases, but you need to be careful while creating an index. A Selection of fields depends on what you are using in your SQL queries.

Example
For example, the following SQL syntax creates a new table called CUSTOMERS and adds five columns in it.

CREATE TABLE CUSTOMERS(
   ID   INT              NOT NULL,
   NAME VARCHAR (20)     NOT NULL,
   AGE  INT              NOT NULL,
   ADDRESS  CHAR (25) ,
   SALARY   DECIMAL (18, 2),       
   PRIMARY KEY (ID)
);
Now, you can create an index on a single or multiple columns using the syntax given below.

CREATE INDEX index_name
   ON table_name ( column1, column2.....);
To create an INDEX on the AGE column, to optimize the search on customers for a specific age, you can use the follow SQL syntax which is given below −

CREATE INDEX idx_age
   ON CUSTOMERS ( AGE );
DROP an INDEX Constraint
To drop an INDEX constraint, use the following SQL syntax.

ALTER TABLE CUSTOMERS
   DROP INDEX idx_age;
                3.1.4.1.8
```

#### 3.1.4.2 Data Integrity

```text
The following categories of data integrity exist with each RDBMS −

Entity Integrity − There are no duplicate rows in a table.

Domain Integrity − Enforces valid entries for a given column by restricting the type, the format, or the range of values.

Referential integrity − Rows cannot be deleted, which are used by other records.

User-Defined Integrity − Enforces some specific business rules that do not fall into entity, domain or referential integrity.
```

#### 3.1.4.3 Database Normalization

```text
Database normalization is the process of efficiently organizing data in a database. There are two reasons of this normalization process −

Eliminating redundant data, for example, storing the same data in more than one table.

Ensuring data dependencies make sense.

Both these reasons are worthy goals as they reduce the amount of space a database consumes and ensures that data is logically stored. Normalization consists of a series of guidelines that help guide you in creating a good database structure.

Normalization guidelines are divided into normal forms; think of a form as the format or the way a database structure is laid out. The aim of normal forms is to organize the database structure, so that it complies with the rules of first normal form, then second normal form and finally the third normal form.

It is your choice to take it further and go to the fourth normal form, fifth normal form and so on, but in general, the third normal form is more than enough.
```

#### 3.1.4.3.1 First Normal Form (1NF)

```text
The First normal form (1NF) sets basic rules for an organized database −

Define the data items required, because they become the columns in a table.

Place the related data items in a table.

Ensure that there are no repeating groups of data.

Ensure that there is a primary key.

First Rule of 1NF
You must define the data items. This means looking at the data to be stored, organizing the data into columns, defining what type of data each column contains and then finally putting the related columns into their own table.

For example, you put all the columns relating to locations of meetings in the Location table, those relating to members in the MemberDetails table and so on.

Second Rule of 1NF
The next step is ensuring that there are no repeating groups of data. Consider we have the following table −

CREATE TABLE CUSTOMERS(
   ID   INT              NOT NULL,
   NAME VARCHAR (20)     NOT NULL,
   AGE  INT              NOT NULL,
   ADDRESS  CHAR (25),
   ORDERS   VARCHAR(155)
);
So, if we populate this table for a single customer having multiple orders, then it would be something as shown below −

ID	NAME	AGE	ADDRESS	ORDERS
100	Sachin	36	Lower West Side	Cannon XL-200
100	Sachin	36	Lower West Side	Battery XL-200
100	Sachin	36	Lower West Side	Tripod Large
But as per the 1NF, we need to ensure that there are no repeating groups of data. So, let us break the above table into two parts and then join them using a key as shown in the following program −

CUSTOMERS table −

CREATE TABLE CUSTOMERS(
   ID   INT              NOT NULL,
   NAME VARCHAR (20)     NOT NULL,
   AGE  INT              NOT NULL,
   ADDRESS  CHAR (25),
   PRIMARY KEY (ID)
);
This table would have the following record −

ID	NAME	AGE	ADDRESS
100	Sachin	36	Lower West Side
ORDERS table −

CREATE TABLE ORDERS(
   ID   INT              NOT NULL,
   CUSTOMER_ID INT       NOT NULL,
   ORDERS   VARCHAR(155),
   PRIMARY KEY (ID)
);
This table would have the following records −

ID	CUSTOMER_ID	ORDERS
10	100	Cannon XL-200
11	100	Battery XL-200
12	100	Tripod Large
Third Rule of 1NF
The final rule of the first normal form, create a primary key for each table which we have already created.
```

#### 3.1.4.3.2 Second Normal Form (2NF)

```text
The Second Normal Form states that it should meet all the rules for 1NF and there must be no partial dependences of any of the columns on the primary key −

Consider a customer-order relation and you want to store customer ID, customer name, order ID and order detail and the date of purchase −

CREATE TABLE CUSTOMERS(
   CUST_ID    INT              NOT NULL,
   CUST_NAME VARCHAR (20)      NOT NULL,
   ORDER_ID   INT              NOT NULL,
   ORDER_DETAIL VARCHAR (20)  NOT NULL,
   SALE_DATE  DATETIME,
   PRIMARY KEY (CUST_ID, ORDER_ID)
);
This table is in the first normal form; in that it obeys all the rules of the first normal form. In this table, the primary key consists of the CUST_ID and the ORDER_ID. Combined, they are unique assuming the same customer would hardly order the same thing.

However, the table is not in the second normal form because there are partial dependencies of primary keys and columns. CUST_NAME is dependent on CUST_ID and there's no real link between a customer's name and what he purchased. The order detail and purchase date are also dependent on the ORDER_ID, but they are not dependent on the CUST_ID, because there is no link between a CUST_ID and an ORDER_DETAIL or their SALE_DATE.

To make this table comply with the second normal form, you need to separate the columns into three tables.

First, create a table to store the customer details as shown in the code block below −

CREATE TABLE CUSTOMERS(
   CUST_ID    INT              NOT NULL,
   CUST_NAME VARCHAR (20)      NOT NULL,
   PRIMARY KEY (CUST_ID)
);
The next step is to create a table to store the details of each order −

CREATE TABLE ORDERS(
   ORDER_ID   INT              NOT NULL,
   ORDER_DETAIL VARCHAR (20)  NOT NULL,
   PRIMARY KEY (ORDER_ID)
);
Finally, create a third table storing just the CUST_ID and the ORDER_ID to keep a track of all the orders for a customer −

CREATE TABLE CUSTMERORDERS(
   CUST_ID    INT              NOT NULL,
   ORDER_ID   INT              NOT NULL,
   SALE_DATE  DATETIME,
   PRIMARY KEY (CUST_ID, ORDER_ID)
);
```

#### 3.1.4.3.3 Third Normal Form (3NF)

```text
A table is in a third normal form when the following conditions are met −

It is in second normal form.
All nonprimary fields are dependent on the primary key.
The dependency of these non-primary fields is between the data. For example, in the following table – the street name, city and the state are unbreakably bound to their zip code.

CREATE TABLE CUSTOMERS(
   CUST_ID       INT              NOT NULL,
   CUST_NAME     VARCHAR (20)      NOT NULL,
   DOB           DATE,
   STREET        VARCHAR(200),
   CITY          VARCHAR(100),
   STATE         VARCHAR(100),
   ZIP           VARCHAR(12),
   EMAIL_ID      VARCHAR(256),
   PRIMARY KEY (CUST_ID)
);
The dependency between the zip code and the address is called as a transitive dependency. To comply with the third normal form, all you need to do is to move the Street, City and the State fields into their own table, which you can call as the Zip Code table. −

CREATE TABLE ADDRESS(
   ZIP           VARCHAR(12),
   STREET        VARCHAR(200),
   CITY          VARCHAR(100),
   STATE         VARCHAR(100),
   PRIMARY KEY (ZIP)
);
The next step is to alter the CUSTOMERS table as shown below −

CREATE TABLE CUSTOMERS(
   CUST_ID       INT              NOT NULL,
   CUST_NAME     VARCHAR (20)      NOT NULL,
   DOB           DATE,
   ZIP           VARCHAR(12),
   EMAIL_ID      VARCHAR(256),
   PRIMARY KEY (CUST_ID)
);
The advantages of removing transitive dependencies are mainly two-fold. First, the amount of data duplication is reduced and therefore your database becomes smaller.

The second advantage is data integrity. When duplicated data changes, there is a big risk of updating only some of the data, especially if it is spread out in many different places in the database.

For example, if the address and the zip code data were stored in three or four different tables, then any changes in the zip codes would need to ripple out to every record in those three or four tables.

                3.1.4.3.4 
```

#### 3.1.4.4 popular RDBMS databases

#### 3.1.4.5 MySQL

```text
MySQL is an open source SQL database, which is developed by a Swedish company – MySQL AB. MySQL is pronounced as "my ess-que-ell," in contrast with SQL, pronounced "sequel."

MySQL is supporting many different platforms including Microsoft Windows, the major Linux distributions, UNIX, and Mac OS X.

MySQL has free and paid versions, depending on its usage (non-commercial/commercial) and features. MySQL comes with a very fast, multi-threaded, multi-user and robust SQL database server.

History
Development of MySQL by Michael Widenius & David Axmark beginning in 1994.

First internal release on 23rd May 1995.

Windows Version was released on the 8th January 1998 for Windows 95 and NT.

Version 3.23: beta from June 2000, production release January 2001.

Version 4.0: beta from August 2002, production release March 2003 (unions).

Version 4.1: beta from June 2004, production release October 2004.

Version 5.0: beta from March 2005, production release October 2005.

Sun Microsystems acquired MySQL AB on the 26th February 2008.

Version 5.1: production release 27th November 2008.

Features
High Performance.
High Availability.
Scalability and Flexibility Run anything.
Robust Transactional Support.
Web and Data Warehouse Strengths.
Strong Data Protection.
Comprehensive Application Development.
Management Ease.
Open Source Freedom and 24 x 7 Support.
Lowest Total Cost of Ownership.
```

#### 3.1.4.6 MS SQL Server

```text
MS SQL Server is a Relational Database Management System developed by Microsoft Inc. Its primary query languages are −

T-SQL
ANSI SQL
History
1987 - Sybase releases SQL Server for UNIX.

1988 - Microsoft, Sybase, and Aston-Tate port SQL Server to OS/2.

1989 - Microsoft, Sybase, and Aston-Tate release SQL Server 1.0 for OS/2.

1990 - SQL Server 1.1 is released with support for Windows 3.0 clients.

Aston - Tate drops out of SQL Server development.

2000 - Microsoft releases SQL Server 2000.

2001 - Microsoft releases XML for SQL Server Web Release 1 (download).

2002 - Microsoft releases SQLXML 2.0 (renamed from XML for SQL Server).

2002 - Microsoft releases SQLXML 3.0.

2005 - Microsoft releases SQL Server 2005 on November 7th, 2005.

Features
High Performance
High Availability
Database mirroring
Database snapshots
CLR integration
Service Broker
DDL triggers
Ranking functions
Row version-based isolation levels
XML integration
TRY...CATCH
Database Mail
```

#### 3.1.4.7 ORACLE

```text
It is a very large multi-user based database management system. Oracle is a relational database management system developed by 'Oracle Corporation'.

Oracle works to efficiently manage its resources, a database of information among the multiple clients requesting and sending data in the network.

It is an excellent database server choice for client/server computing. Oracle supports all major operating systems for both clients and servers, including MSDOS, NetWare, UnixWare, OS/2 and most UNIX flavors.

History
Oracle began in 1977 and celebrating its 32 wonderful years in the industry (from 1977 to 2009).

1977 - Larry Ellison, Bob Miner and Ed Oates founded Software Development Laboratories to undertake development work.

1979 - Version 2.0 of Oracle was released and it became first commercial relational database and first SQL database. The company changed its name to Relational Software Inc. (RSI).

1981 - RSI started developing tools for Oracle.

1982 - RSI was renamed to Oracle Corporation.

1983 - Oracle released version 3.0, rewritten in C language and ran on multiple platforms.

1984 - Oracle version 4.0 was released. It contained features like concurrency control - multi-version read consistency, etc.

1985 - Oracle version 4.0 was released. It contained features like concurrency control - multi-version read consistency, etc.

2007 - Oracle released Oracle11g. The new version focused on better partitioning, easy migration, etc.

Features
Concurrency
Read Consistency
Locking Mechanisms
Quiesce Database
Portability
Self-managing database
SQL*Plus
ASM
Scheduler
Resource Manager
Data Warehousing
Materialized views
Bitmap indexes
Table compression
Parallel Execution
Analytic SQL
Data mining
Partitioning
MS ACCESS
This is one of the most popular Microsoft products. Microsoft Access is an entry-level database management software. MS Access database is not only inexpensive but also a powerful database for small-scale projects.

MS Access uses the Jet database engine, which utilizes a specific SQL language dialect (sometimes referred to as Jet SQL).

MS Access comes with the professional edition of MS Office package. MS Access has easyto-use intuitive graphical interface.

1992 - Access version 1.0 was released.

1993 - Access 1.1 released to improve compatibility with inclusion the Access Basic programming language.

The most significant transition was from Access 97 to Access 2000.

2007 - Access 2007, a new database format was introduced ACCDB which supports complex data types such as multi valued and attachment fields.

Features
Users can create tables, queries, forms and reports and connect them together with macros.

Option of importing and exporting the data to many formats including Excel, Outlook, ASCII, dBase, Paradox, FoxPro, SQL Server, Oracle, ODBC, etc.

There is also the Jet Database format (MDB or ACCDB in Access 2007), which can contain the application and data in one file. This makes it very convenient to distribute the entire application to another user, who can run it in disconnected environments.

Microsoft Access offers parameterized queries. These queries and Access tables can be referenced from other programs like VB6 and .NET through DAO or ADO.

The desktop editions of Microsoft SQL Server can be used with Access as an alternative to the Jet Database Engine.

Microsoft Access is a file server-based database. Unlike the client-server relational database management systems (RDBMS), Microsoft Access does not implement database triggers, stored procedures or transaction logging.

            3.1.4.5
```
