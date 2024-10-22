export default function LayoutTile({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div
        style={{ background: "url('/tile_busy.png')" }}
        className="relative top-0 min-h-[90vh] w-full left-0 right-0 flex flex-col visible"
      >
        <div className="flex flex-col justify-center items-center">
          <article>{children}</article>
        </div>
      </div>
    </div>
  );
}
