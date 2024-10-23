import {MapContainer, Marker, TileLayer} from 'react-leaflet'
import L from 'leaflet';
import ChangeView from "~/components/ChangeView";

function MainNavigation(location: any) {

    const position = [location.lat, location.lon]
    console.log(position)
    const myIcon = new L.Icon({
        iconUrl: ('../../images/icon-location.svg'), iconSize: new L.Point(60, 75), className: 'leaflet-div-icon'
    });


    return (

        <MapContainer maxZoom={18} maxNativeZoom={100} center={position} zoom={13}>
        <ChangeView center={position} zoom={13} />
            <TileLayer

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={myIcon}>
            </Marker>
        </MapContainer>


    );
}

export default MainNavigation;

