export default function LayoutSecond({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="overflow-hidden bg-sleek-dark relative shrink grow flex flex-row flex-wrap"
      style={{
        height: "calc(9.11px * 100)",
        minHeight: "calc(9.11px * 100)",
        maxHeight: "calc(9.11px * 100)",
      }}
    >
      {children}
    </div>
  );
}
