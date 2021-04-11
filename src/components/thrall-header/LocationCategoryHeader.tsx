import React from "react";
import {MapLocationCategory} from "../../model/MapLocation";
import './LocationCategoryHeader.css'


export interface LocationCategoryHeaderProps {
    category: MapLocationCategory;
    icon: 'chevron_right' | 'chevron_left';
    onSelect(category: MapLocationCategory): void;
}

export const LocationCategoryHeader = (props: LocationCategoryHeaderProps) => {
    return <div className="thrall-header" onClick={() => props.onSelect(props.category)}>
        <div>
            <div className="thrall-header-name">{props.category.name}</div>
        </div>
        <div style={{marginLeft: 'auto', marginRight: '16px'}}>
            <span className="material-icons" style={{fontSize: '20pt'}}>{props.icon}</span>
        </div>
    </div>
}
