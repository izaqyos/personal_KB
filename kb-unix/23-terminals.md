---
type: reference
title: Terminals
description: Section 22 of the legacy unix-kb notes.
tags: [kb-unix]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#22"
---

# Terminals

[↑ unix-kb](/kb-unix/README.md)

## 22.1 X terminals xterm

### 22.1.1 increase font size

```text
		shift & + (of numpad) to increase
		shift & - (of numpad) to decrease
```

### 22.1.2 Colors, scrollbar

```text
		xterm -sb -bg brown -fg yellow

		And, with large fonts:
		 xterm -font -*-fixed-medium-r-*-*-20-*-*-*-*-*-iso8859-*  -geometry 70x24  -bg brown -fg yellow  -sb 
```

### 22.1.3 select fonts

```text
		$  xfontsel
This will open an X window where you can decide on the font type and size. Once you have decided, note down the values as shown in the xfontsel dialog box. It will look something like this ...

-*-fixed-medium-r-*-*-18-*-*-*-*-*-iso8859-* 

...if you have selected a fixed, medium 18pt regular font with iso8859 support.These values will be used while starting xterm. Also to specify the size and position of the xterm window, you can use the -geometry option. Now to test your settings, execute xterm. I have executed xterm with the following settings:

$ xterm -font -*-fixed-medium-r-*-*-18-*-*-*-*-*-iso8859-*
          -geometry 70x24

You will find that it opens with better font clarity. But it is very tedious to run the above command each time you want to open xterm. So you create an alias for it and enter the following line into your .bashrc or .bash_profile file. I have entered it in the .bashrc file in my home directory.

#File: ~.bashrc
alias xterm='xterm -font -*-fixed-medium-r-*-*-18-*-*-*-*-*-iso8859-* -geometry 70x24'


The next time you type xterm, your system will execute the program with the options in your .bashrc file in your home directory.
There is another more powerful way to achieve the same. That is to pass the parameters to your X server so that it will know how to display your xterm when you execute it. This is as follows:
Create a '.Xresources' file in your home directory and enter the values that you want to set. My .Xresources file is as follows:


# File : .Xresources
xterm*font: -*-fixed-medium-r-*-*-18-*-*-*-*-*-iso8859-*
xterm*font1: -*-*-*-*-*-*-2-*-*-*-*-*-*-*
xterm*font2: -misc-fixed-*-r-normal-*-8-*-*-*-*-*-iso8859-*
xterm*font3: -b&h-lucidatypewriter-bold-*-*-*-12-*-*-*-*-*-*-*
xterm*font4: -*-screen-bold-r-normal-*-16-*-*-*-*-*-iso8859-*
xterm*font5: -*-lucidatypewriter-medium-*-*-*-18-*-*-*-*-*-*-*
xterm*font6: -*-lucidatypewriter-medium-*-*-*-20-*-*-*-*-*-*-*
xterm*font7: -dec-terminal-bold-r-normal-*-14-*-*-*-*-*-iso8859-*

XTerm*background: white
XTerm*foreground: black
XTerm*pointerColor: red
XTerm*pointerColorBackground: black
XTerm*cursorColor: navy
XTerm*internalBorder: 3
XTerm*loginShell: true
XTerm*scrollBar: false
XTerm*scrollKey: true
XTerm*saveLines: 1000
XTerm*multiClickTime: 250

Another method to increase the font size of the xterm is by pressing [Ctrl] key and the right mouse button at the same time while you have focus in xterm window. Then a pop-up menu will come up which can be used to set the font size to your taste. By pressing [Ctrl] key and the middle mouse button, you get a pop-up menu which helps you set/unset a lot of other features of your xterm window like enabling/disabling the scroll bars and so on.
Here I have explained some of the methods by which you can configure xterm to look good. Ofcourse, GNU/Linux is all about the freedom of choice. So xterm is not the only light weight x terminal around. Two other x terminals which are light weight and having even more features like support for transparency that come to mind are eterm and aterm. But the advantage of xterm is that you can be sure of having it in all linux distributions by default where as if you want to use aterm or eterm, you may have to download them from their site and install it in your machine.
```

### 22.1.4 My xterm aliases

```text
#alias xt1_small='xterm -font -*-fixed-bold-r-*-*-12-*-*-*-*-*-iso8859-*  -geometry 140x48 -sb -bg brown -fg yellow '
#alias xt2_small='xterm -font -*-fixed-bold-r-*-*-12-*-*-*-*-*-iso8859-*  -geometry 140x48 -sb -bg blue -fg orange '
#alias xt3_small='xterm -font -*-fixed-bold-r-*-*-12-*-*-*-*-*-iso8859-*  -geometry 140x48 -sb -bg lightyellow -fg purple'
#alias xt4_small='xterm -font -*-fixed-bold-r-*-*-12-*-*-*-*-*-iso8859-*  -geometry 140x48 -sb -bg grey -fg blue' 
alias xt1_small='xterm -font -*-fixed-bold-r-*-*-12-*-*-*-*-*-iso8859-*  -geometry 140x48 -sb -bg AntiqueWhite -fg DarkBlue'
alias xt2_small='xterm -font -*-fixed-bold-r-*-*-12-*-*-*-*-*-iso8859-*  -geometry 140x48 -sb -bg grey0  -fg DarkGoldenrod1'
alias xt3_small='xterm -font -*-fixed-bold-r-*-*-12-*-*-*-*-*-iso8859-*  -geometry 140x48 -sb -bg DarkCyan  -fg DarkOliveGreen2'
alias xt4_small='xterm -font -*-fixed-bold-r-*-*-12-*-*-*-*-*-iso8859-*  -geometry 140x48 -sb -bg sienna  -fg chartreuse2' 

alias xts_small="xt1_small& xt2_small& xt3_small& xt4_small&"
```

### 22.1.5 List of colors

