// Firebase url string
 var FIREBASE_STRING = "http://facebook.com";
 
 // Location coords
 var latitude = 37.875588;
 var longitude = -122.258803;
 
 // If true, then check for cookies
 var checkCookies = true;
 
 // Custom alert box
 function message(m) {
     $("#overlay").fadeIn(400);
     $("#message_container").fadeIn(400);
     $("#message_text").text(m);
 }
 
 // Close message box
 function closeMessage() {
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
 
 $(document).ready(function() {
     // Create a connection to firebase:
     var fireRef = new Firebase(FIREBASE_STRING);
 
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
         var name = $("#name_input").val();
         var login = $("#login_input").val();
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
         } else {
             message("You already recorded your attendance.");
             window.setTimeout(function() {
                 closeMessage();
             }, 1500)   
         }
         
     }
 
 
 })