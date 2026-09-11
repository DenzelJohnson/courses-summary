import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Vitest configuration", () => {
  it("excludes nested worktrees from root test discovery", () => {
    const source = readFileSync(resolve(process.cwd(), "vitest.config.ts"), "utf8");

    expect(source).toContain(
      'exclude: [...configDefaults.exclude, "**/.worktrees/**"]',
    );
  });
});
