import { loadGeneral } from "./Start_General";
import { loadManager } from "./Start_Manager";

function startup() {
    loadGeneral();
    loadManager();
}

export { startup };