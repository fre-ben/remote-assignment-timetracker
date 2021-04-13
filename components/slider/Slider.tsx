import { calculatePercentage } from "../../utils/math";

export type SliderProps = {
  max: number;
  value: number;
  onChange: (newValue: number) => void;
};

function Slider({ max, value, onChange }: SliderProps) {
  const percentage = calculatePercentage(value, max);
  return (
    <div>
      <label>
        Progress
        <input
          type="range"
          min={0}
          max={max}
          value={value}
          onChange={(event) => onChange(+event.target.value)}
        />
        <span>{percentage}</span>
      </label>
    </div>
  );
}

export default Slider;
