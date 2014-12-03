// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/settings/settings.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            //If the values of Settings.js are defined the values are preserved
            var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
            var savedDay = roamingSettings.values["savedDay"];
            var savedMonth = roamingSettings.values["savedMonth"];
            var savedYear = roamingSettings.values["savedYear"];
            var savedCost = roamingSettings.values["savedCost"];
            var savedHowMany = roamingSettings.values["savedHowMany"];
            var currency = roamingSettings.values["savedCurrency"];

            document.getElementById("currency").value = currency;

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
                document.getElementById("slider").value = howMany;
                document.getElementById("out").innerHTML = howMany;
               
            }

            //Registering the event handler of Calculate button.
            WinJS.Utilities.query("#calculate").listen("click", this.newValues.bind(this), false);

            //Input range for how many cigarettes the user used to smoke.
            var slider = document.getElementById("slider");
            slider.addEventListener("change", this.rangeChanged, false);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        },


        //Alert function.
        alert: function (message) {
            var msgBox = new Windows.UI.Popups.MessageDialog(message);
            msgBox.showAsync();
        },

        //Event for changing the valur of the slider.
        rangeChanged: function (eventInfo) {
            var val = document.getElementById("slider").value;
            document.getElementById("out").innerHTML = val;
        },

        //Navigation to Home.js
        newValues: function (eventInfo) {
            var userDay = document.getElementById("day").value;
            var userMonth = document.getElementById("month").value;
            var userYear = document.getElementById("year").value;
            var costOfAPacket = document.getElementById("cost").value;
            var howMany = document.getElementById("slider").value;
            var currency = document.getElementById("currency").value;

            var today = new Date();
            var year = today.getFullYear();
            var month = today.getMonth() + 1;//The month start from 0 so we add +1
            var day = today.getDate();
           
            if (isNaN(costOfAPacket)) {
                eventInfo.preventDefault();
                this.alert("You have to input a NUMBER in the Cost of a packet field!");
            }
           
            else if (costOfAPacket == "") {
                eventInfo.preventDefault();
                this.alert("The cost input is empty");
            }
            else if (userYear > year) {
                eventInfo.preventDefault();
                this.alert("Invalid year!");
            }
            else if (userYear == year && userMonth > month) {
                eventInfo.preventDefault();
                this.alert("Invalid month!");
            }
            else if (userYear == year && userMonth == month && userDay > day) {
                eventInfo.preventDefault();
                this.alert("Invalid day!");
            }
            else {


                //Using the Application Data object for the roamingSettings property to save the app data.
                var appData = Windows.Storage.ApplicationData.current;
                var roamingSettings = appData.roamingSettings;

                roamingSettings.values["savedDay"] = userDay;
                roamingSettings.values["savedMonth"] = userMonth;
                roamingSettings.values["savedYear"] = userYear;
                roamingSettings.values["savedCost"] = costOfAPacket;
                roamingSettings.values["savedHowMany"] = howMany;
                roamingSettings.values["savedCurrency"] = currency;
                //Navigation to Home.html after all calculations are done.

                //eventInfo.preventDefault();
                //var link = eventInfo.target;
                //WinJS.Navigation.navigate(link.href);

                WinJS.Navigation.navigate("pages/home/home.html");


            }
        }


    });


})();