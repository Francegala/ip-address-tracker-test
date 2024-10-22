// react
// https://github.com/ms-aija/LeafletReact5minDemo
// to use name of city
// https://stackoverflow.com/questions/64953981/react-leaflet-the-name-of-the-place-not-the-coordinates
// code at
// https://codesandbox.io/p/sandbox/geocoding-in-react-leaflet-v3x-v6pm4

// import {ClientOnly} from "remix-utils/client-only"
import {MapContainer, TileLayer} from 'react-leaflet'

function MainNavigation(location:any) {
  // Berlino
  const position = [location.lat, location.lon]


    return (<div className="map">
                    <MapContainer center={position} zoom={10} >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                </div>

            );
}

export default MainNavigation;