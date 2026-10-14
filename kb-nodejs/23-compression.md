---
type: reference
title: compression
description: Section 23 of the legacy nodejs-kb notes.
tags: [kb-nodejs]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#23"
---

# compression

[↑ nodejs-kb](/kb-nodejs/README.md)

## 23.1 jszip

```text
        23.1.1  nodejs use jszip and fs to recursively compress a directory use import instead of require

To recursively compress a directory using jszip and fs in Node.js using import statements, you can follow the below steps:

Install the required packages: First, install the required packages, jszip and fs using npm. Run the following command in your terminal or command prompt:

Copy code
npm install jszip fs
Import the packages: In your JavaScript file, import the packages using the import statement. Since jszip does not support ES6 modules, you need to use the default property to access the jszip module. The fs module can be imported directly.

javascript
Copy code
import JSZip from 'jszip';
import fs from 'fs';
Create a function to recursively compress the directory: Next, create a function to recursively compress the directory using jszip and fs. The function should take the path of the directory to compress as a parameter.

javascript
Copy code
async function compressDirectory(path) {
  const zip = new JSZip();
  const files = await fs.promises.readdir(path);
  for (const file of files) {
    const filePath = `${path}/${file}`;
    const stats = await fs.promises.stat(filePath);
    if (stats.isDirectory()) {
      zip.folder(file);
      await compressDirectory(filePath, zip);
    } else {
      const data = await fs.promises.readFile(filePath);
      zip.file(file, data);
    }
  }
  return zip;
}
Call the function and create the zip file: Finally, call the compressDirectory function with the path of the directory to compress and create the zip file.

javascript
Copy code
const path = './my-directory';
compressDirectory(path).then((zip) => {
  zip.generateAsync({ type: 'nodebuffer' }).then((content) => {
    fs.writeFileSync('my-directory.zip', content);
  });
});
This function will recursively compress all the files and directories inside the specified directory and create a zip file named my-directory.zip in the current working directory.

ex:
$ node compress_dir_recurs.mjs 
$ ls output.zip 
output.zip
$ cat compress_dir_recurs.mjs 
// const JSZip = import('jszip');
// const fs = import('fs');
import JSZip from 'jszip';
import fs from 'fs';


async function addFilesToZip(zip, basePath) {
  const files = await fs.promises.readdir(basePath);

  for (const file of files) {
    const fullPath = `${basePath}/${file}`;
    const stat = await fs.promises.stat(fullPath);

    if (stat.isDirectory()) {
      await addFilesToZip(zip.folder(file), fullPath);
    } else {
      const data = await fs.promises.readFile(fullPath);
      zip.file(file, data);
    }
  }
}
async function compressDirectory(directoryPath, zipFilePath) {
  const zip = new JSZip();
  await addFilesToZip(zip, directoryPath);
  const content = await zip.generateAsync({ type: 'nodebuffer' });
  await fs.promises.writeFile(zipFilePath, content);
}
compressDirectory(process.cwd(), process.cwd()+'/output.zip');


        23.1.2
    23.2

24.
```
