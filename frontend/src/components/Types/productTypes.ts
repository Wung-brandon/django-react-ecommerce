/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ProductProps {
    id?: number;
    name?: string;
    description?: string;
    price?: number | string;
    slug?: string;
    image?: any | string;
    review_count?: string | null;
    average_rating?: any | null;
    brand?: string;
    images?: any | string[];
    category?: string;
    subcategory?: string;
    stock?: string | number;
    available_sizes?: any | string[];

  }

  