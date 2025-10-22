import React from 'react';
import {Image} from "react-native";

const MapImage = () => {
    const imgUrl = "https://www.pastelowelove.pl/userdata/public/gfx/4234/mapa-polski-szara--naklejka.-naklejka-dla-dzieci.-dekoracje-pokoju.jpg";
    return (
        <Image
            source={{uri: imgUrl}}
            style={{width: '100%', height: 300, resizeMode: 'contain'}}
        />
    );
};

export default MapImage;