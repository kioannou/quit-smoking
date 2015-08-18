// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // Add your initialization code here.
            } else {
                // Restore app state here.
            }

            var start = WinJS.UI.processAll().
                then(function () {
                    return nav.navigate("/pages/statistics/statistics.html");
                });

            args.setPromise(start);
        }
    };

    app.oncheckpoint = function (args) {
        // Add app suspension code here.
    };

    nav.onnavigated = function (evt) {
        var contentHost =
            document.body.querySelector("#contentHost"),
            url = evt.detail.location;

        // Remove existing content from the host element.
        WinJS.Utilities.empty(contentHost);

        // Display the new page in the content host.
        WinJS.UI.Pages.render(url, contentHost);
    }

    app.start();
})();
