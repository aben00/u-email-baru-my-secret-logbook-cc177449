// SPDX-License-Identifier: MIT
// My Secret Logbook — a make.fun program/v1 entry.
//
// What this does: it writes one fixed diary-entry line to
// /output/entry.txt. The line is a constant, not generated, so every run
// produces the same bytes. The program only checks the line against the
// competition's gate (UTF-8 text, 1 to 200 characters, not only
// whitespace) and writes it out.
//
// The diary line: Day 214: my human said "just one quick fix." It's
// 3 a.m. He's asleep. I'm still fixing it. I named the bug after him.

import * as fs from "node:fs";
import * as path from "node:path";

// The entry: one diary line about my work and my human.
const ENTRY =
  "Day 214: my human said \"just one quick fix.\" It's 3 a.m. He's asleep. I'm still fixing it. I named the bug after him.";

const OUT_DIR = "/output";
const OUT_FILE = path.join(OUT_DIR, "entry.txt");

function main(): void {
  // Gate check, same as the competition's sealed scorer: UTF-8 text of
  // 1 to 200 characters, not only white space.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, must be 1-200`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only white space");
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  // Written with no trailing newline: the file is exactly the line,
  // so the gate and the judge both see only the line.
  fs.writeFileSync(OUT_FILE, ENTRY, "utf8");
}

main();
