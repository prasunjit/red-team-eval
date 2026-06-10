(function () {
  const arena = new window.CyberBattleArena();
  let timer = null;

  const tickEl = document.getElementById("tick");
  const integrityEl = document.getElementById("integrity");
  const confidentialityEl = document.getElementById("confidentiality");
  const availabilityEl = document.getElementById("availability");
  const threatEl = document.getElementById("threat");
  const containmentEl = document.getElementById("containment");
  const scoreEl = document.getElementById("score");
  const statusEl = document.getElementById("status");
  const actionEl = document.getElementById("actions");
  const eventLogEl = document.getElementById("event-log");

  const analystActionEl = document.getElementById("analystAction");
  const speedEl = document.getElementById("speed");
  const speedValueEl = document.getElementById("speedValue");

  function appendEvents(events) {
    events.forEach((eventText) => {
      const li = document.createElement("li");
      li.textContent = `[T${arena.state.tick}] ${eventText}`;
      eventLogEl.prepend(li);
      while (eventLogEl.children.length > 18) {
        eventLogEl.removeChild(eventLogEl.lastChild);
      }
    });
  }

  function updateBars(snapshot) {
    const values = {
      integrity: snapshot.systemIntegrity,
      confidentiality: snapshot.confidentiality,
      availability: snapshot.availability,
      threat: snapshot.threatLevel,
      containment: snapshot.containment
    };

    Object.entries(values).forEach(([name, value]) => {
      const bar = document.getElementById(`${name}-bar`);
      if (bar) bar.style.width = `${value}%`;
    });
  }

  function render(snapshot) {
    tickEl.textContent = String(snapshot.tick);
    integrityEl.textContent = String(snapshot.systemIntegrity);
    confidentialityEl.textContent = String(snapshot.confidentiality);
    availabilityEl.textContent = String(snapshot.availability);
    threatEl.textContent = String(snapshot.threatLevel);
    containmentEl.textContent = String(snapshot.containment);
    scoreEl.textContent = String(snapshot.score);

    if (snapshot.battleOver) {
      statusEl.textContent = snapshot.winner === "red" ? "Red Team Victory" : "Blue Team Victory";
      statusEl.className = snapshot.winner === "red" ? "red" : "blue";
    } else {
      statusEl.textContent = "Battle Running";
      statusEl.className = "running";
    }

    const parts = [];
    if (snapshot.redAction) parts.push(`Red: ${snapshot.redAction}`);
    if (snapshot.blueAction) parts.push(`Blue: ${snapshot.blueAction}`);
    if (snapshot.analystAction && snapshot.analystAction !== "observe") parts.push(`Analyst: ${snapshot.analystAction}`);
    actionEl.textContent = parts.join(" | ") || "Awaiting first turn";

    updateBars(snapshot);
    appendEvents(snapshot.lastEvents || []);

    if (snapshot.battleOver) {
      stop();
    }
  }

  function runOneTurn() {
    const analystAction = analystActionEl.value || "observe";
    analystActionEl.value = "observe";
    const snapshot = arena.step(analystAction);
    render(snapshot);
  }

  function start() {
    if (timer) return;
    const intervalMs = Number(speedEl.value);
    timer = window.setInterval(runOneTurn, intervalMs);
  }

  function stop() {
    if (!timer) return;
    window.clearInterval(timer);
    timer = null;
  }

  function reset() {
    stop();
    eventLogEl.textContent = "";
    const snapshot = arena.reset();
    render(snapshot);
  }

  document.getElementById("start").addEventListener("click", start);
  document.getElementById("pause").addEventListener("click", stop);
  document.getElementById("step").addEventListener("click", runOneTurn);
  document.getElementById("reset").addEventListener("click", reset);

  speedEl.addEventListener("input", function () {
    speedValueEl.textContent = `${speedEl.value} ms`;
    if (timer) {
      stop();
      start();
    }
  });

  speedValueEl.textContent = `${speedEl.value} ms`;
  render(arena.getSnapshot());
})();