```text
http://mkaz.com/solog/system/xterm-colors.html

Xterm Colors
Date: Apr 4, 2010

An update to my previous xterm colors page, removed duplicates and fixed issues with two word colors. These colors are from the command ¿showrgb¿ and can be used for various X11 things. The primary spot I use them is for coloring the foreground/background in xterm.

Example: xterm -fg LightGoldenrod1 -bg CornflowerBlue

You can View Source or use Firebug or Color Picker to get RGB values.
XTerm RGB Colors



255 250 250		snow
248 248 255		ghost white
248 248 255		GhostWhite
245 245 245		white smoke
245 245 245		WhiteSmoke
220 220 220		gainsboro
255 250 240		floral white
255 250 240		FloralWhite
253 245 230		old lace
253 245 230		OldLace
250 240 230		linen
250 235 215		antique white
250 235 215		AntiqueWhite
255 239 213		papaya whip
255 239 213		PapayaWhip
255 235 205		blanched almond
255 235 205		BlanchedAlmond
255 228 196		bisque
255 218 185		peach puff
255 218 185		PeachPuff
255 222 173		navajo white
255 222 173		NavajoWhite
255 228 181		moccasin
255 248 220		cornsilk
255 255 240		ivory
255 250 205		lemon chiffon
255 250 205		LemonChiffon
255 245 238		seashell
240 255 240		honeydew
245 255 250		mint cream
245 255 250		MintCream
240 255 255		azure
240 248 255		alice blue
240 248 255		AliceBlue
230 230 250		lavender
255 240 245		lavender blush
255 240 245		LavenderBlush
255 228 225		misty rose
255 228 225		MistyRose
255 255 255		white
  0   0   0		black
 47  79  79		dark slate gray
 47  79  79		DarkSlateGray
 47  79  79		dark slate grey
 47  79  79		DarkSlateGrey
105 105 105		dim gray
105 105 105		DimGray
105 105 105		dim grey
105 105 105		DimGrey
112 128 144		slate gray
112 128 144		SlateGray
112 128 144		slate grey
112 128 144		SlateGrey
119 136 153		light slate gray
119 136 153		LightSlateGray
119 136 153		light slate grey
119 136 153		LightSlateGrey
190 190 190		gray
190 190 190		grey
211 211 211		light grey
211 211 211		LightGrey
211 211 211		light gray
211 211 211		LightGray
 25  25 112		midnight blue
 25  25 112		MidnightBlue
  0   0 128		navy
  0   0 128		navy blue
  0   0 128		NavyBlue
100 149 237		cornflower blue
100 149 237		CornflowerBlue
 72  61 139		dark slate blue
 72  61 139		DarkSlateBlue
106  90 205		slate blue
106  90 205		SlateBlue
123 104 238		medium slate blue
123 104 238		MediumSlateBlue
132 112 255		light slate blue
132 112 255		LightSlateBlue
  0   0 205		medium blue
  0   0 205		MediumBlue
 65 105 225		royal blue
 65 105 225		RoyalBlue
  0   0 255		blue
 30 144 255		dodger blue
 30 144 255		DodgerBlue
  0 191 255		deep sky blue
  0 191 255		DeepSkyBlue
135 206 235		sky blue
135 206 235		SkyBlue
135 206 250		light sky blue
135 206 250		LightSkyBlue
 70 130 180		steel blue
 70 130 180		SteelBlue
176 196 222		light steel blue
176 196 222		LightSteelBlue
173 216 230		light blue
173 216 230		LightBlue
176 224 230		powder blue
176 224 230		PowderBlue
175 238 238		pale turquoise
175 238 238		PaleTurquoise
  0 206 209		dark turquoise
  0 206 209		DarkTurquoise
 72 209 204		medium turquoise
 72 209 204		MediumTurquoise
 64 224 208		turquoise
  0 255 255		cyan
224 255 255		light cyan
224 255 255		LightCyan
 95 158 160		cadet blue
 95 158 160		CadetBlue
102 205 170		medium aquamarine
102 205 170		MediumAquamarine
127 255 212		aquamarine
  0 100   0		dark green
  0 100   0		DarkGreen
 85 107  47		dark olive green
 85 107  47		DarkOliveGreen
143 188 143		dark sea green
143 188 143		DarkSeaGreen
 46 139  87		sea green
 46 139  87		SeaGreen
 60 179 113		medium sea green
 60 179 113		MediumSeaGreen
 32 178 170		light sea green
 32 178 170		LightSeaGreen
152 251 152		pale green
152 251 152		PaleGreen
  0 255 127		spring green
  0 255 127		SpringGreen
124 252   0		lawn green
124 252   0		LawnGreen
  0 255   0		green
127 255   0		chartreuse
  0 250 154		medium spring green
  0 250 154		MediumSpringGreen
173 255  47		green yellow
173 255  47		GreenYellow
 50 205  50		lime green
 50 205  50		LimeGreen
154 205  50		yellow green
154 205  50		YellowGreen
 34 139  34		forest green
 34 139  34		ForestGreen
107 142  35		olive drab
107 142  35		OliveDrab
189 183 107		dark khaki
189 183 107		DarkKhaki
240 230 140		khaki
238 232 170		pale goldenrod
238 232 170		PaleGoldenrod
250 250 210		light goldenrod yellow
250 250 210		LightGoldenrodYellow
255 255 224		light yellow
255 255 224		LightYellow
255 255   0		yellow
255 215   0		gold
238 221 130		light goldenrod
238 221 130		LightGoldenrod
218 165  32		goldenrod
184 134  11		dark goldenrod
184 134  11		DarkGoldenrod
188 143 143		rosy brown
188 143 143		RosyBrown
205  92  92		indian red
205  92  92		IndianRed
139  69  19		saddle brown
139  69  19		SaddleBrown
160  82  45		sienna
205 133  63		peru
222 184 135		burlywood
245 245 220		beige
245 222 179		wheat
244 164  96		sandy brown
244 164  96		SandyBrown
210 180 140		tan
210 105  30		chocolate
178  34  34		firebrick
165  42  42		brown
233 150 122		dark salmon
233 150 122		DarkSalmon
250 128 114		salmon
255 160 122		light salmon
255 160 122		LightSalmon
255 165   0		orange
255 140   0		dark orange
255 140   0		DarkOrange
255 127  80		coral
240 128 128		light coral
240 128 128		LightCoral
255  99  71		tomato
255  69   0		orange red
255  69   0		OrangeRed
255   0   0		red
255 105 180		hot pink
255 105 180		HotPink
255  20 147		deep pink
255  20 147		DeepPink
255 192 203		pink
255 182 193		light pink
255 182 193		LightPink
219 112 147		pale violet red
219 112 147		PaleVioletRed
176  48  96		maroon
199  21 133		medium violet red
199  21 133		MediumVioletRed
208  32 144		violet red
208  32 144		VioletRed
255   0 255		magenta
238 130 238		violet
221 160 221		plum
218 112 214		orchid
186  85 211		medium orchid
186  85 211		MediumOrchid
153  50 204		dark orchid
153  50 204		DarkOrchid
148   0 211		dark violet
148   0 211		DarkViolet
138  43 226		blue violet
138  43 226		BlueViolet
160  32 240		purple
147 112 219		medium purple
147 112 219		MediumPurple
216 191 216		thistle
255 250 250		snow1
238 233 233		snow2
205 201 201		snow3
139 137 137		snow4
255 245 238		seashell1
238 229 222		seashell2
205 197 191		seashell3
139 134 130		seashell4
255 239 219		AntiqueWhite1
238 223 204		AntiqueWhite2
205 192 176		AntiqueWhite3
139 131 120		AntiqueWhite4
255 228 196		bisque1
238 213 183		bisque2
205 183 158		bisque3
139 125 107		bisque4
255 218 185		PeachPuff1
238 203 173		PeachPuff2
205 175 149		PeachPuff3
139 119 101		PeachPuff4
255 222 173		NavajoWhite1
238 207 161		NavajoWhite2
205 179 139		NavajoWhite3
139 121  94		NavajoWhite4
255 250 205		LemonChiffon1
238 233 191		LemonChiffon2
205 201 165		LemonChiffon3
139 137 112		LemonChiffon4
255 248 220		cornsilk1
238 232 205		cornsilk2
205 200 177		cornsilk3
139 136 120		cornsilk4
255 255 240		ivory1
238 238 224		ivory2
205 205 193		ivory3
139 139 131		ivory4
240 255 240		honeydew1
224 238 224		honeydew2
193 205 193		honeydew3
131 139 131		honeydew4
255 240 245		LavenderBlush1
238 224 229		LavenderBlush2
205 193 197		LavenderBlush3
139 131 134		LavenderBlush4
255 228 225		MistyRose1
238 213 210		MistyRose2
205 183 181		MistyRose3
139 125 123		MistyRose4
240 255 255		azure1
224 238 238		azure2
193 205 205		azure3
131 139 139		azure4
131 111 255		SlateBlue1
122 103 238		SlateBlue2
105  89 205		SlateBlue3
 71  60 139		SlateBlue4
 72 118 255		RoyalBlue1
 67 110 238		RoyalBlue2
 58  95 205		RoyalBlue3
 39  64 139		RoyalBlue4
  0   0 255		blue1
  0   0 238		blue2
  0   0 205		blue3
  0   0 139		blue4
 30 144 255		DodgerBlue1
 28 134 238		DodgerBlue2
 24 116 205		DodgerBlue3
 16  78 139		DodgerBlue4
 99 184 255		SteelBlue1
 92 172 238		SteelBlue2
 79 148 205		SteelBlue3
 54 100 139		SteelBlue4
  0 191 255		DeepSkyBlue1
  0 178 238		DeepSkyBlue2
  0 154 205		DeepSkyBlue3
  0 104 139		DeepSkyBlue4
135 206 255		SkyBlue1
126 192 238		SkyBlue2
108 166 205		SkyBlue3
 74 112 139		SkyBlue4
176 226 255		LightSkyBlue1
164 211 238		LightSkyBlue2
141 182 205		LightSkyBlue3
 96 123 139		LightSkyBlue4
198 226 255		SlateGray1
185 211 238		SlateGray2
159 182 205		SlateGray3
108 123 139		SlateGray4
202 225 255		LightSteelBlue1
188 210 238		LightSteelBlue2
162 181 205		LightSteelBlue3
110 123 139		LightSteelBlue4
191 239 255		LightBlue1
178 223 238		LightBlue2
154 192 205		LightBlue3
104 131 139		LightBlue4
224 255 255		LightCyan1
209 238 238		LightCyan2
180 205 205		LightCyan3
122 139 139		LightCyan4
187 255 255		PaleTurquoise1
174 238 238		PaleTurquoise2
150 205 205		PaleTurquoise3
102 139 139		PaleTurquoise4
152 245 255		CadetBlue1
142 229 238		CadetBlue2
122 197 205		CadetBlue3
 83 134 139		CadetBlue4
  0 245 255		turquoise1
  0 229 238		turquoise2
  0 197 205		turquoise3
  0 134 139		turquoise4
  0 255 255		cyan1
  0 238 238		cyan2
  0 205 205		cyan3
  0 139 139		cyan4
151 255 255		DarkSlateGray1
141 238 238		DarkSlateGray2
121 205 205		DarkSlateGray3
 82 139 139		DarkSlateGray4
127 255 212		aquamarine1
118 238 198		aquamarine2
102 205 170		aquamarine3
 69 139 116		aquamarine4
193 255 193		DarkSeaGreen1
180 238 180		DarkSeaGreen2
155 205 155		DarkSeaGreen3
105 139 105		DarkSeaGreen4
 84 255 159		SeaGreen1
 78 238 148		SeaGreen2
 67 205 128		SeaGreen3
 46 139  87		SeaGreen4
154 255 154		PaleGreen1
144 238 144		PaleGreen2
124 205 124		PaleGreen3
 84 139  84		PaleGreen4
  0 255 127		SpringGreen1
  0 238 118		SpringGreen2
  0 205 102		SpringGreen3
  0 139  69		SpringGreen4
  0 255   0		green1
  0 238   0		green2
  0 205   0		green3
  0 139   0		green4
127 255   0		chartreuse1
118 238   0		chartreuse2
102 205   0		chartreuse3
 69 139   0		chartreuse4
192 255  62		OliveDrab1
179 238  58		OliveDrab2
154 205  50		OliveDrab3
105 139  34		OliveDrab4
202 255 112		DarkOliveGreen1
188 238 104		DarkOliveGreen2
162 205  90		DarkOliveGreen3
110 139  61		DarkOliveGreen4
255 246 143		khaki1
238 230 133		khaki2
205 198 115		khaki3
139 134  78		khaki4
255 236 139		LightGoldenrod1
238 220 130		LightGoldenrod2
205 190 112		LightGoldenrod3
139 129  76		LightGoldenrod4
255 255 224		LightYellow1
238 238 209		LightYellow2
205 205 180		LightYellow3
139 139 122		LightYellow4
255 255   0		yellow1
238 238   0		yellow2
205 205   0		yellow3
139 139   0		yellow4
255 215   0		gold1
238 201   0		gold2
205 173   0		gold3
139 117   0		gold4
255 193  37		goldenrod1
238 180  34		goldenrod2
205 155  29		goldenrod3
139 105  20		goldenrod4
255 185  15		DarkGoldenrod1
238 173  14		DarkGoldenrod2
205 149  12		DarkGoldenrod3
139 101   8		DarkGoldenrod4
255 193 193		RosyBrown1
238 180 180		RosyBrown2
205 155 155		RosyBrown3
139 105 105		RosyBrown4
255 106 106		IndianRed1
238  99  99		IndianRed2
205  85  85		IndianRed3
139  58  58		IndianRed4
255 130  71		sienna1
238 121  66		sienna2
205 104  57		sienna3
139  71  38		sienna4
255 211 155		burlywood1
238 197 145		burlywood2
205 170 125		burlywood3
139 115  85		burlywood4
255 231 186		wheat1
238 216 174		wheat2
205 186 150		wheat3
139 126 102		wheat4
255 165  79		tan1
238 154  73		tan2
205 133  63		tan3
139  90  43		tan4
255 127  36		chocolate1
238 118  33		chocolate2
205 102  29		chocolate3
139  69  19		chocolate4
255  48  48		firebrick1
238  44  44		firebrick2
205  38  38		firebrick3
139  26  26		firebrick4
255  64  64		brown1
238  59  59		brown2
205  51  51		brown3
139  35  35		brown4
255 140 105		salmon1
238 130  98		salmon2
205 112  84		salmon3
139  76  57		salmon4
255 160 122		LightSalmon1
238 149 114		LightSalmon2
205 129  98		LightSalmon3
139  87  66		LightSalmon4
255 165   0		orange1
238 154   0		orange2
205 133   0		orange3
139  90   0		orange4
255 127   0		DarkOrange1
238 118   0		DarkOrange2
205 102   0		DarkOrange3
139  69   0		DarkOrange4
255 114  86		coral1
238 106  80		coral2
205  91  69		coral3
139  62  47		coral4
255  99  71		tomato1
238  92  66		tomato2
205  79  57		tomato3
139  54  38		tomato4
255  69   0		OrangeRed1
238  64   0		OrangeRed2
205  55   0		OrangeRed3
139  37   0		OrangeRed4
255   0   0		red1
238   0   0		red2
205   0   0		red3
139   0   0		red4
255  20 147		DeepPink1
238  18 137		DeepPink2
205  16 118		DeepPink3
139  10  80		DeepPink4
255 110 180		HotPink1
238 106 167		HotPink2
205  96 144		HotPink3
139  58  98		HotPink4
255 181 197		pink1
238 169 184		pink2
205 145 158		pink3
139  99 108		pink4
255 174 185		LightPink1
238 162 173		LightPink2
205 140 149		LightPink3
139  95 101		LightPink4
255 130 171		PaleVioletRed1
238 121 159		PaleVioletRed2
205 104 137		PaleVioletRed3
139  71  93		PaleVioletRed4
255  52 179		maroon1
238  48 167		maroon2
205  41 144		maroon3
139  28  98		maroon4
255  62 150		VioletRed1
238  58 140		VioletRed2
205  50 120		VioletRed3
139  34  82		VioletRed4
255   0 255		magenta1
238   0 238		magenta2
205   0 205		magenta3
139   0 139		magenta4
255 131 250		orchid1
238 122 233		orchid2
205 105 201		orchid3
139  71 137		orchid4
255 187 255		plum1
238 174 238		plum2
205 150 205		plum3
139 102 139		plum4
224 102 255		MediumOrchid1
209  95 238		MediumOrchid2
180  82 205		MediumOrchid3
122  55 139		MediumOrchid4
191  62 255		DarkOrchid1
178  58 238		DarkOrchid2
154  50 205		DarkOrchid3
104  34 139		DarkOrchid4
155  48 255		purple1
145  44 238		purple2
125  38 205		purple3
 85  26 139		purple4
171 130 255		MediumPurple1
159 121 238		MediumPurple2
137 104 205		MediumPurple3
 93  71 139		MediumPurple4
255 225 255		thistle1
238 210 238		thistle2
205 181 205		thistle3
139 123 139		thistle4
  0   0   0		gray0
  0   0   0		grey0
  3   3   3		gray1
  3   3   3		grey1
  5   5   5		gray2
  5   5   5		grey2
  8   8   8		gray3
  8   8   8		grey3
 10  10  10		gray4
 10  10  10		grey4
 13  13  13		gray5
 13  13  13		grey5
 15  15  15		gray6
 15  15  15		grey6
 18  18  18		gray7
 18  18  18		grey7
 20  20  20		gray8
 20  20  20		grey8
 23  23  23		gray9
 23  23  23		grey9
 26  26  26		gray10
 26  26  26		grey10
 28  28  28		gray11
 28  28  28		grey11
 31  31  31		gray12
 31  31  31		grey12
 33  33  33		gray13
 33  33  33		grey13
 36  36  36		gray14
 36  36  36		grey14
 38  38  38		gray15
 38  38  38		grey15
 41  41  41		gray16
 41  41  41		grey16
 43  43  43		gray17
 43  43  43		grey17
 46  46  46		gray18
 46  46  46		grey18
 48  48  48		gray19
 48  48  48		grey19
 51  51  51		gray20
 51  51  51		grey20
 54  54  54		gray21
 54  54  54		grey21
 56  56  56		gray22
 56  56  56		grey22
 59  59  59		gray23
 59  59  59		grey23
 61  61  61		gray24
 61  61  61		grey24
 64  64  64		gray25
 64  64  64		grey25
 66  66  66		gray26
 66  66  66		grey26
 69  69  69		gray27
 69  69  69		grey27
 71  71  71		gray28
 71  71  71		grey28
 74  74  74		gray29
 74  74  74		grey29
 77  77  77		gray30
 77  77  77		grey30
 79  79  79		gray31
 79  79  79		grey31
 82  82  82		gray32
 82  82  82		grey32
 84  84  84		gray33
 84  84  84		grey33
 87  87  87		gray34
 87  87  87		grey34
 89  89  89		gray35
 89  89  89		grey35
 92  92  92		gray36
 92  92  92		grey36
 94  94  94		gray37
 94  94  94		grey37
 97  97  97		gray38
 97  97  97		grey38
 99  99  99		gray39
 99  99  99		grey39
102 102 102		gray40
102 102 102		grey40
105 105 105		gray41
105 105 105		grey41
107 107 107		gray42
107 107 107		grey42
110 110 110		gray43
110 110 110		grey43
112 112 112		gray44
112 112 112		grey44
115 115 115		gray45
115 115 115		grey45
117 117 117		gray46
117 117 117		grey46
120 120 120		gray47
120 120 120		grey47
122 122 122		gray48
122 122 122		grey48
125 125 125		gray49
125 125 125		grey49
127 127 127		gray50
127 127 127		grey50
130 130 130		gray51
130 130 130		grey51
133 133 133		gray52
133 133 133		grey52
135 135 135		gray53
135 135 135		grey53
138 138 138		gray54
138 138 138		grey54
140 140 140		gray55
140 140 140		grey55
143 143 143		gray56
143 143 143		grey56
145 145 145		gray57
145 145 145		grey57
148 148 148		gray58
148 148 148		grey58
150 150 150		gray59
150 150 150		grey59
153 153 153		gray60
153 153 153		grey60
156 156 156		gray61
156 156 156		grey61
158 158 158		gray62
158 158 158		grey62
161 161 161		gray63
161 161 161		grey63
163 163 163		gray64
163 163 163		grey64
166 166 166		gray65
166 166 166		grey65
168 168 168		gray66
168 168 168		grey66
171 171 171		gray67
171 171 171		grey67
173 173 173		gray68
173 173 173		grey68
176 176 176		gray69
176 176 176		grey69
179 179 179		gray70
179 179 179		grey70
181 181 181		gray71
181 181 181		grey71
184 184 184		gray72
184 184 184		grey72
186 186 186		gray73
186 186 186		grey73
189 189 189		gray74
189 189 189		grey74
191 191 191		gray75
191 191 191		grey75
194 194 194		gray76
194 194 194		grey76
196 196 196		gray77
196 196 196		grey77
199 199 199		gray78
199 199 199		grey78
201 201 201		gray79
201 201 201		grey79
204 204 204		gray80
204 204 204		grey80
207 207 207		gray81
207 207 207		grey81
209 209 209		gray82
209 209 209		grey82
212 212 212		gray83
212 212 212		grey83
214 214 214		gray84
214 214 214		grey84
217 217 217		gray85
217 217 217		grey85
219 219 219		gray86
219 219 219		grey86
222 222 222		gray87
222 222 222		grey87
224 224 224		gray88
224 224 224		grey88
227 227 227		gray89
227 227 227		grey89
229 229 229		gray90
229 229 229		grey90
232 232 232		gray91
232 232 232		grey91
235 235 235		gray92
235 235 235		grey92
237 237 237		gray93
237 237 237		grey93
240 240 240		gray94
240 240 240		grey94
242 242 242		gray95
242 242 242		grey95
245 245 245		gray96
245 245 245		grey96
247 247 247		gray97
247 247 247		grey97
250 250 250		gray98
250 250 250		grey98
252 252 252		gray99
252 252 252		grey99
255 255 255		gray100
255 255 255		grey100
169 169 169		dark grey
169 169 169		DarkGrey
169 169 169		dark gray
169 169 169		DarkGray
  0   0 139		dark blue
  0   0 139		DarkBlue
  0 139 139		dark cyan
  0 139 139		DarkCyan
139   0 139		dark magenta
139   0 139		DarkMagenta
139   0   0		dark red
139   0   0		DarkRed
144 238 144		light green
144 238 144		LightGreen
```

