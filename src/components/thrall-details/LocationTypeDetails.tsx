import {MapLocation, MapLocationCategory, MapLocationType} from "../../model/MapLocation";
import React from "react";
import './LocationTypeDetails.css';
import {LocationCategoryHeader} from "../thrall-header/LocationCategoryHeader";
import {LocationCategoryDetailsLocations} from "./thrall-details-locations/LocationCategoryDetailsLocations";

interface LocationTypeDetailsProps {
    category?: MapLocationCategory;
    focused: boolean;
    onDeSelect(): void;
    onSelectLocation(location: MapLocation): void;
}

function emptyCategory(): MapLocationCategory {
    return {
        descritpion: '',
        name: '',
        locations: [],
        type: MapLocationType.POINT_OF_INTEREST
    }
}

export const LocationTypeDetails = (props: LocationTypeDetailsProps) => {
    const slideAnimationClass = props.focused ? 'thrall-details-sliding-in' : 'thrall-details-sliding-out'
    return <div className={"thrall-details-container " + slideAnimationClass}>
        <div className="thrall-details">
            <LocationCategoryHeader category={props.category || emptyCategory()}
                                    icon={"chevron_left"}
                                    onSelect={props.onDeSelect}/>
            <div className="thrall-location-description">
                {props.category?.descritpion}
            </div>
            <LocationCategoryDetailsLocations category={props.category} onSelectLocation={props.onSelectLocation}/>
        </div>
    </div>
}
