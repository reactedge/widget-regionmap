import {useMemo} from "react";
import {readWidgetConfig, type RegionMapWidgetConfig} from "../RegionMapConfig.ts";
import {activity} from "../activity";

export function useWidgetConfig(host: HTMLElement): RegionMapWidgetConfig | null {
    return useMemo(() => {
        const baseConfig = readWidgetConfig(host);
        if (!baseConfig) {
            activity('bootstrap', '[RegionMap] Widget is not correctly configured', null, 'error');
            return null;
        }

        activity('bootstrap', '[RegionMap] Widget config loaded', baseConfig);

        return baseConfig
    }, []);
}



