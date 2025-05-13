import { describe, expect, it } from "vitest";
import { useTransformInputNumber } from "../../hooks/useTransformInputNumber";
import { renderHook } from "@testing-library/react";
import { InputEnum } from "../../enums/number-input-enum";

describe("useTransformInputNumber", () => {
  const { result } = renderHook(() => useTransformInputNumber());

  describe("transformOnChange", () => {
    const transformOnChange = result.current.transformOnChange;

    it("replace comma with dot", () => {
      expect(transformOnChange("10,2")).toBe("10.2");
    });

    it("keep only num, dots and minus char at the first", () => {
      expect(transformOnChange("a12b")).toBe("12");
      expect(transformOnChange("abc@#12,3-=23")).toBe("12.323");
      expect(transformOnChange("-12,3-23$#@")).toBe("-12.323");
    });

    it("return empty for only have invalid chars", () => {
      expect(transformOnChange("")).toBe("");
      expect(transformOnChange("abc")).toBe("");
    });
  });

  describe("transformOnBur", () => {
    const transformOnBur = result.current.transformOnBur;

    it("return 0 for negative input", () => {
      expect(transformOnBur(InputEnum.PERCENT, -5)).toBe(0);
      expect(transformOnBur(InputEnum.PX, -10)).toBe(0);
    });

    it("return pre valid value for percent unit if value is greater than 100", () => {
      expect(transformOnBur(InputEnum.PERCENT, 150)).toBe(15);
      expect(transformOnBur(InputEnum.PERCENT, 220)).toBe(22);
      expect(transformOnBur(InputEnum.PERCENT, 50)).toBe(50);
      expect(transformOnBur(InputEnum.PX, 101)).toBe(101);
    });
  });
});
