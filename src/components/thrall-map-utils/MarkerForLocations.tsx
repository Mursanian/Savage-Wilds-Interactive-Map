import {MapLocationCategory} from "../../model/MapLocation";
import {Marker, Tooltip, useMap} from "react-leaflet";
import React from "react";
import {ceCoordinateToLatLng} from "../../util/conversions";
import {icon, LatLngLiteral} from "leaflet";

const locationIcon = icon({
    iconUrl: process.env.PUBLIC_URL + '/fc_assets/icon_camp.png',
    iconSize: [24, 24],
    tooltipAnchor: [0, 12],
});


function makeMarkerForLocation(category: MapLocationCategory, location: LatLngLiteral, zoom: number) {
    // FIXME add icon from location
    return <Marker key={location.lat + '_' + location.lng}
                   icon={locationIcon}
                   position={location}>
        <Tooltip direction="bottom">{category.name}</Tooltip>
    </Marker>
}

export function MarkerForLocations(props: {category?: MapLocationCategory, focused: boolean}): any {
    let zoom = useMap().getZoom();
    if (!props.focused) {
        return [];
    }
    const category = props.category;
    if (!category) {
        return <React.Fragment/>;
    }
    return category.locations.map(location => makeMarkerForLocation(category, ceCoordinateToLatLng(location), zoom));
}
