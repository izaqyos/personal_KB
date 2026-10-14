---
type: reference
title: DirDiff
description: "Subsection 19.18 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.18"
---

# 19.18 DirDiff

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
https://github.com/will133/vim-dirdiff
http://www.vim.org/scripts/script.php?script_id=102
```

### 19.18.1 Description

```text
		description
This is a utility that performs a recursive diff on two directories and generate a diff "window".  Based on that window you can perform various diff operations such as opening two files in Vim's diff mode, copy the file or directory recursively to the other, or remove the directory tree from the source directory.
```

### 19.18.2 Install

```text
With pathogen.vim:

cd ~/.vim/bundle
git clone git://github.com/will133/vim-dirdiff

With Vim 8+'s default packaging system:
mkdir -p ~/.vim/pack/bundle/start
cd ~/.vim/pack/bundle/start
git clone git://github.com/will133/vim-dirdiff

(I got connection refused for git: so ran $ git clone https://github.com/will133/vim-dirdiff.git )
```

### 19.18.3 Usage

```text
Doing the following will generate a diff window.

      :DirDiff <A:Src Directory> <B:Src Directory>
  e.g.
      :DirDiff ../something/dir1 /usr/bin/somethingelse/dir2

  The following commands can be used inside the diff window:
  'Enter','o' - Diff open: open the diff file(s) where your cursor is at
  's' - Synchronize the current diff.  You can also select
        a range (through visual) and press 's' to synchronize differences
        across a range.

|        - There are 6 Options you can choose when you hit 's':
|          1. A -> B
|             Copy A to overwrite B
|             If A's file actually points to a directory, it'll copy it to B
|             recursively.
|          2. B -> A
|             Copy B to overwrite A
|             If B's file actually points to a directory, it'll copy it to A
|             recursively.
|          3. Always A
|             For the rest of the items that you've selected,
|             synchronize like (1).
|          4. Always B
|             For the rest of the items that you've selected,
|             synchronize like (2).
|          5. Skip
|             Skip this diff entry.
|          6. Cancel
|             Quit the loop and exit.
|
  'u' - Diff update: update the diff window
  'x' - Sets the exclude pattern, separated by ','
  'i' - Sets the ignore pattern, separated by ','
  'a' - Sets additional arguments for diff, eg. -w to ignore white space,
        etc.
  'q' - Quit DirDiff
  
  The following comamnds can be used in the Vim diff mode
  \dg - Diff get: maps to :diffget<CR>
  \dp - Diff put: maps to :diffput<CR>
  \dj - Diff next: (think j for down)
  \dk - Diff previous: (think k for up)

  You can set the following DirDiff variables.  You can add the following
  "let" lines in your .vimrc file.

  Sets default exclude pattern:
      let g:DirDiffExcludes = "CVS,*.class,*.exe,.*.swp"

  Sets default ignore pattern:
      let g:DirDiffIgnore = "Id:,Revision:,Date:"

  If DirDiffSort is set to 1, sorts the diff lines.
      let g:DirDiffSort = 1

  Sets the diff window (bottom window) height (rows)
      let g:DirDiffWindowSize = 14

  Ignore case during diff
      let g:DirDiffIgnoreCase = 0

  Dynamically figure out the diff text.  If you are using and i18n version
  of diff, this will try to get the specific diff text during runtime.  It's
  turned off by default.  If you are always targetting a specific version of
  diff, you can turn this off and set the DirDiffText* variables
  accordingly.
      let g:DirDiffDynamicDiffText = 0

  String used for the English equivalent "Files "
      let g:DirDiffTextFiles = "Files "

  String used for the English equivalent " and "
      let g:DirDiffTextAnd = " and "

  String used for the English equivalent " differ")
      let g:DirDiffTextDiffer = " differ"

  String used for the English equivalent "Only in ")
      let g:DirDiffTextOnlyIn = "Only in "

      "
