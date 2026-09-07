import { City } from '../../main-page/types/types';

export type ApartmentType = 'apartment' | 'house' | 'room' | 'hotel';

type ImageExpression = 'jpg' | 'png' | 'jpeg'

export type Image = `${string}.${ImageExpression}`;


type Host = {
  avatar: string;
  name: string;
  isPro: boolean;
}

type Review = {
  avatar: string;
  username: string;
  rating: number;
  date: string;
  text: string;
}

export type Offer = {
  id: string;
  images: Image[];
  title: string;
  isFavorite: boolean;
  description: string;
  isPremium: boolean;
  type: ApartmentType;
  rating: number;
  price: number;
  bedrooms: number;
  amountAdults: number;
  city: City;
  features: string[];
  host: Host;
  reviews: Review[];
}
