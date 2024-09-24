import React from "react";

interface BaseProps {
  children: React.ReactNode;
}

export default function LayoutBase(props: BaseProps) {
  const { children } = props;

  return (
    <>
      <main className="flex grow flex-col pb-20 md:pb-0">{children}</main>
    </>
  );
}
