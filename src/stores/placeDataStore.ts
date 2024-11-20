import { create } from "zustand";
import { PlaceType } from "../types";

type PlaceDataState = {
  places: PlaceType[];
  setPlaces: (places: PlaceType[]) => void;
};

const usePlaceDataStore = create<PlaceDataState>((set) => ({
  places: [],
  setPlaces: (places) => set({ places }),
}));

export default usePlaceDataStore;
