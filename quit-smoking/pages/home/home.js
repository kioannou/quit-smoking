(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            // TODO: Initialize the page here.

            //Registering the event handler for navigation to Settings.html.
            WinJS.Utilities.query("a").listen("click", this.navigateToSettings, false);

            WinJS.Utilities.query("#helpButton").listen("click", helpDialog, false);

            //Defining the Home namespace and exposing the total() function.
            WinJS.Namespace.define("Home", {
                total: this.total
            });

            //Calls total function after inputs and navigation here from Settings.js
            this.total();


            

            //Registering event handler for clicking a motivation List item.
            var list = document.getElementById("motivationListView");

            list.itemDataSource = MotivationData.motivationList.dataSource;

            list.addEventListener("iteminvoked", this.tapitem, false);

            //Registering the background task


            initTask();

            
            WinJS.UI.processAll();



        },
        //Event handler when a list item is clicked. The function gets all values associated with the clicked item and pass
        //then to motivation.js when navigating
        tapitem: function (args) {
            var title = MotivationData.motivationList.getAt(args.detail.itemIndex).title;
            var t1 = MotivationData.motivationList.getAt(args.detail.itemIndex).t1;
            var pro = MotivationData.motivationList.getAt(args.detail.itemIndex).pro;
            var t2 = MotivationData.motivationList.getAt(args.detail.itemIndex).t2;
            var main = MotivationData.motivationList.getAt(args.detail.itemIndex).main;
            var t3 = MotivationData.motivationList.getAt(args.detail.itemIndex).t3;
            var epi = MotivationData.motivationList.getAt(args.detail.itemIndex).epi;

            WinJS.Navigation.navigate("/pages/motivation/motivation.html", { title: title, t1: t1, pro: pro, t2: t2, main: main, t3: t3, epi: epi });

            
        },

        //Function to navigate to Settings page.
        navigateToSettings: function (eventInfo) {
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

            //Start
            //Getting the app data that stored in Settings page.
            var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
            var savedDay = roamingSettings.values["savedDay"];
            var savedMonth = roamingSettings.values["savedMonth"];
            var savedYear = roamingSettings.values["savedYear"];
            var savedCost = roamingSettings.values["savedCost"];
            var savedHowMany = roamingSettings.values["savedHowMany"];
            var currency = roamingSettings.values["savedCurrency"];

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
                document.querySelector("#money").innerHTML = moneySaved.toFixed(1) + " " + currency;
                document.querySelector("#perMonth").innerHTML = moneyMonth.toFixed(1) + " " + currency;
                document.querySelector("#inAYear").innerHTML = moneyYear.toFixed(1) + " " + currency;

                //Health Achievements

                for (var i = 0; i < 12 ; i++) {
                    var item = HealthData.healthList.getAt(i);
                    
                    if (item.value <= days) {
                        item.seed = "ACHIEVED";
                    } else {
                        var indays = item.value - days;
                        item.seed = "In " + indays + " day(s)";
                    }
                };

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

    function helpDialog() {
        var msgBoxhelp = new Windows.UI.Popups.MessageDialog("For a new configuration go to Settings.");
        msgBoxhelp.showAsync();
    }


})();
