import { EventBus } from "../../packages/event-bus/src/core/EventBus";
import { LoggingMiddleware } from "../../packages/event-bus/src/middleware/LoggingMiddleware";
import { ValidationMiddleware } from "../../packages/event-bus/src/middleware/ValidationMiddleware";
import { MetricsMiddleware } from "../../packages/event-bus/src/middleware/MetricsMiddleware";
import { Priority } from "../../packages/event-bus/src/priority";
import { KlinEvent } from "../../packages/event-bus/src/events/KlinEvent";
import * as fs from "fs";
import * as path from "path";

async function runBenchmark() {
  console.log("=== Starting Event Bus Performance & Stress Benchmark ===");

  // Initialize EventBus with ordered middlewares
  const eventBus = new EventBus([
    new ValidationMiddleware(),
    new MetricsMiddleware(),
  ]);

  const publisher = eventBus.getPublisher();

  // Test subscriber isolation
  let subBExecuted = false;
  let subCExecuted = false;

  eventBus.subscriptions.add({
    id: "sub-a",
    name: "Subscriber A (Fails)",
    eventNamePattern: "builder.test.isolation",
    callback: () => {
      throw new Error("Subscriber A failed intentionally");
    },
  });

  eventBus.subscriptions.add({
    id: "sub-b",
    name: "Subscriber B (Succeeds)",
    eventNamePattern: "builder.test.isolation",
    callback: () => {
      subBExecuted = true;
    },
  });

  eventBus.subscriptions.add({
    id: "sub-c",
    name: "Subscriber C (Succeeds)",
    eventNamePattern: "builder.test.isolation",
    callback: () => {
      subCExecuted = true;
    },
  });

  // Publish event triggering isolation checks
  await publisher.publish("builder.test.isolation", { test: true }, "benchmark");

  const isolationPassed = subBExecuted && subCExecuted;
  console.log(`Subscriber Isolation Check: ${isolationPassed ? "PASSED" : "FAILED"}`);

  // Test event immutability
  let immutabilityPassed = false;
  eventBus.subscriptions.add({
    id: "sub-immutable-test",
    name: "Subscriber Immutability Test",
    eventNamePattern: "builder.test.immutability",
    callback: (event: KlinEvent) => {
      try {
        (event.payload as any).mutatedValue = "new";
      } catch (e) {
        immutabilityPassed = true; // Threw error because object is frozen
      }
    },
  });

  await publisher.publish("builder.test.immutability", { mutatedValue: "old" }, "benchmark");
  console.log(`Event Immutability Check: ${immutabilityPassed ? "PASSED" : "FAILED"}`);

  // Load subscribers for stress test (100 subscribers)
  console.log("Registering 100 subscribers...");
  let executionTally = 0;
  for (let i = 0; i < 100; i++) {
    eventBus.subscriptions.add({
      id: `sub-stress-${i}`,
      name: `Stress Subscriber ${i}`,
      eventNamePattern: "builder.stress.event",
      callback: () => {
        executionTally++;
      },
    });
  }

  // Publish 1,000 events
  console.log("Publishing 1,000 events to 100 subscribers (Stress test)...");
  const startTime = Date.now();
  const memoryBefore = process.memoryUsage().heapUsed;

  for (let j = 0; j < 1000; j++) {
    await publisher.publish(
      "builder.stress.event",
      { index: j },
      "benchmark",
      { metadata: { priority: j % 2 === 0 ? Priority.HIGH : Priority.NORMAL } }
    );
  }

  const duration = Date.now() - startTime;
  const memoryAfter = process.memoryUsage().heapUsed;
  const memoryDifference = memoryAfter - memoryBefore;

  console.log(`Stress test duration: ${duration}ms`);
  console.log(`Total subscriber invocations: ${executionTally}`);
  console.log(`Memory Difference: ${(memoryDifference / 1024 / 1024).toFixed(2)} MB`);

  // Verify replay engine
  console.log("Verifying replay engine...");
  eventBus.history.clear();
  let replayTally = 0;
  eventBus.subscriptions.add({
    id: "sub-replay-verify",
    name: "Replay Verifier",
    eventNamePattern: "builder.replay.test",
    callback: () => {
      replayTally++;
    },
  });

  await publisher.publish("builder.replay.test", { index: 1 }, "benchmark");
  await publisher.publish("builder.replay.test", { index: 2 }, "benchmark");

  const beforeReplayTally = replayTally;
  await eventBus.getReplayEngine().replay();
  const replayPassed = replayTally === beforeReplayTally * 2;
  console.log(`Replay Engine Check: ${replayPassed ? "PASSED" : "FAILED"}`);

  // Save report
  const reportDir = path.resolve("benchmarks/event-bus");
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const markdownContent = `# Event Bus Benchmark & Stress Verification Results

- **Run Date**: ${new Date().toISOString()}
- **Event Latency for 1,000 events**: ${duration} ms (avg ${(duration / 1000).toFixed(4)} ms per publish)
- **Total Subscriber Executions**: ${executionTally}
- **Stress-Test Memory Growth**: ${(memoryDifference / 1024 / 1024).toFixed(2)} MB
- **Subscriber Isolation**: ${isolationPassed ? "PASSED (No subscriber crash stopped queue processing)" : "FAILED"}
- **Immutability (Deep Freezing)**: ${immutabilityPassed ? "PASSED (Payload modification throws block errors)" : "FAILED"}
- **Replay Accuracy**: ${replayPassed ? "PASSED (Replay reproduces event sequences)" : "FAILED"}
`;

  fs.writeFileSync(path.join(reportDir, "README.md"), markdownContent);
  console.log(`Benchmark report written to ${path.join(reportDir, "README.md")}`);
}

runBenchmark().catch((err) => {
  console.error("Benchmark failed:", err);
});
