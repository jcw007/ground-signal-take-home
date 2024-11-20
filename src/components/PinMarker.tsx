import { Marker } from "react-map-gl";
import PinIcon from "./PinIcon";

function PinMarker({
  lat,
  lon,
  onClick = () => {},
}: {
  lat: number;
  lon: number;
  onClick?: (e: unknown) => void; // TODO: fix typing here
}) {
  return (
    <Marker latitude={lat} longitude={lon} onClick={onClick}>
      <PinIcon />
    </Marker>
  );
}

export default PinMarker;