```

### 19.18.4 demo

```text
cd ~/temp/
$ mkdir b
$ cd b
$ touch {a..z}{a..z}
$ cd ..
$ mkdir c
$ cd c
$ touch {a..y}{a..y}
$ cd ..
$ ls b c
b:
aa		bx		du		fr		ho		jl		li		nf		pc		qz		sw		ut		wq		yn
ab		by		dv		fs		hp		jm		lj		ng		pd		ra		sx		uu		wr		yo
ac		bz		dw		ft		hq		jn		lk		nh		pe		rb		sy		uv		ws		yp
ad		ca		dx		fu		hr		jo		ll		ni		pf		rc		sz		uw		wt		yq
ae		cb		dy		fv		hs		jp		lm		nj		pg		rd		ta		ux		wu		yr
af		cc		dz		fw		ht		jq		ln		nk		ph		re		tb		uy		wv		ys
ag		cd		ea		fx		hu		jr		lo		nl		pi		rf		tc		uz		ww		yt
ah		ce		eb		fy		hv		js		lp		nm		pj		rg		td		va		wx		yu
ai		cf		ec		fz		hw		jt		lq		nn		pk		rh		te		vb		wy		yv
aj		cg		ed		ga		hx		ju		lr		no		pl		ri		tf		vc		wz		yw
ak		ch		ee		gb		hy		jv		ls		np		pm		rj		tg		vd		xa		yx
al		ci		ef		gc		hz		jw		lt		nq		pn		rk		th		ve		xb		yy
am		cj		eg		gd		ia		jx		lu		nr		po		rl		ti		vf		xc		yz
an		ck		eh		ge		ib		jy		lv		ns		pp		rm		tj		vg		xd		za
ao		cl		ei		gf		ic		jz		lw		nt		pq		rn		tk		vh		xe		zb
ap		cm		ej		gg		id		ka		lx		nu		pr		ro		tl		vi		xf		zc
aq		cn		ek		gh		ie		kb		ly		nv		ps		rp		tm		vj		xg		zd
ar		co		el		gi		if		kc		lz		nw		pt		rq		tn		vk		xh		ze
as		cp		em		gj		ig		kd		ma		nx		pu		rr		to		vl		xi		zf
at		cq		en		gk		ih		ke		mb		ny		pv		rs		tp		vm		xj		zg
au		cr		eo		gl		ii		kf		mc		nz		pw		rt		tq		vn		xk		zh
av		cs		ep		gm		ij		kg		md		oa		px		ru		tr		vo		xl		zi
aw		ct		eq		gn		ik		kh		me		ob		py		rv		ts		vp		xm		zj
ax		cu		er		go		il		ki		mf		oc		pz		rw		tt		vq		xn		zk
ay		cv		es		gp		im		kj		mg		od		qa		rx		tu		vr		xo		zl
az		cw		et		gq		in		kk		mh		oe		qb		ry		tv		vs		xp		zm
ba		cx		eu		gr		io		kl		mi		of		qc		rz		tw		vt		xq		zn
bb		cy		ev		gs		ip		km		mj		og		qd		sa		tx		vu		xr		zo
bc		cz		ew		gt		iq		kn		mk		oh		qe		sb		ty		vv		xs		zp
bd		da		ex		gu		ir		ko		ml		oi		qf		sc		tz		vw		xt		zq
be		db		ey		gv		is		kp		mm		oj		qg		sd		ua		vx		xu		zr
bf		dc		ez		gw		it		kq		mn		ok		qh		se		ub		vy		xv		zs
bg		dd		fa		gx		iu		kr		mo		ol		qi		sf		uc		vz		xw		zt
bh		de		fb		gy		iv		ks		mp		om		qj		sg		ud		wa		xx		zu
bi		df		fc		gz		iw		kt		mq		on		qk		sh		ue		wb		xy		zv
bj		dg		fd		ha		ix		ku		mr		oo		ql		si		uf		wc		xz		zw
bk		dh		fe		hb		iy		kv		ms		op		qm		sj		ug		wd		ya		zx
bl		di		ff		hc		iz		kw		mt		oq		qn		sk		uh		we		yb		zy
bm		dj		fg		hd		ja		kx		mu		or		qo		sl		ui		wf		yc		zz
bn		dk		fh		he		jb		ky		mv		os		qp		sm		uj		wg		yd		{a-z}{a-z}
bo		dl		fi		hf		jc		kz		mw		ot		qq		sn		uk		wh		ye
bp		dm		fj		hg		jd		la		mx		ou		qr		so		ul		wi		yf
bq		dn		fk		hh		je		lb		my		ov		qs		sp		um		wj		yg
br		do		fl		hi		jf		lc		mz		ow		qt		sq		un		wk		yh
bs		dp		fm		hj		jg		ld		na		ox		qu		sr		uo		wl		yi
bt		dq		fn		hk		jh		le		nb		oy		qv		ss		up		wm		yj
bu		dr		fo		hl		ji		lf		nc		oz		qw		st		uq		wn		yk
bv		ds		fp		hm		jj		lg		nd		pa		qx		su		ur		wo		yl
bw		dt		fq		hn		jk		lh		ne		pb		qy		sv		us		wp		ym

