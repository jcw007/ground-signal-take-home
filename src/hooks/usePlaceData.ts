import { PlaceType } from "../types";
import usePlaceDataStore from "../stores/placeDataStore";
import { useEffect, useState } from "react";

const apiURL = "http://localhost:3000/places";

const usePlaceData = () => {
  const { places, setPlaces } = usePlaceDataStore((state) => state);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(apiURL);

        if (!response.ok) {
          throw new Error("Error retrieving places data");
        }

        setPlaces(await response.json());
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [setPlaces]);

  // Add new place record
  const createPlace = async (place: PlaceType) => {
    try {
      await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(place),
      });

      setPlaces(places.concat([place]));

      return place;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding new place record", error.message);
      }
    }
  };

  // Update an existing place record
  const updatePlace = async (place: PlaceType) => {
    try {
      await fetch(`${apiURL}/${place.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(place),
      });

      const findIndex = places.findIndex(
        ({ id }) => place.id.toString() === id.toString()
      );

      if (findIndex !== -1) {
        places.splice(findIndex, 1, place);
        setPlaces([...places]);

        return place;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating place record", error.message);
      }
    }
  };

  // Delete a place record
  const deletePlace = async (id: string | number) => {
    try {
      await fetch(`${apiURL}/${id}`, {
        method: "DELETE",
      });
      setPlaces([
        ...places.filter((place) => place.id.toString() !== id.toString()),
      ]);

      return id;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting place record", error.message);
      }
    }
  };

  // Get starred locations
  const getStarredLocations = async (): Promise<PlaceType[] | undefined> => {
    try {
      const response = await fetch(`${apiURL}?starred=true`);

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error retrieving starred locations", error.message);
      }
    }
  };

  const searchPlaceByName = async (
    query: string
  ): Promise<PlaceType[] | undefined> => {
    try {
      const response = await fetch(`${apiURL}?name=${query}`);

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error searching by name", error.message);
      }
    }
  };

  return {
    places,
    loading,
    error,
    createPlace,
    updatePlace,
    deletePlace,
    getStarredLocations,
    searchPlaceByName,
  };
};

export default usePlaceData;
