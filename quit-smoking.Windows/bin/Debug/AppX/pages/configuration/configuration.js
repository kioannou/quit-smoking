// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/configuration/configuration.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            //Registering tapping calculate button
            WinJS.Utilities.query("button").listen("click", clickCalculateButton, false);

            //Registering event for the slider.
            document.getElementById("manyInput").addEventListener("change", rangeChanged, false);

            //Rendering the values if calculated.
            var appData = Windows.Storage.ApplicationData.current;
            var roamingSettings = appData.roamingSettings;

            var userLastDate = roamingSettings.values["userLastDate"];
            var cost = roamingSettings.values["cost"];
            var currency = roamingSettings.values["currency"];
            var numberPerDay = roamingSettings.values["numberPerDay"];

            if (userLastDate && cost && currency && numberPerDay) {

                
                document.getElementById("chosenDate").innerHTML = userLastDate;
                

                document.getElementById("costInput").value = cost;
                document.getElementById("currencySelect").value = currency;
                document.getElementById("manyInput").value = numberPerDay;
                document.getElementById("manyInputOut").innerHTML = numberPerDay;
            }

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    //Event for changing range.
    function rangeChanged() {
        var val = document.getElementById("manyInput").value;
        document.getElementById("manyInputOut").innerHTML = val;
    }


    //Event for clicking Calculation button.
    function clickCalculateButton(eventInfo) {

        //Calculating DAYS
        var datePicker = document.getElementById("datePick").winControl;
        var userDate = datePicker.current;
        var userDay = userDate.getDate();
        var userMonth = userDate.getMonth() + 1;
        var userYear = userDate.getFullYear();
       
        //Getting the COST input

        var cost = document.getElementById("costInput").value;

        //Getting CURRENCY 

        var currency = document.getElementById("currencySelect").value;

        //Getting MANY

        var numberPerDay = document.getElementById("manyInput").value;

        //Storing the data
        
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        var userDateFormatted = monthNames[userDate.getMonth()] + " " + userDate.getDate() + " " + userDate.getFullYear();

        document.getElementById("chosenDate").innerHTML = userDateFormatted;

        var appData = Windows.Storage.ApplicationData.current;
        var roamingSettings = appData.roamingSettings;
        roamingSettings.values["userDay"] = userDay;
        roamingSettings.values["userMonth"] = userMonth;
        roamingSettings.values["userYear"] = userYear;
        roamingSettings.values["cost"] = cost;
        roamingSettings.values["currency"] = currency;
        roamingSettings.values["numberPerDay"] = numberPerDay;
        roamingSettings.values["userLastDate"] = userDateFormatted;


        if (cost === "") {

            var msgBox = new Windows.UI.Popups.MessageDialog("Packet's cost field is empty.");

            msgBox.showAsync();

        } else if (isNaN(cost)) {

            var msgBox = new Windows.UI.Popups.MessageDialog("You have to put a number in packet's cost field.");

            msgBox.showAsync();

        } else {
            WinJS.Navigation.navigate("../pages/statistics/statistics.html");
        }
        

    }
})();
