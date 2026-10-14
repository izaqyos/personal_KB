---
type: reference
title: Bash plugin
description: "Subsection 19.10 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.10"
---

# 19.10 Bash plugin

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
	for help :h bashsupport 

		usage w/o GUI
			
			The frequently used constructs can be inserted with key mappings.  The
			mappings are also described in the document bash-hot-keys.pdf (reference card,
			part of this package).
			Hint: Typing speed matters. The combination of a leader ('\') and the
			following character(s) will only be recognized for a short time.


			  -- Load / Unload bash Support -------------------------

			  \lbs    Load Bash Support    (normal)
			  \ubs    Unload Bash Support  (normal)

			  -- Comments -------------------------------------------

			  \cl     Line End Comment                (normal)
			  \cf     Frame Comment                   (normal)
			  \cu     Function Description            (normal)
			  \ch     File Header                     (normal)
			  \ckb    Keyword comment BUG             (normal)
			  \ckt    Keyword comment TODO            (normal)
			  \ckr    Keyword comment TRICKY          (normal)
			  \ckw    Keyword comment WARNING         (normal)
			  \ckn    Keyword comment New_Keyword     (normal)
			  \cc     code to comment                 (normal, visual)
			  \co     comment to code                 (normal, visual)
			  \cd     Date                            (normal)
			  \ct     Date & Time                     (normal)
			  \ce     echo "..."                      (normal)
			  \cr     remove echo "..."               (normal)
			  \cv     vim modeline                    (normal)
							     
			  -- Statements ------------------------------------------

			  \ac     case in ... esac                (normal)
			  \al     elif then                       (normal)
			  \af     for in do done                  (normal, visual)
			  \ai     if then fi                      (normal, visual)
			  \ae     if then else fi                 (normal, visual)
			  \as     select in do done               (normal, visual)
			  \at     until do done                   (normal, visual)
			  \aw     while do done                   (normal, visual)
			  \ao     echo -e "..."                   (normal, visual)

			  -- Run ------------------------------------------------

			  \rr     update file, run script         (normal)
			  \rc     update file, check syntax       (normal)
			  \ra     set command line arguments      (normal)
			  \rd     start debugger                  (normal)
			  \re     make script executable          (normal)
			  \rh     hardcopy buffer to FILENAME.ps  (normal)
			  \rs     settings and hot keys           (normal)
			  \rt     set xterm size                  (normal)
			  \ro     change output destination       (normal)

			  -- bash help ------------------------------------------

			  \h      display help for the builtin    (normal)
				  under the cursor


			File bash-hot-keys.pdf contains a reference card for these key mappings.
			Multiline inserts and code snippets will be indented after insertion.

			The hot keys are defined in the file type plugin sh.vim (part of this
			bash-support plugin package).
```
