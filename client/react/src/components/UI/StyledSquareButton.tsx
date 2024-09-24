interface SquareButtonProps {
  text: string;
  type: "submit" | "reset" | "button" | undefined;
  onClick: React.MouseEventHandler;
  disabled: boolean;
  bgClass: string;
  textClass: string;
  borderColorClass: string;
}

export default function StyledSquareButton({
  text,
  type,
  onClick,
  disabled,
  bgClass,
  textClass,
  borderColorClass,
}: SquareButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${textClass} ${bgClass} ${borderColorClass} flex flex-col flex-1 items-center justify-center flex-nowrap font-second text-xs font-bold uppercase h-9 border rounded-[3px]`}
    >
      {text}
    </button>
  );
}
