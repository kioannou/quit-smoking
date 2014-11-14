(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            // TODO: Initialize the page here.
            WinJS.Utilities.query("a").listen("click", navigateToSettings, false);
            if (typeof Settings != "undefined") {
                var homeUserDay = Settings.userDay;
                var homeUserMonth = Settings.userMonth;
                var homeUserYear = Settings.userYear;
                var homeCostOfAPacket = Settings.costOfAPacket;
                var homeHowMany = Settings.howMany;


                

            } else {
                alert("Go to Settings for configuration")
            }

        },

       
    });

    function navigateToSettings(eventInfo) {
        eventInfo.preventDefault();
        var link = eventInfo.target;
        WinJS.Navigation.navigate(link.href);
    }

    function alert(message) {
        var msgBox = new Windows.UI.Popups.MessageDialog(message);
        msgBox.showAsync();
    }


})();
