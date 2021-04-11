import {MapLocation, MapLocationCategory} from "../../model/MapLocation";
import {Marker, Tooltip, useMap} from "react-leaflet";
import React from "react";
import {ceCoordinateToLatLng} from "../../util/conversions";
import {icon, LatLngLiteral} from "leaflet";

const locationIcon = icon({
    iconUrl: process.env.PUBLIC_URL + '/fc_assets/icon_camp.png',
    iconSize: [24, 24],
    tooltipAnchor: [0, 12],
});


function makeMarkerForLocation(location: MapLocation) {
    // FIXME add icon from location
    const position = ceCoordinateToLatLng(location);
    return <Marker key={location.id}
                   icon={locationIcon}
                   position={position}>
        <Tooltip direction="bottom">{location.name}</Tooltip>
    </Marker>
}

export function MarkerForLocations(props: {locations: MapLocation[], focused: boolean}): any {
    if (!props.focused) {
        return [];
    }
    return props.locations.map(location => makeMarkerForLocation(location));
}
