/* global test, expect */

'use strict';

import { Vector } from '../src/pong.js';

test('it should set the x and y to 0', () => {
  const vector = new Vector();

  expect(vector.x).toEqual(0);
  expect(vector.y).toEqual(0);
});

test('it should set the x and y', () => {
  const vector = new Vector(10, 20);

  expect(vector.x).toEqual(10);
  expect(vector.y).toEqual(20);
});

test('it should compute the len', () => {
  const vector = new Vector(3, 4);

  expect(vector.len).toEqual(5);
});

test('it should set the len', () => {
  const vector = new Vector(3, 4);

  vector.len = 5
  console.log(vector.x);
  console.log(vector.y);

  expect(vector.len).toEqual(5);
});
