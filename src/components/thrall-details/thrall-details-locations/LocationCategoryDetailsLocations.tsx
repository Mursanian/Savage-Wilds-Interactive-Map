import {MapLocation, MapLocationCategory} from "../../../model/MapLocation";
import './LocationCategoryDetailsLocations.css';
import React from "react";

interface ThrallDetailsLocationProps {
    location: MapLocation;
    onSelectLocation(location: MapLocation): void;
}

export interface ThrallDetailsLocationsProps {
    category?: MapLocationCategory;
    onSelectLocation(location: MapLocation): void;
}

const ThrallDetailsLocation = (props: ThrallDetailsLocationProps) => <div
    onClick={() => props.onSelectLocation(props.location)}
    className="thrall-detail-single-location">
    <div className="display-in-row display-in-center ">
        <div style={{marginRight: '16px'}}>
            <img alt="icon camp" src={process.env.PUBLIC_URL + "/fc_assets/icon_camp.png"}/>
        </div>
        <div style={{marginRight: 'auto'}}>
            <div style={{fontSize: '14pt'}}>{props.location.area}</div>
            <div style={{fontSize: '11pt'}}>{props.location.areaDescription}</div>
            <div style={{fontSize: '9pt'}}>{props.location.detail}</div>
            <div style={{fontSize: '9pt'}}>Coordiantes: {props.location.x} / {props.location.y} / {props.location.z}</div>
        </div>
    </div>
</div>

export const LocationCategoryDetailsLocations = (props: ThrallDetailsLocationsProps) => {
    return  <div className="thrall-location-list-container">
        <div>
            <div className="thrall-location-list-header">
                Locations
            </div>
            <div className="thrall-location-list-subheader">
                Click a location to jump to it
            </div>
            <div className="thrall-details-locations">
                {props.category?.locations.map((value, index) => <ThrallDetailsLocation
                    onSelectLocation={props.onSelectLocation}
                    key={index}
                    location={value}/> )}
            </div>
        </div>
    </div>
}
