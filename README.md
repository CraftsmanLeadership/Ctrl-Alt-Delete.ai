# CTRL_ALT_DEL (Control-ALT-Delete)

This repository is the content and publishing engine for the book:
**Control-ALT-Delete: A Strategy for Modern Military Readiness**

## Repo Structure
- `content/topics/`  
  Topic lists that drive article and chapter generation.
- `content/generated/`  
  Generated draft articles and chapter sections.
- `content/chapters/`  
  Curated, assembled chapters (final form).
- `prompts/`  
  System and writing prompts used by the generator.
- `scripts/`  
  Utility scripts to create slugs, generate stubs, and manage content.

## Workflow
1. Add/edit topics in `content/topics/ctrl_alt_del.topics.json`
2. Run `node scripts/create-stubs.mjs`
3. Paste generated stubs into your site’s article system (or keep as markdown drafts)
4. Promote best drafts into `content/chapters/` as chapters
