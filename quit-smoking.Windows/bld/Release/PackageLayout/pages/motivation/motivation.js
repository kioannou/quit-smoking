// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/motivation/motivation.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            var motivationList = document.getElementById("motivationListViewWindows");
            motivationList.addEventListener("iteminvoked", selectingItem, false);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    function selectingItem(args) {

        var title = MotivationData.motivationList.getAt(args.detail.itemIndex).title;
        var t1 = MotivationData.motivationList.getAt(args.detail.itemIndex).t1;
        var pro = MotivationData.motivationList.getAt(args.detail.itemIndex).pro;
        var t2 = MotivationData.motivationList.getAt(args.detail.itemIndex).t2;
        var main = MotivationData.motivationList.getAt(args.detail.itemIndex).main;
        var t3 = MotivationData.motivationList.getAt(args.detail.itemIndex).t3;
        var epi = MotivationData.motivationList.getAt(args.detail.itemIndex).epi;

        document.getElementById("tit").innerHTML = title;
        document.getElementById("q1").innerHTML = t1;
        document.getElementById("a1").innerHTML = pro;
        document.getElementById("q2").innerHTML = t2;
        document.getElementById("a2").innerHTML = main;;
        document.getElementById("q3").innerHTML = t3;
        document.getElementById("a3").innerHTML = epi;

    }
})();
