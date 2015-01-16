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

                //LIVE TILE---------------------------------------------------------------------------------------
                var today = new Date();
                var todayDay = today.getDate();
                var todayMonth = today.getMonth() + 1; //January is 0!
                var todayYear = today.getFullYear();

                var daysDiff = Math.abs(todayDay - userDay);
                var monthsDiff = Math.abs(todayMonth - userMonth) * 30;
                var yearsDiff = Math.abs(todayYear - userYear) * 365;
                //Days for live tile.
                var days = daysDiff + monthsDiff + yearsDiff + 1; //+1 in case of the user choose the same day and days variable equals 0.
                //How many cigarettes for live tile.
                var cigarettesNotSmoked = days * howMany;
                //Saved money for live tile.
                var moneySaved = cigarettesNotSmoked * (costOfAPacket / 20);



                //Start making the tile.
                var notifications = Windows.UI.Notifications;

                var template = notifications.TileTemplateType.tileSquareText03;
                var tileXml = notifications.TileUpdateManager.getTemplateContent(template);

                //Number of achievements mechanism.
                var numberOfAchievements = 1;
                var flat = 0;

                if (days <= 3) {
                    flat = 3;
                    numberOfAchievements = 1;
                } else if (days < 5) {
                    flat = 5;
                    numberOfAchievements = 2;
                } else if (days < 10) {
                    flat = 10;
                    numberOfAchievements = 3;
                } else if (days < 15) {
                    flat = 15;
                    numberOfAchievements = 4;
                } else if (days < 21) {
                    flat = 21;
                    numberOfAchievements = 5;
                } else if (days < 32) {
                    flat = 32;
                    numberOfAchievements = 6;
                } else if (days < 92) {
                    flat = 92;
                    numberOfAchievements = 7;
                } else if (days < 213) {
                    flat = 213;
                    numberOfAchievements = 8;
                } else if (days < 365) {
                    flat = 365;
                    numberOfAchievements = 9;
                } else if (days < 1826) {
                    flat = 1826;
                    numberOfAchievements = 10;
                } else if (days < 3652) {
                    flat = 3652;
                    numberOfAchievements = 11;
                } else {
                    numberOfAchievements = 12;
                };

                var res = flat - days;

                //How the tile should look like.
                var tileTextAttributes = tileXml.getElementsByTagName("text");
                tileTextAttributes[0].appendChild(tileXml.createTextNode("Smoke free: " + days + " days."));
                tileTextAttributes[1].appendChild(tileXml.createTextNode("Cigs avoided: " + cigarettesNotSmoked));
                tileTextAttributes[2].appendChild(tileXml.createTextNode("Money saved: " + moneySaved + currency));
                tileTextAttributes[3].appendChild(tileXml.createTextNode("Achievements: " + numberOfAchievements + "/12"));

                //Wide version of the tile.

                var wideTemplate = notifications.TileTemplateType.tileWideText05;
                var wideTileXml = notifications.TileUpdateManager.getTemplateContent(wideTemplate);
                var wideTileTextAttributes = wideTileXml.getElementsByTagName("text");
                wideTileTextAttributes[0].appendChild(wideTileXml.createTextNode("You haven't smoked for " + days + " days."));
                wideTileTextAttributes[1].appendChild(wideTileXml.createTextNode("You haven't smoked " + cigarettesNotSmoked + " cigarettes."));
                wideTileTextAttributes[2].appendChild(wideTileXml.createTextNode("You have saved " + moneySaved + currency + " so far."));
                wideTileTextAttributes[4].appendChild(wideTileXml.createTextNode("Next achievement in " + res + " day(s)."));
                wideTileTextAttributes[3].appendChild(wideTileXml.createTextNode("Achievements: " + numberOfAchievements + "/12"));

                var node = tileXml.importNode(wideTileXml.getElementsByTagName("binding").item(0), true);
                tileXml.getElementsByTagName("visual").item(0).appendChild(node);

                //Create the notification based on the XML content you've specified.
                var tileNotification = new notifications.TileNotification(tileXml);

                //Send the update !!!
                notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);

                //End ---> Navigating to Home.html
                WinJS.Navigation.navigate("pages/home/home.html");


            }
        }


    });

})();