import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom"; //packgage
import { FiPlus, FiArrowRight } from "react-icons/fi"; //packgage

import { Map, TileLayer, Marker, Popup } from "react-leaflet"; //packgage carrega as tags (componentes)
import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/Smile-map.svg';

import "../styles/pages/orphanages-map.css";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

// type file

const OrphanagesMap = () => {

  const [orphanages, setOrphanages] = useState<Orphanages[]>([])

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Smile Face" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :3</p>
        </header>

        <footer>
          <strong>Rio de Janeiro</strong>
          <span>Rio de janeiro</span>
        </footer>
      </aside>

      <Map
        center={[-22.8659886,-43.4863882]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />  */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map((orphanage) => {
          return (
            <Marker
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
              key={orphanage.id}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className={"map-popup"}
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={23} color="#FFF" />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
