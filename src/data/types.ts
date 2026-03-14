export type Category = 
  | 'The Pioneers' 
  | 'Early Coders & Cryptographers' 
  | 'Space & Apollo' 
  | 'Modern Innovators' 
  | 'Algorithmic Justice' 
  | 'Community Builders';

export interface TimelineNode {
  id: string;
  name: string;
  wikiSearchName: string;
  year: number;
  category: Category;
  title: string;
  description: string;
  personality: string;
  achievements: string[];
}

export const categoryColors: Record<Category, string> = {
  'The Pioneers': '#00f3ff',
  'Early Coders & Cryptographers': '#b026ff',
  'Space & Apollo': '#ff003c',
  'Modern Innovators': '#00ff66',
  'Algorithmic Justice': '#ff00aa',
  'Community Builders': '#ffb300',
};

export const categories: Category[] = [
  'The Pioneers',
  'Early Coders & Cryptographers',
  'Space & Apollo',
  'Modern Innovators',
  'Algorithmic Justice',
  'Community Builders'
];
