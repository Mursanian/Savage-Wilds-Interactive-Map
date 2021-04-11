import {MapLocation, MapLocationCategory} from "../../model/MapLocation";
import {LocationListItem} from "./LocationListItem";
import React from "react";
import {LocationTypeDetails} from "../thrall-details/LocationTypeDetails";
import './LocationList.css';

export interface ThrallListProps {
    selectedCategory?: MapLocationCategory;
    // For animation
    selectedThrallFocused: boolean;
    categories: MapLocationCategory[];
    onSelectCategory(category: MapLocationCategory): void;
    onDeselectThrall(): void;
    onSelectLocation(location: MapLocation): void;
}

export const LocationList = (props: ThrallListProps) => {
    const additionalListClass = props.selectedThrallFocused ? 'thrall-list-sliding-out' : 'thrall-list-sliding-in';
    return <React.Fragment>
        <LocationTypeDetails focused={props.selectedThrallFocused}
                             onSelectLocation={props.onSelectLocation}
                             category={props.selectedCategory}
                             onDeSelect={props.onDeselectThrall}/>
        <div className={'thrall-list ' + additionalListClass}>
            {props.categories
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(value => <LocationListItem key={value.name}
                                                onSelect={props.onSelectCategory}
                                                category={value}/>)}
        </div>
    </React.Fragment>
}
