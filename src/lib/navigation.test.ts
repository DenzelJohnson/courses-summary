import { describe, expect, it } from "vitest";
import { buildHref, resolveSelection, sectionLabels } from "./navigation";

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
    expect(buildHref("2DA4", "lectures")).toBe("/?course=2DA4&section=lectures");
  });

  it("keeps the stable lectures URL while displaying Tasks", () => {
    expect(sectionLabels.lectures).toBe("Tasks");
    expect(buildHref("2Z03", "lectures")).toBe("/?course=2Z03&section=lectures");
  });
});
