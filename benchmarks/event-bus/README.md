# Event Bus Benchmark & Stress Verification Results

- **Run Date**: 2026-07-07T16:21:49.214Z
- **Event Latency for 1,000 events**: 55 ms (avg 0.0550 ms per publish)
- **Total Subscriber Executions**: 100000
- **Stress-Test Memory Growth**: 0.88 MB
- **Subscriber Isolation**: PASSED (No subscriber crash stopped queue processing)
- **Immutability (Deep Freezing)**: PASSED (Payload modification throws block errors)
- **Replay Accuracy**: PASSED (Replay reproduces event sequences)
