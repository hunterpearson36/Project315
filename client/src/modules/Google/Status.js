import LoginButton from "./Login";
import LogoutButton from "./Logout";
import { getCookie } from "../Cookies/CookieFunctions";

function getButton() {
    var logged_in = getCookie("LOGGED_IN");
    if (logged_in) {
        return <LogoutButton />
    }
    return <LoginButton />
}

function isLoggedIn() {
    var logged_in = getCookie("LOGGED_IN");
    if (logged_in) return true;
    return false;
}

export {getButton, isLoggedIn};