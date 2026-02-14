import {type ReactNode} from "react";
import {LocalSystemStateContext} from "./SystemState.tsx";
import type {RegionMapWidgetConfig} from "../../RegionMapConfig.ts";

interface SystemStateProviderProps {
    children: ReactNode;
    config: RegionMapWidgetConfig;
}

const LocalStateProvider = LocalSystemStateContext.Provider;

export const SystemStateProvider: React.FC<SystemStateProviderProps> = ({ children, config }) => {
    return (
        <LocalStateProvider
            value={{
                googleMapsApiKey: config.googleMapsApiKey || ''
            }}
        >
            {children}
        </LocalStateProvider>
    );
};