### 22.1.6 screen command

```text
http://mkaz.com/solog/system/unix-screen.html

Unix Screen Utility
Date: May 1, 2008

screen is a ¿window¿ manager for the terminal. Similar in concept to tabbed browsing in Mozilla, but without the GUI. It allows you to have multiple terminal sessions open while only taking up one on your desktop. Also, the screen utility allows to detach and run in the background. So you could exit the terminal; log back in; and reattach exactly how you left it, running processes and all. Great for remote server work.
Basics

Start a screen: $ screen

Once you¿re in a screen, you can issue commands using ctrl-a (default), or you can map another key. I use ctrl-a often in the bash shell so I map ctrl-w as my screen command key.

Create ~/.screenrc

  startup_message off
  escape "^Ww"
  defscrollback 5000

Commands
ctrl-w ctrl-c 	Create New Window
ctrl-w ctrl-n 	Next Window
ctrl-w ctrl-p 	Previous Window
ctrl-w 0-9 	Switch to Window #
ctrl-w d 	Detach from current screen (it's still there)
Detach and Reattach

You can detach from a screen session using ctrl-w d ; All your screens will still exist, with all running processes. You can even close your terminal sesssion, ie. disconnect if you were logged in remotely.

You can reattach using: $ screen -r

After reattaching, everything will be as you left it. All screens available and running processes.
Scrolling

Screen is its own window manager and operateas outside of the system windowing, which makes scrolling a bit more difficult. First make sure you define a good chunk of lines to scrollback in your screenrc. Using defscrollback 5000

Next to enter scrollback mode use ctrl-w [ and then to control scrolling it is standard vim commands.

  h,j,k,l - cursor movement
  ctrl-b  - back a page
  ctrl-f  - forward a ag
  /       - search forward
  ?       - search backward

Split Windows
ctrl-w S 	Split screen horizontally
ctrl-w | 	Split screen vertically
ctrl-w tab 	Navigate between splits
ctrl-w X 	Remove current split
ctrl-w Q 	Remove all other splits
ctrl-w :resize 	Resize Screen (prompts for lines)
Tips and Tricks

Sharing Interactive Session

You can use screen to share interactive sessions, allowing people to see and type in the same shared terminal. This could be a nice way to do XP pair-programming remotely.

Try the following:

    Start up to two terminal sessions, A and B, via ssh, telnet or even local.

    In Terminal-A, start up screen: $ screen

    In Terminal-B, connect to screen already established: $ screen -x

    Now whatever you type in either terminal will show up on both. They are actual the same screen shared.

This sharing can be done a few different ways with multiple people. At work, since most of us have admin rights, we simply ¿su¿ to the other person and connect to the screen as them.

Another way is to set the permissions on your pts/tty session, location is usually in /dev somewhere depending on your unix environment. Or use $ mesg y to set your tty session as writable.

		22.1.7
```

