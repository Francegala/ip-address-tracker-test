import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet';


function MainNavigation(location: any) {

    const position = [location.lat, location.lon]
    console.log(position)
    const myIcon = new L.Icon({
        iconUrl: ('../../images/icon-location.svg'), iconSize: new L.Point(60, 75), className: 'leaflet-div-icon'
    });


    return (

        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={myIcon}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>


    );
}

export default MainNavigation;

