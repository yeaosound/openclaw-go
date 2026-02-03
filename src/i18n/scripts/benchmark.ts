#!/usr/bin/env node
/**
 * i18n Performance Benchmark
 * Measures translation performance and memory usage
 */

import { performance } from "perf_hooks";
import { t, setLocale } from "../index.js";

console.log("⚡ i18n Performance Benchmark\n");

const ITERATIONS = 100000;

// Warm up
console.log("Warming up...");
for (let i = 0; i < 1000; i++) {
  t("channel.discord.notAllowed");
}

// Test 1: Simple translation performance
console.log("\nTest 1: Simple Translation Performance");
console.log(`  Running ${ITERATIONS.toLocaleString()} iterations...`);

const start1 = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  t("channel.discord.notAllowed");
}
const end1 = performance.now();

const duration1 = end1 - start1;
const opsPerSecond1 = ((ITERATIONS / duration1) * 1000).toFixed(0);
console.log(`  Duration: ${duration1.toFixed(2)}ms`);
console.log(`  Ops/sec: ${parseInt(opsPerSecond1).toLocaleString()}`);
console.log(`  Average: ${((duration1 / ITERATIONS) * 1000).toFixed(3)}μs/op`);

// Test 2: Interpolation performance
console.log("\nTest 2: Interpolation Performance");
console.log(`  Running ${ITERATIONS.toLocaleString()} iterations...`);

const start2 = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  t("channel.discord.system.pinnedMessage", { location: `channel-${i}` });
}
const end2 = performance.now();

const duration2 = end2 - start2;
const opsPerSecond2 = ((ITERATIONS / duration2) * 1000).toFixed(0);
console.log(`  Duration: ${duration2.toFixed(2)}ms`);
console.log(`  Ops/sec: ${parseInt(opsPerSecond2).toLocaleString()}`);
console.log(`  Average: ${((duration2 / ITERATIONS) * 1000).toFixed(3)}μs/op`);

// Test 3: Locale switching performance
console.log("\nTest 3: Locale Switching Performance");
const SWITCH_ITERATIONS = 10000;
console.log(`  Running ${SWITCH_ITERATIONS.toLocaleString()} switches...`);

const start3 = performance.now();
for (let i = 0; i < SWITCH_ITERATIONS; i++) {
  setLocale(i % 2 === 0 ? "en" : "zh-CN");
}
const end3 = performance.now();

const duration3 = end3 - start3;
console.log(`  Duration: ${duration3.toFixed(2)}ms`);
console.log(`  Average: ${((duration3 / SWITCH_ITERATIONS) * 1000).toFixed(3)}μs/switch`);

// Test 4: Memory usage
console.log("\nTest 4: Memory Usage");

// Force garbage collection if available
try {
  if (global.gc) {
    global.gc();
  }
} catch (e) {
  // ignore
}

const memBefore = process.memoryUsage();

// Load translations many times
for (let i = 0; i < 10000; i++) {
  t("channel.discord.notAllowed");
  t("channel.slack.notAllowed");
  t("channel.telegram.groupDisabled");
  t("common.yes");
  t("common.no");
}

const memAfter = process.memoryUsage();
const heapDiff = (memAfter.heapUsed - memBefore.heapUsed) / 1024 / 1024;

console.log(`  Heap before: ${(memBefore.heapUsed / 1024 / 1024).toFixed(2)} MB`);
console.log(`  Heap after: ${(memAfter.heapUsed / 1024 / 1024).toFixed(2)} MB`);
console.log(`  Difference: ${heapDiff > 0 ? "+" : ""}${heapDiff.toFixed(2)} MB`);

// Summary
console.log("\n📊 Summary");
console.log(
  "  ✅ Simple translation: " + (parseInt(opsPerSecond1) > 100000 ? "Excellent" : "Good"),
);
console.log("  ✅ Interpolation: " + (parseInt(opsPerSecond2) > 50000 ? "Excellent" : "Good"));
console.log("  ✅ Locale switching: " + (duration3 < 100 ? "Excellent" : "Good"));
console.log("  ✅ Memory usage: " + (heapDiff < 10 ? "Excellent" : "Good"));
console.log("\n✅ All performance benchmarks completed!");
