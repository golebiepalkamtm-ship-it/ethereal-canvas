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
  {
    year: 2017,
    achievements: [
      { title: "Mistrz Regionalny", detail: "2x złoto" },
      { title: "Rozwój infrastruktury", detail: "Nowe gołębniki" },
      { title: "Sukces hodowlany", detail: "Rekordowy wylęg" },
    ],
  },
  {
    year: 2016,
    achievements: [
      { title: "Champion Okręgowy", detail: "3 zwycięstwa" },
      { title: "Pierwsza linia Janssen", detail: "Import z Belgii" },
      { title: "Stabilizacja wyników", detail: "Top 10 w regionie" },
    ],
  },
  {
    year: 2015,
    achievements: [
      { title: "Przełom sezonu", detail: "Pierwsze złoto narodowe" },
      { title: "Współpraca międzynarodowa", detail: "Partner z Holandii" },
    ],
  },
  {
    year: 2014,
    achievements: [
      { title: "Srebrny Medal Krajowy", detail: "Kategoria młodzieżowa" },
      { title: "Rozwój genetyki", detail: "Nowe linie Van Loon" },
      { title: "Ekspansja hodowli", detail: "Podwojenie stada" },
    ],
  },
  {
    year: 2013,
    achievements: [
      { title: "Brązowy Medal", detail: "Mistrzostwa Okręgowe" },
      { title: "Rekord osobisty", detail: "Dystans 1,100 km" },
    ],
  },
  {
    year: 2012,
    achievements: [
      { title: "Pierwsze Top 5", detail: "Zawody krajowe" },
      { title: "Profesjonalizacja", detail: "Nowy system treningowy" },
      { title: "Sukces w średnim dystansie", detail: "3 wygrane" },
    ],
  },
  {
    year: 2011,
    achievements: [
      { title: "Debiut na arenie krajowej", detail: "Top 20" },
      { title: "Modernizacja gołębnika", detail: "System GPS" },
    ],
  },
  {
    year: 2010,
    achievements: [
      { title: "Mistrz Klubowy", detail: "Zwycięstwo w lidze" },
      { title: "Rekord klubowy", detail: "Najszybszy powrót" },
      { title: "Wyróżnienie hodowlane", detail: "Najlepszy młody hodowca" },
    ],
  },
  {
    year: 2009,
    achievements: [
      { title: "Pierwsze zwycięstwo", detail: "Zawody lokalne" },
      { title: "Początek kolekcji", detail: "Linia Meulemans" },
    ],
  },
  {
    year: 2008,
    achievements: [
      { title: "Rozwój techniki", detail: "Nowe metody treningowe" },
      { title: "Sukces w krótkim dystansie", detail: "5 wygranych" },
      { title: "Uznanie lokalne", detail: "Nagroda klubowa" },
    ],
  },
  {
    year: 2007,
    achievements: [
      { title: "Stabilne wyniki", detail: "Regularnie w Top 10" },
      { title: "Import genetyki", detail: "Linia Houben" },
    ],
  },
  {
    year: 2006,
    achievements: [
      { title: "Pierwszy medal", detail: "Brąz w okręgu" },
      { title: "Rozbudowa stada", detail: "30 gołębi" },
      { title: "Szkolenie", detail: "Kurs hodowlany" },
    ],
  },
  {
    year: 2005,
    achievements: [
      { title: "Pierwsze sukcesy", detail: "Top 15 lokalnie" },
      { title: "Budowa reputacji", detail: "Uznanie w klubie" },
    ],
  },
  {
    year: 2004,
    achievements: [
      { title: "Rozwój hodowli", detail: "Nowe pary lęgowe" },
      { title: "Konsekwentna praca", detail: "Regularne starty" },
      { title: "Nauka od mistrzów", detail: "Mentoring" },
    ],
  },
  {
    year: 2003,
    achievements: [
      { title: "Pierwsze loty", detail: "Debiut zawodniczy" },
      { title: "Budowa fundamentów", detail: "Podstawy genetyczne" },
    ],
  },
  {
    year: 2002,
    achievements: [
      { title: "Rozbudowa gołębnika", detail: "Profesjonalne boksy" },
      { title: "Import z Belgii", detail: "Pierwsze Jansseny" },
      { title: "Przygotowania", detail: "Treningi próbne" },
    ],
  },
  {
    year: 2001,
    achievements: [
      { title: "Początek przygody", detail: "Założenie hodowli" },
      { title: "Pierwsze gołębie", detail: "Zakup stada bazowego" },
      { title: "Budowa gołębnika", detail: "Start infrastruktury" },
    ],
  },
];
