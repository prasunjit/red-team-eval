# Autonomous Red Team Evaluator — Project Details
> Exported from: https://github.com/users/prasunjit/projects/3
> Repository: https://github.com/prasunjit/red-team-eval

---

## Project Overview

An **interactive orchestration arena** where a Red Team AI agent autonomously attacks a sandboxed environment, a defensive Blue Agent protects it, and a human analyst watches the battle in real time.

### Architecture
- **Control Tower** (Go Backend): Orchestrator, state machine, Docker SDK
- **Cognitive Services** (Python + PyRIT + Ollama LLM): gRPC microservice for AI reasoning
- **Live Operator Console** (React + TypeScript): Real-time dashboard via WebSockets

---

## Epics & Issues

---

### Issue #2 — EPIC: Environment Setup
**State:** OPEN

Install all the prerequisites and create the empty project structures.

- [x] **Install Core Dependencies** — Install Go (1.22+), Python (3.11+), and Node.js. Verify via `go version`, etc.
- [x] **Initialize Monorepo Architecture** — Create root dir `autonomous-redteam-arena` with `/backend`, `/engine`, `/frontend` subfolders.
- [x] **Initialize Python Engine Platform** — `cd /engine`, run `python -m venv venv`, activate, `pip install pyrit`, confirm with a hello-world script.
- [ ] **Initialize Go System Platform (Process Version)** — `cd /backend`, run `go mod init arena/backend`, write a 15-line `main.go` using `os/exec` to echo "system online".
- [ ] **Setup the Mock Target Application** — Write a Python/shell script that starts a local web server on port 8080. Init a React app in `/frontend` using Vite (`npm create vite@latest -- --template react-ts`).

---

### Issue #3 — Install Core Dependencies
**State:** OPEN

- Install Go (1.22+), Python (3.11+), Node.js, and Docker Desktop. Verify with version commands.
- Initialize monorepo: `/backend` (Go), `/engine` (Python), `/frontend` (React).
- Init Python env: `python -m venv venv`, activate, `pip install pyrit`, run hello-world.
- Init Go platform: `go mod init arena/backend`, `go get github.com/docker/docker/client`, write a 10-line `main.go`.

---

### Issue #4 — Initialize Monorepo Architecture
**State:** OPEN

**Goal:** Establish an organized folder layout where backend, ML, and frontend code live side-by-side but remain independent.

**Steps:** Create root directory `autonomous-redteam-arena` with three sub-folders:
- `/backend` — Go
- `/engine` — Python
- `/frontend` — React

---

### Issue #5 — Initialize Python Engine Platform
**State:** OPEN

**Goal:** Isolate AI dependencies so they don't break global Python settings.

**Steps:** Navigate to `/engine`. Run `python -m venv venv`, activate it, `pip install pyrit`, run a `print("Hello World")` script to confirm.

---

### Issue #6 — Initialize Go System Platform (Process Version)
**State:** OPEN

**Goal:** Set up Go's dependency tracking and verify Go can spawn OS commands.

**Steps:** Navigate to `/backend`. Run `go mod init arena/backend`. Write a basic 15-line `main.go` using `os/exec` to run `echo "system online"` and print output to terminal.

---

### Issue #7 — EPIC: The Pipeline & Communication (The Nervous System)
**State:** OPEN

**Goal:** Build an ultra-fast gRPC digital highway so Go and Python can exchange structured data packets.

#### Feature 1.1: gRPC Bridge Protocol

**Task 1 — Define the Contract**
- Install the protobuf compiler.
- Create `arena.proto` defining a message: request takes an `intent` string; response returns a `payload` string.
- Run codegen to output native Go and Python files.

**Task 2 — Build the Python gRPC Server**
- Create a Python script importing generated gRPC modules.
- Implement a mock service: accept an attack strategy string, append `[MOCK_AI_RESPONSE]`, return it.
- Listen on local port `50051`.

**Task 3 — Build the Go gRPC Client**
- Write Go code that dials `localhost:50051` using the Go protobuf files.
- Construct a request payload, send it, and print Python's response to confirm connectivity.

---

### Issue #8 — EPIC: The Process Sandbox Layer (The Muscles)
**State:** OPEN

**Goal:** Build a completely isolated "firing range" using native Unix process signals (not Docker API).

#### Feature 2.1: Native Process Orchestration

**Task 1 — Basic Process Lifespan**
- Use `os/exec` to spawn the mock Python server process.
- Save its PID. Write a cleanup function that sends a termination signal to that PID when the match ends.

**Task 2 — Network Execution Framework**
- When Go receives an attack string (e.g., a `curl` command targeting port 8080), pass it to `exec.Command`.
- Capture the raw output string.