## 22.2 E terminals (Linux only)

```text
	Eterm
```

## 22.3 A term (aterm)

```text
23 BASH
```

## 23.1 Useful tools

### 23.1.1 rlogin

```text
Don't have a terminal with multiple windows or another terminal close to your desk? You can get the same result by using rlogin or telnet (Section 1.21) to log in to your host again from the same terminal. What I mean is:

    somehost% vi .cshrc
       ...Make edits to the file...
    somehost% rlogin localhost
       ...Logs you in to your same account...
    An error message
    somehost% logout
    Connection closed.
    somehost% vi .cshrc
       ...Edit to fix mistake...

If you don't have rlogin or telnet, the command su - username, where username is your username, will do almost the same thing. Or, if you're testing your login shell configuration, login will do as well. 
```

## 23.2 Bash's Configuration Files

```text
	In your home directory, 3 files have a special meaning to Bash, allowing you to set up your environment automatically when you log in and when you invoke another Bash shell, and allow you to execute commands when you log out.
These files may exist in your home directory, but that depends largely on the Linux distro you're using and how your sysadmin (if not you) has set up your account. If they're missing, Bash defaults to /etc/profile.
You can easily create these files yourself using your favorite texteditor. They are:

    * .bash_profile : read and the commands in it executed by Bash every time you log in to the system
    * .bashrc : read and executed by Bash every time you start a subshell
    * .bash_logout : read and executed by Bash every time a login shell exits 

Bash allows 2 synonyms for .bash_profile : .bash_login and .profile. These are derived from the C shell's file named .login and from the Bourne shell and Korn shell files named .profile. Only one of these files is read when you log in. If .bash_profile isn't there, Bash will look for .bash_login. If that is missing too, it will look for .profile.
.bash_profile is read and executed only when you start a login shell (that is, when you log in to the system). If you start a subshell (a new shell) by typing bash at the command prompt, it will read commands from .bashrc. This allows you to separate commands needed at login from those needed when invoking a subshell.
However, most people want to have the same commands run regardless of whether it is a login shell or a subshell. This can be done by using the source command from within .bash_profile to execute .bashrc. You would then simply place all the commands in .bashrc.

These files are useful for automatically executing commands like: set, alias, unalias, and setting the PS(1-4) variables, which can all be used to modify your bash environment.

Also use the source command to apply the changes that you have just made in a configuration file. For example if you add an alias to /etc/profile to apply the changes to your current session execute:

      $ source /etc/profile
```

