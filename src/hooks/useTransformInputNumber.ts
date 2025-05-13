import { InputEnum } from "../enums/number-input-enum";

export const useTransformInputNumber = () => {
  return {
    transformOnChange: (inputValue: string) => {
      const sanitizedValue = inputValue
        .replace(",", ".")
        .replace(/[^0-9-.]/g, "")
        .replace(/(?!^)-/g, ""); // keep '-' at first

      return sanitizedValue;
    },
    transformOnBur: (unit: InputEnum, inputValue: number) => {
      if (inputValue < 0) {
        return 0;
      }

      switch (unit) {
        case InputEnum.PERCENT: {
          if (inputValue > 100) {
            return Number(inputValue.toString().slice(0, -1));
          }
          return inputValue;
        }
        case InputEnum.PX:
        default:
          return inputValue;
      }
    },
  };
};
