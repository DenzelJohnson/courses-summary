import { describe, expect, it } from "vitest";
import { formatTaskDate } from "./task-date";

describe("formatTaskDate", () => {
  it("converts 24-hour times, including ranges, to 12-hour times", () => {
    expect(formatTaskDate("Thu, Sep 24 · 23:59")).toBe("Thu, Sep 24 · 11:59 PM");
    expect(formatTaskDate("Mon, Oct 5 · 14:30–17:20")).toBe(
      "Mon, Oct 5 · 2:30 PM–5:20 PM",
    );
    expect(formatTaskDate("Week of Oct 19–23 · 20:00")).toBe(
      "Week of Oct 19–23 · 8:00 PM",
    );
  });

  it("leaves dates without times unchanged", () => {
    expect(formatTaskDate("TBD")).toBe("TBD");
  });
});
