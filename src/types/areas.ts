interface TranslationI {
  id: number;
  district_id: number;
  locale: string;
  name: string;
}

export interface DistrictI {
  id: number;
  city_id: number;
  translation: TranslationI;
}
