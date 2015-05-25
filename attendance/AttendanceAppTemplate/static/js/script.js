// Firebase url string
var FIREBASE_STRING = "https://finalattendance.firebaseio.com/";

// Location coords
var latitude = 0;
var longitude = 0;

// DO NOT CHANGE ANTHING ABOVE THIS LINE

// If true, then check for cookies
var checkCookies = true;

// Allowed distance for recording attendance
var ALLOWED_RADIUS = 0.050;

// Custom alert box
function message(m) {
    $("#overlay").fadeIn(400);
    $("#message_container").fadeIn(400);
    $("#message_text").text(m);
}

// Close message box
function closeMessage() {
    $("#location_text").hide();
    $("#message_container").fadeOut(400);
    $("#overlay").fadeOut(400);
    hideYesNo();
}

// Show yes no options on message box. 
function showYesNo(login, name) {
    $("#info_container").show();
    $("#name").text(name);
    $("#login").text(login);
    $("#yesno_container").show();
}

// Hides the yesno container
function hideYesNo() {
    $("#yesno_container").hide();
    $("#info_container").hide();
}

// Checks if name and login inputs are alright
function inputsOkay(name, login) {
    if (name == "" || login == "") {
        return false;
    }
    return true;
}

// Converts numeric degrees to radians, from stackoverflow
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

// Distance between two coords, from stackoverflow, in km
function distance(lon1, lat1, lon2, lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad(); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

$(document).ready(function() {
    // Create a connection to firebase:
    var fireRef = new Firebase(FIREBASE_STRING);

    // name and login
    var name = "";
    var login = "";

    // Do submit upon pressing enter
    $('#login_input').keypress(function (e) {
        if (e.which == 13) {
            $("#submit").click();
            return false;
        }
    });
    $('#name_input').keypress(function (e) {
        if (e.which == 13) {
            $("#submit").click();
            return false;
        }
    });

    // Form submit actions
    $("#submit").click(function() {
        name = $("#name_input").val();
        login = $("#login_input").val();
        if (inputsOkay(name, login)) {
            fireRef.once('value', function(snapshot) {
                if (snapshot.hasChild(login)) {
                    message("We already got this login's attendance.");
                     window.setTimeout(function() {
                        closeMessage();    
                    }, 1500)
                } else {
                    verify(login, name);
                }
            });
        } else {
            message("Name or login is bad.");
            window.setTimeout(function() {
                closeMessage();    
            }, 1500)
        }
       
        
    })

    // Verifies that user wants to send data and sends if good.
    function verify(login, name) {
        if (!checkCookies || !checkCookie(login)) {
            $("#overlay").show();
            $("#location_text").show();
            navigator.geolocation.getCurrentPosition(checkLocation);
        } else {
            message("You already recorded your attendance.");
            window.setTimeout(function() {
                closeMessage();
            }, 1500)   
        }
        
    }

    // Checks radius and sends if okay
    function checkLocation(location) {
        if (navigator.geolocation) {
            var user_lat = location.coords.latitude;
            var user_lon = location.coords.longitude;
            var dist = distance(longitude, latitude, user_lon, user_lat);
            if (dist > ALLOWED_RADIUS) {
                message("You aren't actually in lecture.");
                window.setTimeout(function() {
                    closeMessage();
                }, 1500)
            } else {
                message("Are you sure you want to record attendance? You can only do this once.");
                showYesNo(login, name);
                $("#yes").click(function() {
                    closeMessage();
                    fireRef.child(login).set(name);
                    window.setTimeout(function() {
                        message("Thanks for recording your attendance!");
                        window.setTimeout(function() {
                            closeMessage();
                        }, 3000)
                    }, 1500)
                })
                $("#no").click(function() {
                    closeMessage();
                })
            }
        } else {
            message("Location services not working");
            window.setTimeout(function() {
                closeMessage();
            }, 1500)
        }
    }


})