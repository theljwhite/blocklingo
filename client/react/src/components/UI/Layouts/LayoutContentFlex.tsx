export default function LayoutContentFlex({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="grow shrink flex flex-col relative min-w-[0px]"
      style={{ height: "calc(100% - 36px)" }}
    >
      {children}
    </div>
  );
}
