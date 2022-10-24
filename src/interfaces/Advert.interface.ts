export interface Advert {
  id: any;
  key: string;
  advertType: string;
  advertDetailsId: number;
}

export interface Ads {
  qut: number;
  adsId: string;
}

export interface Adverts {
  ads: Array<Ads>;
}
