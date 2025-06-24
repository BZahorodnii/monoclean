export enum ButtonVariant {
  Default = 'DEFAULT',
  Light = 'LIGHT',
  Disabled = 'DISABLED',
  Dark = 'DARK',
  Yellow = 'YELLOW',
}

export enum HowItWorksSelect {
  Cleaner = 'CLEANER',
  Customer = 'CUSTOMER',
}

export interface TranslationI {
  id: number;
  locale: string;
  name: string;
  meta_title: string;
  meta_description: string;
  body: string;
}

export interface MenuItemI {
  id: number;
  name: string;
  slug: string;
  position: number;
  display_in: 'header' | 'footer' | 'both';
  parent: number | null;
  children: MenuItemI[] | [];
  translation: TranslationI;
}

export interface MenuI {
  items: MenuItemI[];
}

export interface ErrorResponse {
  code: number;
  errors: string[];
}