### 23.2.1 Modifying the Bash Shell with the set Command

```text
		Two options that can be set using the set command that will be of some interest to the common user are "-o vi" and "-o emacs". As with all of the environment modifying commands these can be typed at the command prompt or inserted into the appropriate file mentioned above.

      Set Emacs Mode in Bash
            $ set -o emacs 

      This is usually the default editing mode when in the bash environment and means that you are able to use commands like those in Emacs (defined in the Readline library) to move the cursor, cut and paste text, or undo editing.

            Commands to take advantage of bash's Emacs Mode:
            ctrl-a	Move cursor to beginning of line
            ctrl-e	Move cursor to end of line
            meta-b	Move cursor back one word
            meta-f	Move cursor forward one word
            ctrl-w	Cut the last word
            ctrl-u	Cut everything before the cursor 
            ctrl-k	Cut everything after the cursor
            ctrl-y	Paste the last thing to be cut
            ctrl-_	Undo

            NOTE: ctrl- = hold control, meta- = hold meta (where meta is usually the alt or escape key).

      A combination of ctrl-u to cut the line combined with ctrl-y can be very helpful. If you are in middle of typing a command and need to return to the prompt to retrieve more information you can use ctrl-u to save what you have typed in and after you retrieve the needed information ctrl-y will recover what was cut.
      Set Vi Mode in Bash
            $ set -o vi 
	    and for tab completion to work also add
	    bind '"\t":menu-complete'

      Vi mode allows for the use of vi like commands when at the bash prompt. When set to this mode initially you will be in insert mode (be able to type at the prompt unlike when you enter vi). Hitting the escape key takes you into command mode.

            Commands to take advantage of bash's Vi Mode:
            h	Move cursor left
            l	Move cursor right
            A	Move cursor to end of line and put in insert mode
            0	(zero) Move cursor to beginning of line (doesn't put in insert mode) 
            i	Put into insert mode at current position
            a	Put into insert mode after current position
            dd	Delete line (saved for pasting)
            D	Delete text after current cursor position (saved for pasting)
            p	Paste text that was deleted
            j	Move up through history commands
            k	Move down through history commands
            u	Undo
```

### 23.2.2 Useful Commands and Features

```text
		The commands in this section are non-mode specific, unlike the ones listed above.

      Flip the Last Two Characters

      If you type like me your fingers spit characters out in the wrong order on occasion. ctrl-t swaps the order that the last two character appear in.
```

#### 23.2.2.1 Searching Bash History

```text
      As you enter commands at the CLI they are saved in a file ~./.bash_history. From the bash prompt you can browse the most recently used commands through the least recently used commands by pressing the up arrow. Pressing the down arrow does the opposite.

      If you have entered a command a long time ago and need to execute it again you can search for it. Type the command 'ctrl-r' and enter the text you want to search for.
      Dealing with Spaces

      First, I will mention a few ways to deal with spaces in directory names, file names, and everywhere else.
            Using the Backslash Escape Sequence

            One option is to use bash's escape character \. Any space following the backslash is treated as being part of the same string. These commands create a directory called "foo bar" and then remove it.
                  $ mkdir foo\ bar
                  $ rm foo\ bar 

            The backslash escape sequence can also be used to decode commands embedded in strings which can be very useful for scripting or modifying the command prompt as discussed later.
            Using Single/Double Quotes with Spaces and Variables

            Single and double quotes can also be used for dealing with spaces.
                  $ touch 'dog poo'
                  $ rm "dog poo" 

            The difference between single and double quotes being that in double quotes the $, \, and ' characters still preserve their special meanings. Single quotes will take the $ and \ literally and regard the ' as the end of the string. Here's an example:
                  $ MY_VAR='This is my text'
                  $ echo $MY_VAR
                  This is my text
                  $ echo "$MY_VAR"
                  This is my text
                  $ echo '$MY_VAR'
                  $MY_VAR 

            The string following the $ character is interpreted as being a variable except when enclosed in single quotes as shown above.
```

#### 23.2.2.2 Lists Using { and }

```text
The characters { and } allow for list creation. In other words you can have a command be executed on each item in the list. This is perhaps best explained with examples:

      $ touch {temp1,temp2,temp3,temp4} 

This will create/modify the files temp1, temp2, temp3, and temp4 and as in the example above when the files share common parts of the name you can do:

      $ mv temp{1,2,3,4} ./foo\ bar/ 

This will move all four of the files into a directory 'foo bar'.
```

#### 23.2.2.3 Executing Multiple Commands in Sequence

```text
This is a hefty title for a simple task. Consider that you want to run three commands, one right after the other, and you do not want to wait for each to finish before typing the next. You can type all three commands on a line and then start the process:

      $ ./configure; make; make install
      OR
      $ ./configure && make && make install 

With the first if the ./configure fails the other two commands will continue to execute. With the second the commands following the && will only execute if the command previous finishes without error. Thus, the second would be most useful for this example because there is no reason to run 'make' or 'make install' if the configuration fails.
```

