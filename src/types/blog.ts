export interface BlogPostI {
  id: number;
  slug: string;
  main_image: string;
  categories: CategoryI[];
  is_active: boolean;
  view_count: number;
  read_time: number;
  published_at: Date | null;
  created_at: TimestampI;
  updated_at: TimestampI;
  translation: TranslationI;
}

export interface CategoryI {
  id: number;
  slug: string;
  created_at: string;
  translation: CategoryTranslationI;
}

export interface CategoryTranslationI {
  id: number;
  category_id: number;
  locale: string;
  name: string;
  meta_title: string;
  meta_description: string;
  content: string;
}

export interface TranslationI {
  id: number;
  locale: string;
  title: string;
  meta_title: string;
  meta_description: string;
  content: string;
  short_description: string;
}

export interface TimestampI {
  date: string;
  timezone_type: number;
  timezone: string;
}

