import { createRoot } from "react-dom/client";
import {RegionMapWidget} from "./RegionMapWidget.tsx";
import {activity} from "./activity";
import {getMountedHost} from "./lib/hostReader.ts";
import {ensureGlobalStyle} from "./lib/style.ts";

export function mountWidget(hostElement: HTMLElement) {
    const mountedHost = getMountedHost(hostElement);

    ensureGlobalStyle('reactedge-regionmap-css', '/widget/regionmap.css');

    activity('bootstrap', 'Widget mounted', hostElement);

    // Create React root inside shadow
    const root = createRoot(mountedHost);
    root.render(<RegionMapWidget host={hostElement} />);
}
