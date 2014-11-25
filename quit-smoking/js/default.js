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

            //Checks if the application relaunched while already running. 
            //If so it delays 1300 ms the call of next() function for DOM to finish loading.
            if (typeof Home !== "undefined") {
                if (app.sessionState.previousExecutionState === 1) {
                    WinJS.Promise.timeout(1300).then(function () {
                        Home.total();
                    });
                }
                else {
                    Home.total();
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
