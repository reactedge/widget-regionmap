import type {RegionMapConfig} from "./domain/regionmap.types.ts";

export interface RegionMapWidgetConfig extends RegionMapConfig {
    googleMapsApiKey: string | undefined;
}

export function readWidgetConfig(
    hostElement: HTMLElement
): RegionMapWidgetConfig | null {
    const configScript = hostElement.querySelector<HTMLScriptElement>(
        'script[type="application/json"][data-config]'
    );

    if (!configScript) {
        throw new Error("RegionMap widget requires a <script data-config> block.");
    }

    try {
        const parsed = JSON.parse(configScript.textContent || "{}");

        return Object.freeze({
            title: parsed.data.title,
            center: parsed.data.center,
            zoom: parsed.data.zoom,
            region: parsed.data.region,
            googleMapsApiKey: parsed.integrations?.googleMaps?.apiKey
        });
    } catch {
        return {
            title: '',
            center: undefined,
            region: undefined,
            zoom: 0,
            googleMapsApiKey: ''
        };
    }
}

