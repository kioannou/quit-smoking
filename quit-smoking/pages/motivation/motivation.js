// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/motivation/motivation.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var title = options.title;
            var t1 = options.t1;
            var pro = options.pro;
            var t2 = options.t2;
            var main = options.main;
            var t3 = options.t3;
            var epi = options.epi;

            document.getElementById("title").innerHTML = title;
            document.getElementById("titleone").innerHTML = t1;
            document.getElementById("prologue").innerHTML = pro;
            document.getElementById("titletwo").innerHTML = t2;
            document.getElementById("maintext").innerHTML = main;
            document.getElementById("titlethree").innerHTML = t3;
            document.getElementById("epilogue").innerHTML = epi;
            

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }

       
    });

  

})();
