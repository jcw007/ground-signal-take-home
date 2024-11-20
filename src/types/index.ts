export type PlaceType = {
  id: string | number;
  name: string;
  location: {
    lat: number | string;
    lon: number | string;
  };
  details?: {
    description: string;
    website?: string;
    avgStoreTraffic?: {
      monday?: number | null;
      tuesday?: number | null;
      wednesday?: number | null;
      thursday?: number | null;
      friday?: number | null;
      saturday?: number | null;
      sunday?: number | null;
    };
  };
  images?: string[];
};
