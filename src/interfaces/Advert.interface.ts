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

export interface AdvertAds {
  id: string;
  modifiedAdvertPlanId: string;
  qut: string;
  adverts: any;
}

export interface AdvertPrices {
  id: any;
  programId: any;
  priceConfigs: any;
  modifiedCampainId: any;
}
