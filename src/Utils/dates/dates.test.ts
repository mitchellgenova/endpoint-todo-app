import { describe, it, expect } from "vitest";
import { dateFormatter } from "./dates";

describe("dates", () => {
  it("should format date correctly", () => {
    const dateToFormat = new Date("2021-09-01T00:00:00");
    const formattedDate = dateFormatter.format(dateToFormat);
    expect(formattedDate).toBe("9/1/2021");
  });
});
