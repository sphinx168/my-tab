import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateProgress, formatTimecode, parseTimecode } from './songUtils.js';

test('parseTimecode parses minutes and hours', () => {
  assert.equal(parseTimecode('2:23'), 143);
  assert.equal(parseTimecode('62:03'), 3723);
  assert.equal(parseTimecode('1:02:03'), 3723);
});

test('parseTimecode rejects missing and invalid values', () => {
  assert.equal(parseTimecode(null), null);
  assert.equal(parseTimecode(''), null);
  assert.equal(parseTimecode('2:70'), null);
  assert.equal(parseTimecode('2:3'), null);
  assert.equal(parseTimecode('1:70:00'), null);
  assert.equal(parseTimecode('-1:20'), null);
});

test('formatTimecode formats seconds consistently', () => {
  assert.equal(formatTimecode(0), '0:00');
  assert.equal(formatTimecode(143), '2:23');
  assert.equal(formatTimecode(3723), '1:02:03');
  assert.equal(formatTimecode(-1), null);
});

test('calculateProgress computes, rounds, and caps completion', () => {
  assert.deepEqual(calculateProgress({ current: '2:23', duration: '4:52' }), {
    currentSeconds: 143,
    durationSeconds: 292,
    percentage: 49,
  });
  assert.equal(calculateProgress({ current: '5:00', duration: '4:00' }).percentage, 100);
});

test('calculateProgress omits completion without a valid positive duration', () => {
  assert.equal(calculateProgress({ current: '2:23', duration: null }).percentage, null);
  assert.equal(calculateProgress({ current: '2:23', duration: '0:00' }).percentage, null);
  assert.equal(calculateProgress({ current: 'bad', duration: '4:00' }).percentage, null);
});
