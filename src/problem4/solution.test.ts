// If you see an import error, make sure sum_to_n_a, sum_to_n_b, and sum_to_n_c are exported from solution.ts
// Add this line to the top of your test file to help TypeScript recognize Jest globals:
// @ts-ignore
import { describe, it, expect } from "@jest/globals";
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./solution";

describe("sum_to_n_a", () => {
  it("returns 1 for n=1", () => {
    expect(sum_to_n_a(1)).toBe(1);
  });
  it("returns 15 for n=5", () => {
    expect(sum_to_n_a(5)).toBe(15);
  });
  it("returns 55 for n=10", () => {
    expect(sum_to_n_a(10)).toBe(55);
  });
});

describe("sum_to_n_b", () => {
  it("returns 1 for n=1", () => {
    expect(sum_to_n_b(1)).toBe(1);
  });
  it("returns 15 for n=5", () => {
    expect(sum_to_n_b(5)).toBe(15);
  });
  it("returns 55 for n=10", () => {
    expect(sum_to_n_b(10)).toBe(55);
  });
});

describe("sum_to_n_c", () => {
  it("returns 1 for n=1", () => {
    expect(sum_to_n_c(1)).toBe(1);
  });
  it("returns 15 for n=5", () => {
    expect(sum_to_n_c(5)).toBe(15);
  });
  it("returns 55 for n=10", () => {
    expect(sum_to_n_c(10)).toBe(55);
  });
});
