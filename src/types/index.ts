export type PlaceType = {
  id: string;
  name: string;
  location: {
    lat: number;
    lon: number;
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
