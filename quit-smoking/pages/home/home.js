(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            // TODO: Initialize the page here.

            //Registering the event handler for navigation to Settings.html
            WinJS.Utilities.query("a").listen("click", this.navigateToSettings, false);

            //Restore the app data
            var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
            var savedDay = roamingSettings.values["savedDay"];
            var savedMonth = roamingSettings.values["savedMonth"];
            var savedYear = roamingSettings.values["savedYear"];
            var savedCost = roamingSettings.values["savedCost"];
            var savedHowMany = roamingSettings.values["savedHowMany"];


            if (typeof Settings != "undefined")

            {
                var homeUserDay = Settings.userDay;
                var homeUserMonth = Settings.userMonth;
                var homeUserYear = Settings.userYear;
                var homeCostOfAPacket = Settings.costOfAPacket;
                var homeHowMany = Settings.howMany;

                
                var days = this.DaysCalculation(homeUserDay, homeUserMonth, homeUserYear);
                var cigarettesNotSmoked = this.cigarettesNotSmokedCalculation(days, homeHowMany);
                var lifeSaved = cigarettesNotSmoked * 11;
                var moneySaved = this.moneySavedCalculation(cigarettesNotSmoked, homeCostOfAPacket);
                var moneyMonth = this.moneyMonthCalculation(homeCostOfAPacket, homeHowMany);
                var moneyYear = moneyMonth * 12;

                document.getElementById("days").innerHTML = days;
                document.getElementById("not").innerHTML = cigarettesNotSmoked;
                document.getElementById("life").innerHTML = lifeSaved;
                document.getElementById("money").innerHTML = moneySaved;
                document.getElementById("perMonth").innerHTML = moneyMonth;
                document.getElementById("inAYear").innerHTML = moneyYear;

            }else if (savedDay && savedMonth && savedYear && savedCost && savedHowMany){
                
               
                var homeUserDay = savedDay;
                var homeUserMonth = savedMonth;
                var homeUserYear = savedYear;
                var homeCostOfAPacket = savedCost;
                var homeHowMany = savedHowMany;


                var days = this.DaysCalculation(homeUserDay, homeUserMonth, homeUserYear);
                var cigarettesNotSmoked = this.cigarettesNotSmokedCalculation(days, homeHowMany);
                var lifeSaved = cigarettesNotSmoked * 11;
                var moneySaved = this.moneySavedCalculation(cigarettesNotSmoked, homeCostOfAPacket);
                var moneyMonth = this.moneyMonthCalculation(homeCostOfAPacket, homeHowMany);
                var moneyYear = moneyMonth * 12;

                document.getElementById("days").innerHTML = days;
                document.getElementById("not").innerHTML = cigarettesNotSmoked;
                document.getElementById("life").innerHTML = lifeSaved;
                document.getElementById("money").innerHTML = moneySaved;
                document.getElementById("perMonth").innerHTML = moneyMonth;
                document.getElementById("inAYear").innerHTML = moneyYear;
            

            }else{
                this.alert("Go to Settings for configuration");
            }

        },

       navigateToSettings : function (eventInfo) {
        eventInfo.preventDefault();
        var link = eventInfo.target;
        WinJS.Navigation.navigate(link.href);
       },
       
       DaysCalculation : function (homeUserDayCalc,homeUserMonthCalc,homeUserYearCalc) {
        var today = new Date();
        var todayDay = today.getDate();
        var todayMonth = today.getMonth() + 1; //January is 0!
        var todayYear = today.getFullYear();

        var daysDiff = Math.abs(todayDay - homeUserDayCalc);
        var monthsDiff = Math.abs(todayMonth - homeUserMonthCalc) * 30;
        var yearsDiff = Math.abs(todayYear - homeUserYearCalc) * 365;
        var daysCalc = daysDiff + monthsDiff + yearsDiff;
       

       return daysCalc;
       },
       
       cigarettesNotSmokedCalculation : function (daysCalc,homeHowManyCalc) {
        var cigarettesNotSmokedCalc = daysCalc * homeHowManyCalc;
        return cigarettesNotSmokedCalc;
       },
       
        
       moneySavedCalculation : function (cigarettesNotSmokedCalc, homeCostOfAPacketCalc) {
        var moneySavedCalc = cigarettesNotSmokedCalc * (homeCostOfAPacketCalc / 20);
        return moneySavedCalc;
       },
       
        
       moneyMonthCalculation : function (homeCostOfAPacketCalc, homeHowManyCalc) {
           var moneyMonthCalc = (homeHowManyCalc * 30) * (homeCostOfAPacketCalc / 20);
           return moneyMonthCalc;
       },


       alert: function (message) {
           var msgBox = new Windows.UI.Popups.MessageDialog(message);
           msgBox.showAsync();
       }


    });

 })();
