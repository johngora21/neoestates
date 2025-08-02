import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-draw';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Simple area calculation function
const calculateArea = (latlngs) => {
  if (latlngs.length < 3) return 0;
  
  let area = 0;
  for (let i = 0; i < latlngs.length; i++) {
    const j = (i + 1) % latlngs.length;
    area += latlngs[i].lat * latlngs[j].lng;
    area -= latlngs[j].lat * latlngs[i].lng;
  }
  area = Math.abs(area) / 2;
  
  // Convert to square meters (approximate)
  const earthRadius = 6371000; // meters
  const areaInSqMeters = area * earthRadius * earthRadius;
  
  return areaInSqMeters;
};

const Map = ({ 
  center = [-6.8235, 39.2695], // Default to Dar es Salaam, Tanzania
  zoom = 13,
  height = '400px',
  width = '100%',
  onMapClick,
  markers = [],
  drawMode = false,
  onAreaCalculated
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const drawnItemsRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(mapInstanceRef.current);

    // Initialize drawn items for area calculation
    if (drawMode) {
      drawnItemsRef.current = new L.FeatureGroup();
      mapInstanceRef.current.addLayer(drawnItemsRef.current);

      // Add draw control
      const drawControl = new L.Control.Draw({
        draw: {
          polygon: {
            allowIntersection: false,
            drawError: {
              color: '#e1e100',
              message: '<strong>Oh snap!<strong> you can\'t draw that!'
            },
            shapeOptions: {
              color: '#16a34a'
            }
          },
          circle: false,
          rectangle: false,
          polyline: false,
          circlemarker: false,
          marker: false
        },
        edit: {
          featureGroup: drawnItemsRef.current,
          remove: true
        }
      });
      mapInstanceRef.current.addControl(drawControl);

      // Handle draw events
      mapInstanceRef.current.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer;
        drawnItemsRef.current.addLayer(layer);

        // Calculate area using our simple function
        const areaInSqMeters = calculateArea(layer.getLatLngs()[0]);
        const areaInAcres = Math.round(areaInSqMeters / 4046.86 * 100) / 100;

        if (onAreaCalculated) {
          onAreaCalculated({
            areaInSqMeters: Math.round(areaInSqMeters),
            areaInAcres,
            coordinates: layer.getLatLngs()[0]
          });
        }
      });

      mapInstanceRef.current.on(L.Draw.Event.DELETED, () => {
        if (onAreaCalculated) {
          onAreaCalculated(null);
        }
      });
    }

    // Add click handler
    if (onMapClick) {
      mapInstanceRef.current.on('click', (e) => {
        onMapClick(e.latlng);
      });
    }

    // Add markers
    markers.forEach(marker => {
      const leafletMarker = L.marker([marker.lat, marker.lng])
        .addTo(mapInstanceRef.current)
        .bindPopup(marker.popup || 'Location');
      markersRef.current.push(leafletMarker);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [center, zoom, drawMode]);

  // Update markers when markers prop changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Add new markers
    markers.forEach(marker => {
      const leafletMarker = L.marker([marker.lat, marker.lng])
        .addTo(mapInstanceRef.current)
        .bindPopup(marker.popup || 'Location');
      markersRef.current.push(leafletMarker);
    });
  }, [markers]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        height, 
        width,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden'
      }} 
    />
  );
};

export default Map; 