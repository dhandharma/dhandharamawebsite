// Runs after `npm install` (see "postinstall" in package.json).
//
// Why: on Hostinger the native Next.js compiler (@next/swc-linux-x64-gnu) cannot load because the
// server's glibc is older than the 2.30 it needs, so Next.js falls back to its WebAssembly compiler.
// Next.js 16.4.6 never finds @next/swc-wasm-nodejs in node_modules (it turns the package name into a
// file path relative to the project folder) and instead downloads it during `next build`. Before
// downloading, it checks node_modules/next/wasm/@next/swc-wasm-nodejs. Copying the installed,
// version-pinned package there makes the build use it, so it works without that download.
//
// This script never fails the install: if anything is off it prints a warning and exits normally.

import { cpSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const tag = "[prepare-swc-wasm]";

try {
  const wasmPkgJson = require.resolve("@next/swc-wasm-nodejs/package.json");
  const nextPkgJson = require.resolve("next/package.json");
  const wasmVersion = JSON.parse(readFileSync(wasmPkgJson, "utf8")).version;
  const nextVersion = JSON.parse(readFileSync(nextPkgJson, "utf8")).version;

  if (wasmVersion !== nextVersion) {
    console.warn(
      `${tag} skipped: @next/swc-wasm-nodejs ${wasmVersion} does not match next ${nextVersion}. ` +
        `Install the same version: npm install --save-exact @next/swc-wasm-nodejs@${nextVersion}`,
    );
  } else {
    const target = path.join(path.dirname(nextPkgJson), "wasm", "@next", "swc-wasm-nodejs");
    cpSync(path.dirname(wasmPkgJson), target, { recursive: true, force: true });
    console.log(`${tag} WebAssembly compiler ${wasmVersion} ready at ${path.relative(process.cwd(), target)}`);
  }
} catch (error) {
  console.warn(`${tag} skipped: ${error instanceof Error ? error.message : error}`);
}
