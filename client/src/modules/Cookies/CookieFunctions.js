
function setCookie(cname, cvalue, exdays) {
    var expires = "";
    if (exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        expires = "; expires=" + d.toUTCString();
    }
    document.cookie = cname + "=" + (encodeURIComponent(cvalue) || "") + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var nameEQ = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

export {setCookie, getCookie, eraseCookie};