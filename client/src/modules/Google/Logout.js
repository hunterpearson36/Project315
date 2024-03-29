import { GoogleLogout } from 'react-google-login';

import { eraseCookie } from '../Cookies/CookieFunctions';
import Translate from "./Translate";

function Logout() {

    const onSuccess = () => {
        console.log("Log out successfull!");
        eraseCookie("LOGGED_IN");
        eraseCookie("ACCESS_TOKEN");
        eraseCookie("USER_EMAIL");
        eraseCookie("USER_NAME");
        eraseCookie("USER_GIVEN_NAME");
        window.location.assign('/');
    }

    return (
        <div id="signOutButton">
            <Translate text="Logout"/>:
            <GoogleLogout 
                clientID={process.env.REACT_APP_OAUTH_CLIENT_ID}
                buttonText={"Logout of Google"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;