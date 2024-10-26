//TODO may not need add line breaks to text & just do with css lol

interface PopoverProps {
  message: string;
}

export default function Popover({ message }: PopoverProps) {
  const addLineBreaksToText = (text: string): JSX.Element[] => {
    const withLineBreaks: JSX.Element[] = text.split(" ").map((t, index) =>
      index && index % 5 === 0 ? (
        <span key={index}>
          {t} <br />
        </span>
      ) : (
        <span key={index}>{t} </span>
      )
    );

    return withLineBreaks;
  };

  return (
    <div className="invisible absolute bottom-6 right-0 z-10 min-w-max transition-transform duration-200 [transform:scale(0.95)_translateZ(0px)] group-hover:visible">
      <section
        style={{ boxShadow: "0px 24px 48px rgba(0, 0, 0, 0.16)" }}
        role="tooltip"
        className="invisible relative bg-zinc-800 shadow-2xl border border-zinc-700 flex flex-col rounded-md text-dashboard-activeTab opacity-0 transition-transform duration-200 [transform:scale(0.95)_translateZ(0px)] group-hover:visible group-hover:opacity-100"
      >
        <div className="py-3 pe-5 ps-3">
          <p className="text-sm font-normal leading-5">
            {addLineBreaksToText(message)}
          </p>
        </div>
      </section>
    </div>
  );
}
