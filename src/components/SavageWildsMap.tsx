import {ImageOverlay, MapContainer, ZoomControl} from "react-leaflet";
import {CRS, LatLngLiteral,} from "leaflet";
import {LocationList} from "./thrall-list/LocationList";
import {MapLocation, MapLocationCategory} from "../model/MapLocation";
import React, {MouseEvent, useState} from "react";
import {calculateBounds, ceCoordinateToLatLng, findCenter} from "../util/conversions";
import {ZoomCenter} from "../model/ZoomCenter";
import {SetViewOnClick} from "./thrall-map-utils/SetViewOnClick";
import {MarkerForLocations} from "./thrall-map-utils/MarkerForLocations";
import {MapEvents} from "./thrall-map-utils/MapEvents";
import {InfoDialog} from "./info-dialog/InfoDialog";

const DEFAULT_ZOOM = -8.7;
const DEFAULT_CENTER: LatLngLiteral = {lat: 0, lng: 0};

interface ThrallMapProps {
    categories: MapLocationCategory[];
    mapLq: string;
    mapHq: string;
    north: number;
    south: number;
    west: number;
    east: number;
    minZoom: number;
    maxZoom: number;
}

export function SavageWildsMap(props: ThrallMapProps) {
    //FIXME name
    const [selectedCategory, setSelectedCategory] = useState(undefined as unknown as MapLocationCategory | undefined);
    // Use a separate focus flag to control whether the detail display or the list display is used
    // This avoids having an undefined name while the element with the details is sliding out
    const [categoryFocused, setCategoryFocused] = useState(false);
    const [zoomCenter, setZoomCenter] = useState(undefined as unknown as ZoomCenter | undefined);
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);
    const [useHq, setUseHq] = useState(false);

    function handleSelectCategory(catgory: MapLocationCategory) {
        let center = findCenter(catgory.locations);
        if (center) {
            setZoomCenter({zoom: -8, center});
        }
        setSelectedCategory(catgory)
        setCategoryFocused(true)
    }

    function handleDeselectThrall() {
        // While animating, we still want the thrall details visible until
        // it has slide out.
        setCategoryFocused(false)
        setZoomCenter({zoom: -8.7, center: DEFAULT_CENTER});
    }

    function handleSelectLocation(location: MapLocation): void {
        setZoomCenter({
            center: ceCoordinateToLatLng(location),
            zoom: -7,
        });
    }

    function handleHqClick(event: MouseEvent<HTMLInputElement>) {
        let target = event.target as HTMLInputElement;
        setUseHq(target.checked)
    }

    function determineLocations(): MapLocation[] {
        if (!selectedCategory) {
            return props.categories
                .map(value => value.locations)
                .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);
        }
        return selectedCategory.locations;
    }

    const center = zoomCenter?.center ? zoomCenter.center : DEFAULT_CENTER;
    const zoom = zoomCenter?.zoom ? zoomCenter.zoom : DEFAULT_ZOOM
    const mapBounds = calculateBounds(props.south, props.west, props.north, props.east);
    return <div className="thrall-map-wrapper">
        <div id="info-button" className={"display-in-center"} onClick={() => setInfoDialogOpen(true)}>
            <span className="material-icons" style={{fontSize: '18pt'}}>
                help_outline
            </span>
        </div>
        <div id="hq-checkbox-wrapper" className="display-in-center">
            <input id="hq-checkbox" type="checkbox" checked={useHq} onClick={handleHqClick}/>
            <label htmlFor="hq-checkbox">HQ Map (11mb)</label>
        </div>
        <InfoDialog open={infoDialogOpen} onClose={() => setInfoDialogOpen(false)}/>
        <MapContainer center={center}
                      style={{height: '100vh', width: 'calc(100vw - var(--sidebar-width))'}}
                      minZoom={props.minZoom}
                      maxZoom={props.maxZoom}
                      zoomSnap={0.1}
                      zoomDelta={0.1}
                      crs={CRS.Simple}
                      bounds={mapBounds}
                      zoomControl={false}
                      zoom={zoom}>
            <ZoomControl/>
            {!useHq && <ImageOverlay url={process.env.PUBLIC_URL + props.mapLq} bounds={mapBounds} />}
            {useHq && <ImageOverlay url={process.env.PUBLIC_URL + props.mapHq} bounds={mapBounds}/>}
            <MapEvents mapBounds={mapBounds} onZoomCenterChange={setZoomCenter}/>
            <SetViewOnClick location={zoomCenter}/>
            <MarkerForLocations locations={determineLocations()} focused={categoryFocused}/>
        </MapContainer>
        <div className="sidebar-right">
            <LocationList categories={props.categories}
                          selectedCategory={selectedCategory}
                          onSelectCategory={handleSelectCategory}
                          onSelectLocation={handleSelectLocation}
                          selectedThrallFocused={categoryFocused}
                          onDeselectThrall={handleDeselectThrall}/>
        </div>
    </div>
}
