import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SeatMapPanel } from "@/components/tour/SeatMap";
import { TicketFlow } from "@/components/tour/TicketFlow";
import { tourDates, type TourDate } from "@/components/tour/data";
import { sendEmailSubmission } from "@/lib/emailjs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Warren Zeiders — No Brakes World Tour Tickets & Dates" },
      {
        name: "description",
        content:
          "Warren Zeiders No Brakes World Tour: full 2026–2027 tour dates, interactive venue seat map, VIP and regular tickets, and the official fan list.",
      },
      { property: "og:title", content: "Warren Zeiders — No Brakes World Tour" },
      {
        property: "og:description",
        content:
          "All No Brakes World Tour dates, seat maps, and VIP ticket options for Warren Zeiders.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TourPage,
});

const socials = [
  {
    label: "Instagram",
    path: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" />
      </>
    ),
  },
  {
    label: "YouTube",
    path: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="M10 9l6 3-6 3z" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Facebook",
    path: <path d="M15 8h2V4h-2a4 4 0 0 0-4 4v2H9v4h2v6h4v-6h2.5L18 10h-3V8a1 1 0 0 1 1-1z" />,
  },
  { label: "X", path: <path d="M4 4l16 16M20 4L4 20" /> },
];

function TourPage() {
  const [expanded, setExpanded] = useState(false);
  const [activeDate, setActiveDate] = useState<TourDate | null>(null);
  const [formMsg, setFormMsg] = useState<{ text: string; error: boolean } | null>(null);

  const visible = expanded ? tourDates : tourDates.slice(0, 2);

  return (
    <div className="mx-auto min-h-screen max-w-107.5 font-body">
      <section className="relative flex min-h-svh w-full flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/70 to-black bg-cover" />

        <div className="fade-up relative z-10 flex flex-col items-center gap-5 px-6 pb-8">
          <img
            src="/warrenHero.jpeg"
            alt="Warren Zeiders with a horse"
            className=" pt-2 h-66 w-full max-w-85 rounded-2xl object-cover object-center shadow-2xl"
          />
          <svg
            width="150"
            height="86"
            viewBox="0 0 150 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Warren Zeiders logo"
          >
            <path
              d="M6 8 L28 78 L44 30 L60 78 L82 8"
              stroke="white"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path d="M118 6 L92 46 H112 L88 80 L142 38 H120 Z" fill="white" />
          </svg>

          <ul className="flex items-center gap-4">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href="#"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/90 transition hover:scale-110 hover:text-foreground"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    {s.path}
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <nav className="mt-2 flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "NO BRAKES 🚨", href: "#" },
              { label: "WORLD TOUR 🌍", href: "#world-tour" },
              { label: "MUSIC", href: "#" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-full border border-line bg-white/10 px-5 py-2.5 text-sm font-semibold tracking-wide text-foreground backdrop-blur-md transition hover:bg-white/20"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section id="world-tour" className="px-5 py-10">
        <h1 className="mb-5 font-display text-4xl tracking-wide">WORLD TOUR 🌍</h1>
        <ul className="flex flex-col gap-3">
          {visible.map((d, i) => (
            <li
              key={`${d.venue}-${d.day}-${d.month}`}
              className="stagger flex items-center gap-4 rounded-card bg-panel p-4"
              style={{ animationDelay: `${Math.min(i, 6) * 0.05}s` }}
            >
              <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/15 py-3 text-center">
                <span className="text-xs font-semibold tracking-wide text-muted-foreground">
                  {d.month}
                </span>
                <span className="font-display text-3xl leading-none">{d.day}</span>
                <span className="text-xs text-muted-foreground">{d.year}</span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h3 className="truncate text-[15px] leading-snug font-semibold">{d.venue}</h3>
                <p className="truncate text-sm text-muted-foreground">
                  {d.city}, {d.country}
                </p>
                <button
                  onClick={() => setActiveDate(d)}
                  className="inline-flex w-fit items-center justify-center rounded-full border border-line px-6 py-2 text-sm font-semibold text-foreground transition duration-200 hover:scale-[1.03] hover:bg-foreground hover:text-background"
                >
                  Tickets
                </button>
              </div>
            </li>
          ))}
        </ul>
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="mt-4 w-full rounded-2xl bg-panel-soft py-4 text-sm font-semibold tracking-wide text-foreground transition duration-200 hover:bg-burgundy"
          >
            SEE MORE TICKETS
          </button>
        )}
      </section>

      <section className="px-5 py-6" aria-label="Seat map">
        <SeatMapPanel />
      </section>

      <section className="px-5 py-10">
        <h2 className="mb-4 font-display text-4xl tracking-wide">TEXT ME 📲</h2>
        <a
          href="sms:+13468224883"
          className="flex items-center gap-4 rounded-card bg-panel p-3 transition hover:bg-panel/80"
        >
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-xs text-muted-foreground">
            photo
          </div>
          <span className="text-lg font-semibold">(346)-822-4883</span>
        </a>
      </section>

      <section className="bg-linear-to-b from-burgundy-dark to-burgundy px-5 py-12">
        <h2 className="font-display text-4xl tracking-wide">JOIN WARREN ZEIDERS LIST</h2>
        <p className="mt-2 max-w-sm text-sm text-foreground/80">
          Enjoy the benefit of being a fan — get free Warren Zeiders merch, early ticket access, and
          updates straight from the road.
        </p>

        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const formEl = e.currentTarget;
            const agree = (formEl.elements.namedItem("agree") as HTMLInputElement).checked;
            if (!agree) {
              setFormMsg({
                text: "Please agree to the privacy policy to continue.",
                error: true,
              });
              return;
            }
            const formData = new FormData(formEl);
            try {
              await sendEmailSubmission({
                form_type: "fan-list",
                name: String(formData.get("fullName") ?? ""),
                email: String(formData.get("email") ?? ""),
                phone: String(formData.get("phone") ?? ""),
                show: "",
                reason: String(formData.get("reason") ?? ""),
                quantity: "",
                row: "",
                price: "",
                submitted_at: new Date().toISOString(),
              });
              setFormMsg({
                text: "You're on the list. Watch your inbox for updates.",
                error: false,
              });
              formEl.reset();
            } catch {
              setFormMsg({
                text: "We couldn't submit your details. Please try again.",
                error: true,
              });
            }
          }}
        >
          {[
            {
              id: "fullName",
              label: "FULL NAME",
              type: "text",
              placeholder: "Your name",
              required: true,
            },
            {
              id: "email",
              label: "EMAIL ADDRESS",
              type: "email",
              placeholder: "you@gmail.com",
              required: true,
            },
            {
              id: "phone",
              label: "PHONE NUMBER",
              type: "tel",
              placeholder: "123-XXX-XXXX",
              required: false,
            },
            {
              id: "reason",
              label: "REASON TO BE OFFICIAL FAN",
              type: "text",
              placeholder: "Your reason",
              required: false,
            },
          ].map((f) => (
            <div key={f.id} className="flex flex-col gap-1.5">
              <label htmlFor={f.id} className="text-xs font-semibold tracking-wide">
                {f.label}
              </label>
              <input
                id={f.id}
                name={f.id}
                type={f.type}
                required={f.required}
                placeholder={f.placeholder}
                className="w-full rounded-2xl border border-line bg-transparent px-4 py-3 text-sm text-foreground transition placeholder:text-foreground/40 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.25)] focus:outline-none"
              />
            </div>
          ))}

          <label className="flex items-start gap-3 text-xs text-foreground/80">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/60 bg-transparent"
            />
            <span>
              I agree to share my information with Warren Zeiders Management and receive updates
              according to their{" "}
              <a href="#" className="underline underline-offset-2">
                Privacy Policy
              </a>
              .
            </span>
          </label>

          <button
            type="submit"
            className="mt-2 rounded-2xl bg-foreground py-3.5 text-sm font-bold tracking-wide text-background transition hover:scale-[1.02] active:scale-[0.98]"
          >
            SEND MESSAGE
          </button>
          {formMsg && (
            <p className={`text-sm ${formMsg.error ? "text-red-200" : "text-foreground"}`}>
              {formMsg.text}
            </p>
          )}
        </form>
      </section>

      <footer className="flex flex-col items-center gap-4 bg-background px-5 py-10 text-center">
        <span className="text-xs tracking-[0.2em] text-muted-foreground">POWERED BY</span>
        <span className="font-display text-3xl tracking-wide">KOMI</span>
        <div className="mt-2 text-xs text-muted-foreground">
          © 2026 Warren Zeiders. All rights reserved.
        </div>
      </footer>

      {activeDate && <TicketFlow date={activeDate} onClose={() => setActiveDate(null)} />}
    </div>
  );
}
