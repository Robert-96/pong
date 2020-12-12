'use strict';

import { Canvas } from './pong.js';

import './css/normalize.css';
import './css/style.css';

const canvas = new Canvas(document.getElementById('pong'));
canvas.setUp();
canvas.start();
