import { useCallback, useEffect, useRef, useState } from "react";

import { InputEnum, StepEnum } from "../../enums/number-input-enum";
import { useTransformInputNumber } from "../../hooks/useTransformInputNumber";
import { useClickOutside } from "../../hooks/useClickOutside";
import Tooltip from "../Tooltip";

type NumberInputProps = {
  unit: InputEnum;
  value: string;
  onChange: (value: string) => void;
  maxValue?: number;
  minValue?: number;
};

export default function NumberInput({
  value,
  unit,
  maxValue,
  minValue,
  onChange,
}: NumberInputProps) {
  const { transformOnChange, transformOnBur } = useTransformInputNumber();

  const [onFocusDeteted, setOnFocusDeteted] = useState(false);
  const numberInputRef = useClickOutside<HTMLDivElement>(() =>
    setOnFocusDeteted(false)
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof maxValue === "number" && Number(value) > maxValue) {
      onChange(maxValue.toString());
    }
  }, [maxValue, onChange, value]);

  useEffect(() => {
    if (!onFocusDeteted) {
      handleInputBlur();
    }
  }, [onFocusDeteted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const transformedValue = transformOnChange(value);

    onChange(transformedValue);
  };

  const handleInputBlur = () => {
    const value = inputRef.current?.value;
    const transformedValue = transformOnBur(unit, Number(value));
    onChange(transformedValue.toString());
  };

  const handleClickStepBtn = useCallback(
    (step: StepEnum) => {
      const transformedValue = Number(value);

      switch (step) {
        case StepEnum.MINUS:
          if (
            typeof minValue === "number" &&
            transformedValue == minValue &&
            unit === InputEnum.PERCENT
          ) {
            return;
          }

          onChange((Math.round((transformedValue - 1) * 10) / 10).toString()); //ignore routing error for float number
          break;
        case StepEnum.PLUS:
          if (typeof maxValue === "number" && transformedValue == maxValue) {
            return;
          }

          onChange((Math.round((transformedValue + 1) * 10) / 10).toString()); //ignore routing error for float number
          break;
      }
    },
    [value, minValue, unit, onChange, maxValue]
  );

  return (
    <div className="flex items-center space-x-2">
      <span
        className="text-xs leading-5 font-normal text-[#AAAAAA]"
        style={{ width: "100px" }}
      >
        Value
      </span>

      <div
        ref={numberInputRef}
        className="flex justify-between rounded-lg"
        onMouseDown={() => setOnFocusDeteted(true)}
        style={{
          width: "140px",
          height: "36px",
          border: onFocusDeteted ? "1px solid #3C67FF" : "none",
        }}
      >
        <Tooltip message={"Value must greater than 0"}>
          <button
            disabled={Number(value) === minValue && unit === InputEnum.PERCENT}
            onClick={() => handleClickStepBtn(StepEnum.MINUS)}
            className={`p-2 cursor-pointer w-full h-full rounded-l-lg aspect-square flex text-center justify-center bg-[#212121] duration-300 ${
              Number(value) === minValue && unit === InputEnum.PERCENT
                ? "text-[#AAAAAAAA]"
                : "text-[#F9F9F9] hover:bg-[#3B3B3B]"
            }`}
          >
            <span className="text-xl leading-4 font-medium">-</span>
          </button>
        </Tooltip>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          style={{ width: "68px" }}
          className="p-2 text-xs bg-[#212121] focus:outline-none focus:ring-0 focus:bg-[#3B3B3B] text-center"
        />
        <Tooltip message={"Value must smaller than 100"}>
          <button
            disabled={
              typeof maxValue === "number" &&
              Number(value) === maxValue &&
              unit === InputEnum.PERCENT
            }
            onClick={() => handleClickStepBtn(StepEnum.PLUS)}
            className={`p-2 cursor-pointer w-full h-full rounded-r-lg aspect-square flex text-center justify-center bg-[#212121] duration-300 ${
              typeof maxValue === "number" &&
              Number(value) === maxValue &&
              unit === InputEnum.PERCENT
                ? "text-[#AAAAAAAA]"
                : "text-[#F9F9F9] hover:bg-[#3B3B3B]"
            }`}
          >
            <span className="text-xl leading-4 font-medium">+</span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
