import { ErrorCircle } from "../Icons";

export default function ErrorToast({ message }: { message: string }) {
  return (
    <div className="flex items-center font-second gap-4 pl-4">
      <ErrorCircle size={40} color="#b91c1c" />
      <div className="flex flex-col">
        <p className="text-[16px] font-bold">Error</p>
        <p className="text-[12px]">{message}</p>
      </div>
    </div>
  );
}
