// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/statistics/statistics.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            //Check if there is new instance of the app.
           
            var helpButton = document.getElementById("helpButton");
            helpButton.addEventListener("click", helpClick, false);

            //Calls total() function.

            total();

            //Background Task

            initTask();

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    }); 

    //Function for clicking help.
    function helpClick() {

        var helpButtonFly = document.getElementById("helpButton");
        document.getElementById("helpFlyOut").winControl.show(helpButtonFly);
    }

    //Function total() the main function of my app.
    function total() {

        //Retrieve the saved data.
        var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

        var savedDay = roamingSettings.values["userDay"];
        var savedMonth = roamingSettings.values["userMonth"];
        var savedYear = roamingSettings.values["userYear"];
        var savedCost = roamingSettings.values["cost"];
        var savedCurrency = roamingSettings.values["currency"];
        var savedHowMany = roamingSettings.values["numberPerDay"];

        var lastDate = roamingSettings.values["userLastDate"];

        if (savedDay && savedMonth && savedYear && savedCost && savedHowMany) {


            var today = new Date();
            var todayDay = today.getDate();
            var todayMonth = today.getMonth() + 1;//January is 0!
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

            //Passing all the values to outputs.
            document.querySelector("#howDaysOut").innerHTML = days;
            document.querySelector("#howCigsOut").innerHTML = cigarettesNotSmoked;
            document.querySelector("#howMoneyOut").innerHTML = moneySaved.toFixed(1) + " " + savedCurrency;
            document.querySelector("#howMonthOut").innerHTML = moneyMonth.toFixed(1) + " " + savedCurrency;
            document.querySelector("#howYearOut").innerHTML = moneyYear.toFixed(1) + " " + savedCurrency;
            document.getElementById("unlockedOut").innerHTML = numberOfAchievements;
            document.getElementById("nextOut").innerHTML = res+" Day(s)";
            document.getElementById("dateOut").innerHTML = lastDate;
        }
    }

    //Background Task
    var back = Windows.ApplicationModel.Background;

    function isTaskRunning(name) {
        var iter = back.BackgroundTaskRegistration.allTasks.first();
        var hascur = iter.hasCurrent;
        while (hascur) {
            var cur = iter.current.value;
            if (cur.name == name) {
                return true;
            }
            hascur = iter.moveNext();
        }
        return false;
    }

    function registerTask(taskName, taskFileName, trigger) {
        if (isTaskRunning(taskName)) {
            return;
        }
        var builder = new back.BackgroundTaskBuilder();
        builder.name = taskName;
        builder.taskEntryPoint = taskFileName;
        builder.setTrigger(trigger);

        back.BackgroundExecutionManager.requestAccessAsync();
        var backgroundTaskRegistration = builder.register();
    }

    function initTask() {

        var userCondition = new Windows.ApplicationModel.Background.SystemCondition(Windows.ApplicationModel.Background.SystemConditionType.userNotPresent);

        var hourlyTrigger = new Windows.ApplicationModel.Background.TimeTrigger(30, false);

        registerTask("AppUpdater", "js\\backgroundtimer.js", hourlyTrigger);

    }



})();