#### 23.2.2.4 Piping Output from One Command to Another

```text
Piping allows the user to do several fantastic thing by combining utilities. I will cover only very basic uses for piping. I most commonly use the pipe command, |, to pipe text that is output from one command through the grep command to search for text.

      Examples:
      See if a program, centericq, is running:
            $ ps ax | grep centericq
            25824 pts/2 S 0:18 centericq Count the number of files in a directory (nl counts things):
            $ ls | nl
            1 #.emacs#
            2 BitchX
            3 Outcast double cd.lst
            4 bm.shader
            5 bmtexturesbase.pk3
      If my memory serves using RPM to check if a package is installed:
            $ rpm -qa | grep package_name A more advance example:
            $ cat /etc/passwd | awk -F: '{print $1 "\t" $6}' | sort > ./users This sequence takes the information if the file passwd, pipes it to awk, which takes the first and sixth fields (the user name and home directory respectively), pipes these fields separated by a tab ("\t") to sort, which sorts the list alphabetically, and puts it into a file called users.
```

## 23.3 Aliases

```text
	    If you have used UNIX for a while, you will know that there are many commands available and that some of them have very cryptic names and/or can be invoked with a truckload of options and arguments. So, it would be nice to have a feature allowing you to rename these commands or type something simple instead of a list of options. Bash provides such a feature : the  alias .
Aliasses can be defined on the command line, in .bash_profile, or in .bashrc, using this form :
alias name=command
This means that name is an alias for command. Whenever name is typed as a command, Bash will substitute command in its place. Note that there are no spaces on either side of the equal sign. Quotes around command are necessary if the string being aliassed consists of more than one word. A few examples :
alias ls='ls -aF --color=always' alias ll='ls -l' alias search=grep alias mcd='mount /mnt/cdrom' alias ucd='umount /mnt/cdrom' alias mc='mc -c' alias ..='cd ..' alias ...='cd ../..'
The first example ensures that ls always uses color if available, that dotfiles are listed as well,that directories are marked with a / and executables with a *. To make ls do the same on FreeBSD, the alias would become :
alias ls='/bin/ls -aFG'
To see what aliasses are currently active, simply type alias at the command prompt and all active aliasses will be listed. To "disable" an alias type unalias followed by the alias name.
```

## 23.4 Altering the Command Prompt Look and Information

```text
Bash has the ability to change how the command prompt is displayed in information as well as colour. This is done by setting the PS1 variable. There is also a PS2 variable. It controls what is displayed after a second line of prompt is added and is usually by default '> '. The PS1 variable is usually set to show some useful information by the Linux distribution you are running but you may want to earn style points by doing your own modifications.

Here are the backslash-escape special characters that have meaning to bash:

       \a     an ASCII bell character (07)
       \d     the date  in  "Weekday  Month  Date"  format
              (e.g., "Tue May 26")
       \e     an ASCII escape character (033)
       \h     the hostname up to the first `.'
       \H     the hostname
       \j     the  number of jobs currently managed by the shell
       \l     the basename of the shell's terminal device name
       \n     newline
       \r     carriage return
       \s     the  name  of  the shell, the basename of $0
              (the portion following the final slash)
       \t     the current time in 24-hour HH:MM:SS format
       \T     the current time in 12-hour HH:MM:SS format
       \@     the current time in 12-hour am/pm format
       \u     the username of the current user
       \v     the version of bash (e.g., 2.00)
       \V     the release of bash,  version  +  patchlevel
              (e.g., 2.00.0)
       \w     the current working directory
       \W     the  basename  of the current working direcory
       \!     the history number of this command
       \#     the command number of this command
       \$     if the effective UID is 0, a #, otherwise a $
       \nnn   the character corresponding to the octal number nnn
       \\     a backslash
       \[     begin a sequence of non-printing characters,
              which could be used to embed a terminal control
              sequence into the prompt
       \]     end a sequence of non-printing characters

Colours In Bash:

      Black       0;30     Dark Gray     1;30
      Blue        0;34     Light Blue    1;34
      Green       0;32     Light Green   1;32
      Cyan        0;36     Light Cyan    1;36
      Red         0;31     Light Red     1;31
      Purple      0;35     Light Purple  1;35
      Brown       0;33     Yellow        1;33
      Light Gray  0;37     White         1;37

Here is an example borrowed from the Bash-Prompt-HOWTO:

      PS1="\[\033[1;34m\][\$(date +%H%M)][\u@\h:\w]$\[\033[0m\] " 

This turns the text blue, displays the time in brackets (very useful for not losing track of time while working), and displays the user name, host, and current directory enclosed in brackets. The "\[\033[0m\]" following the $ returns the colour to the previous foreground colour.

How about command prompt modification thats a bit more "pretty":

      PS1="\[\033[1;30m\][\[\033[1;34m\]\u\[\033[1;30m\]@\[\033[0;35m\]\h\[\033[1;30m\]] \[\033[0;37m\]\W \[\033[1;30m\]\$\[\033[0m\] " 

This one sets up a prompt like this: [user@host] directory $

