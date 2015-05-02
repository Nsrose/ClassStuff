// Firebase url string
var FIREBASE_STRING = "https://finalattendance.firebaseio.com/";


// Custom alert box
function message(m) {
    $("#overlay").show();
    
    
}

// Close message box
function closeMessage() {

}

// Show yes no options on message box. 
function showYesNo() {

}

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
                    message("We already got this login's attendance.");
                    closeMessage();
                } else {
                    verifyAndRecord(login, name);
                }
            });
        } else {
            message("Name or login is bad.");
            closeMessage();
        }
        
    })

    // Verifies that user wants to send data and sends if good.
    function verifyAndRecord(login, name) {
        message("Are you sure you want to record attendance? You can only do this once.");
        showYesNo();
        fireRef.child(login).set(name);
        message("Thanks for recording your attendance!");
        closeMessage();
    }

})