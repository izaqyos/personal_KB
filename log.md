# KB Ingest Log

Append-only. Format: ## [YYYY-MM-DD] action | topic | source

---

## [2026-04-10] lint | full-kb-audit | Initial sanitization

- Renamed 69 files/directories to kebab-case
- Added frontmatter headers to 18 .md files
- Added cross-references (See Also) to 20 .md files
- Fixed broken internal links (redis_primer.md -> redis-primer.md)
- Flagged stubs: go-bk (empty), tasks-wiki (1 line), index-wiki (vimwiki relic)
- Created raw/ directory for future source dump migration
- Created this log.md
- Built comprehensive README.md index with Table of Contents

### Raw file candidates (not yet moved)

The following top-level files are raw source dumps (plain text, no markdown).
Future cleanup: convert to .md or move to raw/:

- acs-faqs, c-kb, coe3-kb, containers-kb, devops-kb
- dominions-kb, dominions-kb-1-3, dominions-kb.back
- eclipse-kb, ergonomics-kb, excel-kb
- ge-kb, ge-kb.copy, ge-pet-kb, general-kb
- go-bk, go-kb, intellij-kb, interview-qs-kb
- iphone-kb, java-kb, javascript-kb
- kb-chrome, kb-cisco, kb-cpp, kb-cygwin, kb-db
- kb-ed, kb-jrules, kb-mac, kb-mq, kb-scripts
- kb-security, kb-sql, kb-system-design, kb-tools
- kb-uii, kb-vmware, unix-kb
- leetcode-kb, ml-kb, modeling-drawing-kb
- neovim-kb, nestjs-kb, nodejs-kb, rust-kb
- sap-cf-kb, sap-cf-kb-v2
- sfe-commands, sfe-how-to, shadow-era-kb
- swig-how-to, make-how-to, troubleshoot
- web-programming-kb, wiki-kb, temp-file, stam
