import { PlaceType } from "../types";

export function printPlaceArrayToContent(places: PlaceType[]) {
  const content = `
<html>
<body>
<h1>Starred Locations</h1>
<pre>
${JSON.stringify(
  places.map(({ name, location: { lat, lon } }) => ({
    name,
    lat,
    lon,
  })),
  null,
  2
)}
</pre>
</body>
</html>`;
  return content;
}
