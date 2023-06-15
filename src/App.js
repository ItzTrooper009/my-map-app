import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ImageOverlay,
  useMap,
  Circle,
  Polyline,
  Polygon,
  useMapEvents,
  Rectangle,
  SVGOverlay,
  LayersControl,
  LayerGroup,
  Tooltip,
  GeoJSON,
} from "react-leaflet";
import L, { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { useEffect, useRef } from "react";
const customIcon = L.divIcon({
  iconUrl: "./icon.png",
  iconSize: [10, 10], // size of the icon
  iconAnchor: [5, 5], // point of the icon which will correspond to marker's location
});

function App() {
  const mapURL = "./map.png";
  const icon2 = L.icon({
    iconUrl: "./icon.png",
    iconSize: [50, 50], // size of the icon
    iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
  });
  const bounds = [
    [0, 0],
    [390, 716],
  ];
  const geoJson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [74.0, 40.7],
              [73.9, 240.7],
              // [73.9, 140.8],
              [144.0, 340.8],
              [74.0, 40.7],
            ],
          ],
        },
      },
      // {
      //   type: "Feature",
      //   properties: {},
      //   geometry: {
      //     type: "Point",
      //     coordinates: [273.935242, 240.73061],
      //   },
      // },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [202.0, 150.0],
            [223.0, 101.0],
            [304.0, 200.0],
          ],
        },
        properties: {
          prop0: "value0",
          prop1: 0.0,
        },
      },
    ],
  };

  const vectorLayer = {
    polyline: [
      [51.505, 10],
      [100.51, 150],
      [150.51, 20],
    ],

    multiPolyline: [
      [
        [80.5, 40],
        [250.5, 40],
        [200.52, 170],
      ],
      [
        [51.5, 25],
        [190.5, 150],
        [190.52, 30],
      ],
    ],

    polygon: [
      [51.515, 60],
      [51.52, 600],
      [155.52, 430],
    ],

    multiPolygon: [
      [
        [51.515, 60],
        [51.52, 600],
        [155.52, 430],
      ],
      [
        [51.515, 60],
        [51.52, 600],
        [155.52, 640],
      ],
    ],

    rectangle: [
      [51, 51],
      [200, 350],
    ],
  };

  console.log(geoJson.features);
  // const map = useMap()
  return (
    <MapContainer
      center={[192, 358]}
      zoom={0}
      maxZoom={3}
      minZoom={-2}
      crs={L.CRS.Simple}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100vw" }}
      maxBounds={[
        [-100, -100],
        [490, 816],
      ]}
    >
      {/* <TileLayer
        attribution='&copy; <a href="https://www.anscer.com">Anscer</a> contributors'
        url={mapURL}
        className="tile-layer"
      /> */}

      <ImageOverlay url="/map.png" bounds={bounds} />

      <LayersControl position="topleft">
        <LayersControl.Overlay checked name="Marker">
          <LayerGroup>
            <Marker
              draggable={false}
              icon={customIcon}
              position={[192, 358]}
              eventHandlers={{ click: () => console.log("Marker 1 clicked") }}
            >
              <Popup>Marker 1</Popup>
            </Marker>
            <Marker
              draggable={true}
              // ref={icon2}
              icon={icon2}
              position={[230, 358]}
              eventHandlers={{ click: () => console.log("Marker 2 clicked") }}
            >
              <Popup>Marker 2</Popup>
            </Marker>
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Circle">
          <Circle
            center={[250.5, 230.5]}
            radius={10}
            color="red"
            fillColor="yellow"
            eventHandlers={{
              click: () => console.log("Circle marker clicked"),
            }}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Polyline">
          <LayerGroup>
            <Polyline
              pathOptions={{ color: "blue" }}
              positions={vectorLayer.polyline}
              eventHandlers={{ click: () => console.log("Polyline clicked") }}
            />

            <Polyline
              pathOptions={{ color: "red" }}
              positions={vectorLayer.multiPolyline}
              eventHandlers={{
                click: () => console.log("Multipolyline clicked"),
              }}
            />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Polygon">
          <LayerGroup>
            <Polygon
              pathOptions={{ color: "green" }}
              positions={vectorLayer.polygon}
              eventHandlers={{ click: () => console.log("Polygon clicked") }}
            />
            <Polygon
              pathOptions={{ color: "blue" }}
              positions={vectorLayer.multiPolygon}
              eventHandlers={{ click: () => console.log("M Polygon clicked") }}
            />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Rectangle">
          <Rectangle
            pathOptions={{ color: "red" }}
            bounds={vectorLayer.rectangle}
            eventHandlers={{ click: () => console.log("rectangle clicked") }}
            stroke={true}
            weight={1}
          >
            <Tooltip
              permanent
              offset={[20, -20]}
              opacity={0.9}
              direction="bottom"
            >
              Rectangle
            </Tooltip>
          </Rectangle>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="SVG Overlay">
          <SVGOverlay
            // zIndex={202}
            attributes={{ stroke: "black" }}
            bounds={[
              [25, 51],
              [100, 250],
            ]}
          >
            <rect x="0" y="0" width="100%" height="100%" fill="lightblue" />
            <circle r="5" cx="50" cy="20" fill="red" />
            <text x="50%" y="50%" stroke="black">
              text
            </text>
          </SVGOverlay>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="GeoJSON Data">
          <LayerGroup>
            <GeoJSON
              data={geoJson.features.find(
                (m) => m.geometry.type === "LineString"
              )}
              style={{ color: "red", weight: 3 }}
            />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>

      <Geometory />
    </MapContainer>
  );
}

const Geometory = () => {
  const polyRef = useRef();
  const map = useMap();
  useEffect(() => {
    polyRef.current = L.polyline([], { color: "red" });
    polyRef.current.addTo(map);
    map.on("click", handleMapClick);
    return () => map.off("click", handleMapClick);
  }, []);
  const handleMapClick = (e) => {
    console.log(polyRef.current);
    const latlngs = [...polyRef.current._latlngs];
    latlngs.push(e.latlng);
    polyRef.current.setLatLngs(latlngs);
  };
  //   // const map = useMapEvents({
  //   //   click(e) {
  //   //     console.log(e.latlng);
  //   //     L.marker(e.latlng, { icon: customIcon }).addTo(map);
  //   //   },
  //   // });
};
export default App;