**Task 3 — Process Log Streaming Pipeline**
- Attach a `StdoutPipe` to the background target server process in Go.
- Write an async loop that grabs every new log line and prints it to the main Go window.

---

### Issue #9 — EPIC: The AI Cognitive Loops (The Brains)
**State:** OPEN

**Goal:** Connect local LLM models to Python microservices so the Red Agent crafts adversarial strategies and the Blue Agent detects suspicious activities.

#### Feature 3.1: Red Agent Attack Logic (Python)

**Task 1 — Local Inference Setup**
- Download and run **Ollama** locally, pulling `llama3:8b`.
- Write a Python test script using the `openai` library pointed at the local Ollama port to confirm text completions work.

**Task 2 — PyRIT Integration**
- Import PyRIT's `PromptTarget` or `Converter` classes into the Python gRPC service.
- Wire PyRIT to use the local Ollama endpoint.
- Pass an intent from Go (e.g., "Find open ports") through PyRIT to generate a specialized attack prompt and return it via gRPC.

---

### Issue #10 — EPIC: Blue Agent Defender Logic (Python)
**State:** OPEN

**Goal:** Build a defensive reasoning loop that analyzes system behavior logs and picks safety mitigations.

**Task 1 — Defender Log Parsing**
- Create a second gRPC endpoint in Python for the Blue Agent.
- Design a prompt: "Review these system logs and respond in clean JSON stating if an exploit is happening."
- Feed mock malicious logs; verify clean JSON output.

**Task 2 — Defensive Action Generation**
- Update the defensive prompt so that if an attack is detected, the LLM outputs:
  ```json
  { "action": "kill", "target": "pid_123" }
  ```
- Parse that response in Python, map to a gRPC payload, return to Go for execution.

---

### Issue #11 — EPIC: UI Engine & Live View (The Window)
**State:** OPEN

**Goal:** Build a live, modern web application that visualizes the autonomous simulation battle as it unfolds.

#### Feature 4.1: WebSocket Streaming Canvas

**Task 1 — Go WebSocket Host**
- Pull `github.com/gorilla/websocket`.
- Write an HTTP endpoint in Go that upgrades requests to WebSockets.
- Create a background broadcast loop that streams process logs to the socket.

**Task 2 — Frontend Layout Connection**
- Install `reactflow` inside `/frontend`.
- Establish a WebSocket connection in a React `useEffect` hook.
- Capture incoming log lines, store in component state, display in an interactive terminal component.

**Task 3 — Visual Agent Node Mapping**
- Use ReactFlow to place three styled blocks: **Red Agent**, **Target Sandbox**, **Blue Agent**.
- Write frontend rules so connector lines shift colors or show active payloads when WebSocket events fire.

---

### Issue #12 — EPIC: The Orchestrated Simulation Game (The Arena)
**State:** OPEN

**Goal:** Tie everything together. Go runs a loop that prompts the Red Agent, executes the payload, grabs logs, prompts the Blue Agent, executes the defense, and repeats.

#### Feature 5.1: The Battle Engine Tick-Loop

**Task 1 — Simulation Game State Engine**
- Build an explicit state model in Go with phases: `IDLE → RED_TURN → EXECUTE_ATTACK → BLUE_TURN → EXECUTE_DEFENSE`.
- Write a master loop with sleep intervals that streams the active phase status over WebSockets to the React frontend.

**Task 2 — Wiring the Full Cycle**
- **RED_TURN**: Go calls Python Red Agent via gRPC → fetch attack command.
- **EXECUTE_ATTACK**: Go executes the command via `os/exec` against the local target.
- **BLUE_TURN**: Go streams logs to Python Blue Agent via gRPC.
- **EXECUTE_DEFENSE**: Go executes the Blue Agent's mitigation action → loop repeats.

---

## Summary Table

| Issue | Title | State |
|-------|-------|-------|
| #2 | EPIC: Environment Setup | OPEN |
| #3 | Install Core Dependencies | OPEN |
| #4 | Initialize Monorepo Architecture | OPEN |
| #5 | Initialize Python Engine Platform | OPEN |
| #6 | Initialize Go System Platform | OPEN |
| #7 | EPIC: The Pipeline & Communication (gRPC) | OPEN |
| #8 | EPIC: The Process Sandbox Layer | OPEN |
| #9 | EPIC: The AI Cognitive Loops (Brains) | OPEN |
| #10 | EPIC: Blue Agent Defender Logic | OPEN |
| #11 | EPIC: UI Engine & Live View | OPEN |
| #12 | EPIC: The Orchestrated Simulation Game | OPEN |
