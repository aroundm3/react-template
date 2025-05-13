import { useState } from "react";
import SwitchToggle from "./SwitchToggle";
import NumberInput from "./NumberInput";
import { InputEnum } from "../../enums/number-input-enum";

const MAX_NUMBER_INPUT_PERCENT_VALUE = 100;
const MIN_NUMBER_INPUT_VALUE = 0;

export default function Index() {
  const [inputType, setInputType] = useState(InputEnum.PERCENT);
  const [value, setValue] = useState("0");

  return (
    <div className="flex flex-col space-y-4">
      <SwitchToggle value={inputType} onChange={setInputType} />
      <NumberInput
        value={value}
        onChange={setValue}
        unit={inputType}
        maxValue={
          inputType === InputEnum.PERCENT
            ? MAX_NUMBER_INPUT_PERCENT_VALUE
            : undefined
        }
        minValue={MIN_NUMBER_INPUT_VALUE}
      />
    </div>
  );
}
