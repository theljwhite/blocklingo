interface StyledInputProps {
  stateVar: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon?: JSX.Element;
  id?: string;
  isDark: boolean;
  type: string;
  isValid: boolean;
}

export default function StyledInput({
  stateVar,
  onChange,
  icon,
  placeholder,
  isDark,
  type,
  id,
  isValid,
}: StyledInputProps) {
  const inputBg = isDark ? "bg-black" : "bg-neutral-27";
  const inputBorder = isDark ? "border-white" : "border-zinc-600";

  return (
    <div className="relative">
      <div
        className={`flex w-full ${
          !isValid && stateVar.length > 0 ? "border-error-1" : inputBorder
        } overflow-hidden rounded-lg border-2`}
      >
        <div
          className={`${inputBg} my-auto border-none w-12 py-1.5 text-center text-[1.125rem] leading-7`}
        >
          <span className="align-[-0.125em] inline-block">{icon}</span>
        </div>
        <input
          autoComplete="off"
          spellCheck="false"
          id={id ?? `input-${placeholder.slice(0, 10)}-${type}`}
          type={type ?? "text"}
          placeholder={placeholder}
          className={`${inputBg} block w-full text-sm pt-2 pb-2 pr-2 text-white outline-none`}
          value={stateVar}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
