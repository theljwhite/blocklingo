import { getCurrDateMonthDDYYYY } from "../../../helpers/date-time";

interface GameContainerProps {
  toolbar: JSX.Element;
  children: React.ReactNode;
}

export default function LayoutGameContainer({
  toolbar,
  children,
}: GameContainerProps) {
  return (
    <section className="bg-almostblack">
      <div className="px-6 py-6 lg:py-4 max-w-screen-xl flex-wrap items-stretch mx-auto min-h-px bg-almostblack flex">
        <div className="grow shrink m-2">
          <h1>
            <span className="font-main text-neutral-22 mr-4 text-4xl">
              {import.meta.env.VITE_PROJECT_NAME}
            </span>
            <span className="text-2xl font-second text-neutral-23 font-thin tracking-tight">
              {getCurrDateMonthDDYYYY(new Date())}
            </span>
          </h1>
        </div>
      </div>
      <div className="relative bg-almostblack">
        <div
          style={{ background: "url('./tile_busy.png')" }}
          className="relative top-0 min-h-[90vh] w-full left-0 right-0 flex flex-col visible"
        >
          {toolbar}
          <div className="flex flex-col justify-center items-center">
            <article className="my-6">{children}</article>
          </div>
        </div>
      </div>
    </section>
  );
}
