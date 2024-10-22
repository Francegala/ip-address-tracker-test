// react
// https://github.com/ms-aija/LeafletReact5minDemo
// to use name of city
// https://stackoverflow.com/questions/64953981/react-leaflet-the-name-of-the-place-not-the-coordinates
// code at
// https://codesandbox.io/p/sandbox/geocoding-in-react-leaflet-v3x-v6pm4

import { ClientOnly } from "remix-utils/client-only"
import {Icon} from 'leaflet'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

function MainNavigation() {
const position = [52.51, 13.38]

  return (
  <ClientOnly fallback={null}>
   {() => (
 <MapContainer center={position} zoom={6} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        🐻🍻🎉
                    </Popup>
                </Marker>
            </MapContainer>   )}
 </ClientOnly>
  );
}

export default MainNavigation;