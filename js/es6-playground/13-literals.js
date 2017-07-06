// 13 - Two new numeric literal forms are added for binary (b) and octal (o).
'use strict'

const a = 0b00010000;
const b = 0o20;
console.log(`A = ${a}  B = ${b}`);

// birwise
console.log('--- available flags ---');

const flags = {
  HW:         0b00000001,
  BACKBUFFER: 0b00000010,
  GFX_16:     0b00000100,
  GFX_32:     0b00001000,
  GFX_64:     0b00010000
}
for (const [k, v] of Object.entries(flags)) {
  console.log(`${k} = ${v}`);
}

console.log('--- enabled flags ---');

let enabled = flags.HW | flags.BACKBUFFER | flags.GFX_32;

console.log(`ALL ENABLED = ${enabled}`);
for (const [k, v] of Object.entries(flags)) {
  if (enabled & v) {
    console.log(`ENABLED FLAGS: ${k}`);
  }
}

// eof