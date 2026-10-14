---
type: reference
title: Logging
description: "Legacy Python KB section: Logging"
tags: [logging, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#12"
---

# Logging, tags: Logging

[↑ KB_python](/python/kb-python/README.md)

````text
    12.1 Chatgpt: describe common ways to add logging capabilities to python code, tags Chatgpt: describe common ways to add logging capabilities to python code

Adding logging capabilities to Python code is crucial for monitoring and debugging applications. Here are some common ways to implement logging in Python:

|1. **Using the `logging` Module:**
|   Python's built-in `logging` module provides a flexible and powerful framework for adding logging to your code. It supports different log levels, log formatting, and output destinations. Basic usage involves importing the module, configuring the logger, and using logging functions to emit log messages.
|
|   ```python
|   import logging
|
|   # Configure the logger
|   logging.basicConfig(level=logging.DEBUG, filename='app.log', format='%(asctime)s - %(levelname)s - %(message)s')
|
|   # Emit log messages
|   logging.debug('Debug message')
|   logging.info('Info message')
|   logging.warning('Warning message')
|   logging.error('Error message')
|   logging.critical('Critical message')
|   ```
|
|2. **Configuring Logging via Configuration Files:**
|   The `logging` module allows you to configure logging using configuration files (e.g., JSON or INI format). This provides more flexibility and avoids hardcoding configuration in your code. You can use the `fileConfig` or `dictConfig` functions to load the configuration from a file.
|
|   ```python
|   import logging.config
|
|   logging.config.fileConfig('logging_config.ini')
|   logger = logging.getLogger('my_logger')
|   ```
|
|3. **Customizing Log Handlers:**
|   You can customize logging behavior by adding different handlers to the logger. Handlers define where log messages are output. Common handlers include `StreamHandler` (outputs to console), `FileHandler` (outputs to a file), and `RotatingFileHandler` (rotates log files when they reach a certain size).
|
|   ```python
|   import logging
|
|   logger = logging.getLogger('my_logger')
|   handler = logging.StreamHandler()  # or other handler types
|   logger.addHandler(handler)
|   ```
|
|4. **Logging to Different Destinations:**
|   You can configure log messages to be sent to various destinations, such as the console, files, and remote servers. This is useful for separating application logs from error logs or sending logs to a centralized logging system.
|
|5. **Custom Log Formats:**
|   The `logging` module allows you to define custom log formats using placeholders. This lets you include various pieces of information in your log messages, such as timestamp, log level, module name, etc.
|
|6. **Logging Exceptions and Stack Traces:**
|   You can log exceptions and stack traces using the `exception` method of a logger. This is helpful for capturing detailed error information.
|
|   ```python
|   try:
|       # Code that may raise an exception
|   except Exception as e:
|       logger.error('An error occurred: %s', e, exc_info=True)
|   ```
|
|7. **Logging in Libraries and Modules:**
|   When developing libraries or modules, it's a good practice to use the `logging` module for logging instead of printing to the console. This allows consumers of your library to configure logging according to their needs.
|
|8. **Third-Party Logging Libraries:**
   Besides the built-in `logging` module, there are third-party logging libraries like `loguru` and `structlog` that offer additional features and customization options.

Remember to carefully choose log levels, capture relevant information, and ensure that log messages are meaningful and informative for effective debugging and monitoring.
````

## 12.2 The logging package, tags: The logging package

```text
    provides a lot of flexibility, and its configuration can appear daunting. This section demonstrates that simple use of the logging package is possible.

The simplest example shows logging to the console:

import logging

logging.debug('A debug message')
logging.info('Some information')
logging.warning('A shot across the bows')

If you run the above script, you'll see this:

WARNING:root:A shot across the bows

Because no particular logger was specified, the system used the root logger. The debug and info messages didn't appear because by default, the root logger is configured to only handle messages with a severity of WARNING or above. The message format is also a configuration default, as is the output destination of the messages - sys.stderr. The severity level, the message format and destination can be easily changed, as shown in the example below:

import logging

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s %(message)s',
                    filename='/tmp/myapp.log',
                    filemode='w')
logging.debug('A debug message')
logging.info('Some information')
logging.warning('A shot across the bows')

The basicConfig() method is used to change the configuration defaults, which results in output (written to /tmp/myapp.log) which should look something like the following:

2004-07-02 13:00:08,743 DEBUG A debug message
2004-07-02 13:00:08,743 INFO Some information
2004-07-02 13:00:08,743 WARNING A shot across the bows

This time, all messages with a severity of DEBUG or above were handled, and the format of the messages was also changed, and output went to the specified file rather than the console.

Formatting uses standard Python string formatting - see section 3.6.2. The format string takes the following common specifiers. For a complete list of specifiers, consult the Formatter documentation.
```
