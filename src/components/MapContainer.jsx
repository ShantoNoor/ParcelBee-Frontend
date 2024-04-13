import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { styled } from '@mui/system'; 
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet'

import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const myIcon = new Icon({
  iconRetinaUrl:iconRetina, 
  iconUrl: iconMarker, 
  shadowUrl: iconShadow,
  iconSize: [32,32]
})


const MapWrapper = styled('div')({
  height: '100%',
  width: '100%',
});

const MapContainer = () => {
  const position = [23.79337656694133, 90.40618499683097]; 

  return (
    <MapWrapper>
      <LeafletMap center={position} zoom={17} style={{ height: '100%', width: '100%' }} > 
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}  icon={myIcon}>
          <Popup>
            Parcel Bee Headquarter
          </Popup>
        </Marker>
      </LeafletMap>
    </MapWrapper>
  );
};

export default MapContainer;
