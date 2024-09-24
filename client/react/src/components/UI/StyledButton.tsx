interface StyledButtonProps {
  text: string;
  type: "submit" | "reset" | "button" | undefined;
  onClick: React.MouseEventHandler;
  disabled: boolean;
  isPrimary: boolean;
}

export default function StyledButton({
  text,
  type,
  onClick,
  disabled,
  isPrimary,
}: StyledButtonProps) {
  if (isPrimary)
    return (
      <button
        type={type}
        className="bg-almostblack text-white block mx-auto text-center relative border-none h-[3em] rounded-3xl items-center font-second px-2 w-40"
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  return (
    <button
      type={type}
      className="bg-transparent border border-almostblack text-almostblack block mx-auto text-center relative h-[3em] rounded-3xl items-center font-second px-2 w-40"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
