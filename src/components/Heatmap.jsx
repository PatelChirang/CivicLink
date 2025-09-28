import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet.heat";
import L from "leaflet";

function HeatLayer({ issues }) {
  const map = useMap();

  React.useEffect(() => {
    if (!issues || issues.length === 0) return;

    // Convert issues into heatmap points [lat, lng, intensity]
    const points = issues.map((issue) => [
      issue.lat,
      issue.lng,
      Math.min(issue.upvotes / 200, 1) // intensity scaling
    ]);

    const heatLayer = L.heatLayer(points, {
      radius: 40,
      blur: 20,
      maxZoom: 17,
      gradient: {
        0.2: "blue",
        0.4: "lime",
        0.6: "yellow",
        0.8: "orange",
        1: "red"
      }
    });

    heatLayer.addTo(map);

    // ✅ Auto-zoom to fit all points
    if (points.length > 0) {
      const latlngs = points.map((p) => [p[0], p[1]]);
      const bounds = L.latLngBounds(latlngs);
      map.fitBounds(bounds, { padding: [50, 50] }); // padding so it's not too tight
    }

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [issues, map]);

  return null;
}

export default function Heatmap({ issues }) {
  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg border">
      <MapContainer
        center={[23.0225, 72.5714]} // fallback center (Ahmedabad)
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <HeatLayer issues={issues} />
      </MapContainer>
    </div>
  );
}
