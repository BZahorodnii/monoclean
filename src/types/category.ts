interface TranslationI {
  id: number;
  category_id: number;
  locale: string;
  name: string;
  meta_title: string;
  meta_description: string;
  content: string;
}

export interface CategoryI {
  id: number;
  slug: string;
  created_at: string;
  translation: TranslationI;
  ogImage: string | null;
}
