export interface Formation {
  id: string;
  title: string;
  description: string;
  duration: string;
  prerequisites: string[];
  objectives: string[];
  imageUrl: string;
  type: 'presentiel' | 'elearning';
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  expertise: string[];
  contact: {
    email: string;
    phone: string;
  };
  location: {
    city: string;
    country: string;
  };
  rating: number;
  imageUrl: string;
}