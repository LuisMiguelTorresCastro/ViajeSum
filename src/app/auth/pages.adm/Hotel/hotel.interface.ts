export interface Hotel {
  name: string;
  price: number;
  currency: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  mapUrl: string;
}
