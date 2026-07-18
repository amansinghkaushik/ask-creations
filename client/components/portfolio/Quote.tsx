export default function Quote() {
  return (
    <section className="flex w-full justify-center bg-white px-6 py-20 sm:px-10 lg:py-[180px]">
      <div className="flex items-end gap-4 sm:gap-6 lg:gap-6">
        <div className="flex h-full w-1 shrink-0 flex-col justify-between gap-8 sm:gap-10">
          <div className="aspect-square w-1 bg-black" />
          <div className="aspect-square w-1 bg-black" />
          <div className="aspect-square w-1 bg-black" />
        </div>
        <div className="flex max-w-[578px] flex-col items-start gap-6 font-display text-[clamp(24px,4.6vw,48px)] font-semibold leading-[1.05] text-black">
          <p>
            Design shapes the world not as decoration, but as a force that
            leaves a mark.
          </p>
          <p>
            It defines how your brand is perceived and how it&rsquo;s
            experienced.
          </p>
          <p>Leave yours.</p>
        </div>
        <div className="flex h-full w-1 shrink-0 flex-col justify-between gap-8 sm:gap-10">
          <div className="aspect-square w-1 bg-black" />
          <div className="aspect-square w-1 bg-black" />
          <div className="aspect-square w-1 bg-black" />
        </div>
      </div>
    </section>
  );
}
