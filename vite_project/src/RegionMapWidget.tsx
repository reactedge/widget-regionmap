import {RegionMap} from "./components/RegionMap.tsx";
import {useWidgetConfig} from "./hooks/useWidgetConfig.ts";
import {SystemStateProvider} from "./state/System/SystemStateProvider.tsx";
import {ErrorState} from "./components/global/ErrorState.tsx";

type Props = {
    host: HTMLElement
}

export function RegionMapWidget({host}: Props) {
    const {config, error} = useWidgetConfig(host);

    if (!config) return null;
    if (error) return <ErrorState error={error}  />

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
