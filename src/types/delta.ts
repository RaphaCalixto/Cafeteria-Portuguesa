export interface BrandInfo {
  name: string;
  tagline: string;
  slogan: string;
  founded: number;
  founder: string;
  originLocation: string;
  primaryRed: string;
  darkRed: string;
  agedOak: string;
  creme: string;
  gold: string;
}

export interface NavItem {
  title: string;
  titlePt: string;
  href: string;
}

export interface CoffeeProduct {
  id: string;
  name: string;
  origin: string;
  intensity: number;
  roast: string;
  notes: string;
  badge: string;
  image: string;
  bgAccent: string;
}

export interface Milestone {
  year: string;
  title: string;
  titlePt: string;
  text: string;
  textPt: string;
  image: string;
}

export interface CoffeeCycleStep {
  step: string;
  name: string;
  namePt: string;
  summary: string;
  summaryPt: string;
  detail: string;
  detailPt: string;
}

export interface CultureCenter {
  title: string;
  titlePt: string;
  subtitle: string;
  subtitlePt: string;
  text: string;
  textPt: string;
  tag: string;
  image: string;
}

export interface QuizOption {
  text: string;
  textPt: string;
  type: "intense" | "mindful" | "warm" | "authentic";
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionPt: string;
  options: QuizOption[];
}

export interface QuizProfile {
  name: string;
  namePt: string;
  blend: string;
  description: string;
  descriptionPt: string;
  recommendedId: string;
}

export interface JournalArticle {
  title: string;
  titlePt: string;
  category: string;
  categoryPt: string;
  date: string;
  readTime: string;
  image: string;
}

export interface SustainabilityPillar {
  title: string;
  titlePt: string;
  metric: string;
  text: string;
  textPt: string;
}
