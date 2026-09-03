import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { SeatMapPanel } from "./SeatMap";
import { regularPrices, regularRows, rowLetters, type TourDate } from "./data";

type Step = "buy" | "vip" | "vip-purchase" | "regular" | "processing";

function BackButton({
  onClick,
  tone = "dark",
}: {
  onClick: () => void;
  tone?: "dark" | "light";
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 pt-6 pb-4 text-sm transition ${
        tone === "dark"
          ? "text-foreground/80 hover:text-foreground"
          : "text-black/70 hover:text-black"
      }`}
    >
      <ChevronLeft className="h-[18px] w-[18px]" />
      Go Back
    </button>
  );
}

function Sheet({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${className}`} style={style}>
      <div className="mx-auto min-h-screen max-w-[430px] px-5 pb-10">{children}</div>
    </div>
  );
}

const notice = (
  <>
    <div className="mt-4 rounded-lg bg-note-green p-3 text-xs">
      <p className="font-bold">24-HOURS REFUND POLICY IS IN PLACE</p>
      <p className="mt-1">
        72 HOURS AFTER PURCHASE IT IS RESPONSIBILITY OF THE TICKET HOLDER
      </p>
    </div>
  </>
);

export function TicketFlow({
  date,
  onClose,
}: {
  date: TourDate;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("buy");
  const [selectedRegular, setSelectedRegular] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (step === "buy") {
    return (
      <Sheet className="bg-background">
        <BackButton onClick={onClose} />
        <h2 className="mb-1 text-lg font-bold tracking-wide">BUY TICKETS</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          {date.venue} — {date.city}, {date.country} · {date.month} {date.day},{" "}
          {date.year}
        </p>

        <SeatMapPanel />

        <button
          onClick={() => setStep("vip")}
          className="mt-6 flex w-full items-center justify-center rounded-2xl bg-panel-soft py-4 text-sm font-bold tracking-[0.15em] text-foreground transition hover:bg-panel-soft/70"
        >
          VIP
        </button>
        <button
          onClick={() => setStep("regular")}
          className="mt-3 flex w-full items-center justify-center rounded-2xl border border-foreground/15 bg-background py-4 text-sm font-bold tracking-[0.15em] text-foreground transition hover:bg-foreground hover:text-background"
        >
          REGULAR
        </button>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          You'll finish your purchase securely on our ticketing partner's site.
        </p>
      </Sheet>
    );
  }

  if (step === "vip") {
    return (
      <Sheet className="bg-sheet-blue text-black">
        <BackButton tone="light" onClick={() => setStep("buy")} />
        <h2 className="mb-5 text-center text-lg font-bold tracking-wide">VIP Tickets</h2>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => {
            const price = (152.99 * n).toFixed(2);
            const row = rowLetters[n - 1]!;
            return (
              <div key={n} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="rounded-md bg-action-blue py-2 text-center text-sm font-bold text-white">
                  {n} Ticket
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-black/70">Sec 203 Row {row}</p>
                    <p className="mt-2 font-bold">${price}</p>
                  </div>
                  <button
                    onClick={() => setStep("vip-purchase")}
                    className="rounded-md bg-action-navy px-4 py-2 text-sm font-semibold text-white"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Sheet>
    );
  }

  if (step === "vip-purchase") {
    return (
      <Sheet className="bg-sheet-light text-black">
        <BackButton tone="light" onClick={() => setStep("vip")} />
        <h2 className="text-center text-lg font-bold">VIP Tickets</h2>

        {notice}

        <div className="mt-3 rounded-lg bg-note-yellow p-3 text-xs">
          <p className="font-bold">Important Information:</p>
          <ul className="mt-1 list-disc pl-4">
            <li>Ticket Limit: 20 tickets: To buy more, email Management.</li>
            <li>Recommended for ages 14+.</li>
          </ul>
        </div>

        <form
          className="mt-5 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setStep("processing");
          }}
        >
          {[
            { id: "vip-fullname", label: "FULL NAME", type: "text", placeholder: "Your name" },
            { id: "vip-email", label: "EMAIL ADDRESS", type: "email", placeholder: "you@gmail.com" },
            { id: "vip-phone", label: "PHONE NUMBER", type: "tel", placeholder: "123-XXX-XXX" },
          ].map((f) => (
            <div key={f.id} className="flex flex-col gap-1.5">
              <label htmlFor={f.id} className="text-xs font-bold tracking-wide">
                {f.label}
              </label>
              <input
                id={f.id}
                required
                type={f.type}
                placeholder={f.placeholder}
                className="w-full rounded-md border border-black/20 bg-white px-4 py-3 text-sm placeholder:text-black/40"
              />
            </div>
          ))}

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-action-blue py-4 text-sm font-bold text-white"
          >
            Pay
          </button>
          <p className="text-center text-[11px] text-black/50">
            We'll email you at the address above to complete payment securely and confirm
            your tickets.
          </p>
          {vipMsg && <p className="text-center text-sm font-semibold text-black">{vipMsg}</p>}
        </form>
      </Sheet>
    );
  }

  return (
    <Sheet className="bg-sheet-light text-black">
      <BackButton tone="light" onClick={() => setStep("buy")} />
      <h2 className="text-center text-xl font-bold">Tickets Available</h2>
      <p className="mt-1 text-center text-xs text-black/60">
        *Tickets shown for play on are posted by fans &amp; authorized by the venue*
      </p>

      {notice}

      <div className="mt-3 rounded-lg bg-note-yellow p-3 text-xs">
        <p className="font-bold">Important Information:</p>
        <ul className="mt-1 list-disc pl-4">
          <li>Ticket Limit: 10 tickets: To buy more, email Management.</li>
          <li>Recommended for ages 14+.</li>
        </ul>
      </div>

      <div className="mt-3 rounded-lg bg-note-blue p-3 text-xs font-semibold">
        Delivery of Tickets: Prints@Home/ Mobile- FREE
      </div>

      <h3 className="mt-5 mb-2 text-sm font-bold">Select a Ticket</h3>
      <div className="flex flex-col gap-2.5">
        {regularPrices.map((price, i) => (
          <label
            key={i}
            className="flex cursor-pointer items-center justify-between rounded-lg border border-black/15 bg-white px-4 py-3 text-sm"
          >
            <span>
              {i + 1} Ticket- Sec 203 Row {regularRows[i]}
            </span>
            <span className="flex items-center gap-3">
              <span className="font-bold">${price.toFixed(2)}</span>
              <input
                type="radio"
                name="regular-ticket"
                className="h-4 w-4"
                checked={selectedRegular === i}
                onChange={() => setSelectedRegular(i)}
              />
            </span>
          </label>
        ))}
      </div>

      <button
        onClick={() =>
          window.open(
            ticketUrl(`${date.venue} ${selectedRegular + 1} tickets`, date.city),
            "_blank",
            "noopener,noreferrer",
          )
        }
        className="mt-6 w-full rounded-xl bg-action-indigo py-4 text-sm font-bold text-white"
      >
        Get Tickets — ${regularPrices[selectedRegular]!.toFixed(2)}
      </button>
      <p className="mt-3 text-center text-[11px] text-black/50">
        You'll finish your purchase securely on our ticketing partner's site.
      </p>
    </Sheet>
  );
}
