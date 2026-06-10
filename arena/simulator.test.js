const test = require('node:test');
const assert = require('node:assert/strict');
const { CyberBattleArena } = require('./simulator');

test('arena initializes with expected baseline metrics', () => {
  const arena = new CyberBattleArena(() => 0.4);
  const snapshot = arena.getSnapshot();

  assert.equal(snapshot.tick, 0);
  assert.equal(snapshot.systemIntegrity, 100);
  assert.equal(snapshot.threatLevel, 20);
  assert.equal(snapshot.battleOver, false);
});

test('analyst threat hunt reduces threat and enables detection', () => {
  const arena = new CyberBattleArena(() => 0.1);
  arena.state.threatLevel = 40;

  const snapshot = arena.step('threat_hunt');

  assert.equal(snapshot.detected, true);
  assert.ok(snapshot.threatLevel <= 38);
});

test('red team wins when confidentiality is depleted', () => {
  const arena = new CyberBattleArena(() => 0.2);
  arena.state.confidentiality = 10;
  arena.state.systemIntegrity = 30;
  arena.state.threatLevel = 50;

  const snapshot = arena.step('observe');

  assert.equal(snapshot.battleOver, true);
  assert.equal(snapshot.winner, 'red');
});

test('blue team can win by containment and threat suppression', () => {
  const arena = new CyberBattleArena(() => 0.9);
  arena.state.detected = true;
  arena.state.threatLevel = 5;
  arena.state.containment = 80;

  const snapshot = arena.step('observe');

  assert.equal(snapshot.battleOver, true);
  assert.equal(snapshot.winner, 'blue');
});
