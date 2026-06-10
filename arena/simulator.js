function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

class CyberBattleArena {
  constructor(randomFn = Math.random) {
    this.randomFn = randomFn;
    this.reset();
  }

  reset() {
    this.state = {
      tick: 0,
      systemIntegrity: 100,
      confidentiality: 100,
      availability: 100,
      threatLevel: 20,
      detected: false,
      containment: 0,
      attackMomentum: 15,
      defenseMomentum: 15,
      battleOver: false,
      winner: null,
      lastEvents: []
    };
    return this.getSnapshot();
  }

  getSnapshot() {
    return {
      ...this.state,
      score: this.state.attackMomentum - this.state.defenseMomentum
    };
  }

  chooseRedAction() {
    if (this.state.containment >= 60) return "evade";
    if (this.state.threatLevel <= 25) return "recon";
    if (this.state.systemIntegrity <= 35) return "exfiltrate";

    const roll = this.randomFn();
    if (roll < 0.34) return "exploit";
    if (roll < 0.67) return "phish";
    return "disrupt";
  }

  chooseBlueAction() {
    if (this.state.detected && this.state.threatLevel >= 55) return "isolate";
    if (this.state.threatLevel >= 35) return "patch";
    return this.randomFn() < 0.5 ? "monitor" : "deceive";
  }

  applyRedAction(action, events) {
    switch (action) {
      case "recon":
        this.state.threatLevel += 6;
        this.state.attackMomentum += 4;
        events.push("Red agent mapped new attack surface.");
        break;
      case "exploit":
        this.state.systemIntegrity -= 12;
        this.state.threatLevel += 10;
        this.state.attackMomentum += 7;
        events.push("Red agent exploited a vulnerable service.");
        break;
      case "phish":
        this.state.confidentiality -= 10;
        this.state.threatLevel += 9;
        this.state.attackMomentum += 6;
        events.push("Red agent delivered a credential phishing campaign.");
        break;
      case "disrupt":
        this.state.availability -= 13;
        this.state.threatLevel += 8;
        this.state.attackMomentum += 5;
        events.push("Red agent launched service disruption attempts.");
        break;
      case "exfiltrate":
        this.state.confidentiality -= 14;
        this.state.attackMomentum += 8;
        events.push("Red agent initiated data exfiltration.");
        break;
      case "evade":
        this.state.containment -= 10;
        this.state.attackMomentum += 5;
        events.push("Red agent evaded containment controls.");
        break;
      default:
        break;
    }
  }

  applyBlueAction(action, events) {
    switch (action) {
      case "monitor":
        this.state.detected = this.state.detected || this.randomFn() > 0.25;
        this.state.threatLevel -= 5;
        this.state.defenseMomentum += 4;
        events.push("Blue agent expanded telemetry and threat monitoring.");
        break;
      case "patch":
        this.state.systemIntegrity += 8;
        this.state.threatLevel -= 10;
        this.state.defenseMomentum += 6;
        this.state.detected = true;
        events.push("Blue agent patched exposed systems.");
        break;
      case "isolate":
        this.state.threatLevel -= 18;
        this.state.containment += 14;
        this.state.defenseMomentum += 8;
        events.push("Blue agent isolated suspicious infrastructure.");
        break;
      case "deceive":
        this.state.threatLevel -= 7;
        this.state.containment += 6;
        this.state.defenseMomentum += 5;
        events.push("Blue agent deployed deception assets.");
        break;
      default:
        break;
    }
  }

  applyAnalystAction(action, events) {
    switch (action) {
      case "threat_hunt":
        this.state.detected = true;
        this.state.threatLevel -= 8;
        this.state.defenseMomentum += 3;
        events.push("Analyst ordered a targeted threat hunt.");
        break;
      case "force_patch":
        this.state.systemIntegrity += 6;
        this.state.threatLevel -= 6;
        this.state.defenseMomentum += 2;
        events.push("Analyst forced emergency patching.");
        break;
      case "deploy_honeypot":
        this.state.containment += 9;
        this.state.threatLevel -= 4;
        this.state.defenseMomentum += 2;
        events.push("Analyst deployed a honeypot trap.");
        break;
      case "observe":
      default:
        break;
    }
  }

  evaluateWinner() {
    if (this.state.systemIntegrity <= 0 || this.state.confidentiality <= 0 || this.state.availability <= 0) {
      this.state.battleOver = true;
      this.state.winner = "red";
      this.state.lastEvents.push("Red team achieved mission impact.");
      return;
    }

    if (this.state.threatLevel <= 0 && this.state.containment >= 70) {
      this.state.battleOver = true;
      this.state.winner = "blue";
      this.state.lastEvents.push("Blue team fully contained the intrusion.");
      return;
    }

    if (this.state.tick >= 60) {
      this.state.battleOver = true;
      this.state.winner = this.state.attackMomentum > this.state.defenseMomentum ? "red" : "blue";
      this.state.lastEvents.push("Timeboxed simulation ended; outcome based on momentum score.");
    }
  }

  step(analystAction = "observe") {
    if (this.state.battleOver) {
      return this.getSnapshot();
    }

    this.state.tick += 1;
    const events = [];
    const redAction = this.chooseRedAction();
    const blueAction = this.chooseBlueAction();

    this.applyRedAction(redAction, events);
    this.applyBlueAction(blueAction, events);
    this.applyAnalystAction(analystAction, events);

    this.state.systemIntegrity = clamp(this.state.systemIntegrity, 0, 100);
    this.state.confidentiality = clamp(this.state.confidentiality, 0, 100);
    this.state.availability = clamp(this.state.availability, 0, 100);
    this.state.threatLevel = clamp(this.state.threatLevel, 0, 100);
    this.state.containment = clamp(this.state.containment, 0, 100);

    this.state.lastEvents = events;
    this.evaluateWinner();

    return {
      ...this.getSnapshot(),
      redAction,
      blueAction,
      analystAction
    };
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CyberBattleArena };
}

if (typeof window !== "undefined") {
  window.CyberBattleArena = CyberBattleArena;
}
