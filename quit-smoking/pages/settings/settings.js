// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/settings/settings.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var calculateButton = document.getElementById("calculateButton");
            calculateButton.addEventListener("click", getTheSettingsValues, false);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }

        

    });

    function getTheSettingsValues() {
        var userDay = setUserDay();
        var userMonth = setUserMonth();
        var userYear = setUserYear();
        var costOfAPacket = document.getElementById("cost").value;
        var howMany = document.getElementById("many").value;

        if (isNaN(costOfAPacket) && isNaN(howMany)) {
            alert("You have to input a NUMBER in the Cost of a packet and How many cigarettes per day fields!");
        }
        else if(isNaN(costOfAPacket)){
            alert("You have to input a NUMBER in the Cost of a packet field!");
        }
        else if (isNaN(howMany)) {
            alert("You have to input a NUMBER in How many cigarettes per day field!");
        }
        else {

            var settingsExposer = {
                userDay: userDay,
                userMonth: userMonth,
                userYear: userYear,
                costOfAPacket: costOfAPacket,
                howMany: howMany


            };

            WinJS.Namespace.define("Settings", settingsExposer);
        }

        
    };

    function setUserDay() {
        var userDayIF = document.getElementById("day").value;
        return userDayIF;
    };

    function setUserMonth() {
        var userMonthIF = document.getElementById("month").value;
        return userMonthIF;
    };

    function setUserYear() {
        var userYearIF = document.getElementById("day").value;
        return userYearIF;
    };

    function alert(message) {
        var msgBox = new Windows.UI.Popups.MessageDialog(message);
        msgBox.showAsync();
    }


    
    /*function calculation() {
        

        var userMonth = document.getElementById("month").value;

        var userYear = document.getElementById("year").value;

        var today = new Date();
        var todayDay = today.getDate();
        var todayMonth = today.getMonth()+1; //January is 0!
        var todayYear = today.getFullYear();

        var days = (Math.abs(todayDay-userDay))+(Math.abs(todayMonth-userMonth))*30+(Math.abs(todayYear-userYear))*365;

        
    };*/
    

})();
