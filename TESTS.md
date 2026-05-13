# Tests

This document lists all automated tests currently implemented for the AI Cost Lens recommendation engine.

The test suite focuses primarily on validating:
- recommendation generation
- optimization detection
- savings estimation
- audit classification
- per-tool breakdown generation

All tests are implemented using Vitest.

---

# Test Framework

- Vitest

---

# Test File Structure

```text
src/tests/recommendation-engine.test.ts
```

---

# Implemented Tests

## 1. Conversational AI overlap detection

### Test Name

```text
detects conversational AI overlap
```

### What it covers

Verifies that the recommendation engine detects overlapping conversational AI subscriptions such as:
- ChatGPT Plus
- Claude Pro

and generates optimization recommendations.

### Assertions

- recommendation array is generated
- overlap detection logic executes correctly

---

## 2. Optimized stack detection

### Test Name

```text
marks optimized stacks correctly
```

### What it covers

Validates that lean AI tooling setups with minimal overlap are classified as already optimized.

### Assertions

- `isAlreadyOptimal` is set to `true`

---

## 3. Savings calculation validation

### Test Name

```text
calculates savings correctly
```

### What it covers

Ensures that the recommendation engine calculates non-zero optimization savings when redundant or expensive tooling configurations are detected.

### Assertions

- `estimatedMonthlySavings > 0`

---

## 4. High savings audit classification

### Test Name

```text
flags high savings audits
```

### What it covers

Checks whether large-spend audits are correctly classified as high savings opportunities.

### Assertions

- `isHighSavings` is set to `true`

---

## 5. Per-tool breakdown generation

### Test Name

```text
generates per-tool breakdown
```

### What it covers

Verifies that the audit engine generates structured per-tool breakdown entries for audit reports.

### Assertions

- `perToolBreakdown.length === 1`

---

# How to Run Tests

## Run all tests

```bash
npm run test
```

---

## Run Vitest directly

```bash
npx vitest
```

---

## Run tests in watch mode

```bash
npx vitest --watch
```

---

# Example Test Output

```text
✓ detects conversational AI overlap
✓ marks optimized stacks correctly
✓ calculates savings correctly
✓ flags high savings audits
✓ generates per-tool breakdown
```

---

# Notes

The current test suite focuses on validating the recommendation engine because it contains the core business logic of the application.

Frontend rendering, API route behavior, and email workflows are currently tested manually during development and deployment verification.

Future improvements would include:
- API integration tests
- E2E browser tests
- snapshot tests
- database mocking
- CI coverage reporting

---