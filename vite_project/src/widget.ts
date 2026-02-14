import { mountWidget } from "./mountWidget";

class RegionMapWidget extends HTMLElement {
    connectedCallback() {
        mountWidget(this);
    }
}

customElements.define("regionmap-widget", RegionMapWidget);
