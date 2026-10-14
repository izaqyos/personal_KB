---
type: reference
title: Replace
description: "Legacy sed KB section: Replace (remove unwanted prefix (H:\\ismg_israel_acs), add \"\" at the start and end of each line, Change windows path to linux path:)"
tags: [sed, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "sed/KB_sed#1"
---

# Replace

[↑ KB_sed](/sed/kb-sed/README.md)

## 1.1 remove unwanted prefix (H:\ismg_israel_acs)

```text
	$ cat stam | awk -F"\@" '{print $1}' | sed 's/H:\\ismg_israel_acs//'	
```

## 1.2 add "" at the start and end of each line

```text
	sed -e 's/^/\"/' -e 's/$/\"/' stam
```

## 1.3 Change windows path to linux path:

```text
	echo "\cygdrive\d\ismg_israel_acs\Acs\PDE\PdeDefs.h@@\main\<internal-path>\<internal-path>\3" | sed -e 's_\\_\/_g'

	1.4 Strip the first 36 chars from each line (good for setting up ACS log files for diffs)
	sed 's/^.\{36\}//g
```

## 1.5 Automatically activate CC version tree on change set files.

```text
	Take ouput of command:
	$ ct lsactivity -long -me
activity "activity070215.130919"
 15-Feb-07.13:12:09 by yosi Ytzhak (<user>.Users@<user>-w2k01)
  master replica: ntn-1@\<internal-path>
  owner: EMEA\<user>
  group: BUILTIN\Users
  stream: <internal-path>@\<internal-path>
  title: activity070215.130919
  change set versions:
activity "build11_small_fix"
 15-Feb-07.13:14:45 by yosi Ytzhak (<user>.Users@<user>-w2k01)
  master replica: ntn-1@\<internal-path>
  owner: EMEA\<user>
  group: BUILTIN\Users
  stream: <internal-path>@\<internal-path>
  current view: <internal-path>
  title: build11_small_fix
  change set versions:
    g:\ismg_israel_acs\Acs\EAPDlls\acsEapTls\eapTls.cpp@@\main\<internal-path>\<internal-path>\<internal-path>\3
activity "build11_bugs"
 18-Feb-07.12:26:25 by yosi Ytzhak (<user>.eng@<user>-wxp)
  master replica: ntn-1@\<internal-path>
  owner: EMEA\<user>
  group: <employer>\eng
  stream: <internal-path>@\<internal-path>
  title: build11_bugs
  change set versions:
    g:\ismg_israel_acs\Acs\DZAuth\authentication.cpp@@\main\<internal-path>\<internal-path>\<internal-path>\2
activity "build11_bugs_PV_conf_and_san_cn_fix"
 21-Feb-07.10:27:46 by yosi Ytzhak (<user>.eng@<user>-wxp)
  master replica: ntn-1@\<internal-path>
  owner: EMEA\<user>
  group: <employer>\eng
  stream: <internal-path>@\<internal-path>
  current view: <internal-path>
  title: build11_bugs_PV_conf_and_san_cn_fix
  change set versions:
    g:\ismg_israel_acs\Acs\PostureValidation\NpsInBandAction.cpp@@\main\<internal-path>\<internal-path>\CHECKEDOUT.425732
    g:\ismg_israel_acs\Acs\EAPDlls\acsEapTls\eapTls.cpp@@\main\<internal-path>\<internal-path>\<internal-path>\5
    g:\ismg_israel_acs\Acs\EAPDlls\acsEapTLV\acsEapTLV.cpp@@\main\<internal-path>\<internal-path>\<internal-path>\1
    g:\ismg_israel_acs\Acs\Shared\Versions.h@@\main\<internal-path>\<internal-path>\<internal-path>\2
    g:\ismg_israel_acs\Acs\AcsEap\eapTeap.h@@\main\<internal-path>\<internal-path>\1
    g:\ismg_israel_acs\Acs\AcsEap\acsEap.h@@\main\<internal-path>\<internal-path>\<internal-path>\1
    g:\ismg_israel_acs\Acs\EAPDlls\acsTeap\eapTeap.cpp@@\main\<internal-path>\<internal-path>\<internal-path>\1
    g:\ismg_israel_acs\Acs\EAPDlls\acsEapTls\eapTls.cpp@@\main\<internal-path>\<internal-path>\<internal-path>\4

	Format it, remove prefix g:\ismg_israel_acs\Acs chamge \ to / (linux) and run lsvtree:

	_browse_cc_change_set(){
        for file in `ct lsactivity -long -me | grep ismg_israel_acs | awk -F"@" '{print $1 }' | sed -e 's/\w:\\\ismg_israel_acs\\\Acs/./' |  sed -e 's_\\\_/_g' `;
                do echo $file;
                ct lsvtree -g $file;
        done
	}


	1.6 replace pattern in a specific line or range of lines
sed -ie '125s/2.3.2/2.3.3/' portal.cf.services.integration/pom.xml

	1.7
```
