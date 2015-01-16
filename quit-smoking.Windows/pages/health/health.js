// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/health/health.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            var daysForHealthList = howManyDays();

            for (var i = 0; i < 12 ; i++) {
                var item = HealthData.healthList.getAt(i);

                if (item.value <= daysForHealthList) {
                    item.seed = "ACHIEVED";
                } else {
                    var indays = item.value - daysForHealthList;
                    item.seed = "In " + indays + " day(s)";
                }
            };
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    function howManyDays() {

        var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

        var dayForHealthList = roamingSettings.values["userDay"];
        var monthForHealthlist = roamingSettings.values["userMonth"];
        var yearForHealthList = roamingSettings.values["userYear"];

        var today = new Date();
        var todayDay = today.getDate();
        var todayMonth = today.getMonth() + 1; //January is 0!
        var todayYear = today.getFullYear();

        var daysDiff = Math.abs(todayDay - dayForHealthList);
        var monthsDiff = Math.abs(todayMonth - monthForHealthlist) * 30;
        var yearsDiff = Math.abs(todayYear - yearForHealthList) * 365;
        //Days for live tile.
        var days = daysDiff + monthsDiff + yearsDiff + 1; //+1
        return days;
    }
})();
