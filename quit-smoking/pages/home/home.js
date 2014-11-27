(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            // TODO: Initialize the page here.

            //Registering the event handler for navigation to Settings.html.
            document.querySelector("#settings").onclick = function (args) {
                WinJS.Navigation.navigate("pages/settings/settings.html");
            };


            //Defining the Home namespace and exposing the next() function.
            WinJS.Namespace.define("Home", {
                total: this.total
            });

            //Calls total function after inputs and navigation here from Settings.js
            this.total();


            //If there is no configuration alerts the user.
            var check = document.getElementById("days").innerHTML;
            if (check === "--") {
                this.alert("Go to Settings for configuration");
            };


            //Preservation for aesthetic reasons.
            var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
            var preDays = roamingSettings.values["preDays"];
            var preNot = roamingSettings.values["preNot"];
            var preMoney = roamingSettings.values["preMoney"];
            var preMonth = roamingSettings.values["preMonth"];
            var preYear = roamingSettings.values["preYear"];

            if (preDays && preMonth && preYear && preMoney && preNot) {

                document.querySelector("#days").innerHTML = preDays;
                document.querySelector("#not").innerHTML = preNot;
                document.querySelector("#money").innerHTML = preMoney.toFixed(1);
                document.querySelector("#perMonth").innerHTML = preMonth.toFixed(1);
                document.querySelector("#inAYear").innerHTML = preYear.toFixed(1);

            }



        },

        //Function to navigate to Settings page.
        //navigateToSettings: function (eventInfo) {
        //    eventInfo.preventDefault();
        //    var link = eventInfo.target;
        //    WinJS.Navigation.navigate(link.href);
        //},

        //Function for Alert message.
        alert: function (message) {
            var msgBox = new Windows.UI.Popups.MessageDialog(message);
            msgBox.showAsync();
        },
        // total function practically is called after the user insert new inputs.
        total: function () {

            //Start
            //Getting the app data that stored in Settings page.
            var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
            var savedDay = roamingSettings.values["savedDay"];
            var savedMonth = roamingSettings.values["savedMonth"];
            var savedYear = roamingSettings.values["savedYear"];
            var savedCost = roamingSettings.values["savedCost"];
            var savedHowMany = roamingSettings.values["savedHowMany"];

            if (savedDay && savedMonth && savedYear && savedCost && savedHowMany) {


                var today = new Date();
                var todayDay = today.getDate();
                var todayMonth = today.getMonth() + 1; //January is 0!
                var todayYear = today.getFullYear();

                var daysDiff = Math.abs(todayDay - savedDay);
                var monthsDiff = Math.abs(todayMonth - savedMonth) * 30;
                var yearsDiff = Math.abs(todayYear - savedYear) * 365;
                var days = daysDiff + monthsDiff + yearsDiff + 1; //+1 in case of the user choose the same day and days variable equals 0.

                var cigarettesNotSmoked = days * savedHowMany;

                //Formatting the life saved output.
                var lifeSaved = cigarettesNotSmoked * 11;
                var rest = lifeSaved;

                var lifeYears = rest / 525960;
                if (lifeYears >= 1) {
                    rest = rest %= 525960;
                    document.querySelector("#lifeYears").innerHTML = lifeYears.toFixed(0) + " year(s)";
                };

                var lifeMonths = rest / 43830;
                if (lifeMonths >= 1) {
                    rest = rest %= 43830;
                    document.querySelector("#lifeMonths").innerHTML = lifeMonths.toFixed(0) + " month(s)";
                };

                var lifeDays = rest / 1440;
                if (lifeDays >= 1) {
                    rest = rest %= 1440;
                    document.querySelector("#lifeDays").innerHTML = lifeDays.toFixed(0) + " day(s)";
                };

                var hours = rest / 60;
                if (hours >= 1) {
                    rest = rest %= 60;
                    document.querySelector("#hours").innerHTML = hours.toFixed(0) + " hour(s)";
                };

                var min = rest
                if (min >= 1) {
                    document.querySelector("#min").innerHTML = min.toFixed(0) + " minute(s)";
                };

                //Calculation of Pivot-Money outputs.
                var moneySaved = cigarettesNotSmoked * (savedCost / 20);
                var moneyMonth = (savedCost / 20) * (savedHowMany * 30);
                var moneyYear = moneyMonth * 12;


                //Passing all the values to outputs.
                document.querySelector("#days").innerHTML = days;
                document.querySelector("#not").innerHTML = cigarettesNotSmoked;
                document.querySelector("#money").innerHTML = moneySaved.toFixed(1);
                document.querySelector("#perMonth").innerHTML = moneyMonth.toFixed(1);
                document.querySelector("#inAYear").innerHTML = moneyYear.toFixed(1);


                //If there is new calculation preserves the old values until calculation completes.
                var appData = Windows.Storage.ApplicationData.current;
                var roamingSettings = appData.roamingSettings;

                roamingSettings.values["preDays"] = days;
                roamingSettings.values["preNot"] = cigarettesNotSmoked;
                roamingSettings.values["preMoney"] = moneySaved;
                roamingSettings.values["preMonth"] = moneyMonth;
                roamingSettings.values["preYear"] = moneyYear;

            }

        }

    })

})();
