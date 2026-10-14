---
type: reference
title: "Plot, print, display, pretty print etc."
description: "Plotting and printing on Unix: ASCII banner and gnuplot."
tags: [unix, shell, tips, examples, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#17"
---

# Plot, print, display, pretty print etc.

[↑ unix-kb](/kb-unix/README.md)

## 17.1. print a ascii banner

```text
		$ banner <string>
```

## 17.2. gnuplot

```text
		gnuplot>  plot sin(x)   
		gnuplot>  splot sin(x*y/20)
		gnuplot>  plot sin(x) title 'Sine Function', tan(x) title 'Tangent'	

	      gnuplot>  plot  "force.dat" using 1:2 title 'Column', \
			      "force.dat" using 1:3 title 'Beam'

			      instead of letter coordinated use numbers and then give letter names with label.
		gnuplot> set title "The letters frequency in the mutated file"
		gnuplot> set xlabel "letters" 
		gnuplot> set ylabel "frequency"
		gnuplot> set terminal postscript eps color
		gnuplot> set output "gplot_markov0.eps"
		gnuplot> plot "readme_markov0_gplot" w l, "readme_markov0_orig_gplot" w l
		It is possible to manualy edit the PS file and change keys lables and so forth.
		For example, to change x-tics (X indices) search for ( n) and replace the number n with the value of choice.

	Plot to ps file:
		gnuplot> plot "t1" w l
	gnuplot> plot "t1" w l,"t2" w l
	gnuplot> set term postscript portrait mono "Times-Roman" 15
	Terminal type set to 'postscript'
	Options are 'portrait noenhanced monochrome blacktext \
	  dashed dashlength 1.0 linewidth 1.0 defaultplex \
	  palfuncparam 2000,0.003 \
	  butt "Times-Roman" 15'
	gnuplot> set output "gp.ps"
	gnuplot> plot "t1" w l,"t2" w l
	gnuplot>
	49. sh functions.
	since not possible to pass parameters to aliases, one way to achieve that
	is to define a function that take parameters and create and alias to it.
	example, I want a CD <drive letter> alias to does cd /cygdrive/<drive letter>
	I added the following function and alias to my .bashrc:
	_cd () {
		cd /cygdrive/"$1"
	   }
	alias CD="_cd "
```
