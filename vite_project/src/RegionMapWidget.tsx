import {RegionMap} from "./components/RegionMap.tsx";
import {useWidgetConfig} from "./hooks/useWidgetConfig.ts";
import {SystemStateProvider} from "./state/System/SystemStateProvider.tsx";

type Props = {
    host: HTMLElement
}

export const WIDGET_ID = 'RegionMap';

export function RegionMapWidget({host}: Props) {
    const config = useWidgetConfig(host);

    if (!config) return null;

    return (
        <SystemStateProvider config={config}>
            <RegionMap
                title={config.data.title}
                region={config.data.region}
                center={config.data.center}
                zoom={config.data.zoom}
            />
        </SystemStateProvider>
    );
}
