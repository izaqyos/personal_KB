---
type: reference
title: Services
description: "Linux services with systemd: systemctl enable/start/status, targets vs. runlevels, unit files (replacing chkconfig, service and SysV init scripts)."
tags: [linux, configuration-file, howto, reference, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#31"
sources:
  - { id: systemctl, resource: "https://man7.org/linux/man-pages/man1/systemctl.1.html", title: "systemctl(1) - Linux manual page" }
  - { id: runlevel, resource: "https://man7.org/linux/man-pages/man8/runlevel.8.html", title: "runlevel(8) - Linux manual page" }
  - { id: systemd-service, resource: "https://man7.org/linux/man-pages/man5/systemd.service.5.html", title: "systemd.service(5) - Linux manual page" }
  - { id: systemd-special, resource: "https://man7.org/linux/man-pages/man7/systemd.special.7.html", title: "systemd.special(7) - Linux manual page" }
  - { id: systemd-bootup, resource: "https://man7.org/linux/man-pages/man7/bootup.7.html", title: "bootup(7) - Linux manual page" }
  - { id: systemd-news, resource: "https://github.com/systemd/systemd/blob/main/NEWS", title: "systemd NEWS (release notes, v258 and v260 SysV removals)" }
---

# Services

[↑ KB_Linux](/linux/kb-linux/README.md)

## 31.1 Configuring services in Linux.

### 31.1.1 Overview of services in Linux.

```text
Services are programs (called daemons) that once started run continuously in the background and are ready for input or monitor changes in your computer and respond to them. For example 
the Apache server has a daemon called httpd (the d is for daemon) that listens on port 80 on your computer and when it receives a request for a page it sends the 
appropriate data back to the client machine.
Many services are required to run all the time however many can be safely turned of for both security reasons as running 
unnecessary services opens more doors into your computer, but also for performance reasons. It may not make much difference but your computer should boot slightly faster the less services 
it has to start on boot.
Even though I use my laptop as a development machine running Apache, PHP and MySQL and I am also connected to a home network I choose to start Apache, MySQL and 
Samba manually as required. This page explains how to start and stop services and how to control which services start automatically at boot time.
```

### 31.1.2 chkconfig and service commands.

> Updated 2026-10 to current practice.[^systemctl]

On any current distro (RHEL/Fedora, Debian/Ubuntu, SUSE, Arch) services are managed by **systemd**, and one command, `systemctl`, replaces both old tools:

- **Boot-time state** (old `chkconfig`): `systemctl enable` / `disable` creates or removes the unit's install symlinks, so it's applied at next boot. It doesn't start or stop anything by itself.
- **Runtime state** (old `service`): `systemctl start` / `stop` / `restart` / `reload` / `status` acts on the running system now, and the change isn't remembered across reboots.
- Do both at once with `--now`: `systemctl enable --now httpd` (enable and start) or `systemctl disable --now httpd` (disable and stop).

The unit for a service is named `<name>.service`; the `.service` suffix can be omitted on the command line. Changing system services needs root (`sudo`).

### 31.1.3 GUI tool - system-config-services.

> Updated 2026-10 to current practice.[^systemctl]

`system-config-services` (and the other Red Hat `system-config-*` / `redhat-config-*` GUIs) are long gone. If you want a GUI, the usual option today is the **Cockpit** web console (Services page), which shows enabled/running state and can start, stop, enable and disable units. As before, it's easier from the command line, see below.

### 31.1.4 Commands

#### 31.1.4.1 Finding which services start on boot using chkconfig

> Updated 2026-10 to current practice.[^systemctl]

List the boot-time (enablement) state of all services:

```bash
systemctl list-unit-files --type=service
```

```text
UNIT FILE                    STATE     PRESET
atd.service                  enabled   enabled
auditd.service               enabled   enabled
bluetooth.service            enabled   enabled
crond.service                enabled   enabled
httpd.service                disabled  disabled
sshd.service                 enabled   enabled
...
```

Unlike `chkconfig --list` there is one state per unit (`enabled`, `disabled`, `static`, `masked`, ...), not one per runlevel. A unit is enabled for whichever **target** its `[Install]` section names (`WantedBy=multi-user.target` for most daemons). `enabled` says nothing about whether it is running right now.

Runlevels were replaced by targets. Mapping from `runlevel(8)`:[^runlevel]

| Old runlevel | systemd target |
|---|---|
| 0 | `poweroff.target` |
| 1 | `rescue.target` |
| 2, 3, 4 | `multi-user.target` (text/console, full multi-user) |
| 5 | `graphical.target` (multi-user with GUI) |
| 6 | `reboot.target` |

Check what you boot into with `systemctl get-default` (desktops: `graphical.target`, servers: `multi-user.target`).

Query one service:

```bash
systemctl is-enabled httpd       # enabled / disabled / static / masked
systemctl list-unit-files 'httpd*'
```

#### 31.1.4.2 View only services not started on boot.

> Updated 2026-10 to current practice.[^systemctl]

`--state=` filters by enablement state, so no `grep -v` trick is needed:

```bash
systemctl list-unit-files --type=service --state=disabled   # not started on boot
systemctl list-unit-files --type=service --state=enabled    # started on boot
```

#### 31.1.4.3 Changing whether a service starts on boot.

> Updated 2026-10 to current practice.[^systemctl]

```bash
sudo systemctl enable httpd          # start on boot (from next boot)
sudo systemctl disable httpd         # don't start on boot
sudo systemctl enable --now httpd    # start on boot AND start now
sudo systemctl mask httpd            # make it impossible to start (links unit to /dev/null)
sudo systemctl unmask httpd
```

There are no per-runlevel switches like `--level 345`: the unit's `[Install]` section decides which target pulls it in. That still lets you turn off services you don't need at boot and start them only when the need arises.

#### 31.1.4.4 Starting and stopping services using the service command.

> Updated 2026-10 to current practice.[^systemctl]

```bash
sudo systemctl start httpd
sudo systemctl stop httpd
sudo systemctl restart httpd
sudo systemctl reload httpd          # re-read config without restarting, if the service supports it
systemctl status httpd               # state, main PID, recent log lines
journalctl -u httpd                  # full log for the unit
```

`systemctl` prints nothing on success; use `status` to check. As before, starting a service this way doesn't enable it: after a reboot it won't come back unless it's also enabled. In my case that's what I want: I often start my laptop just to check email and have no need for Apache, MySQL, Samba and so on, so I start them as required. A simple script (or a single `systemctl start httpd mariadb` - `systemctl` accepts several units) starts several of them at once.

**Get all running services** (old `service --status-all | grep running`):

```bash
systemctl list-units --type=service --state=running
systemctl list-units --type=service --all     # loaded services, running or not
systemctl --failed                            # anything that failed to start
```

**Which services do I need to run?**
I still turn off as many services as I can while being able to use the machine for day-to-day things: faster boot, a smaller attack surface and fewer open ports. It's easy to test: turn a service off (`systemctl disable --now <unit>`), and if you lose some functionality just turn it back on. Services I only need occasionally (web server, database, Samba, SSH sessions) I start by hand when required. `systemd-analyze blame` shows which units cost the most boot time.

## 31.2 Automatically load services (and scripts) after reboot

### 31.2.1 Get To Know Linux: The /etc/init.d Directory

> Updated 2026-10 to current practice.[^systemd-service][^systemd-news]

`/etc/init.d` start/stop scripts and the `/etc/rc#.d/` `S`/`K` symlink farms belong to SysV init. On systemd systems each service is a declarative **unit file**:

- `/usr/lib/systemd/system/` (`/lib/systemd/system/` on older Debian/Ubuntu): units shipped by packages; don't edit these.
- `/etc/systemd/system/`: your own units, overrides and the `*.wants/` symlinks that `systemctl enable` creates.
- `sudo systemctl edit <unit>` creates a drop-in override; `systemctl cat <unit>` shows the effective unit.

Instead of `/etc/init.d/networking restart` you run `sudo systemctl restart <unit>` (the network service name depends on the distro, e.g. `NetworkManager` or `systemd-networkd`).

Upstream systemd has dropped the SysV compatibility layer: **v260 removed support for SysV init scripts** (`systemd-sysv-generator`) **and for `/etc/rc.local`** (`rc-local.service`). Distros on older systemd may still run them, but don't rely on it. Ship a native unit file.[^systemd-news]

**Replacing `/etc/rc.local`**: put the "run this at boot" commands in a oneshot unit (the old Samba workaround becomes just `systemctl enable smb`):

```ini
# /etc/systemd/system/local-startup.service
[Unit]
Description=Local boot-time commands (replacement for rc.local)
Wants=network-online.target
After=network-online.target

[Service]
Type=oneshot
ExecStart=/usr/local/sbin/local-startup.sh
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now local-startup.service
```

Linux is still flexible, but today the clean way to make something start at boot is a unit file with explicit dependencies.

### 31.2.2 Linux Init Process / PC Boot Procedure

#### 31.2.2.1 PC Boot and Linux Init Process:

> Updated 2026-10 to current practice.[^systemd-bootup]

1. **Firmware**: UEFI (legacy BIOS on old machines) runs POST, then loads a boot loader from the EFI System Partition (on BIOS machines, via the MBR).
2. **Boot loader**: GRUB 2 or systemd-boot (LILO is obsolete) picks the kernel entry and loads the kernel plus its **initramfs**.
3. **initramfs**: a small early userspace (usually running systemd itself) finds and mounts the real root filesystem, then switches root to it.
4. **PID 1**: the kernel runs `/sbin/init`, which on current distros is **systemd**. There's no `/etc/rc.d/rc.sysinit`: systemd starts units in parallel to reach `default.target` (see `bootup(7)`).

`systemd-analyze` shows how long boot took; `systemd-analyze critical-chain` shows what it waited on.

#### 31.2.2.2 The Linux Init Processes:

> Updated 2026-10 to current practice.[^systemd-special][^systemd-news]

PID 1 is still the parent of all user processes, but it's **systemd**, and `/etc/inittab` is not used. What inittab configured maps to:

| `/etc/inittab` / rc.sysinit item | systemd equivalent |
|---|---|
| `id:3:initdefault:` | `default.target` symlink: `systemctl get-default`, `sudo systemctl set-default multi-user.target` |
| `si::sysinit:/etc/rc.d/rc.sysinit` | `sysinit.target` and the units it pulls in (mounts, swap, udev, `systemd-sysctl`, `systemd-modules-load`, fsck, ...) |
| `ca::ctrlaltdel:` | `ctrl-alt-del.target` (mask it to disable) |
| `respawn:/sbin/mingetty ttyN` | `getty@ttyN.service` (spawned on demand by `systemd-logind`), `Restart=` in units |
| `x:5:respawn:/etc/X11/prefdm` | `display-manager.service` under `graphical.target` |
| `/etc/rc.d/rc.local` | your own unit file (see 31.2.1) |

The low PIDs in the old table (`kflushd`, `kupdate`, `kpiod`, ...) were 2.2/2.4-era kernel threads; today `ps -ef` shows `kthreadd` as PID 2 and kernel threads in brackets under it.

Logs that went to syslog / `dmesg` are in the journal: `journalctl -b` (this boot), `journalctl -k` (kernel).

#### 31.2.2.3 Linux init Run Levels:

> Updated 2026-10 to current practice.[^runlevel][^systemd-news]

Runlevels are replaced by **targets** (see the mapping table in 31.1.4.1). `runlevel(8)` itself says runlevels are obsolete and the mapping is only approximate, because systemd can have several targets active at once.[^runlevel] Upstream **systemd v258 removed** the `runlevel`, `telinit` and `init N` commands and the `runlevel[0-6].target` aliases. Some distros build them back in (v260 added a `-Dcompat-sysv-interfaces=yes` build option to restore the targets), but use the target commands:[^systemd-news]

```bash
systemctl get-default                          # what we boot into (old initdefault)
sudo systemctl set-default multi-user.target   # console-only server (old runlevel 3)
sudo systemctl set-default graphical.target    # GUI login (old runlevel 5)
sudo systemctl isolate multi-user.target       # switch now (old "init 3")
systemctl list-units --type=target             # which targets are active
```

The `rc#.d` directories and S/K script ordering are replaced by unit dependencies (`Wants=`, `Requires=`, `After=`, `Before=`). To start/stop an individual daemon use `systemctl start|stop|restart|reload|status <unit>` instead of `/etc/init.d/<script>`. Use `ps aux` or `systemctl status` (cgroup tree) to see processes.

TIP: list services and their boot state: `systemctl list-unit-files --type=service`; running ones: `systemctl list-units --type=service --state=running`.

#### 31.2.2.4 Run Level Commands:

> Updated 2026-10 to current practice.[^systemctl]

```bash
sudo systemctl poweroff         # shutdown + power off (old: init 0, halt -p)
sudo shutdown -h now            # still works; shutdown +5 / shutdown -c schedule / cancel
sudo systemctl reboot           # old: init 6
sudo systemctl rescue           # single-user / rescue mode (old: init 1)
sudo systemctl emergency        # even more minimal than rescue
```

`poweroff`, `reboot` and `halt` still exist as commands on systemd systems.

#### 31.2.2.5 Init Script Activation:

> Updated 2026-10 to current practice.[^systemctl][^systemd-service]

There are no `S20abc` / `K15xyz` links to order. `systemctl enable foo` reads the unit's `[Install]` section and creates a symlink such as `/etc/systemd/system/multi-user.target.wants/foo.service`; `systemctl disable` removes it (old `chkconfig --add/--del`). Ordering comes from `After=` / `Before=` in the unit, not from numbers, and independent units start in parallel.

Many services in the old "basic services" list no longer exist or have been replaced:

| Old SysV service | Today |
|---|---|
| `syslog` | `systemd-journald` (plus `rsyslog` where text log files are needed) |
| `ntpd` | `chronyd` or `systemd-timesyncd` |
| `iptables` | `nftables` / `firewalld` |
| `network` | `NetworkManager` or `systemd-networkd` |
| `portmap` | `rpcbind` |
| `crond`, `atd` | still exist; systemd **timers** (`*.timer`) are the native alternative |
| `kudzu`, `keytable`, `xfs`, `gpm`, `rawdevices` | gone (udev, `localectl`, ...) |

Selection tools such as `system-config-services`, `ntsysv`, `bum`, `services-admin` and `sysv-rc-conf` are obsolete; use `systemctl` (or Cockpit).

#### 31.2.2.6 Init Script:

> Updated 2026-10 to current practice.[^systemd-service]

The `case "$1" in start|stop|...` init script with `daemon`/`killproc`, pid files and `/var/lock/subsys` is replaced by a declarative unit. systemd tracks the process itself (via its cgroup), so no pid file, lock file or `status` function is needed:

```ini
# /etc/systemd/system/process-name.service
[Unit]
Description=Description of program
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/process-name --foreground
ExecReload=/bin/kill -HUP $MAINPID
Restart=on-failure
User=process-name

[Install]
WantedBy=multi-user.target
```

Run the program in the foreground (don't let it daemonize itself) with `Type=simple`, or use `Type=forking` plus `PIDFile=` for a program that insists on forking.

```bash
sudo systemctl daemon-reload                 # after creating/editing a unit file
sudo systemctl enable --now process-name     # old: chkconfig --add + service start
sudo systemctl restart process-name
sudo systemctl reload process-name           # runs ExecReload (SIGHUP here)
systemctl status process-name
```

The old `# chkconfig: 345 85 15` header (runlevels, start/stop priority) maps to `WantedBy=multi-user.target` plus `After=`/`Before=` ordering.

#### 31.2.2.7 chkconfig:

> Updated 2026-10 to current practice.[^systemctl]

`chkconfig` only ever managed SysV init scripts; on systemd systems use `systemctl`. Equivalents:

| chkconfig | systemctl |
|---|---|
| `chkconfig --list` | `systemctl list-unit-files --type=service` |
| `chkconfig --list \| grep on` | `systemctl list-unit-files --type=service --state=enabled` |
| `chkconfig httpd on` / `--add httpd` | `systemctl enable httpd` |
| `chkconfig sendmail off` / `--del sendmail` | `systemctl disable sendmail` |
| `chkconfig --level 345 httpd on` | no per-runlevel switch; `WantedBy=multi-user.target` in the unit |
| `chkconfig httpd` (query) | `systemctl is-enabled httpd` |

**xinetd services** (`chkconfig wu-ftpd on`) are replaced by systemd **socket activation**: a `foo.socket` unit listens and starts `foo.service` (or `foo@.service` per connection) on demand. Enable it with `systemctl enable --now foo.socket`.

#### 31.2.2.8 Related Commands:

> Updated 2026-10 to current practice.[^systemctl]

```bash
systemctl status [unit]                         # one unit, or the whole system tree
systemctl list-units --type=service --all       # old: service --status-all
journalctl -u <unit> -f                         # follow a service's log
systemctl --help
```

Also see: `systemctl(1)`, `systemd.service(5)`, `systemd.unit(5)`, `journalctl(1)`.

[^systemctl]: systemctl(1) - Linux manual page
[^runlevel]: runlevel(8) - Linux manual page
[^systemd-service]: systemd.service(5) - Linux manual page
[^systemd-special]: systemd.special(7) - Linux manual page
[^systemd-bootup]: bootup(7) - Linux manual page
[^systemd-news]: systemd NEWS (release notes, v258 and v260 SysV removals)
