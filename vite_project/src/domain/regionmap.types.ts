export type Polygon = [LatLng, LatLng, LatLng, ...LatLng[]];
export interface LatLng {
    lat: number;
    lng: number;
}

export interface RegionMapConfig {
    title?: string;
    center: LatLng | undefined;
    zoom: number;
    region: Polygon | undefined;
}

export interface IntegrationConfig {
    googleMapsApiKey?: string;
}