Break down:

      \[\033[1;30m\] - Sets the color for the characters that follow it. Here 1;30 will set them to Dark Gray.
      \u \h \W \$ - Look to the table above
      \[\033[0m\] - Sets the colours back to how they were originally.

Each user on a system can have their own customized prompt by setting the PS1 variable in either the .bashrc or .profile files located in their home directories.

FUN STUFF!

A quick note about bashish. It allows for adding themes to a terminal running under a GUI. Check out the site for some screen-shots of what it can do.
```

## 23.5 CDargs - Shell Bookmarks

```text
Impress your friends and colleagues with lightening fast directory switching using the CDargs bookmarking tool. CDargs is not exclusive to BASH, but is a great addition and works on *nix based systems, including OS X. Download CDargs here in source or rpm.

CDargs allow for setting named marks in directories and moving to them quickly using the cdb command or a ncurses view.
Install

    * Compile / install source
    * Move cdargs-bash.sh to /etc
    * Add this line to your users .bashrc file

            source /etc/cdargs-bash.sh 

    * Relogin or run source ~/.bashrc

Usage

      mark

      Mark a directory that you want to get to quickly in the future. Move to the desired directory and type mark <name> or simply mark to have it take the name of the current directory. You can also mark a directory using the ncurses tool. Run cdargs or cdb to start the ncurses tool. Add a new mark by pressing a.

      cdb

      Now you have a bunch of marked directories. Simply type cdb <name of a mark> to move to the marked directory. Alternatively use cdb and navigate with arrows or number to the desired mark.

      manage

      Start the ncurses tool cdb. Some useful keys to thump:

            a                   add new mark
            d                   delete mark
            e                   edit mark
            right left arrows   move in and out of directories
            l                   list the files in the highlighted directory
            c                   make a copy of a mark
            enter               go to selected directory / mark

      You can also edit the ~/.cdargs text file directly to manage marks
```

## 23.6 Basic and Extended Bash Completion

```text
Basic Bash Completion will work in any bash shell. It allows for completion of:

|   1. File Names
|   2. Directory Names
|   3. Executable Names
|   4. User Names (when they are prefixed with a ~)
|   5. Host Names (when they are prefixed with a @)
|   6. Variable Names (when they are prefixed with a $) 

This is done simply by pressing the tab key after enough of the word you are trying to complete has been typed in. If when hitting tab the word is not completed there are probably multiple possibilities for the completion. Press tab again and it will list the possibilities. Sometimes on my machine I have to hit it a third time.

Extended Programmable Bash Completion is a program that you can install to complete much more than the names of the things listed above. With extended bash completion you can, for example, complete the name of a computer you are trying to connect to with ssh or scp. It achieves this by looking through the known_hosts file and using the hosts listed there for the completion. This is greatly customizable and the package and more information can be found here.

Configuration of Programmable Bash Completion is done in /etc/bash_completion. Here is a list of completions that are in my bash_completion file by default.
```

## 23.7 History

### 23.7.1 Bang Bang and history

```text
Everyone knows about bash history, right? You'd be surprised. Most modern distributions come with bash history enabled and working. If you've never done so before, try using the up and down arrow keys to scroll through your command history. The up arrow will cycle through your command history from newest to oldest, and the down arrow does, well, the opposite.

As luck would have it, different terminals handle arrow keys differently, so the brilliant minds behind bash came up with additional methods for accessing and making use of the command history. We'll start with history. This command simply gives you a numbered list of the commands you've entered with the oldest command having the smallest number. Simple right?

Here's an example of history output:

  190  ps -axu | grep htt
  191  /www/bin/apachectl start
  192  vi /usr/local/lib/php.ini 
  193  cat /www/logs/error_log 
  194  ps -auxw | grep http
  195  pwd

This brings us to bang-bang or !!. !! tells bash "repeat the last command I entered." But the magic doesn't stop there, if you order now, you'll also receive !xyz. !xyz will allow you to run the last command beginning with xyz that you typed. Be sure to add enough to the abbreviation to make it unique or you could run into problems, for instance: In the example above, ps was ran twice, then pwd. If you typed !p you'd get the output of pwd. Typing !ps is just enough to be unique and will execute the ps -auxw | grep http entry in history. By typing just enough to make your history request unique, give you a much better chance of hitting your targeted command. 
```

### 23.7.2 :p isn't just an emoticon

```text
If you need to be very sure of the command you're targeting, :p can be a huge help. !xyz:p will print the command that would be executed rather than executing it. :p is also clever enough to add the printed command to your history list as the last command executed (even though it didn't execute it) so that, if you decide that you like what was printed, a !! is all you need to make it happen, cap'n.

Bash provides a couple of methods for searching the command history. Both are useful in different situations. The first method is to simply type history, find the number of the command you want and then type !N where "N" is the number of the command you'd like to execute. (:p works here too.) The other method is a tad more complex but also adds flexibilty. ^r (ctrl-r) followed by whatever you type will search the command history for that string. The bonus here is that you're able to edit the command line you've searched for before you send it down the line. While the second method is more powerful, when doing some redundant task, it's much easier to remember !22 than it is to muck with ctrl-r type searches or even the arrow keys. 
```

### 23.7.3 Bang dollar-sign

```text
!$ is the "end" of the previous command. Consider the following example: We start by looking for a word in a file
grep -i joe /some/long/directory/structure/user-lists/list-15
if joe is in that userlist, we want to remove him from it. We can either fire up vi with that long directory tree as the argument, or as simply as
vi !$
Which bash expands to:
vi /some/long/directory/structure/user-lists/list-15

A word of caution: !$ expands to the end word of the previous command. What's a word? The bash man page calls a word "A sequence of characters considered as a single unit by the shell." If you haven't changed anything, chances are good that a word is a quoted string or a white-space delimited group of characters. What is a white-space delimited group of characters ? It's a group of characters that are separated from other characters by some form of white-space (which could be a tab, space, etc.) If you're in doubt, :p works here too.

Another thing to keep in mind when using !$ is that if the previous command had no agruments, !$ will expand to the previous command rather than the most recent argument. This can be handy if, for example, you forget to type vi and you just type the filename. A simple vi !$ and you're in.

Similar to !$ is !*. !* is all of the arguments to the previous command rather than just the last one. As usual, this is useful in many situations. Here's a simple example:
vi cd /stuff
oops!
[exit vi, twice]
!*
Which bash expands to: cd /stuff
```

### 23.7.4 Circumflex hats

```text
Have you ever typed a command, hit return and a micro-second later realized that you made a typo? Seems like I'm always typing mroe filename. Luckily, the folks who wrote bash weren't the greatest typists either. In bash, you can fix typos in the previous command with a circumflex (^) or "hat." Consider the following:
vi /etc/X11/XF86config
oops!
^6c^6C
Which bash turns into:
vi /etc/X11/XF86Config

What happened there? The name of the file that I was trying to edit was /etc/X11/XF86Config (note the capital "C.") I typed a lower-case "c" and vi saw my error as a request for a new file. Once I closed out of vi I was able to fix my mistake with the following formula: ^error^correction.

Hats needn't be only used for errors... Let's say you have a few redundant commands that can't be handled with a wildcard, hats will work great for you. For example:
dd if=kern.flp of=/dev/fd0
^kern^mfsroot
Which bash turns into:
dd if=mfsroot.flp of=/dev/fd0
```

### 23.7.5 Brace Expansion

```text
Everyone has done one of the following to make a quick backup of a file:

$ cp filename filename-old
$ cp filename-old filename

These seem fairly straightforward, what could possibly make them more efficient? Let's look at an example:

$ cp filename{,-old}
$ cp filename{-old,}
$ cp filename{-v1,-v2}

In the first two examples, I'm doing exactly the same thing as I did in the previous set of examples, but with far less typing. The first example takes a file called filename and copies it to filename-old The second example takes a file called filename-old and copies it to simply filename.

The third example might give us a clearer picture of what's actually occuring in the first two. In the third example, I'm copying a file called filename-v1 to a file called filename-v2 The curly brace ({) in this context, tells bash that "brace expansion" is taking place. The preamble (in our case filename,) is prepended to each of the strings in the comma-separated list found within the curly braces, creating a new word for each string. So the third example above expands to:

$ cp filename-v1 filename-v2

Brace expansion can take place anywhere in your command string, can occur multiple times in a line and even be nested. Brace expansion expressions are evaluated left to right. Some examples:

$ touch a{1,2,3}b
$ touch {p2,pv,av,}p
$ ls /usr/{,local/}{,s}bin/jojo

The first example will create three files called a1b, a2b and a3b In this case, the preamble is prepended and the postscript is appended to each string within the curly braces. The second example contains no preamble, so the postscript is appended to each string as before, creating p2p, pvp, avp and simply p The last string in the second example is empty, so p is appended to nothing and becomes just p The third example shows multiple brace expansions on the same line and expands to this:

$ ls /usr/bin/jojo /usr/sbin/jojo /usr/local/bin/jojo /usr/local/sbin/jojo

The following example is an example of nested brace expansion.

$ apt-get remove --purge ppp{,config,oe{,conf}}

The shell will expand it to:

$ apt-get remove --purge ppp pppconfig pppoe pppoeconf

The preamble, "ppp" will be prepended to, (left to right,) nothing ({,), config, then a second expansion will take place and a new preamble, "oe" will be prepended to, first nothing ({,), and then conf which will then each be appended to the original preamble.

For more on brace expansion, including examples of nesting, read the bash man page. 
```

### 23.7.6 Word Modifiers

```text
In the first installment of Advancing in the Bash Shell, we learned about :p which is used to print a command, but not execute it. :p is an example of a "word modifier" and it has several siblings. Here's a shortened list from the bash man page:

    * h Remove a trailing file name component, leaving only the head.
    * t Remove all leading file name components, leaving the tail.
    * r Remove a trailing suffix of the form .xxx, leaving the basename.
    * e Remove all but the trailing suffix.

Let's say I'm reading a file nested deeply in a directory structure. When I finish editing the file, I realize that there are some other operations I want to do in that directory and that they would be more easily accomplished if I were in that directory. I can use :h to help get me there.

$ links /usr/local/share/doc/3dm/3DM_help.htm
$ cd !$:h
$ links !-2$:t

Our old friend !$ is back and is being modified by :h. The second command tells bash to cd to !$ or the last argument of the previous command, modifying it with :h which trims off the file name portion of the string, leaving just the directory. The third command looks pretty crazy, but it is acutally quite simple. !-2 means the command N(in this case 2) commands ago. $ means the last argument of that command and the :t means modify that argument to remove the path from it. So, all told: run links using the last argument of the command preceding the most recent one, trimming the path from that argument, or links 3DM_help.html. No big deal, right?

In our next example, we've downloaded a tar ball from the Internet. We check to see if it is going to create a directory for its files and find out that it will not. Rather than clutter up the current directory, we'll make a directory for it.

$ wget http://www.example.com/path/to/jubby.tgz
$ tar tzvf jubby.tgz
{output}
$ mkdir !$:r

The third command will create a directory called 'jubby'.

Word modifiers can be stacked as well. In the next example, we'll download a file to /tmp, and then create a directory for the contents of that tar file in /usr/local/src.

$ cd /tmp
$ wget http://www.example.com/path/KickassApplicationSuite.tar.gz
$ cd /usr/local/src/
$ mkdir !-2$:t:r:r
{creates directory called 'KickassApplicationSuite'}
$ cd !$
$ tar xvzf /tmp/!-4$:t

The first three commands are fairly common and use no substitution. The fourth command, however, seems like gibberish. We know !-2 means the command prior to the most recent one and that $ indicates the last argument of that command. We even know that :t will strip off the path portion of that argument (in this case, even the "http://".) We even know that :r will remove the file-extension to that argument, but here we call it twice, because there are two extensions (.gz is removed by the first :r and .tar is removed by the second.) We then cd into that directory (!$, again, is the argument to the previous command, in this case the argument to mkdir, which is 'KickassApplicationSuite'.) We then untar the file. !-4$ is the last argument to the command four commands ago, which is then modified by :t to remove the path, because we added the path as /tmp/. So the last command becomes tar xvzf /tmp/KickassApplicationSuite.tar.gz.

There's even a word modifier for substitution. :s can be used similarly to circumflex hats to do simple line substitution.

$ vi /etc/X11/XF86config
$ !!:s/config/Config-4/

We know that !! means the previous command string. :s modifies the previous command, substituting the first argument to :s with the second argument to :s. My example used / to delimit the two arguments, but any non-whitespace character can be used. It's also important to note that, just like circumflex hat substitution, the substitution will only take place on the first instance of the string to be substituted. If you want to affect every instance of the substitution string, you must use the :g word modifier along with :s.

$ mroe file1 ; mroe file2
$ !!:gs/mroe/more

The second command substitutes (:s) more for all (:g) instances of mroe. Hint: :g can be used with circumflex hats too!

The final word modifer we'll look at in this tutorial is &. & means repeat the previous substitution. Let's say we're examining file attributes with the ls command.

$ ls -lh myfile otherfile anotherfile
$ !!:s/myfile/myfile.old/

Seems simple enough. :s steps in and changes myfile to myfile.old so we end up with ls -lh myfile.old myfile2 myfile3. & is just a shortcut that we can use to represent the first argument to :s The following example is equivalent to the example above:

$ ls -lh myfile otherfile anotherfile
$ !!:s/myfile/&.old/ 
```

### 23.7.7 Bash Functions

```text
In the first installment of Advancing in the Bash Shell, we learned a bit about aliases. Aliases are simple, static, substitutions. This isn't to say that one can't have a very advanced and complex alias, but rather to say that no matter how complex the alias, the shell is simply substituting ^x for ^y. Shell functions are like aliases, but they have the ability to contain logic and positional arguments, making them quite powerful.

What is a positional argument? I'm glad you asked. A positional argument is an argument whose position is important. For example, in the following function the directory containing the data to be copied must come first and the destination directory must come second.

function treecp { tar cf - "${1}" | (cd "${2}" ; tar xpf -) ; };

It's certainly possible (and easy) to write functions that can accept their arguments in any order, but in many cases, it just doesn't make sense to do so. Imagine if cp could take its arguments in any order and you had to use switches to designate which file was which!

Let's look at the example function above. To let bash know that you're declaring a function, you start your function with the word function. The first argument to function is the name of the function you want to declare. In this case, treecp. The next character, {, as above, indicates a list to the shell. The list, in this case, is a list of commands. After the curly brace, the logic of the function is defined until the function is closed with a semi-colon followed by a closing curly brace (}.)

The logic of this function is fairly simple, once you understand the two variables that it is using. "${1}" is the first argument to a given command. "${2}" is the second, and so on. As you might infer, "${0}" is the name of the command itself. These are positional arguments. Their number indicates their position.

So, in order to use our treecp function, we must supply it with two arguments, the source tree and the destination tree:

$ treecp dmr ~/public_html

treecp becomes "${0}", dmr becomes "${1}", and ~/public_html is expanded to /home/whomever/public_html which then becomes "${2}".

What happens if the user forgets to add either or both arguments? How can the function know that it shouldn't continue? The function, as above, doesn't. It'll just continue on its merry way no matter how few arguments it receives. Let's add some logic to make sure things are as we expect them before proceeding.

Before we can do that, we need to learn about another variable that is set, (like "${0}",) when a command is run. The "${#}" variable is equal to the number of arguments given to a command. For example:

$ function myfunc { echo "${#}" ; } ;
$ myfunc foo bar taco jojo
{output is '4'}
$ myfunc *
{output is the same as 'ls | wc -l'}
$ myfunc
{output is '0'}

So now that we can discover how many arguments were passed to our command, (in this case a function,) we can determine if we've received the two arguments necessary to make our command work. There's still a chance that these arguments are garbage, containing typos or directories that don't exist, but unfortunately the function can't think for you. :)

function treecp {
    if [ "${#}" != 2 ] ; then
        echo "Usage: treecp source destination";
        return 1;
    else
        tar cf - "${1}" | (cd "${2}" ; tar xpf -) ; 
    fi ;
};

I've made use of the [ (aka test) application to see if the number of arugments is other than the expected two. If there are more or less than two arguments, the function willl echo a usage statement and set the value of "${?}" to 1. "${?}" is called a return code. I'll discuss return codes in a little bit. If there are two arguments, the command runs using the first argument as an argument to tar cf - and the second command as an argument to cd. For more information on [ read its man page (man [.)

Ok, so positional parameters are fun, but what if I don't care about placement and I need to pass all arguments to a command within my function? "${*}" is just what you're looking for.

$ function n { echo "${*}" >> ~/notes; };
$ n do the dumb things I gotta do, touch the puppet head.

No matter how many words are passed to n they'll all end up concatenated to the end of notes in my home directory. Be careful to avoid shell-special characters when entering notes in this manner!

Above, we designated 1 as a return code for an error state. There are no rules about what number should be returned in what case, but there are some commonly used return codes that you may want to use or at least be aware of. 0 (zero) is commonly used to denote successful completion of a task. 1 (one), (or any non-zero number,) is commonly used to denote an error state.

If an function or shell script is quite complex, the author may choose to use any number of error codes to mean different things went wrong. For example, return code 28 might mean your script was unable to create a file in a certain directory, whereas return code 29 might mean that the script received an error code from wget when it tried to download a file. Return codes are more helpful to logic than to people. Don't forget to include good error messages for the humans trying to figure out what's going wrong.

The following is an example of checking a return code:

function err { 
    grep "${*}" /usr/include/*/errno.h; 
    if [ "${?}" != 0 ] ; then
        echo "Not found."
    fi
};

grep will return non-zero if no match was found. We then call test again (as [) to see if the return code from grep was other than zero. If ['s expression evaluates to true, in this case if a non-zero number was returned, the command after then will be run. If grep returns 0, it will output the files/lines that match the expression passed to it, ['s expression will evaluate false and the command after then will not run. 
```
