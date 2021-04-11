import {MapLocationCategory} from "../../model/MapLocation";
import React from "react";
import {LocationCategoryHeader} from "../thrall-header/LocationCategoryHeader";

export interface ThrallListThrallProps {
    category: MapLocationCategory;
    onSelect(category: MapLocationCategory): void;
}

export const LocationListItem = (props: ThrallListThrallProps) => {
    return <LocationCategoryHeader onSelect={props.onSelect} category={props.category} icon={"chevron_right"}/>
}
