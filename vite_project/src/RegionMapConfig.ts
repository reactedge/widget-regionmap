import type {
    ReactEdgeRuntimeConfig,
    RegionMapWidgetConfig,
    ResolvedRegionMapConfig
} from "./domain/regionmap.types.ts";
import {WIDGET_ID} from "./mountWidget.tsx";
import {loadContract} from "./widget-runtime/lib/contractLoader.ts";
import {activity} from "./activity";

export async function readWidgetConfig(
    hostElement: HTMLElement
): Promise<RegionMapWidgetConfig> {

    let contract = null
    try {
        contract = await loadContract(hostElement);
    } catch (e) {
        contract = readFallbackWidgetConfig(hostElement)
    }

    const runtime = readIntegrationConfig();
    const resolved = resolveWidgetConfig(contract, runtime);

    activity('bootstrap', 'Widget config', {
        data: resolved.data,
        integrations: resolved.integrations
    });

    return Object.freeze(resolved);
}

export function readFallbackWidgetConfig(
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
        return Object.freeze(parsed);
    } catch {
        return null;
    }
}

export function readIntegrationConfig(): ReactEdgeRuntimeConfig {
    const configScript = document.getElementById('reactedge-runtime');

    if (!configScript) {
        throw new Error(`${WIDGET_ID} widget requires a <script id='reactedge-runtime'> block.`);
    }

    let config: ReactEdgeRuntimeConfig;
    try {
        config = JSON.parse(configScript.textContent);
    } catch {
        throw new Error(`${WIDGET_ID}: reactedge-runtime contains invalid JSON`);
    }

    if (!config.integrations?.googleMaps?.apiKey) {
        throw new Error(`${WIDGET_ID}: googleMaps missing in reactedge-runtime`);
    }

    return config;
}

export function resolveWidgetConfig(
    widget: RegionMapWidgetConfig,
    runtime: ReactEdgeRuntimeConfig
): ResolvedRegionMapConfig {

    if (
        widget.integration?.requires?.includes('googleMaps') &&
        !runtime.integrations?.googleMaps?.apiKey
    ) {
        throw new Error(`[${WIDGET_ID}] googleMaps integration required but not configured`);
    }

    return {
        data: widget.data,
        integrations: {
            googleMaps: runtime.integrations?.googleMaps
        }
    };
}
