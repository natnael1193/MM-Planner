import { Adverts } from './Advert.interface';

export interface Campaign {
  id: any;
  key: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  advertPlans: Array<Adverts>;
}
