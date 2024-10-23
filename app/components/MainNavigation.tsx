import {MapContainer, Marker, TileLayer} from 'react-leaflet'
import L from 'leaflet';
import ChangeView from "~/components/ChangeView";
import {LinksFunction} from "@remix-run/node";

function MainNavigation(location: any) {

    const position = [location.lat, location.lon]
    console.log(position)
    const myIcon = new L.Icon({
        iconUrl: ('../../images/icon-location.svg'), iconSize: new L.Point(60, 75), className: 'leaflet-div-icon'
    });


    return (

        <MapContainer maxZoom={15} maxNativeZoom={50} center={position} zoom={11}>
        <ChangeView center={position} zoom={11} />
            <TileLayer

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={myIcon}>
            </Marker>
        </MapContainer>


    );
}

export default MainNavigation;

export const links: LinksFunction = () => [  {rel: "stylesheet", href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',integrity:'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='},
];