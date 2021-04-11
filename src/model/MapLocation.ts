
export interface MapLocationCategory {
    type: MapLocationType;
    name: string;
    descritpion: string;
    locations: MapLocation[];
}

export interface MapLocation {
    id: string;
    name: string;
    // URL (relative to root)
    icon: string;
    type: MapLocationType;
    // Name of the general area
    area?: string;
    // Describe the area
    areaDescription?: string;
    // Optional detail string
    detail?: string;
    // x, y and z coordinates of TeleportPlayer
    // If converting from // TeleportPlayer, the coordinates are x, y and z.
    // So:
    // TeleportPlayer x y z
    x: number;
    y: number;
    z: number;
}

export enum MapLocationType {
    THRALL = "THRALL",
    POINT_OF_INTEREST = "POINT_OF_INTEREST",
    BOSS = "BOSS",
}
