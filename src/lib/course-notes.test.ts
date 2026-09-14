import { describe, expect, it } from "vitest";
import { courseNotes } from "./course-notes";

describe("courseNotes", () => {
  it("maps every course to its published Google Docs embed URL", () => {
    expect(courseNotes["2Z03"].embedUrl).toContain("2PACX-1vTPcjq");
    expect(courseNotes["2DA4"].embedUrl).toContain("2PACX-1vRhv5D");
    expect(courseNotes["3BB4"].embedUrl).toContain("2PACX-1vTzW8e");
    expect(
      Object.values(courseNotes).every(({ embedUrl }) =>
        embedUrl.endsWith("?embedded=true"),
      ),
    ).toBe(true);
  });
});
