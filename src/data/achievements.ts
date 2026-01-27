export interface Achievement {
  title: string;
  detail?: string;
}

export interface YearData {
  year: number;
  achievements: Achievement[];
}

export const achievementsData: YearData[] = [
  {
    year: 2024,
    achievements: [
      { title: "Mistrz Polski Długodystansowy", detail: "1. miejsce" },
      { title: "Barcelona International", detail: "3. miejsce" },
      { title: "Champion Sezonu", detail: "Bolt" },
      { title: "Rekord prędkości hodowli", detail: "1,347 km/h" },
    ],
  },
  {
    year: 2023,
    achievements: [
      { title: "Mistrz Europy", detail: "Bolt - 1. miejsce" },
      { title: "Marsylia Classic", detail: "1. miejsce" },
      { title: "Królowa Prędkości", detail: "Aurora - rekord Polski" },
      { title: "Hall of Fame", detail: "Imperator" },
      { title: "Debiutant Roku", detail: "Diament" },
    ],
  },
  {
    year: 2022,
    achievements: [
      { title: "Marsylia International", detail: "Bolt - 1. miejsce" },
      { title: "Rekord Polski prędkości", detail: "Aurora - 1,312 km/h" },
      { title: "Champion Narodowy", detail: "Imperator - 5x z rzędu" },
      { title: "Comeback roku", detail: "Feniks po kontuzji" },
    ],
  },
  {
    year: 2021,
    achievements: [
      { title: "Legenda Hodowli", detail: "Imperator - Hall of Fame" },
      { title: "Narodziny gwiazdy", detail: "Diament - pierwszy lot" },
      { title: "Mistrz trudnych warunków", detail: "Storm - 4x zwycięzca" },
    ],
  },
  {
    year: 2020,
    achievements: [
      { title: "Złoty Medal Narodowy", detail: "Aurora - debiut" },
      { title: "Żelazny Champion", detail: "Storm - dominacja" },
      { title: "Odrodzenie", detail: "Feniks - powrót do formy" },
    ],
  },
  {
    year: 2019,
    achievements: [
      { title: "Narodziny legendy", detail: "Bolt - pierwszy lot" },
      { title: "Champion Młodzieżowy", detail: "Storm" },
      { title: "Fundament hodowli", detail: "Nowa linia genetyczna" },
    ],
  },
  {
    year: 2018,
    achievements: [
      { title: "Patriarcha hodowli", detail: "Imperator - początek ery" },
      { title: "Rekord dystansu", detail: "1,350 km" },
      { title: "Międzynarodowe uznanie", detail: "Najlepsza hodowla regionu" },
    ],
  },
];
