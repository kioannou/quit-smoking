// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/settings/settings.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
            var savedDay = roamingSettings.values["savedDay"];
            var savedMonth = roamingSettings.values["savedMonth"];
            var savedYear = roamingSettings.values["savedYear"];
            var savedCost = roamingSettings.values["savedCost"];
            var savedHowMany = roamingSettings.values["savedHowMany"];

            if (savedDay && savedMonth && savedYear && savedCost && savedHowMany) {
                var userDay = savedDay;
                var userMonth = savedMonth;
                var userYear = savedYear;
                var costOfAPacket = savedCost;
                var howMany = savedHowMany;

                document.getElementById("day").value = userDay;
                document.getElementById("month").value = userMonth;
                document.getElementById("year").value = userYear;
                document.getElementById("cost").value = costOfAPacket;
                document.getElementById("many").value = howMany;

            }
            
          
            WinJS.Utilities.query("a").listen("click", newValues, false);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }



    });

    //Alert function
    function alert(message) {
        var msgBox = new Windows.UI.Popups.MessageDialog(message);
        msgBox.showAsync();
    }

    //Navigation to Home.js
    function newValues(eventInfo) {
        var flag = false;
        var userDay = document.getElementById("day").value;
        var userMonth = document.getElementById("month").value;
        var userYear = document.getElementById("year").value;
        var costOfAPacket = document.getElementById("cost").value;
        var howMany = document.getElementById("many").value;


       if (isNaN(costOfAPacket) && isNaN(howMany)) {
            eventInfo.preventDefault();
            alert("You have to input a NUMBER in the Cost of a packet and How many cigarettes per day fields!");
        }
        else if (isNaN(costOfAPacket)) {
            eventInfo.preventDefault();
            alert("You have to input a NUMBER in the Cost of a packet field!");
        }
        else if (isNaN(howMany)) {
            eventInfo.preventDefault();
            alert("You have to input a NUMBER in How many cigarettes per day field!");
        }
        else if (costOfAPacket == "" && howMany == "") {
            eventInfo.preventDefault();
            alert("You have to put numbers in the following inputs");
        }
        else if (costOfAPacket == "") {
            eventInfo.preventDefault();
            alert("The cost input is empty");
        }
        else if (howMany == "") {
            eventInfo.preventDefault();
            alert("The how many input is empty");
        }
        else {
            var flag = true;
            var settingsExposer = {
                userDay: userDay,
                userMonth: userMonth,
                userYear: userYear,
                costOfAPacket: costOfAPacket,
                howMany: howMany,
                flag: flag


            };

            WinJS.Namespace.define("Settings", settingsExposer);

            //Using the Application Data object for the roamingSettings property to save the app data
            var appData = Windows.Storage.ApplicationData.current;
            var roamingSettings = appData.roamingSettings;

            roamingSettings.values["savedDay"] = userDay;
            roamingSettings.values["savedMonth"] = userMonth;
            roamingSettings.values["savedYear"] = userYear;
            roamingSettings.values["SavedCost"] = costOfAPacket;
            roamingSettings.values["savedHowMany"] = howMany;
           
            //Navigation to Home.html after all calculations are done

            eventInfo.preventDefault();
            var link = eventInfo.target;
            WinJS.Navigation.navigate(link.href);
        }



    };


})();