
export interface ClothingItem {
  id: string;
  name: string;
  standardPrice: number;
  expressPrice: number;
  icon?: string;
}

export interface Subservice {
  id: string;
  name: string;
  basePrice?: number;
  priceUnit?: string;
  items: ClothingItem[];
  enabled: boolean;
}

export interface Service {
  id: string;
  name: string;
  subservices: Subservice[];
  enabled: boolean;
}

export interface Studio {
  id: string;
  name: string;
  services: Service[];
  location?: string;
  status?: 'active' | 'inactive';
}

// New type for adding clothing items in the modal
export interface NewClothingItem {
  name: string;
  standardPrice: number;
  expressPrice: number;
  icon?: string;
}
