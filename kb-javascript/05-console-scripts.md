---
type: reference
title: Console scripts
description: Section 5 of the legacy javascript-kb notes.
tags: [kb-javascript, check, all, checkboxes, select]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "javascript-kb#5"
---

# Console scripts

[↑ javascript-kb](/kb-javascript/README.md)

## 5.1 Write console scripts to automate stuff, check all checkboxes, tags: check all checkboxes select all

```text
cmd+alt+I open dev tools
$$('input[type="checkbox"').map(i => i.checked = true)


Right click component, inspect, copy paste class name. E.g. UIVeri5ProviderEditBtn
For simple button click
document.querySelector(".UIVeri5ProviderDeleteBtn").click()

For all checkboxes select, e.g. update job (<internal-url>)
for (let elem  of document.querySelectorAll("input[type=checkbox]")){ elem.click()};

https://stackoverflow.com/questions/14245769/check-all-checkboxes-in-page-via-developer-tools/14245862

(function() {
    var aa = document.querySelectorAll("input[type=checkbox]");
    for (var i = 0; i < aa.length; i++){
        aa[i].checked = true;
    }
})()

$$('input[type="checkbox"').map(i => i.checked = true)

    5.2
```
