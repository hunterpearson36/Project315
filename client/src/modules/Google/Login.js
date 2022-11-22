import { GoogleLogin } from 'react-google-login';

import { setCookie, getCookie } from '../Cookies/CookieFunctions';

function Login() {

    const onSuccess = (res) => {
        var profile = res.profileObj;
        console.log("LOGIN SUCCESS! Current user: ", res);
        var logged_in = getCookie("LOGGED_IN");
        console.log(logged_in);
        // since google login cookie timeout is 14 by default, these should match
        setCookie("LOGGED_IN", "true", 14);
        setCookie("ACCESS_TOKEN", JSON.stringify(res.accessToken), 14);
        setCookie("USER_EMAIL", profile.email, 14);
        setCookie("USER_NAME", profile.name, 14);
        setCookie("USER_GIVEN_NAME", profile.givenName, 14);
        if (!logged_in) {
            window.location.reload(false);
        }
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }

    return(
        <div id="signInButton">
            <GoogleLogin
                clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                buttonText="Login"
                accessType="offline"
                prompt="consent"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login;