---
type: review
title: Outdated-content triage (P6, 2026-10)
description: Agent triage of possibly-outdated notes as of 2026-10 with action (rewrite / deprecate / ok), severity and a source per finding; feeds the P7 rewrites.
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
status: stable
---

# Outdated-content triage (P6, 2026-10)

Candidates came from `tools/kb_outdated_scan.py` (heuristics) plus a full review of fast-moving curated notes. Sonnet agents verified each with a source; P7 (Opus) re-verifies sources before rewriting. Column **state**: `todo` → `done` / `skipped`.

| note | section / lines | claim | why outdated | current practice | source | severity | action | state |
|---|---|---|---|---|---|---|---|---|
| /Network/kb-ssl/07-python.md | L36-L63,L208,L311 | ssl.wrap_socket SSLv2/SSLv3, except SSLError, err | wrap_socket removed; SSLv2/3 insecure; Py2 syntax | SSLContext with TLS 1.2+; except ... as err | https://www.rfc-editor.org/rfc/rfc8996 | high | rewrite | done |
| /neovim.md | l.171-181 LSP | LSP via require('lspconfig').pyright.setup{} | require('lspconfig') framework deprecated; Nvim 0.11+ uses vim.lsp.config() and vim.lsp.enable() | Use vim.lsp.config('pyright', {...}); vim.lsp.enable('pyright'); nvim-lspconfig only supplies server configs | https://github.com/neovim/nvim-lspconfig | high | rewrite | done |
| /neovim.md | l.123-168 treesitter | Plug nvim-treesitter with require'nvim-treesitter.configs'.setup | main branch is an incompatible rewrite (Nvim 0.12+, require('nvim-treesitter').setup); old API frozen on master branch | Use main branch + tree-sitter-cli, or pin branch=master for Nvim 0.11 | https://github.com/nvim-treesitter/nvim-treesitter | high | rewrite | done |
| /Network/kb-network/10-useful-tools.md | L694,L1200 | ifconfig; curl --sslv2/--sslv3/--tlsv1.0 tests | net-tools and SSLv2/3, TLS1.0/1.1 deprecated | ip addr; test --tlsv1.2/--tlsv1.3 only | https://www.rfc-editor.org/rfc/rfc8996 | med | rewrite | done |
| /Network/kb-network/10-useful-tools.md | L694 | ifconfig usage | net-tools deprecated | ip addr / ip -br a | https://man7.org/linux/man-pages/man8/ip.8.html | med | rewrite | done |
| /Network/kb-ssl/02-cli.md | L259 and ssl3/md5 examples | openssl s_time -ssl3, md5/rc4 usage | SSLv3 and MD5/RC4 are broken/removed | Use TLS 1.2/1.3, SHA-256+, AES-GCM | https://www.rfc-editor.org/rfc/rfc8996 | med | rewrite | todo |
| /Network/kb-ssl/13-cli-2.md | L44,L151,L240-L258 | openssl -ssl3 tests, dgst -md5 default | SSLv3/MD5 obsolete; new OpenSSL drops them | -tls1_2/-tls1_3; dgst -sha256 | https://www.rfc-editor.org/rfc/rfc8996 | med | rewrite | done |
| /interviews/security-patterns.md | l.113-125 Bcrypt Configuration | bcrypt rounds 12 as the password hashing recommendation | OWASP now ranks Argon2id first (19 MiB, t=2, p=1); bcrypt legacy-only, work factor 10+ | Recommend Argon2id (scrypt/PBKDF2 fallbacks); mention bcrypt only for legacy | https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html | med | rewrite | done |
| /js-fe-frameworks/angular.md | Major Versions table (l.236-256) | Table ends at v20; two majors per year (May, November) | v21 (Nov 2025) and v22 (2026-06-03) exist; cadence changed to one major per 12 months | Add v21, v22 rows; v22+ ships a major every 12 months with 4-6 minors; 24 months support (12 active + 12 LTS) | https://angular.dev/reference/releases | med | rewrite | todo |
| /kb-cpp/22-advanced-interview-questions.md | L1845 | std::random_shuffle | Removed in C++17 | std::shuffle with <random> engine | https://en.cppreference.com/w/cpp/algorithm/random_shuffle | med | rewrite | done |
| /kb-desktop-tools/37-ldap.md | L184-L203 | slapd.conf paths RHEL/CentOS 5, Ubuntu 8.04 | slapd.conf deprecated; EOL distros | cn=config (slapd.d) | https://www.openldap.org/doc/admin26/slapdconf2.html | med | rewrite | done |
| /kb-java/15-cookbook.md | L55 | JDK 1.5 text file read/write example | Pre-NIO.2 idiom | Files.readString/writeString, try-with-resources (Java 21) | https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Files.html | med | rewrite | done |
| /kb-java/60-cookbook-3.md | L55 | JDK 1.5 text file read/write example (dup of 15) | Pre-NIO.2 idiom | Files.readString/writeString, try-with-resources (Java 21) | https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Files.html | med | rewrite | todo |
| /kb-nodejs/01-my-tutorial/10-express.md | L2049 | Uses request module | request package deprecated | Use built-in fetch or undici/axios | https://github.com/request/request/issues/3142 | med | rewrite | done |
| /kb-nodejs/03-testing-frameworks.md | L12-L35 | grunt/Mocha/sinon/chai setup | Grunt-era tooling | node --test (node:test) or Vitest/Jest | https://nodejs.org/api/test.html | med | rewrite | done |
| /kb-nodejs/04-eslint-for-static-analysis.md | L23 | grunt setup of eslint, eslintrc | Grunt and .eslintrc legacy | eslint.config.js flat config, run eslint directly | https://eslint.org/docs/latest/use/configure/configuration-files | med | rewrite | todo |
| /kb-scripts/16-python.md | L205,L362,L816 | ConfigParser, iteritems, print stmt | Py2 only; fails on Py3 | configparser, dict.items(), print() | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | done |
| /linux/kb-linux/04-dns-on-linux.md | L433,L1795 | chkconfig named on; Win2000/2003 SRV | SysV chkconfig; EOL Windows | systemctl enable --now named | https://man7.org/linux/man-pages/man1/systemctl.1.html | med | rewrite | done |
| /linux/kb-linux/21-monit/02-faq.md | L108 | chkconfig myservice off | SysV chkconfig | systemctl disable <unit> | https://man7.org/linux/man-pages/man1/systemctl.1.html | med | rewrite | done |
| /linux/kb-linux/24-faqs.md | L951 | netstat -anp in script | net-tools deprecated | ss -tanp | https://man7.org/linux/man-pages/man8/ip.8.html | med | rewrite | todo |
| /linux/kb-linux/25-nfs.md | L69 | chkconfig portmap/nfs at boot | SysV; portmap now rpcbind | systemctl enable --now nfs-server rpcbind | https://man7.org/linux/man-pages/man1/systemctl.1.html | med | rewrite | done |
| /linux/kb-linux/29-featured-articles.md | L529 | service iptables stop/start/restart | SysV service wrappers on RHEL6 era | systemctl restart <unit>; nftables/firewalld on modern distros | https://man7.org/linux/man-pages/man1/systemctl.1.html | med | rewrite | done |
| /linux/kb-linux/31-services.md | L31 onward | chkconfig and service commands | SysV init tools | systemctl enable/start/status | https://man7.org/linux/man-pages/man1/systemctl.1.html | med | rewrite | todo |
| /ml-and-ai/llm-kb/ornith-1.0-agentic-coding-model.md | l.131 model routing | pure reasoning/math use deepseek-r1:14b | Sibling notes replaced deepseek-r1:14b with qwen3:14b on 2026-07-06; this line missed the sweep | Use qwen3:14b for reasoning (hybrid /think mode) | https://ollama.com/library | med | rewrite | done |
| /ml-and-ai/llm-kb/ornith-pi-local-setup-m1max.md | l.32 Pi npm package | Pi package @mariozechner/pi-coding-agent; confirm on earendil-works/pi | Package is now @earendil-works/pi-coding-agent (Node 22.19+); installer curl -fsSL https://pi.dev/install.sh | npm install -g --ignore-scripts @earendil-works/pi-coding-agent | https://github.com/earendil-works/pi | med | rewrite | done |
| /ml-and-ai/theory/bitnet-b1-58.md | l.190 NPU/GPU support | NPU and GPU support coming next, not yet shipped | bitnet.cpp now has official GPU kernels and further CPU speedups (2026); embedding models added July 2026 | Say GPU kernels are shipped; NPU unverified; still no official LLM larger than 2B | https://github.com/microsoft/BitNet | med | rewrite | done |
| /neovim.md | l.171 LSP intro | LSP native since 0.5, requires v0.6.1 | Neovim stable is 0.12.6 (2026-10-09); 0.11+ has native vim.lsp.config | Update version references to 0.11/0.12 baseline | https://github.com/neovim/neovim/releases | med | rewrite | done |
| /python/kb-python/01-conversions-bases.md | L19 | print "%x"%98 | Python 2 print | print(f'{98:x}') | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | todo |
| /python/kb-python/03-tools.md | L62-L484 | Tkinter examples with print stmt | Py2 syntax; Tkinter renamed tkinter | import tkinter; print() | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | done |
| /python/kb-python/05-cli.md | L36 | cmd module example uses print statement | Python 2 syntax SyntaxError in 3 | print(...) function | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | done |
| /python/kb-python/09-network-programming.md | L42-L77 | raw_input, print stmt socket examples | Py2 syntax; str vs bytes sockets | print(), input(), encode/decode bytes | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | todo |
| /python/kb-python/10-python-cli.md | L32 | cmd module example uses print statement | Python 2 syntax SyntaxError in 3 | print(...) function | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | done |
| /python/kb-python/13-debug-python.md | L54 | traceback and pdb sample with print spam | Python 2 print statement | print(spam); use breakpoint() | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | done |
| /python/kb-python/14-reading-handling-of-command-line-arguments-getopt-options-ar.md | L155 | fileinput example uses print statement | Python 2 syntax | print(...); prefer argparse | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | done |
| /python/kb-python/16-validate-input.md | L34-L85 | Use raw_input not input; print statements | raw_input gone; input() safe in Py3 | input() returns str in Py3; use print() | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | todo |
| /python/kb-python/19-create-installation-distribution-build-packages.md | L18,L62,L701-L747 | Python 2.3 docs, setup.py, pipenv --python 2.7 | Py2 targets; setup.py commands deprecated | pyproject.toml; python -m build; pip install . | https://packaging.python.org/en/latest/guides/modernize-setup-py-project/ | med | rewrite | done |
| /python/kb-python/20-tips-and-tricks.md | L35 | xrange and print with trailing comma | xrange removed; print is function | range(); print(x, end=' ') | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | done |
| /python/kb-python/32-recipes.md | L39-L336 | Sorting HOWTO assumes Python 2.4, cmp | cmp argument removed in Py3 | sorted(key=, reverse=); functools.cmp_to_key | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | todo |
| /python/kb-python/34-tips-tricks-quick-guides.md | L268-L363 | xrange, Python 2.4 generator exprs | xrange and 2.4 notes obsolete | range() is lazy in Py3; generator expressions standard | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | partial (flagged sections done; rest of article still Py2) |
| /python/kb-python/36-my-examples-recipes.md | L30-L621 | print statements, str.translate maketrans | Py2 print; translate API changed | print(); str.maketrans | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | done |
| /python/kb-python/38-graphs.md | L22 | Python 2.7.6 session on macOS | Python 2 EOL 2020 | Python 3.12+ | https://python.org/doc/sunset-python-2/ | med | rewrite | done |
| /python/kb-python/39-one-liners.md | L22,L122,L144 | xrange, commands.getoutput, print stmt | commands module removed in Py3 | subprocess.check_output, range, print() | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | todo |
| /python/kb-python/44-machine-learning.md | L49-L100 | Install Python 2.7 / Anaconda py2 | Py2.7 EOL; print statement | Python 3 with pip/venv or conda | https://www.python.org/doc/sunset-python-2/ | med | rewrite | done (setup); 41.1.3 still Py2 — follow-up |
| /python/kb-python/45-important-packages-modules.md | L156 | print stdout.readlines() in pexpect/paramiko snippet | Python 2 print | print(stdout.readlines()) | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | done |
| /python/kb-python/49-my-sap-course.md | L89 | Bdays.iteritems() | iteritems removed in Python 3 | Bdays.items() | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | todo |
| /python/kb-python/55-signals.md | L40-L92 | xrange and print stmt in signal demos | Py2 syntax fails on Py3 | range(), print() | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | done |
| /vi/kb-vi/15-shell-and-filter-commands.md | L91 | python filter with print ' '.join(...) | Python 2 print | print(' '.join(...)) | https://docs.python.org/3/whatsnew/3.0.html | med | rewrite | done |
| /vi/kb-vi/68-vim-as-ide.md | L129 | Pathogen needed to load plugins | Vim 8 has native packages | Use pack/*/start and :packadd or vim-plug | https://vimhelp.org/repeat.txt.html | med | rewrite | done |
| /Network/kb-network/11-dns/02-simple-network-troubleshooting.md | L337,L376 | netstat -i error output | net-tools deprecated | ip -s link | https://man7.org/linux/man-pages/man8/ip.8.html | low | rewrite | todo |
| /databases/relational-design-postgres-mongo.md | l.324 distributed SQLite | LiteFS listed in the 2026 distributed-SQLite ecosystem | LiteFS Cloud sunset 2024-10-15; LiteFS itself maintained but not polished | Note LiteFS Cloud is gone; use Litestream for backups | https://community.fly.io/t/sunsetting-litefs-cloud/20829 | low | rewrite | done |
| /interviews/tech-stack.md | Validation Libraries Zod example | z.string().email() | Zod 4 deprecates method form in favor of top-level z.email() | Show z.email(); method form still works but legacy | https://zod.dev/v4/changelog | low | rewrite | done |
| /interviews/tech-stack.md | HTTP Clients table (l.338) | Fetch native on Node 18+ | Node 18 is EOL (2025-03); Node 20 EOL 2026-03; Node 22 and 24 are LTS | Say native fetch on Node 22/24 LTS | https://nodejs.org/en/about/previous-releases | low | rewrite | done |
| /interviews/tech-stack.md | Testing Frameworks table (l.262-270) | Jest ESM support: Limited; Jest chosen for React | Vitest widely default for Vite/React; Jest ESM still experimental flag | Keep, but note Vitest is common default for new Vite/React projects (unverified) | https://nodejs.org/en/about/previous-releases | low | rewrite | done |
| /js-fe-frameworks/angular.md | l.101 ng test / l.284 zoneless | Karma + Jasmine (or Vitest in 19+); zoneless is a v20 feature | Per secondary sources v21 made zoneless default and Vitest replaced Karma as test runner (not verified on official page) | State Vitest default test runner and zoneless default from v21; verify on angular.dev changelog | https://arc.dev/employer-blog/angular-latest-version-your-friendly-guide-to-new-features-and-updates-in-2026/ | low | rewrite | todo |
| /js-fe-frameworks/react.md | Major Versions table (l.232-243) | Table ends at React 19 (2024) | React 19.2 (Oct 2025) and 19.3.0 (2026-09-09) shipped; no React 20 | Add 19.1/19.2/19.3 note: 19.2 added Activity and useEffectEvent; latest is 19.3 | https://react.dev/versions | low | rewrite | todo |
| /js-fe-frameworks/react.md | l.623 React Compiler | React Compiler stable in 19 | Compiler is a separate package; 1.0 stable released Oct 2025, supports React 17+ | Say React Compiler 1.0 (babel-plugin-react-compiler) is stable and works with React 17+ | https://react.dev/blog/2025/10/07/react-compiler-1 | low | rewrite | todo |
| /js-fe-frameworks/svelte.md | Major Versions rows 5.x and 6 (l.205-206) | Svelte 6 (planned) 2026 drops legacy mode | No Svelte 6 released; latest is 5.57.x; async support landed in 5.x | Mark Svelte 6 as unannounced/not released; current is 5.57.x | https://github.com/sveltejs/svelte/releases | low | rewrite | done |
| /js-fe-frameworks/ui5.md | Major Versions rows 1.130+ and 2.x (l.281-282) | Latest listed 1.130+; 2.x 2024+ as migration target | Version table stops at 2024-2025; current 1.x/2.x release numbers and LTS status unverified (official pages did not render) | Re-check ui5.sap.com version overview for current LTS and 2.x GA status | https://sdk.openui5.org/versionoverview.html | low | rewrite | done |
| /js-fe-frameworks/vue.md | Major Versions row Vapor Mode (l.216) | Vapor Mode 2024-2026, opt-in per component | Still not stable: 3.6 is in release-candidate phase (rc.11), latest stable is 3.5.44 | Say Vapor Mode ships in 3.6 (RC, not GA as of 2026-10); stable line is 3.5.x | https://github.com/vuejs/core/releases | low | rewrite | done |
| /kb-nodejs/20-node-version-managers-switchers.md | L23 | nvm use 16 example, node v16.9.1 | Node 16 is EOL | Use Node 22/24 LTS | https://nodejs.org/en/about/previous-releases | low | rewrite | todo |
| /learning/master-learning-roadmap.md | Track A table l.74 | Claude Code course 76% complete; status snapshot 2026-03-23 | Progress snapshot is 7 months old; course catalogue unverified | Refresh progress or mark as dated | unverified | low | rewrite | skipped (personal progress snapshot; user to update) |
| /linux/kb-linux/24-faqs.md | L1250 | Ubuntu 10.04 forum post | Ubuntu 10.04 EOL 2013 | Supported Ubuntu LTS 22.04/24.04/26.04 | https://endoflife.date/ubuntu | low | rewrite | todo |
| /linux/kb-linux/30-performance-optimization-tools-and-analysis.md | L521 | ifconfig/netstat in tools overview | net-tools deprecated | ip, ss | https://man7.org/linux/man-pages/man8/ip.8.html | low | rewrite | done |
| /ml-and-ai/llm-kb/local-ai-resilience-switch-guide.md | l.64 Ollama version | Machine runs Ollama 0.30.10 | Latest Ollama is v0.40.4 (2026-10-12); Anthropic-compat claims (no caching, no tool_choice) still hold | Update version snapshot; keep no prompt caching/tool_choice caveats | https://docs.ollama.com/api/anthropic-compatibility | low | rewrite | todo |
| /ml-and-ai/llm-kb/ornith-1.0-agentic-coding-model.md | header resource / Source link | Link https://deep-reinforce.com/ornith_1_0.html | 301 redirects to https://ornith.ai/ornith_1_0.html | Update link to https://ornith.ai/ornith_1_0.html | https://ornith.ai/ornith_1_0.html | low | rewrite | done |
| /ml-and-ai/prompts/nano_banana_prompts/youtube-to-infographic.md | Platform line | Uses Gemini native YouTube integration; no model named | Nano Banana family now Nano Banana 2 (Gemini 3.1 Flash Image), Pro (gemini-3-pro-image-preview), 2 Lite | Optionally note which Nano Banana tier the prompts were tested on; prompts still valid | https://www.cometapi.com/tag/gemini-3-pro-image-preview/ | low | rewrite | done |
| /neovim.md | l.293-314 completion | nvim-cmp with hrsh7th sources as the completion engine | nvim-cmp still maintained (hobby project) but not mentioned alternative; ecosystem moved partly to blink.cmp (unverified here); nvim-compe now long dead | Mention blink.cmp as common alternative; unverified, check before migrating | https://github.com/hrsh7th/nvim-cmp | low | rewrite | done |
| /neovim.md | l.56-112 plugin manager | vim-plug as the plugin manager | Works, but lazy.nvim is the common Lua-era manager (used in sibling codecompanion note); header says Captured Unknown | Note lazy.nvim as modern default; vim-plug still functions | https://github.com/neovim/neovim/releases | low | rewrite | done |
| /python/kb-python/08-bit-manipulation.md | L89-L226 | print stmt; known to work in Python 2.4 | Py2 syntax | print(); int(s,16) unchanged | https://docs.python.org/3/whatsnew/3.0.html | low | rewrite | done |
| /python/kb-python/15-lists.md | L85-L287 | print stmt in list examples | Py2 syntax | print(item) | https://docs.python.org/3/whatsnew/3.0.html | low | rewrite | done |
| /python/kb-python/33-environment-custimization-idle.md | L90,L181,L202 | print stmt, raw_input in startup script | Py2 syntax | print(); input() | https://docs.python.org/3/whatsnew/3.0.html | low | rewrite | todo |
| /python/kb-python/58-regexp.md | L123-L166 | re examples with print stmt | Py2 syntax only; re API same | print(...) calls | https://docs.python.org/3/whatsnew/3.0.html | low | rewrite | done |
| /system-design/redis/redis-primer.md | l.253-255 session store | require('connect-redis').default | connect-redis v7+ uses named export/ESM; unverified exact version | Check connect-redis README for import style | https://github.com/tj/connect-redis | low | rewrite | done |
| /system-design/redis/redlock.md | l.79-83 Node example | const Redlock = require('redlock') | redlock v5 is TypeScript/ESM (import Redlock from 'redlock'; use redlock.using); require form may need .default (unverified); API names (driftFactor, retryCount) confirmed | Use ESM import and redlock.using(resources, ttl, async signal => ...) | https://github.com/mike-marcacci/node-redlock | low | rewrite | todo |
| /linux/kb-linux/07-networking/04-linux-ipv6-howto-en.md | L2662,L3390 | service network restart; racoon 3des/md5 DH group 2 | SysV scripts; 3DES/MD5/DH2 insecure | systemctl restart; AES-GCM, SHA-256, DH 14+ | https://man7.org/linux/man-pages/man1/systemctl.1.html | med | deprecate | done |
| /Network/kb-network/16-wireshark.md | L27 | AD ping needs Windows 2000/2003 server | EOL Windows Server | Applies to supported Windows Server only; check MS docs | https://python.org/doc/sunset-python-2/ | low | deprecate | done |
| /Network/kb-network/17-active-directory.md | L24 | AD ping for Windows 2000/2003 | EOL Windows Server | Applies to supported Windows Server only | https://python.org/doc/sunset-python-2/ | low | deprecate | done |
| /Network/kb-ssl/05-introduction-to-the-ssl-technology.md | L145 | CORBA SSL doc lists DES-CBC and 56-bit keys | DES broken; copied vendor text | Use TLS 1.2/1.3 with AES-GCM or ChaCha20 | https://www.rfc-editor.org/rfc/rfc8996 | low | deprecate | done |
| /Network/kb-ssl/17-tutorials.md | L50 | HP SSL on OpenVMS manual copy (SSLv2/v3) | Vendor doc for SSLv2/3 | TLS 1.2+ only | https://www.rfc-editor.org/rfc/rfc8996 | low | deprecate | done |
| /bash/kb-bash/12-advanced-bash-scripting-guide/10-part-4-linux-commands/00-intro.md | L266 | SysV init mention in ABS guide | Book copy | systemctl | https://man7.org/linux/man-pages/man1/systemctl.1.html | low | deprecate | done |
| /bash/kb-bash/12-advanced-bash-scripting-guide/10-part-4-linux-commands/03-chapter-16-system-and-administrative-commands.md | L917,L1259 | netstat, SysV init in ABS guide | Book copy uses net-tools/SysV | ss, systemctl | https://man7.org/linux/man-pages/man1/systemctl.1.html | low | deprecate | done |
| /bash/kb-bash/12-advanced-bash-scripting-guide/11-part-5-advanced-topics/11-chapter-27-dev-and-proc.md | L510 | netstat -s in ABS guide script | Old book copy; net-tools deprecated | ss -s or nstat | https://man7.org/linux/man-pages/man8/ss.8.html | low | deprecate | done |
| /kb-cygwin/06-troubleshoot.md | L16,L203 | Cygwin + Windows 7 + gvim + pathogen | Win7 EOL 2020 | Native Vim packages; WSL or current Windows | https://endoflife.date/windows | low | deprecate | done |
| /kb-iphone/02-faqs.md | L63 | iTunes on Windows XP/Vista troubleshooting | XP/Vista EOL | - | https://endoflife.date/windows | low | deprecate | done |
| /kb-java/13-install.md | L56 | Install jdk1.6.0_22 symlink | Java 6 EOL | Java 21/25 LTS via package manager | https://en.wikipedia.org/wiki/Java_version_history | low | deprecate | done |
| /kb-java/58-install-3.md | L56 | Install jdk1.6.0_22 symlink | Duplicate; Java 6 EOL | Java 21/25 LTS via package manager | https://en.wikipedia.org/wiki/Java_version_history | low | deprecate | done |
| /kb-javascript/06-ajax.md | whole note | Ajax book copy (XMLHttpRequest era, IIS/WEBrick) | Book from XHR era | fetch() API replaces XMLHttpRequest | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API | low | deprecate | done |
| /kb-nodejs/06-faq.md | L35 | node 5.2.0 / express 4.2.0 Q&A | Node 5 long EOL | Node 22/24 LTS | https://nodejs.org/en/about/previous-releases | low | deprecate | done |
| /kb-nodejs/12-my-demos.md | L19 | Gruntfile demos | Grunt superseded | npm scripts / modern bundlers | https://nodejs.org/api/test.html | low | deprecate | done |
| /linux/kb-linux/10-system-admininstration/05-ntp-ntpd/08-fixing-ntp-refusing-to-sync.md | L184 | service ntpd restart on RHEL6 | SysV init, ntpd replaced by chrony | systemctl restart chronyd; chronyc tracking | https://man7.org/linux/man-pages/man1/systemctl.1.html | low | deprecate | done |
| /linux/kb-linux/10-system-admininstration/05-ntp-ntpd/09-timekeeping-best-practices-for-linux-guests-1006427.md | L119 | VMware timekeeping table for Ubuntu 11/12.04, old RHEL | Distros EOL | Supported Ubuntu LTS 22.04+ | https://endoflife.date/ubuntu | low | deprecate | done |
| /linux/kb-linux/27-ubuntu.md | L242 | Ubuntu 11.04 apt MergeList fix | EOL Ubuntu release | Troubleshoot on supported Ubuntu LTS | https://python.org/doc/sunset-python-2/ | low | deprecate | done |
| /python/kb-python/02-parse-configuration-file.md | L16 onward | Copy of ConfigParser 2.7.3 manual | Py2 module name ConfigParser; print statements | Use configparser (Py3); copy of old manual adds little | https://docs.python.org/3/whatsnew/3.0.html | low | deprecate | done |
| /python/kb-python/21-information-from-learning-python-book-3rd-edition.md | whole note | Learning Python 3rd ed / Py2 book notes | Book edition notes (Python 2.x era) | Python 3 print(), except as, dict.items(); Py2 EOL 2020 | https://www.python.org/doc/sunset-python-2/ | low | deprecate | done |
| /python/kb-python/22-core-python-programming-second-edition.md | whole note | Learning Python 3rd ed / Py2 book notes | Core Python 2nd ed notes; print statement era | Python 3 print(), except as, dict.items(); Py2 EOL 2020 | https://www.python.org/doc/sunset-python-2/ | low | deprecate | done |
| /python/kb-python/30-learning-python-3rd-edition/01-types-and-operations/02-numbers.md | whole note | Learning Python 3rd ed / Py2 book notes | Book edition notes (Python 2.x era) | Python 3 print(), except as, dict.items(); Py2 EOL 2020 | https://www.python.org/doc/sunset-python-2/ | low | deprecate | done |
| /python/kb-python/30-learning-python-3rd-edition/01-types-and-operations/04-ofsmallstrings.md | whole note | Learning Python 3rd ed / Py2 book notes | Book edition notes (Python 2.x era) | Python 3 print(), except as, dict.items(); Py2 EOL 2020 | https://www.python.org/doc/sunset-python-2/ | low | deprecate | done |
| /python/kb-python/30-learning-python-3rd-edition/01-types-and-operations/05-lists-and-dictionaries.md | whole note | Learning Python 3rd ed / Py2 book notes | Book edition notes (Python 2.x era) | Python 3 print(), except as, dict.items(); Py2 EOL 2020 | https://www.python.org/doc/sunset-python-2/ | low | deprecate | done |
| /python/kb-python/30-learning-python-3rd-edition/01-types-and-operations/06-tuples-files-and-everything-else.md | whole note | Learning Python 3rd ed / Py2 book notes | Book edition notes (Python 2.x era) | Python 3 print(), except as, dict.items(); Py2 EOL 2020 | https://www.python.org/doc/sunset-python-2/ | low | deprecate | done |
| /python/kb-python/30-learning-python-3rd-edition/02-statements-and-syntax/02-python-program-structure-revisited.md | whole note | Learning Python 3rd ed / Py2 book notes | Book edition notes (Python 2.x era) | Python 3 print(), except as, dict.items(); Py2 EOL 2020 | https://www.python.org/doc/sunset-python-2/ | low | deprecate | done |
| /python/kb-python/30-learning-python-3rd-edition/02-statements-and-syntax/03-rwordsassignment-expressions-and-print.md | whole note | Learning Python 3rd ed / Py2 book notes | Book edition notes (Python 2.x era) | Python 3 print(), except as, dict.items(); Py2 EOL 2020 | https://www.python.org/doc/sunset-python-2/ | low | deprecate | done |
| /python/kb-python/30-learning-python-3rd-edition/02-statements-and-syntax/04-if-tests.md | whole note | Learning Python 3rd ed / Py2 book notes | Book edition notes (Python 2.x era) | Python 3 print(), except as, dict.items(); Py2 EOL 2020 | https://www.python.org/doc/sunset-python-2/ | low | deprecate | done |
| /python/kb-python/30-learning-python-3rd-edition/02-statements-and-syntax/05-while-and-for-loops.md | whole note | Learning Python 3rd ed / Py2 book notes | Book edition notes (Python 2.x era) | Python 3 print(), except as, dict.items(); Py2 EOL 2020 | https://www.python.org/doc/sunset-python-2/ | low | deprecate | done |
| /python/kb-python/30-learning-python-3rd-edition/02-statements-and-syntax/06-the-documentation-interlude.md | L133 | print square(4) in book notes | Old book edition, Python 2.5 | print(square(4)) | https://docs.python.org/3/whatsnew/3.0.html | low | deprecate | done |
| /python/kb-python/30-learning-python-3rd-edition/02-statements-and-syntax/07-published-books.md | whole note | Learning Python 3rd ed / Py2 book notes | Book edition notes (Python 2.x era) | Python 3 print(), except as, dict.items(); Py2 EOL 2020 | https://www.python.org/doc/sunset-python-2/ | low | deprecate | done |
| /python/kb-python/31-python-pocket-reference-4th-edition.md | whole note | Learning Python 3rd ed / Py2 book notes | Pocket Reference 4th ed notes (Py2.6/3.0) | Python 3 print(), except as, dict.items(); Py2 EOL 2020 | https://www.python.org/doc/sunset-python-2/ | low | deprecate | done |
| /python/python-quick-reference-pages.md | L4 | Gruet Python 2.4/2.5 quick reference | Python 2 era saved pages | docs.python.org/3 | https://python.org/doc/sunset-python-2/ | low | deprecate | done |
| /vi/kb-vi/19-plugins-scripts/37-pathogen.md | whole note | Pathogen plugin manager notes | Superseded by native packages (Vim 8+) | pack/*/start and :packadd | https://vimhelp.org/repeat.txt.html | low | deprecate | done |
| /vi/kb-vi/19-plugins-scripts/38-gundo.md | L52 | Gundo needs Vim 7.3 and Python 2.4 | Py2 requirement; plugin superseded | Native persistent undo / undotree | https://vimhelp.org/repeat.txt.html | low | deprecate | done |
| /vi/kb-vi/19-plugins-scripts/39-neocomplcach-obsolete-use-neocomplete-instead.md | L3 | neocomplcache plugin | Self-declared obsolete, superseded | Use ALE/LSP completion (vim-lsp, coc) | https://vimhelp.org/repeat.txt.html | low | deprecate | done |
| /vi/kb-vi/19-plugins-scripts/50-syntastic-on-the-fly-syntax-check-for-all-languages.md | L3 | syntastic syntax checker | Superseded by async linters | Use ALE or LSP client | https://vimhelp.org/repeat.txt.html | low | deprecate | done |
| /vi/kb-vi/52-install-vim-vim-install-install-vim-vim-patches-install-patc.md | L46,L369 | Build vim with python2.4 config dir | Python 2.4 config | Build with --enable-python3interp | https://docs.python.org/3/whatsnew/3.0.html | low | deprecate | done |
| /windows/kb-windows/06-service-control-xp-and-above.md | L106 | Service control for XP and above | XP-era administration | sc.exe / PowerShell Get-Service on current Windows | https://python.org/doc/sunset-python-2/ | low | deprecate | done |
| /windows/kb-windows/12-microsoft-kbs.md | L47 | nltest dbflag for Server 2003/2008 | EOL Windows Server KBs | See current Microsoft docs | https://python.org/doc/sunset-python-2/ | low | deprecate | done |
| /windows/kb-windows/14-guides.md | L16 | Freeing disk space on Windows 7 | Win7 EOL Jan 2020 | - | https://endoflife.date/windows | low | deprecate | done |
| /windows/kb-windows/15-troubleshooting.md | L23 | Windows 7 troubleshooting | Win7 EOL Jan 2020 | - | https://endoflife.date/windows | low | deprecate | done |
| /windows/win2k-performance.md | L3 | Windows 2000 performance tuning | EOL OS | Not applicable to current Windows | https://python.org/doc/sunset-python-2/ | low | deprecate | done |
| /Deployment/Blue_Green/docs/PIPELINE-SPEC.md | - | ECS/ALB/Terraform/AppConfig design; no versions |  |  |  | low | ok | - |
| /FE/react/virtualization/design-for-retrofit.md | - | no time-sensitive claims |  |  |  | low | ok | - |
| /FE/react/virtualization/perf-budget.md | - | no time-sensitive claims |  |  |  | low | ok | - |
| /FE/react/virtualization/tl-debate.md | - | no time-sensitive claims |  |  |  | low | ok | - |
| /Network/dynamic-dns-ddns.md | - | RFC-based content (RFC 8945, 7296, 9370) current |  |  |  | low | ok | - |
| /Network/ipsec-primer.md | - | RFC-based content (RFC 8945, 7296, 9370) current |  |  |  | low | ok | - |
| /Network/kb-network/09-radius.md | whole note | RADIUS explanation | Still correct overview | - | - | low | ok | - |
| /Network/kb-network/12-list-of-tcp-and-udp-port-numbers.md | whole note | Port list incl. old game ports | Port registry list still valid | - | - | low | ok | - |
| /Network/kb-ssl/06-ssl-tls-programming.md | whole note | OpenSSL SSL/TLS programming concepts | Conceptual explanation, still valid | - | - | low | ok | - |
| /Network/kb-ssl/08-versions/01-change-log.md | whole note | OpenSSL changelog text | Historical changelog, accurate record | - | - | low | ok | - |
| /Network/kb-ssl/11-known-vulnerabilities-psirts.md | whole note | Historical TLS vulnerability descriptions | Historic explanation still correct | - | - | low | ok | - |
| /Network/rfc1180.md | - | RFC-based content (RFC 8945, 7296, 9370) current |  |  |  | low | ok | - |
| /Network/vpn-auth-psk-vs-x509-vs-wireguard.md | - | RFC-based content (RFC 8945, 7296, 9370) current |  |  |  | low | ok | - |
| /agents/KNOWLEDGE-CAPTURE.md | - | OKF v0.2 current |  |  | https://github.com/GoogleCloudPlatform/open-knowledge-format | low | ok | - |
| /awk/kb-awk/06-awk-tutorials/13-conditionals-loops-and-arrays.md | whole note | awk print | False positive: awk print | - | - | low | ok | - |
| /awk/kb-awk/06-awk-tutorials/16-system-variables-that-are-arrays.md | whole note | awk print | False positive: awk print | - | - | low | ok | - |
| /awk/kb-awk/06-awk-tutorials/17-functions.md | whole note | awk print | False positive: awk print | - | - | low | ok | - |
| /awk/kb-awk/06-awk-tutorials/18-writing-your-own-functions.md | whole note | awk print | False positive: awk print | - | - | low | ok | - |
| /awk/kb-awk/06-awk-tutorials/19-the-bottom-drawer.md | whole note | awk print | False positive: awk print | - | - | low | ok | - |
| /awk/kb-awk/06-awk-tutorials/21-awk-tutorialspoint.md | whole note | awk print | False positive: awk print | - | - | low | ok | - |
| /insecure-deserialization.md | l.41 WSUS incident | CVE-2025-59287 Oct 2025 WSUS unauthenticated deserialization RCE verified (BinaryFormatter, KEV 2025-10-24) |  |  | https://www.wiz.io/vulnerability-database/cve/cve-2025-59287 | low | ok | - |
| /interviews/algorithms-ds.md | - | timeless patterns |  |  |  | low | ok | - |
| /interviews/architecture-patterns.md | footer 'Last updated: 2024-01' | NestJS/Express/Next App Router/Jest patterns still valid; no pinned versions |  |  |  | low | ok | - |
| /interviews/clean-code.md | - | timeless patterns |  |  |  | low | ok | - |
| /interviews/coding-idioms.md | footer 'Last updated: 2024-01' | NestJS/Express/Next App Router/Jest patterns still valid; no pinned versions |  |  |  | low | ok | - |
| /interviews/concurrency-patterns.md | - | timeless patterns |  |  |  | low | ok | - |
| /interviews/database-patterns.md | - | timeless patterns |  |  |  | low | ok | - |
| /interviews/design-patterns.md | - | timeless patterns |  |  |  | low | ok | - |
| /interviews/frameworks.md | footer 'Last updated: 2024-01' | NestJS/Express/Next App Router/Jest patterns still valid; no pinned versions |  |  |  | low | ok | - |
| /interviews/resilience-patterns.md | - | timeless patterns |  |  |  | low | ok | - |
| /interviews/scalability-patterns.md | - | timeless patterns |  |  |  | low | ok | - |
| /interviews/testing-patterns.md | footer 'Last updated: 2024-01' | NestJS/Express/Next App Router/Jest patterns still valid; no pinned versions |  |  |  | low | ok | - |
| /js-fe-frameworks/react-virtualization.md | - | no pinned library versions |  |  |  | low | ok | - |
| /kb-cpp/23-secure-coding/01-cisco-cert-course/01-strings.md | whole note | Off-by-one in C strings | Concept still correct | - | - | low | ok | - |
| /kb-cpp/28-g/01-manual.md | whole note | g++ manual copy, Objective-C flags | Manual reference not outdated claims | - | - | low | ok | - |
| /kb-java/08-general.md | L75 | java_home listing of JDK 8/14 | Example output only | - | - | low | ok | - |
| /kb-java/21-java-versions-main-features-and-tools.md | whole note | Java version feature history | Historic feature list, accurate | - | - | low | ok | - |
| /kb-java/53-general-3.md | L75 | java_home listing of JDK 8/14 | Example output only | - | - | low | ok | - |
| /kb-java/66-java-versions-main-features-and-tools-3.md | whole note | Java version feature history | Historic feature list, accurate | - | - | low | ok | - |
| /kb-nodejs/01-my-tutorial/02-nodejs-npm.md | L69 | Lists grunt-cli among globals | Minor mention | - | - | low | ok | - |
| /kb-scripts/23-perl.md | L88 | Perl print | False positive: Perl print | - | - | low | ok | - |
| /learning/PILLARS.md | - | no stale claims |  |  |  | low | ok | - |
| /linux/kb-linux/06-development-tools.md | L678 | gdb backtrace of busybox 1.2.2 | Example output only | - | - | low | ok | - |
| /linux/kb-linux/38-korn-shell-ksh.md | L98 | ksh print builtin | False positive: ksh print | - | - | low | ok | - |
| /ml-and-ai/agentic/agentic-learning-curriculum.md | - | LangGraph 1.2.x / langchain-core 1.6 current (1.2.15 / 1.6.10) |  |  | https://pypi.org/project/langgraph/ | low | ok | - |
| /ml-and-ai/agentic/langgraph-concepts-card.md | - | LangGraph 1.2.x / langchain-core 1.6 current (1.2.15 / 1.6.10) |  |  | https://pypi.org/project/langgraph/ | low | ok | - |
| /ml-and-ai/agentic/multi-agent-saas-recipe-langgraph.md | - | LangGraph 1.2.x / langchain-core 1.6 current (1.2.15 / 1.6.10) |  |  | https://pypi.org/project/langgraph/ | low | ok | - |
| /ml-and-ai/agentic/working-with-ai-on-prod-grade-projects.md | - | process note, no versions |  |  |  | low | ok | - |
| /ml-and-ai/llm-kb/claude-code-usage-statusline.md | rate_limits / oauth usage endpoint | statusline stdin rate_limits; api.anthropic.com/api/oauth/usage | unverified: undocumented endpoint, could not confirm against docs | re-test script after Claude Code updates | https://code.claude.com/docs/en/statusline | low | ok | - |
| /ml-and-ai/llm-kb/llm-knowledge-base-maintenance.md | - | Karpathy gist link verified live |  |  | https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f | low | ok | - |
| /ml-and-ai/llm-kb/local-llm-setup-ollama-continue-vscode.md | lineup table | qwen3.6:27b, gemma4, qwen3.5:9b current | ok: all still listed in Ollama library (qwen3.6, gemma4, qwen3.5); refreshed 2026-07-06 |  | https://ollama.com/library | low | ok | - |
| /ml-and-ai/llm-kb/local-llms-2026-novel-architectures.md | - | survey snapshot dated 2026 |  |  |  | low | ok | - |
| /ml-and-ai/llm-kb/open-knowledge-format-okf.md | - | OKF v0.2 repo link verified live |  |  | https://github.com/GoogleCloudPlatform/open-knowledge-format | low | ok | - |
| /ml-and-ai/prompts/nano_banana_prompts/detailed-object-schematics.md | - | prompt template, model-agnostic |  |  |  | low | ok | - |
| /ml-and-ai/prompts/nano_banana_prompts/glass-sculpture.md | - | prompt template, model-agnostic |  |  |  | low | ok | - |
| /ml-and-ai/theory/bow-tfidf-lda.md | - | timeless |  |  |  | low | ok | - |
| /ml-and-ai/theory/turboquant-doc.md | - | Google Research Mar 2026 / ICLR 2026 verified |  |  | https://techinformed.com/google-publishes-turboquant-to-ease-ai-memory-strain/ | low | ok | - |
| /neovim-codecompanion.md | - | CodeCompanion/ACP claims plausible; repo lists Anthropic, Copilot, ACP Claude Code; CLI command unverified |  |  | https://github.com/olimorris/codecompanion.nvim | low | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/02-scalar-data.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/03-list-and-arrays.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/04-subroutines.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/05-input-and-output.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/06-hashes.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/07-in-the-world-of-regular-expressions.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/08-matching-with-regular-expressions.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/09-processing-text-with-regular-expressions.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/10-more-control-structures.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/11-perl-modules.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/12-file-tests.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/16-process-management.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/17-some-advanced-perl-techniques.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/05-command-line-flags-parameters-processing.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/06-cookbook-recipes/01-sort.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/06-cookbook-recipes/02-perl-cookbook-2nd-edition.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/06-cookbook-recipes/03-numbers.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/06-cookbook-recipes/20-6-6-0-13.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /perl/kb-perl/08-oneliners/04-calculations.md | whole note | Perl print | False positive: Perl print | - | - | low | ok | - |
| /system-design/cheatsheet.md | - | latency numbers and broker comparisons timeless; dated 2026-10 |  |  |  | low | ok | - |
| /typescript/fastify-sse.md | - | Fastify SSE: timeless pattern code |  |  |  | low | ok | - |
| /typescript/react-sse-hook.md | - | EventSource hook: timeless pattern code |  |  |  | low | ok | - |
| /typescript/saga-pattern.md | - | saga pattern: timeless pattern code |  |  |  | low | ok | - |
| /vi/kb-vi/19-plugins-scripts/01-list-active-plugins.md | L24 | Lists Vundle/Pathogen/Vim-Plug | Mentions old managers; still lists several | Native packages (pack/*/start) | https://vimhelp.org/repeat.txt.html | low | ok | - |
| /vi/kb-vi/64-from-books/01-from-vimbook-opl.md | L209,L1692 | Vim book build output | Book excerpt; flagged lines just build output | - | - | low | ok | - |
| /windows/kb-windows/08-active-directory.md | L21,L159 | AD history Win2000/2003; VBScript print | Historical explanation still correct | - | - | low | ok | - |
| /xss-cross-site-scripting.md | - | XSS reference, CSP/Trusted Types; no stale claims found |  |  |  | low | ok | - |
| /Network/ipsec-primer.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /Network/kb-network/05-email-accounts.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /Network/kb-network/07-packet-guide-to-core-network-protocols.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /Network/kb-network/11-dns/03-rfcs/01-http-tools-ietf-org-html-rfc1035-domain-names-implementation.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /Network/kb-network/13-ip.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /Network/kb-ssl/01-ssl-info-sources.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /Network/kb-ssl/10-extensions.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /Network/kb-ssl/14-public-private-key-cryptography.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /Network/kb-ssl/16-x509/01-certificate/01-structure.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /awk/kb-awk/06-awk-tutorials/01-using-awk.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /awk/kb-awk/06-awk-tutorials/05-system-variables.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /awk/kb-awk/06-awk-tutorials/07-simple-arithmetics.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /awk/kb-awk/06-awk-tutorials/08-relational-and-boolean-operators.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /awk/kb-awk/11-faqs.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /bash/kb-bash/09-aliases.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /bash/kb-bash/12-advanced-bash-scripting-guide/06-part-3-beyond-the-basics-chapter-9-variables-revisited/05-indirect-references.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /bash/kb-bash/12-advanced-bash-scripting-guide/10-part-4-linux-commands/01-chapter-14-internal-commands-and-builtins.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /bash/kb-bash/12-advanced-bash-scripting-guide/11-part-5-advanced-topics/17-chapter-33-miscellany.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /insecure-deserialization.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-c/07-c-how-to-program-5th-edition.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-containers/07-chatgpt.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-cpp/01-beautifiers.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-cpp/17-coding-standards/01-c-coding-standard-http-www-possibility-com-cpp-cppcodingstan/14-popular-myths.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-cpp/34-c-11-c-14/01-faq/02-books.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-db/01-postgres.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-desktop-tools/04-ide.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-desktop-tools/21-search-engines.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-dominions/09-dominions-iii-strategy-guides/15-caelum.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-dominions/09-dominions-iii-strategy-guides/21-lanka.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-dominions/09-dominions-iii-strategy-guides/26-mictlan.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-dominions/09-dominions-iii-strategy-guides/45-la-atlantis.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-java/16-ides.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-java/20-memory-consumption-in-java.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-java/29-general-2.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-java/42-java-versions-main-features-and-tools-2.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-java/61-ides-3.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-java/65-memory-consumption-in-java-3.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-mq/02-solace.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-security.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /kb-unix/31-file-sharing-tools.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /linux/kb-linux/07-networking/05-nmap.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /linux/kb-linux/10-system-admininstration/02-hard-disks-and-partitions.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /linux/kb-linux/10-system-admininstration/05-ntp-ntpd/04-name-ntp-conf-network-time-protocol-ntp-daemon-configuration.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /linux/kb-linux/21-monit/03-man-page.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /linux/kb-linux/35-connectivity.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /linux/kb-linux/39-docker.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /ml-and-ai/llm-kb/llm-knowledge-base-maintenance.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/01-chapter-1-introduction.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/13-directory-operations.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /perl/kb-perl/02-learning-perl-5th-edition/15-smart-matching-and-given-when.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /perl/kb-perl/07-my-examples.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /perl/kb-perl/08-oneliners/02-spacing.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /perl/kb-perl/08-oneliners/03-numbering.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /perl/kb-perl/08-oneliners/05-working-with-arrays-and-strings.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /perl/kb-perl/08-oneliners/07-selectively-printing-and-deleting-lines.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /perl/kb-perl/08-oneliners/08-useful-regular-expressions.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /perl/kb-perl/08-oneliners/09-perls-special-variables.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /perl/kb-perl/08-oneliners/40-my-one-liners.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /perl/kb-perl/10-my-scripts.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /python/kb-python/30-learning-python-3rd-edition/01-types-and-operations/01-introducing-python-object-types.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /python/kb-python/35-riddles.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /python/kb-python/37-concepts-syntax-constructs.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /sed/kb-sed/04-tutorial.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /system-design/kb-system-design-course-notes/02-microservices-architecture.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /vi/kb-vi/01-platform-specific-tips.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /vi/kb-vi/19-plugins-scripts/20-dirdiff.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /vi/kb-vi/19-plugins-scripts/47-fugitive.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /vi/kb-vi/19-plugins-scripts/52-table-mode.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /vi/kb-vi/19-plugins-scripts/53-repeat-vim.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /vi/kb-vi/19-plugins-scripts/54-https-github-com-b4winckler-vim-angry.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /vi/kb-vi/19-plugins-scripts/55-https-github-com-markonm-traces-vim.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /vi/kb-vi/19-plugins-scripts/60-ale.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /vi/kb-vi/19-plugins-scripts/61-braceless.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /vi/kb-vi/34-clever-tricks.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
| /vi/kb-vi/53-tips-from-vim-use-googlegroups-com.md | flagged line | false positive (prose, other language, or still-valid content) | n/a | n/a | n/a | - | ok | - |
