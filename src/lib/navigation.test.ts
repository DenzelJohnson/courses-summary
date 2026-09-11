import { describe, expect, it } from "vitest";
import { buildHref, resolveSelection } from "./navigation";

describe("resolveSelection", () => {
  it("defaults to 2Z03 and syllabus", () => {
    expect(resolveSelection({})).toEqual({ course: "2Z03", section: "syllabus" });
  });

  it("accepts valid course and section values", () => {
    expect(resolveSelection({ course: "3BB4", section: "notes" })).toEqual({
      course: "3BB4",
      section: "notes",
    });
  });

  it("falls back for invalid values", () => {
    expect(resolveSelection({ course: "NOPE", section: "other" })).toEqual({
      course: "2Z03",
      section: "syllabus",
    });
  });
});

describe("buildHref", () => {
  it("creates a bookmarkable course and section URL", () => {
    expect(buildHref("2GA3", "lectures")).toBe("/?course=2GA3&section=lectures");
  });
});
