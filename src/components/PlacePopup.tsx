import { BiX } from "react-icons/bi";
import PinIcon from "./PinIcon";
import { PlaceType } from "../types";
import { useCallback } from "react";

function PlacePopup({
  place,
  onCloseBtnClick,
}: {
  place: PlaceType;
  onCloseBtnClick?: () => void;
}) {
  const {
    name,
    images = [],
    details: { description } = {},
    location: { lat, lon },
  } = place;

  const handleVisitWebsiteBtnClick = useCallback(() => {
    const { details: { website } = {} } = place;

    window.open(website);
  }, [place]);

  return (
    // Backdrop
    <div className="absolute w-full h-full bg-black bg-opacity-70">
      {/* Close button */}
      <button
        className="absolute top-3 right-3 text-white"
        onClick={onCloseBtnClick}
      >
        <BiX className="w-8 h-8 text-gray-400" />
      </button>
      {/* Popup outer container */}
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col w-1/3 h-2/5 min-w-96">
          {/* Popup header */}
          <div className="flex p-2 gap-2 bg-white rounded-t items-center border-b border-b-gray-300">
            <PinIcon />
            <div className="flex-1">
              <div className="text-base font-bold">{name}</div>
              <div className="text-gray-400">
                {lat}, {lon}
              </div>
            </div>
            {/* Visit website button */}
            {!!place.details?.website && (
              <button
                className="text-white font-bold bg-blue-600 px-4 py-2 rounded"
                onClick={handleVisitWebsiteBtnClick}
              >
                Visit Website
              </button>
            )}
          </div>
          {/* Popup body */}
          <div className="bg-white flex-1 flex flex-col rounded-b p-2 gap-8">
            {/* description */}
            <div className="flex-1">{description}</div>
            {/* images */}
            {images.length && (
              <div className="flex gap-2 overflow-x-auto whitespace-nowrap">
                {images.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    className="w-[calc(33%-0.25rem)]"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacePopup;
