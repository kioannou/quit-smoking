(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            // TODO: Initialize the page here.

            //Registering the event handler for navigation to Settings.html.
            WinJS.Utilities.query("a").listen("click", this.navigateToSettings, false);

            //Defining the Home namespace and exposing the total() function.
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

            //Registering event handler for clicking a motivation List item.
            var list = document.getElementById("motivationListView");

            list.itemDataSource = MotivationData.motivationList.dataSource;

            list.addEventListener("iteminvoked", this.tapitem, false);

            WinJS.UI.processAll();

            //Preservation for aesthetic reasons.
            //var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
            //var preDays = roamingSettings.values["preDays"];
            //var preNot = roamingSettings.values["preNot"];
            //var preMoney = roamingSettings.values["preMoney"];
            //var preMonth = roamingSettings.values["preMonth"];
            //var preYear = roamingSettings.values["preYear"];
            //var currency = roamingSettings.values["savedCurrency"];
            
            //if (preDays && preMonth && preYear && preMoney && preNot) {

            //    document.querySelector("#days").innerHTML = preDays;
            //    document.querySelector("#not").innerHTML = preNot;
            //    document.querySelector("#money").innerHTML = preMoney.toFixed(1) + " " + currency;
            //    document.querySelector("#perMonth").innerHTML = preMonth.toFixed(1) + " " + currency;
            //    document.querySelector("#inAYear").innerHTML = preYear.toFixed(1) + " " + currency;

            //}



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
                //Shame on this part of code but it was necessery 
                if (days >= 3652) {
                    document.querySelector("#twelve").setAttribute("class", "achieved");
                    document.querySelector("#oned").setAttribute("class", "achieved");
                    document.querySelector("#threed").setAttribute("class", "achieved");
                    document.querySelector("#fived").setAttribute("class", "achieved");
                    document.querySelector("#tend").setAttribute("class", "achieved");
                    document.querySelector("#fifteend").setAttribute("class", "achieved");
                    document.querySelector("#twentyd").setAttribute("class", "achieved");
                    document.querySelector("#onem").setAttribute("class", "achieved");
                    document.querySelector("#threem").setAttribute("class", "achieved");
                    document.querySelector("#sevenm").setAttribute("class", "achieved");
                    document.querySelector("#oney").setAttribute("class", "achieved");
                    document.querySelector("#fivey").setAttribute("class", "achieved");
                    document.querySelector("#teny").removeAttribute("class", "achieved");
                }
                else if(days<3652 && days>=1826){
                    
                    document.querySelector("#twelve").setAttribute("class", "achieved");
                    document.querySelector("#oned").setAttribute("class", "achieved");
                    document.querySelector("#threed").setAttribute("class", "achieved");
                    document.querySelector("#fived").setAttribute("class", "achieved");
                    document.querySelector("#tend").setAttribute("class", "achieved");
                    document.querySelector("#fifteend").setAttribute("class", "achieved");
                    document.querySelector("#twentyd").setAttribute("class", "achieved");
                    document.querySelector("#onem").setAttribute("class", "achieved");
                    document.querySelector("#threem").setAttribute("class", "achieved");
                    document.querySelector("#sevenm").setAttribute("class", "achieved");
                    document.querySelector("#oney").setAttribute("class", "achieved");
                    document.querySelector("#fivey").setAttribute("class", "achieved");
                }
                else if (days < 1826 && days >= 365) {
                    
                    document.querySelector("#twelve").setAttribute("class", "achieved");
                    document.querySelector("#oned").setAttribute("class", "achieved");
                    document.querySelector("#threed").setAttribute("class", "achieved");
                    document.querySelector("#fived").setAttribute("class", "achieved");
                    document.querySelector("#tend").setAttribute("class", "achieved");
                    document.querySelector("#fifteend").setAttribute("class", "achieved");
                    document.querySelector("#twentyd").setAttribute("class", "achieved");
                    document.querySelector("#onem").setAttribute("class", "achieved");
                    document.querySelector("#threem").setAttribute("class", "achieved");
                    document.querySelector("#sevenm").setAttribute("class", "achieved");
                    document.querySelector("#oney").setAttribute("class", "achieved");
                }
                else if (days < 365 && days >= 213) {
                   
                    document.querySelector("#twelve").setAttribute("class", "achieved");
                    document.querySelector("#oned").setAttribute("class", "achieved");
                    document.querySelector("#threed").setAttribute("class", "achieved");
                    document.querySelector("#fived").setAttribute("class", "achieved");
                    document.querySelector("#tend").setAttribute("class", "achieved");
                    document.querySelector("#fifteend").setAttribute("class", "achieved");
                    document.querySelector("#twentyd").setAttribute("class", "achieved");
                    document.querySelector("#onem").setAttribute("class", "achieved");
                    document.querySelector("#threem").setAttribute("class", "achieved");
                    document.querySelector("#sevenm").setAttribute("class", "achieved");
                }
                else if (days < 213 && days >= 92) {
                    
                    document.querySelector("#twelve").setAttribute("class", "achieved");
                    document.querySelector("#oned").setAttribute("class", "achieved");
                    document.querySelector("#threed").setAttribute("class", "achieved");
                    document.querySelector("#fived").setAttribute("class", "achieved");
                    document.querySelector("#tend").setAttribute("class", "achieved");
                    document.querySelector("#fifteend").setAttribute("class", "achieved");
                    document.querySelector("#twentyd").setAttribute("class", "achieved");
                    document.querySelector("#onem").setAttribute("class", "achieved");
                    document.querySelector("#threem").setAttribute("class", "achieved");
                }
                else if (days < 92 && days >= 32) {
                    
                    document.querySelector("#twelve").setAttribute("class", "achieved");
                    document.querySelector("#oned").setAttribute("class", "achieved");
                    document.querySelector("#threed").setAttribute("class", "achieved");
                    document.querySelector("#fived").setAttribute("class", "achieved");
                    document.querySelector("#tend").setAttribute("class", "achieved");
                    document.querySelector("#fifteend").setAttribute("class", "achieved");
                    document.querySelector("#twentyd").setAttribute("class", "achieved");
                    document.querySelector("#onem").setAttribute("class", "achieved");
                }
                else if (days < 32 && days >= 21) {
                    document.querySelector("#twelve").setAttribute("class", "achieved");
                    document.querySelector("#oned").setAttribute("class", "achieved");
                    document.querySelector("#threed").setAttribute("class", "achieved");
                    document.querySelector("#fived").setAttribute("class", "achieved");
                    document.querySelector("#tend").setAttribute("class", "achieved");
                    document.querySelector("#fifteend").setAttribute("class", "achieved");
                    document.querySelector("#twentyd").setAttribute("class", "achieved");
                    
                }
                else if (days < 21 && days >= 16) {
                    document.querySelector("#twelve").setAttribute("class", "achieved");
                    document.querySelector("#oned").setAttribute("class", "achieved");
                    document.querySelector("#threed").setAttribute("class", "achieved");
                    document.querySelector("#fived").setAttribute("class", "achieved");
                    document.querySelector("#tend").setAttribute("class", "achieved");
                    document.querySelector("#fifteend").setAttribute("class", "achieved");
                }
                else if (days < 16 && days >= 11) {
                    document.querySelector("#twelve").setAttribute("class", "achieved");
                    document.querySelector("#oned").setAttribute("class", "achieved");
                    document.querySelector("#threed").setAttribute("class", "achieved");
                    document.querySelector("#fived").setAttribute("class", "achieved");
                    document.querySelector("#tend").setAttribute("class", "achieved");
                }
                else if (days < 11 && days >= 6) {
                    document.querySelector("#twelve").setAttribute("class", "achieved");
                    document.querySelector("#oned").setAttribute("class", "achieved");
                    document.querySelector("#threed").setAttribute("class", "achieved");
                    document.querySelector("#fived").setAttribute("class", "achieved");
                }
                else if (days < 6 && days >= 4) {
                    document.querySelector("#twelve").setAttribute("class", "achieved");
                    document.querySelector("#oned").setAttribute("class", "achieved");
                    document.querySelector("#threed").setAttribute("class", "achieved");
                }
                else if (days < 4 && days >= 2) {
                    document.querySelector("#twelve").setAttribute("class", "achieved");
                    document.querySelector("#oned").setAttribute("class", "achieved");
                }
                else if (days < 2 && days >= 1) {
                    
                    document.querySelector("#twelve").setAttribute("class", "achieved");
                }

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
