interface GameBoardButtonProps {
  text: string;
  type: "submit" | "reset" | "button" | undefined;
  onClick: React.MouseEventHandler;
  disabled: boolean;
  borderColorClass: string;
  bgClass: string;
  textColorClass: string;
  disabledClass?: string;
}

export default function GameBoardButton({
  text,
  type,
  onClick,
  disabled,
  borderColorClass,
  bgClass,
  disabledClass,
  textColorClass,
}: GameBoardButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${
        disabledClass ?? "disabled:opacity-50"
      } ${borderColorClass} ${textColorClass} ${bgClass} flex items-center justify-center text-center border text-base font-semibold font-second flex w-fit h-[3em] py-4 px-6 rounded-3xl cursor-pointer disabled:cursor-not-allowed`}
    >
      {text}
    </button>
  );
}
