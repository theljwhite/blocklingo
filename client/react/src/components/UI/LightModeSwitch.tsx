import { MoonOne, SunOne } from "./Icons/game";

interface LightModeSwitchProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

export default function LightModeSwitch({
  checked,
  onChange,
}: LightModeSwitchProps) {
  const checkedCircleClass =
    "translate-x-[calc(3rem-1.5rem)] duration-200 text-neutral-22 bg-blue-500 border-yellow-400 [box-shadow:0px_2px_8px_0px_#00000033]";
  const uncheckedCircleClass =
    "duration-200 text-primary-1 bg-indigo-400 border-neutral-22";
  const checkedSliderBg = "bg-blue-400";
  const uncheckedSliderBg = "bg-indigo-400";

  return (
    <div className="parent group relative flex items-center justify-center">
      <label className="leading-0 relative inline-block align-middle">
        <input
          id="light-mode-switch"
          onChange={onChange}
          type="checkbox"
          checked={checked}
          className="absolute -m-px h-px w-px appearance-none overflow-hidden whitespace-nowrap"
        />

        <span
          className={`${
            checked ? checkedSliderBg : uncheckedSliderBg
          } content-box flex h-4 w-12 cursor-pointer items-center justify-between rounded-full`}
        >
          <span
            className={`${
              checked ? checkedCircleClass : uncheckedCircleClass
            } h-6 w-6 rounded-full border-[0.125rem]`}
          >
            {checked ? (
              <SunOne size={20} color="currentColor" />
            ) : (
              <MoonOne size={20} color="currentColor" />
            )}
          </span>
        </span>
      </label>
    </div>
  );
}
