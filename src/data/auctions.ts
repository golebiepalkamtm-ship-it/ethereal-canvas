export interface Auction {
  id: string;
  ringNumber: string;
  name: string;
  image: string;
  currentPrice: number;
  startPrice: number;
  bids: number;
  endTime: Date;
  breeder: string;
  year: number;
  sex: "samiec" | "samica";
  color: string;
  origin: string;
  achievements?: string[];
  pedigree?: {
    father: string;
    mother: string;
  };
}

// Aukcje kończące się w różnym czasie (symulacja)
const now = new Date();
const hoursFromNow = (hours: number) => new Date(now.getTime() + hours * 60 * 60 * 1000);

export const auctionsData: Auction[] = [
  {
    id: "1",
    ringNumber: "PL-0419-24-1234",
    name: "Bolt",
    image: "https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=400&h=400&fit=crop",
    currentPrice: 2500,
    startPrice: 500,
    bids: 18,
    endTime: hoursFromNow(2.5),
    breeder: "Goran Gusak",
    year: 2024,
    sex: "samiec",
    color: "Niebieski nakrapiany",
    origin: "Belgia",
    achievements: ["1. Konkurs Regionalny 2024", "3. Derby Młodych"],
    pedigree: {
      father: "Super Star PL-0419-21-567",
      mother: "Queen Mary PL-0419-22-890"
    }
  },
  {
    id: "2",
    ringNumber: "PL-0419-24-1235",
    name: "Lightning",
    image: "https://images.unsplash.com/photo-1555169062-013468b47731?w=400&h=400&fit=crop",
    currentPrice: 3200,
    startPrice: 800,
    bids: 24,
    endTime: hoursFromNow(5),
    breeder: "Goran Gusak",
    year: 2024,
    sex: "samiec",
    color: "Ciemny szpakowaty",
    origin: "Holandia",
    achievements: ["2. Lot Narodowy 500km", "1. As Regionu"],
  },
  {
    id: "3",
    ringNumber: "PL-0419-23-4567",
    name: "Diamond Lady",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    currentPrice: 4500,
    startPrice: 1000,
    bids: 31,
    endTime: hoursFromNow(1),
    breeder: "Goran Gusak",
    year: 2023,
    sex: "samica",
    color: "Czerwony",
    origin: "Niemcy",
    achievements: ["1. Mistrzostwo Polski", "Super Ace 2023"],
    pedigree: {
      father: "Champion PL-0419-20-111",
      mother: "Princess PL-0419-21-222"
    }
  },
  {
    id: "4",
    ringNumber: "PL-0419-24-1236",
    name: "Storm",
    image: "https://images.unsplash.com/photo-1551085254-e96b210db58a?w=400&h=400&fit=crop",
    currentPrice: 1800,
    startPrice: 400,
    bids: 12,
    endTime: hoursFromNow(8),
    breeder: "Goran Gusak",
    year: 2024,
    sex: "samiec",
    color: "Siwy",
    origin: "Belgia",
  },
  {
    id: "5",
    ringNumber: "PL-0419-23-4568",
    name: "Golden Wings",
    image: "https://images.unsplash.com/photo-1555169062-013468b47731?w=400&h=400&fit=crop",
    currentPrice: 5800,
    startPrice: 1500,
    bids: 42,
    endTime: hoursFromNow(0.5),
    breeder: "Goran Gusak",
    year: 2023,
    sex: "samica",
    color: "Jasny szpakowaty",
    origin: "Holandia",
    achievements: ["1. Olimpiada Gołębi", "Champion Europy 2023"],
    pedigree: {
      father: "Euro Star BE-0123-19-999",
      mother: "Dutch Queen NL-0456-20-888"
    }
  },
  {
    id: "6",
    ringNumber: "PL-0419-24-1237",
    name: "Night Hawk",
    image: "https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=400&h=400&fit=crop",
    currentPrice: 2100,
    startPrice: 600,
    bids: 15,
    endTime: hoursFromNow(12),
    breeder: "Goran Gusak",
    year: 2024,
    sex: "samiec",
    color: "Czarny",
    origin: "Belgia",
    achievements: ["5. Derby Młodych 2024"],
  },
  {
    id: "7",
    ringNumber: "PL-0419-22-7890",
    name: "Royal Flush",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    currentPrice: 8200,
    startPrice: 2000,
    bids: 56,
    endTime: hoursFromNow(3),
    breeder: "Goran Gusak",
    year: 2022,
    sex: "samiec",
    color: "Niebieski",
    origin: "Niemcy",
    achievements: ["1. Lot Międzynarodowy 700km", "As Roku 2022", "Champion Polski"],
    pedigree: {
      father: "King DE-0789-18-111",
      mother: "Ace Lady DE-0789-19-222"
    }
  },
  {
    id: "8",
    ringNumber: "PL-0419-24-1238",
    name: "Silver Star",
    image: "https://images.unsplash.com/photo-1551085254-e96b210db58a?w=400&h=400&fit=crop",
    currentPrice: 1500,
    startPrice: 350,
    bids: 9,
    endTime: hoursFromNow(24),
    breeder: "Goran Gusak",
    year: 2024,
    sex: "samica",
    color: "Srebrny",
    origin: "Polska",
  },
];

export const auctionInfo = {
  title: "Goran Gusak Part 2",
  subtitle: "Kolekcja Ekskluzywnych Gołębi Lotowych",
  totalLots: auctionsData.length,
  startDate: new Date("2024-12-01"),
  endDate: new Date("2024-12-15"),
  description: "Wyjątkowa aukcja gołębi pocztowych od legendarnego hodowcy Gorana Gusaka. Przedstawiamy Part 2 jego ekskluzywnej kolekcji, zawierającej championów z najlepszymi rodowodami europejskimi.",
};
