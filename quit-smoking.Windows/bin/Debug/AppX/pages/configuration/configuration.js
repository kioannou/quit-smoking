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
           //Formatting and saving date that calculation is base on.
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


        //Checking for valid inputs.
        if (cost === "") {

            var msgBox = new Windows.UI.Popups.MessageDialog("Packet's cost field is empty.");

            msgBox.showAsync();

        } else if (isNaN(cost)) {

            var msgBox = new Windows.UI.Popups.MessageDialog("You have to put a number in packet's cost field.");

            msgBox.showAsync();

        } else {
            //INSTANT TILE.

            //Calculations for instant tile.
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
            var cigarettesNotSmoked = days * numberPerDay;
            //Saved money for live tile.
            var moneySaved = cigarettesNotSmoked * (cost / 20);

            //START CREATING TILE
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
            tileTextAttributes[0].appendChild(tileXml.createTextNode("Days: " + days));
            tileTextAttributes[1].appendChild(tileXml.createTextNode("Cigs: " + cigarettesNotSmoked));
            tileTextAttributes[2].appendChild(tileXml.createTextNode("Money: " + moneySaved + currency));
            tileTextAttributes[3].appendChild(tileXml.createTextNode("Achieved: " + numberOfAchievements + "/12"));

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

            //Large version of tile.

            var largeTemplate = notifications.TileTemplateType.tileSquare310x310TextList01;
            var largeTileXml = notifications.TileUpdateManager.getTemplateContent(largeTemplate);
            var largeTextAttributes = largeTileXml.getElementsByTagName("text");
            largeTextAttributes[0].appendChild(largeTileXml.createTextNode("Days passed: " + days));
            largeTextAttributes[1].appendChild(largeTileXml.createTextNode("Achievements: " + numberOfAchievements + "/12"));
            largeTextAttributes[2].appendChild(largeTileXml.createTextNode("Next achievement in " + res + " day(s)"));

            var lastDate = roamingSettings.values["userLastDate"];
            largeTextAttributes[3].appendChild(largeTileXml.createTextNode("Avoided " + cigarettesNotSmoked + " cigs"));
            largeTextAttributes[4].appendChild(largeTileXml.createTextNode("Date you quitted: " + lastDate));
            //largeTextAttributes[5].appendChild(largeTileXml.createTextNode("jhjh"));


            var monthly = (cost / 20) * (numberPerDay * 30);
            largeTextAttributes[6].appendChild(largeTileXml.createTextNode("Money: " + moneySaved + currency));
            largeTextAttributes[7].appendChild(largeTileXml.createTextNode("Monthly: " + monthly + currency));
            largeTextAttributes[8].appendChild(largeTileXml.createTextNode("Yearly: " + monthly * 12 + currency));

            var node = tileXml.importNode(largeTileXml.getElementsByTagName("binding").item(0), true);
            tileXml.getElementsByTagName("visual").item(0).appendChild(node);

            //Create the notification based on the XML content you've specified.
            var tileNotification = new notifications.TileNotification(tileXml);

            //Send the update !!!
            notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);


            //Creating and initialize the flag variable for toast notifications.
            var flag = 0;
            roamingSettings.values["theFlag"] = flag;

            //Navigation to statistics.
            WinJS.Navigation.navigate("../pages/statistics/statistics.html");
        }
        

    }
})();
