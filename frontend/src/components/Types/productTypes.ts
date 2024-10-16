/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ProductProps {
    id?: number;
    name: string;
    price: number | string;
    slug?: string;
    image: any;
    review_count: string | null;
    average_rating: any | null;
  }

  