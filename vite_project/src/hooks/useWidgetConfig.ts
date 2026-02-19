import {useMemo} from "react";
import {
    readIntegrationConfig,
    readWidgetConfig,
    resolveWidgetConfig
} from "../RegionMapConfig.ts";
import {activity} from "../activity";
import type {ResolvedRegionMapConfig} from "../domain/regionmap.types.ts";

export function useWidgetConfig(host: HTMLElement): ResolvedRegionMapConfig | null {
    return useMemo(() => {
        const widgetConfig = readWidgetConfig(host);
        if (!widgetConfig) {
            activity('bootstrap', 'Missing widget config', null, 'error');
            return null;
        }

        const runtime = readIntegrationConfig();
        const resolved = resolveWidgetConfig(widgetConfig, runtime);

        activity('bootstrap', 'Widget config', {
            data: resolved.data,
            integrations: resolved.integrations
        });

        return resolved;
    }, []);
}



