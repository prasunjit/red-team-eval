# red-team-eval

Interactive orchestration arena for autonomous cyber conflict simulation:
- **Red-team AI agent** executes offensive actions
- **Defensive AI agent** performs mitigation and containment
- **Human analyst** can intervene in real time and observe live telemetry

## Run locally

```bash
cd /home/runner/work/red-team-eval/red-team-eval/prasunjit/red-team-eval
python3 -m http.server 8000
```

Then open: `http://localhost:8000/arena/`

## Run focused tests

```bash
cd /home/runner/work/red-team-eval/red-team-eval/prasunjit/red-team-eval
node --test arena/simulator.test.js
```
