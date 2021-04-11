import {LatLng, LatLngBounds, LatLngBoundsExpression, LatLngLiteral, Polygon, Polyline} from "leaflet";
import {MapLocation} from "../model/MapLocation";

export function ceCoordinateToLatLng(ceCoordinate: MapLocation): LatLngLiteral {
    return {
        // Because coordinates are in pixel space, the y-axis goes from negative (bot) to positive (top),
        // where as in CE it goes from positive(bot) to negative(top)
        // So we need to invert it.
        lat: -1 * ceCoordinate.y,
        lng: ceCoordinate.x
    }
}

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));
const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const range = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    a: number
) => lerp(x2, y2, invlerp(x1, y1, a));


export function findCenter(locations: MapLocation[]): LatLngLiteral| null {
    if (locations.length <= 0) {
        return null;
    }
    if (locations.length <= 1) {
        return ceCoordinateToLatLng(locations[0])
    }
    if (locations.length <= 2) {
        const latLngs = locations.map(value => ceCoordinateToLatLng(value));
        return new Polyline(latLngs).getBounds().getCenter();
    }
    const latLngs = locations.map(value => ceCoordinateToLatLng(value));
    const polygon = new Polygon(latLngs);
    return polygon.getBounds().getCenter();
}


export function calculateBounds(south: number, west: number, north: number, east: number): LatLngBoundsExpression {
    const southWest: LatLng = new LatLng(south, west);
    const northEast: LatLng = new LatLng(north, east);
    return  new LatLngBounds(
        southWest,
        northEast
    );
}
