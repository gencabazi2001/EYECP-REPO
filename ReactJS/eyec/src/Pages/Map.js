import React, { useEffect } from "react";
import { ColContainer } from "../components/styled/Container.styled";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import axios from "axios";

function Map() {
  const [map, setMap] = useState(null);
  // const mapPreferences = useSelector((state) => state.mapPreferences);
  // const mapDistance = useSelector((state) => state.mapDistance);
  // const mapCenter = useSelector((state) => state.mapCenter);
  
  const location = [42.2,43.2];
  const markerIcon = new L.Icon({
    iconUrl: "./images/marker.png",
    iconSize: [45, 45],
    iconAnchor: [17, 46],
    popupAnchor: [14, -40],
  });
  const markerIcon2 = new L.Icon({
    iconUrl: "./images/marker2.png",
    iconSize: [45, 45],
    iconAnchor: [17, 46],
    popupAnchor: [14, -40],
  });
  const marker = (no) =>{
    if (no.index%2 == 0){
      return markerIcon
    } else {
      return markerIcon2
    }

  }
  const mapDistance = 999999999;
  const [streams, setStreams] = useState([]);

  const getStreams = () => {
    let queryTags = ["Music","Politics"];
    axios
      .post(
        process.env.React_App_API + "search/getStreamsByTagsAndLocation",
        {
          tags: queryTags,
          coordinates: [parseFloat(location[0]), parseFloat(location[1])],
          radius: Math.floor(mapDistance),
        }
      )
      .then((response) => {
        if (
          response.data.streams[0] !== null ||
          response.data.streams[0] !== "No such results"
        ) {
          setStreams(response.data.streams[0]);
          // console.log(response.data.streams[0]);
        }
      })
      .catch((error) => {
        console.log(JSON.stringify(streams) + " CATCH STREAMS");
        console.log("REQUEST ERROR" + error.toString());
      });
  };
  useEffect(() => {
    getStreams();
  }, []);
  return (
    <ColContainer>
      <MapContainer
        style={{ height: "500px", width: "50vw" }}
        center={location}
        zoom={4}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {streams !== undefined &&
          streams !== null &&
          streams.length > 0 &&
          streams &&
          streams.map((stream, index) => (
            <Marker
              key={index}
              position={[
                stream.geometry.coordinates[0],
                stream.geometry.coordinates[1],
              ]}
              icon={marker({index})}
            >
              <Popup>
                UUID: {stream.uuid}
                {stream.tags.map((tag, index) => (
                  <p key={index}>
                    <b>{tag}</b>
                  </p>
                ))}
                {/* <Link
                  to={"/viewStream/" + stream.uuid + "/" + stream.timestamp}
                >
                  View Stream
                </Link> */}
              </Popup>
            </Marker>
          ))}
        <Marker position={location} icon={markerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </ColContainer>
  );
}

export default Map;
