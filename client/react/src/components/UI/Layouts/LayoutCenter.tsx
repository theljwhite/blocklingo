interface LayoutCenterProps {
  children: React.ReactNode;
}

export default function LayoutCenter(props: LayoutCenterProps) {
  const { children } = props;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center pb-4 pt-10 font-lunch md:pb-0 md:pt-0">
      <div
        className="absolute inset-0"
        style={{ background: "url('./tile_busy.png')" }}
      />
      {children}
    </div>
  );
}
