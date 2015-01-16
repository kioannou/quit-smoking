// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=329110
(function () {
    "use strict";

    var activation = Windows.ApplicationModel.Activation;
    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    //Registering the Resume event handler.
    Windows.UI.WebUI.WebUIApplication.addEventListener("resuming", resumingHandler, false);

    //application is activated.
    app.addEventListener("activated", function (args) {

        //Preserved this code because in line 44 halndles the "Splash screen" promise.
        if (args.detail.kind === activation.ActivationKind.launch) {


            //Application saves the previous execution state.
            WinJS.Application.sessionState.previousExecutionState =
                args.detail.previousExecutionState;


            //Registering VCD.
            var uri = new Windows.Foundation.Uri("ms-appx:///cortanaVoiceCommands.xml");
            var storageFile =
                Windows.Storage.StorageFile.getFileFromApplicationUriAsync(uri).then(
                // Success function.
                function (vcd) {
                    Windows.Media.SpeechRecognition.VoiceCommandManager.installCommandSetsFromStorageFileAsync(vcd);
                },
                // Error function.
                function (err) {
                    WinJS.log && WinJS.log("File access failed.");
                });




            //Checks if the application relaunched while already running. 
            //If so it delays 2000 ms the call of next() function for DOM to finish loading.
            if (typeof Home !== "undefined") {
                if (app.sessionState.previousExecutionState === 1) {
                    WinJS.Promise.timeout(1000).then(function () {
                        Home.total();
                    });

                }
                else {
                    WinJS.Promise.timeout(1000).then(function () {
                        Home.total();
                    });

                }
            };



            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Optimize the load of the application and while the splash screen is shown, execute high priority scheduled work.
            ui.disableAnimations();
            var p = ui.processAll().then(function () {
                return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
            });

            args.setPromise(p);


        }

        else if (args.detail.kind === activation.ActivationKind.voiceCommand) {
            // This application has been activated with a voice command.

            var speechRecognitionResult = args.detail.result;

            // Get the name of the voice command. 
            // For this example, we declare only one command.
            var voiceCommandName = speechRecognitionResult.rulePath[0];

            // Get the actual text spoken.
            var textSpoken =
                speechRecognitionResult.text !==
                undefined ? speechRecognitionResult.text : "EXCEPTION";

            // Get the value of Command/Navigate@Target.
            // Navigate is a required child element of the Command element. 
            // The Target attribute is optional and is typically used to 
            // specify the page that the app should navigate to when it launches. 
            // You can obtain the value of the Target attribute from the 
            // SpeechRecognitionSemanticInterpretation.Properties dictionary 
            // using the "NavigationTarget" key. 
            // For this example, we declare only one command with no target.
            var navigationTarget = speechRecognitionResult.semanticInterpretation.properties["NavigationTarget"][0];

            if (voiceCommandName === "showRecognition") {
                if (textSpoken.indexOf("Settings page") > -1) {
                    // Code for default recognition.
                    WinJS.Navigation.navigate("settings.html");
                }
                else if (textSpoken.indexOf("Start page") > -1) {
                    // Code for default recognition.
                }
            }
            else {
                // There is no match for the voice command name.
            }

            var messageDialog =
                new Windows.UI.Popups.MessageDialog(
                textSpoken, "Text spoken");
            messageDialog.showAsync();
        }



    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    //On resume this handler calls the next() function.
    function resumingHandler() {
        Home.total();

    };

    app.start();
})();
