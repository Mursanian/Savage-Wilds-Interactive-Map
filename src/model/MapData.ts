import {MapLocationCategory} from "./MapLocation";

export interface MapData {
    "map_lq": string;
    "map_hq": string;
    minZoom: number;
    maxZoom: number;
    bounds: {
        south: number,
        west: number,
        north: number,
        east: number
    }
    categories: MapLocationCategory[];
}
