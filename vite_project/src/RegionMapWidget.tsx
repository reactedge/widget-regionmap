import {RegionMap} from "./components/RegionMap.tsx";
import {useWidgetConfig} from "./hooks/useWidgetConfig.ts";
import {SystemStateProvider} from "./state/System/SystemStateProvider.tsx";
import {activity} from "./activity";

type Props = {
    host: HTMLElement
}

export function RegionMapWidget({host}: Props) {
    const widgetConfig = useWidgetConfig(host);

    if (!widgetConfig) {
        activity('config-missing', '[ContactUs] Widget is not correctly configured',null, 'warn');
        return null;
    }

    return (
        <SystemStateProvider config={widgetConfig}>
            <RegionMap
                title={widgetConfig.title}
                region={widgetConfig.region}
                center={widgetConfig.center}
                zoom={widgetConfig.zoom}
            />
        </SystemStateProvider>
    );
}
