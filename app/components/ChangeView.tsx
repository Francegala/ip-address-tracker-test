import { useMap} from 'react-leaflet'


function MainNavigation({ center, zoom }: { center: any; zoom: number }) {

  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default MainNavigation;

