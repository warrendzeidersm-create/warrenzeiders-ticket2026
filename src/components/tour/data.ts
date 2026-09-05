export type TourDate = {
  month: string;
  day: string;
  year: string;
  venue: string;
  city: string;
  country: string;
};

export const tourDates: TourDate[] = [
  {
    month: "SEP",
    day: "4",
    year: "2026",
    venue: "The Great Allentown Fair Foundation",
    city: "Allentown",
    country: "United States",
  },
  {
    month: "SEP",
    day: "16",
    year: "2026",
    venue: "Grand Ole Opry House",
    city: "Nashville",
    country: "United States",
  },
  {
    month: "SEP",
    day: "23",
    year: "2026",
    venue: "No Brakes: Album Release Show!",
    city: "Nashville",
    country: "United States",
  },
  {
    month: "SEP",
    day: "25",
    year: "2026",
    venue: "No Brakes: Album Release Show!",
    city: "Detroit",
    country: "United States",
  },
  {
    month: "SEP",
    day: "26",
    year: "2026",
    venue: "The Great Frederick Fair",
    city: "Frederick",
    country: "United States",
  },
  {
    month: "SEP",
    day: "28",
    year: "2026",
    venue: "No Brakes: Album Release Show!",
    city: "Toronto",
    country: "Canada",
  },
  {
    month: "SEP",
    day: "30",
    year: "2026",
    venue: "No Brakes: Album Release Show!",
    city: "State College",
    country: "United States",
  },
  {
    month: "OCT",
    day: "11",
    year: "2026",
    venue: "O2 Academy Glasgow",
    city: "Glasgow",
    country: "United Kingdom",
  },
  {
    month: "OCT",
    day: "12",
    year: "2026",
    venue: "O2 Academy Leeds",
    city: "Leeds",
    country: "United Kingdom",
  },
  {
    month: "OCT",
    day: "14",
    year: "2026",
    venue: "University of Manchester",
    city: "Manchester",
    country: "United Kingdom",
  },
  {
    month: "OCT",
    day: "15",
    year: "2026",
    venue: "O2 Academy Bristol",
    city: "Bristol",
    country: "United Kingdom",
  },
  {
    month: "OCT",
    day: "21",
    year: "2026",
    venue: "TivoliVredenburg",
    city: "Utrecht",
    country: "Netherlands",
  },
  { month: "OCT", day: "23", year: "2026", venue: "X-TRA", city: "Zurich", country: "Switzerland" },
  {
    month: "OCT",
    day: "24",
    year: "2026",
    venue: "TonHalle München",
    city: "Munich",
    country: "Germany",
  },
  { month: "OCT", day: "25", year: "2026", venue: "E-Werk", city: "Cologne", country: "Germany" },
  {
    month: "OCT",
    day: "27",
    year: "2026",
    venue: "Batschkapp",
    city: "Frankfurt",
    country: "Germany",
  },
  {
    month: "OCT",
    day: "28",
    year: "2026",
    venue: "Huxleys Neue Welt",
    city: "Berlin",
    country: "Germany",
  },
  {
    month: "OCT",
    day: "29",
    year: "2026",
    venue: "Georg Elser Halle",
    city: "Hamburg",
    country: "Germany",
  },
  {
    month: "OCT",
    day: "31",
    year: "2026",
    venue: "Fållan",
    city: "Johanneshov",
    country: "Sweden",
  },
  { month: "NOV", day: "2", year: "2026", venue: "Sentrum Scene", city: "Oslo", country: "Norway" },
  {
    month: "NOV",
    day: "22",
    year: "2026",
    venue: "St. Pete Country Fest",
    city: "St. Petersburg",
    country: "United States",
  },
  {
    month: "JUN",
    day: "3",
    year: "2027",
    venue: "Gulf Coast Jam",
    city: "Panama City Beach",
    country: "United States",
  },
];

export function ticketUrl(venue: string, city: string) {
  const q = encodeURIComponent(`Warren Zeiders ${venue} ${city}`);
  return `https://www.ticketmaster.com/search?q=${q}`;
}

export type SeatGroup = "vip" | "reserved" | "standing";

export const seatSections: {
  key: string;
  label: string;
  group: SeatGroup;
  x: number;
  y: number;
  w: number;
  h: number;
}[] = [
  { key: "vip", label: "VIP", group: "vip", x: 10, y: 210, w: 70, h: 60 },
  {
    key: "reserved-left",
    label: "Reserved · 46–67",
    group: "reserved",
    x: 90,
    y: 190,
    w: 90,
    h: 40,
  },
  {
    key: "standing-left",
    label: "Standing · Track Left",
    group: "standing",
    x: 10,
    y: 130,
    w: 170,
    h: 60,
  },
  {
    key: "standing-center",
    label: "Standing · Track Center",
    group: "standing",
    x: 190,
    y: 130,
    w: 140,
    h: 60,
  },
  {
    key: "reserved-right",
    label: "Reserved · 68–78",
    group: "reserved",
    x: 190,
    y: 190,
    w: 100,
    h: 40,
  },
  {
    key: "standing-right",
    label: "Standing · Track Right",
    group: "standing",
    x: 340,
    y: 130,
    w: 130,
    h: 60,
  },
];

export const hoverFill: Record<SeatGroup, string> = {
  vip: "#D4AF37",
  reserved: "#8B8B8B",
  standing: "#FFFFFF",
};

export const rowLetters = "ABCDEFGHIJKLMNOPQRST".split("");
export const regularPrices = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
export const regularRows = ["A", "S", "N", "Q", "T", "J", "B", "R", "M", "C"];
