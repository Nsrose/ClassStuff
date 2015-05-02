// Firebase url string
var FIREBASE_STRING = "https://finalattendance.firebaseio.com/";


// Checks if name and login inputs are alright
function inputsOkay(name, login) {
    return true;
}

$(document).ready(function() {
    // Create a connection to firebase:
    var fireRef = new Firebase(FIREBASE_STRING);

    // Form submit actions
    $("#submit").click(function() {
        var name = $("#name_input").val();
        var login = $("#login_input").val();
        if (inputsOkay(name, login)) {
            fireRef.once('value', function(snapshot) {
                if (snapshot.hasChild(login)) {
                    alert("We already got this login's attendance.");
                } else {
                    var node = {};
                    node[login] = name;
                    fireRef.push(node);
                    alert("Thanks for recording your attendance!");
                }
            });
        } else {
            alert("Name or login is bad.");
        }
        
    })

})