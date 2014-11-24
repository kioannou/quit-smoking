(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            // TODO: Initialize the page here.

            //Registering the event handler for navigation to Settings.html.
            WinJS.Utilities.query("a").listen("click", this.navigateToSettings, false);

            //Defining the Home namespace and exposing the next() function.
            WinJS.Namespace.define("Home", {
                next: this.next
            });


            //Calls total function after inputs and navigation here from Settings.js
            this.total();
        },

        //Function to navigate to Settings page.
        navigateToSettings : function (eventInfo) {
            eventInfo.preventDefault();
            var link = eventInfo.target;
            WinJS.Navigation.navigate(link.href);
        },
       
        //Function for Alert message.
        alert: function (message) {
            var msgBox = new Windows.UI.Popups.MessageDialog(message);
            msgBox.showAsync();
        },
        // total function practically is called after the user insert new inputs.
        total: function () {

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
                var days = daysDiff + monthsDiff + yearsDiff;

                var cigarettesNotSmoked = days * savedHowMany;
                var lifeSaved = cigarettesNotSmoked * 11;
                var moneySaved = cigarettesNotSmoked * (savedCost / 20);
                var moneyMonth = (savedCost / 20) * (savedHowMany * 30);
                var moneyYear = moneyMonth * 12;

                document.getElementById("days").innerHTML = days;
                document.getElementById("not").innerHTML = cigarettesNotSmoked;
                document.getElementById("life").innerHTML = lifeSaved;
                document.getElementById("money").innerHTML = moneySaved;
                document.getElementById("perMonth").innerHTML = moneyMonth;
                document.getElementById("inAYear").innerHTML = moneyYear;



            } else {

                this.alert("Go to Settings for configuration");
            }
        },

        next: function () {

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
                var days = daysDiff + monthsDiff + yearsDiff;

                var cigarettesNotSmoked = days * savedHowMany;
                var lifeSaved = cigarettesNotSmoked * 11;
                var moneySaved = cigarettesNotSmoked * (savedCost / 20);
                var moneyMonth = (savedCost / 20) * (savedHowMany * 30);
                var moneyYear = moneyMonth * 12;


                
                document.getElementById("days").innerHTML = days;
                document.getElementById("not").innerHTML = cigarettesNotSmoked;
                document.getElementById("life").innerHTML = lifeSaved;
                document.getElementById("money").innerHTML = moneySaved;
                document.getElementById("perMonth").innerHTML = moneyMonth;
                document.getElementById("inAYear").innerHTML = moneyYear;
            }
        }

       

        })

 })();
