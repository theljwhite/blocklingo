//In case I make more games for this than just 1, they can share the same container.

interface GameContainerProps {
  toolbar: JSX.Element;
  children: React.ReactNode;
}

export default function LayoutGameContainer({
  toolbar,
  children,
}: GameContainerProps) {
  return (
    <section className="bg-neutral-22">
      <div className="p-6 max-w-screen-xl flex-wrap items-stretch mx-auto min-h-px bg-almostblack flex">
        <div className="grow shrink m-2">
          <h1>
            <span className="font-main text-neutral-22 mr-4 text-4xl">
              {import.meta.env.VITE_PROJECT_NAME}
            </span>
            <span className="text-2xl font-second text-neutral-23 font-thin tracking-tight">
              September 25, 2024
            </span>
          </h1>
        </div>
      </div>
      <div className="relative bg-almostblack">
        <div className="relative top-0 min-h-[90vh] w-full left-0 right-0 flex flex-col visible">
          {toolbar}
          <div
            style={{ background: "url('./tile_busy.png')" }}
            className="grow flex flex-col justify-center items-center"
          >
            <article className="my-6">{children}</article>
          </div>
        </div>
      </div>
    </section>
  );
}