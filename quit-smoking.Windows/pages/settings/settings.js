// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/settings/settings.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            //Registering tapping calculate button
            WinJS.Utilities.query("button").listen("click", clickCalculateButton, false);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    function clickCalculateButton(eventInfo) {

        //Calculating DAYS
        var datePicker = document.getElementById("datePick").winControl;
        var userDate = datePicker.current;
        var userDay = userDate.getDate();
        var userMonth = userDate.getMonth();
        var userYear = userDate.getFullYear();

        //Getting the COST input

        var cost = document.getElementById("costInput").value;

        //Getting CURRENCY 

        var currency = document.getElementById("currencySelect").value;

        //Getting MANY

        var numberPerDay = document.getElementById("manyInput").value;

        //Storing the data

        var appData = Windows.Storage.ApplicationData.current;
        var roamingSettings = appData.roamingSettings;
        roamingSettings.values["userDay"] = userDay;
        roamingSettings.values["userMonth"] = userMonth;
        roamingSettings.values["userYear"] = userYear;
        roamingSettings.values["cost"] = cost;
        roamingSettings.values["currency"] = currency;
        roamingSettings.values["numberPerDay"] = numberPerDay;



        //Navigates BACK
        WinJS.Navigation.back();

    }
})();
