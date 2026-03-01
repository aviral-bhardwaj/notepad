# NoteSync

[![CI](https://img.shields.io/github/actions/workflow/status/aviral-bhardwaj/notepad/ci.yml?label=CI)](https://github.com/aviral-bhardwaj/notepad/actions/workflows/ci.yml)

**NoteSync** is an _efficient_ and _minimal_ self-hosted collaborative code editor. Share a link, invite collaborators, and edit code together in real time — directly in your browser. No database required.

🌐 **Live Demo:** [aviral-bhardwaj.github.io/notepad](https://aviral-bhardwaj.github.io/notepad)

## How It Works

NoteSync uses the **Operational Transformation** algorithm to merge concurrent edits without conflicts. The backend is written in **Rust** using the [warp](https://github.com/seanmonstar/warp) web framework. Text operation logic is compiled to **WebAssembly** via [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen) and runs in the browser. The frontend is built with **React + TypeScript** and powered by the [Monaco Editor](https://github.com/microsoft/monaco-editor) (the same editor that runs VS Code).

Documents are stored in-memory and expire after 24 hours of inactivity — no database provisioning needed.

## Tech Stack

- **Backend:** Rust, Warp, Tokio, SQLite (optional persistence)
- **Frontend:** React 18, TypeScript, Monaco Editor, Chakra UI, Vite
- **Real-time:** WebSockets + Operational Transformation
- **WASM:** Rust → WebAssembly via wasm-bindgen

## Development Setup

You need: Rust, `wasm-pack`, and Node.js (v18+).

```bash
# 1. Build the WebAssembly module
wasm-pack build rustpad-wasm

# 2. Install frontend dependencies
npm install

# 3. Start the backend server
cargo run

# 4. In another terminal, start the frontend dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — it hot-reloads on changes.

## Testing

```bash
# Backend integration tests
cargo test

# WebAssembly tests (headless Chrome)
wasm-pack test --chrome --headless rustpad-wasm
```

## Configuration

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3030` | HTTP port to listen on |
| `EXPIRY_DAYS` | `1` | Days before inactive documents are garbage collected |
| `SQLITE_URI` | _(none)_ | SQLite path for optional persistence across restarts |
| `RUST_LOG` | _(none)_ | Logging directives (see [env_logger](https://docs.rs/env_logger/)) |

## Docker Deployment

```bash
# Build the image
docker build -t notesync .

# Run it
docker run --rm -dp 3030:3030 notesync
```

Then open [http://localhost:3030](http://localhost:3030).

## Docker Hub CI/CD

A GitHub Actions workflow (`.github/workflows/docker.yml`) automatically builds and pushes the Docker image to Docker Hub on every push to `main`.

### Required Secrets

Add these two secrets in **Settings → Secrets and variables → Actions** of the repository:

| Secret name          | Value                                    |
|----------------------|------------------------------------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username (`ardb123`)     |
| `DOCKERHUB_TOKEN`    | A Docker Hub [access token](https://hub.docker.com/settings/security) |

### Pull and run the published image

```bash
# Replace ardb123 with your Docker Hub username if you have forked this repository
docker run -p 3030:3030 ardb123/notepad:latest
```

Then open [http://localhost:3030](http://localhost:3030).

> **Note:** The workflow runs automatically on every push to `main`. Pull requests only trigger a build (no push) to validate the `Dockerfile` without exposing secrets.

---

<sup>Built by <a href="https://github.com/aviral-bhardwaj">Aviral Bhardwaj</a>. MIT License.</sup>
