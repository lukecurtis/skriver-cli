# Skriver CLI

Local-first prose-as-code CLI for writing projects. This README documents the
features implemented so far.

## This app is work in progress

This app isn't finsihed yet, it's still under development.

## Quick start (local dev)

```bash
npm install
npm run build
node dist/index.js --help
```

Optional local install:

```bash
npm link
skriver --help
```

## Commands implemented

### `skriver init <title>`

Creates a new project directory named `<title>` with the base structure and a
`skriver.json` config.

Options:

- `-l, --lang <code>`: default language code (default: `en`)

Example:

```bash
skriver init "My Novel" --lang en
```

Creates:

```txt
My Novel/
  skriver.json
  works/
  bible/
```

### `skriver work add <workId>`

Adds a work to an existing project (run from the project root). The work id
must be a slug: lowercase letters, numbers, and hyphens (max 64 chars).

Options:

- `-t, --title <title>`: work title (defaults to `workId`)

Example:

```bash
cd "My Novel"
skriver work add the-winter-gate --title "The Winter Gate"
```

Creates:

```txt
works/
  the-winter-gate/
    work.json
    manuscript/
    context/
```

## Current project config files

`skriver.json` (project):

```json
{
  "schema": "skriver.project.v1",
  "name": "My Project",
  "default_language": "en",
  "works_dir": "works",
  "bible_dir": "bible"
}
```

`work.json` (work):

```json
{
  "schema": "skriver.work.v1",
  "id": "the-winter-gate",
  "title": "The Winter Gate",
  "manuscript_dir": "manuscript",
  "context_dir": "context"
}
```
