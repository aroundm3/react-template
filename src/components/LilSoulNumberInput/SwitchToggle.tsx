import { InputEnum } from "../../enums/number-input-enum";

interface SwitchToggleProps {
  value: InputEnum;
  onChange: (checked: InputEnum) => void;
}

export default function SwitchToggle({ value, onChange }: SwitchToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <span
        className="text-xs leading-5 font-normal text-[#AAAAAA]"
        style={{ width: "100px" }}
      >
        Unit
      </span>
      <div
        className="relative flex cursor-pointer rounded-lg p-0.5 bg-[#212121]"
        style={{ width: "140px", height: "36px" }}
      >
        <div
          className="absolute bg-[#424242] transition-transform duration-300 rounded-md"
          style={{
            transform: `translateX(${value === InputEnum.PX ? 69 : 0}px)`,
            width: "67px",
            height: "32px",
          }}
        />
        <div
          className="flex items-center justify-center duration-300"
          style={{
            width: "68px",
            height: "32px",
            color: value === InputEnum.PERCENT ? "#F9F9F9" : "#AAAAAA",
          }}
          onClick={() => onChange(InputEnum.PERCENT)}
        >
          <span className="z-20 text-sm font-medium">%</span>
        </div>
        <div
          className="flex items-center justify-center duration-300"
          style={{
            width: "68px",
            height: "32px",
            color: value === InputEnum.PX ? "#F9F9F9" : "#AAAAAA",
          }}
          onClick={() => onChange(InputEnum.PX)}
        >
          <span className="z-20 text-sm font-medium">px</span>
        </div>
      </div>
    </div>
  );
}
