---
type: reference
title: Generate accessor and setter methods from variable names
description: "Vim tip: Generate accessor and setter methods from variable names"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.11"
---

# 33.11 Generate accessor and setter methods from variable names

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Courtesy of http://vim.wikia.com/wiki/
Created: January 12th 2008 Complexity: basic Author: gmonfort Version:


If everytime you start writing a class need to declare a lot of private instance variables and their corresponding accessor and setter public methods, you might find this mappings usefull.

" Public Accessors
map <F3> :s/\(\(\w\)\(\w\+\)\).*/public function get\u\2\3(){\r\treturn \$this->\1;\r}/<CR>
" Public Setters
map <S-F3> :s/\(\(\w\)\(\w\+\)\).*/public function set\u\2\3(\$\1){\r\t\$this->\1 = \$\1;\r}/<CR>

Which will transform this:

variable1
variable2
variable3

Into this (using first mapping):

public function getVariable1(){
  return $this->variable1;
}
public function getVariable2(){
  return $this->variable2;
}
public function getVariable3(){
  return $this->variable3;
}

Or this (using second mapping):

public function setVariable1($variable1){
  $this->variable1 = $variable1;
}
public function setVariable2($variable2){
  $this->variable2 = $variable2;
}
public function setVariable3($variable3){
  $this->variable3 = $variable3;
}
```
