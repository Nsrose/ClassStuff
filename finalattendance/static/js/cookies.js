// Sets a cookie for disallowing multiple votes
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

// Gets a cookie with name CNAME
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

// Checks whether user has already voted. Returns true if
// the user already voted.
function checkCookie(data) {
    var voteCookie = getCookie("user_data");
    if (voteCookie != "") {
        alert("You already voted, thanks!");
        return true;
    } else {
        setCookie("user_data", data, 1);
        return false;
    }
}