c:
aa	aw	bt	cq	dn	ek	fh	ge	hb	hx	iu	jr	ko	ll	mi	nf	oc	oy	pv	qs	rp	sm	tj	ug	vd	wa	ww	xt	yq
ab	ax	bu	cr	do	el	fi	gf	hc	hy	iv	js	kp	lm	mj	ng	od	pa	pw	qt	rq	sn	tk	uh	ve	wb	wx	xu	yr
ac	ay	bv	cs	dp	em	fj	gg	hd	ia	iw	jt	kq	ln	mk	nh	oe	pb	px	qu	rr	so	tl	ui	vf	wc	wy	xv	ys
ad	ba	bw	ct	dq	en	fk	gh	he	ib	ix	ju	kr	lo	ml	ni	of	pc	py	qv	rs	sp	tm	uj	vg	wd	xa	xw	yt
ae	bb	bx	cu	dr	eo	fl	gi	hf	ic	iy	jv	ks	lp	mm	nj	og	pd	qa	qw	rt	sq	tn	uk	vh	we	xb	xx	yu
af	bc	by	cv	ds	ep	fm	gj	hg	id	ja	jw	kt	lq	mn	nk	oh	pe	qb	qx	ru	sr	to	ul	vi	wf	xc	xy	yv
ag	bd	ca	cw	dt	eq	fn	gk	hh	ie	jb	jx	ku	lr	mo	nl	oi	pf	qc	qy	rv	ss	tp	um	vj	wg	xd	ya	yw
ah	be	cb	cx	du	er	fo	gl	hi	if	jc	jy	kv	ls	mp	nm	oj	pg	qd	ra	rw	st	tq	un	vk	wh	xe	yb	yx
ai	bf	cc	cy	dv	es	fp	gm	hj	ig	jd	ka	kw	lt	mq	nn	ok	ph	qe	rb	rx	su	tr	uo	vl	wi	xf	yc	yy
aj	bg	cd	da	dw	et	fq	gn	hk	ih	je	kb	kx	lu	mr	no	ol	pi	qf	rc	ry	sv	ts	up	vm	wj	xg	yd
ak	bh	ce	db	dx	eu	fr	go	hl	ii	jf	kc	ky	lv	ms	np	om	pj	qg	rd	sa	sw	tt	uq	vn	wk	xh	ye
al	bi	cf	dc	dy	ev	fs	gp	hm	ij	jg	kd	la	lw	mt	nq	on	pk	qh	re	sb	sx	tu	ur	vo	wl	xi	yf
am	bj	cg	dd	ea	ew	ft	gq	hn	ik	jh	ke	lb	lx	mu	nr	oo	pl	qi	rf	sc	sy	tv	us	vp	wm	xj	yg
an	bk	ch	de	eb	ex	fu	gr	ho	il	ji	kf	lc	ly	mv	ns	op	pm	qj	rg	sd	ta	tw	ut	vq	wn	xk	yh
ao	bl	ci	df	ec	ey	fv	gs	hp	im	jj	kg	ld	ma	mw	nt	oq	pn	qk	rh	se	tb	tx	uu	vr	wo	xl	yi
ap	bm	cj	dg	ed	fa	fw	gt	hq	in	jk	kh	le	mb	mx	nu	or	po	ql	ri	sf	tc	ty	uv	vs	wp	xm	yj
aq	bn	ck	dh	ee	fb	fx	gu	hr	io	jl	ki	lf	mc	my	nv	os	pp	qm	rj	sg	td	ua	uw	vt	wq	xn	yk
ar	bo	cl	di	ef	fc	fy	gv	hs	ip	jm	kj	lg	md	na	nw	ot	pq	qn	rk	sh	te	ub	ux	vu	wr	xo	yl
as	bp	cm	dj	eg	fd	ga	gw	ht	iq	jn	kk	lh	me	nb	nx	ou	pr	qo	rl	si	tf	uc	uy	vv	ws	xp	ym
at	bq	cn	dk	eh	fe	gb	gx	hu	ir	jo	kl	li	mf	nc	ny	ov	ps	qp	rm	sj	tg	ud	va	vw	wt	xq	yn
au	br	co	dl	ei	ff	gc	gy	hv	is	jp	km	lj	mg	nd	oa	ow	pt	qq	rn	sk	th	ue	vb	vx	wu	xr	yo
av	bs	cp	dm	ej	fg	gd	ha	hw	it	jq	kn	lk	mh	ne	ob	ox	pu	qr	ro	sl	ti	uf	vc	vy	wv	xs	yp

vi 
:DirDiff b c 
		19.18.5
```
