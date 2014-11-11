(function () {
    "use strict";

    var healthArray = [
        { type: "item", title: "one", desc: "AFTER ONE DAY", text: "jkabsdjksbajdbjkabdjabdadbjadbakbdk" },
        { type: "item", title: "one", desc: "AFTER ONE DAY", text: "jkabsdjksbajdbjkabdjabdadbjadbakbdk" },
        { type: "item", title: "one", desc: "AFTER ONE DAY", text: "jkabsdjksbajdbjkabdjabdadbjadbakbdk" },
        { type: "item", title: "one", desc: "AFTER ONE DAY", text: "jkabsdjksbajdbjkabdjabdadbjadbakbdk" },
        { type: "item", title: "one", desc: "AFTER ONE DAY", text: "jkabsdjksbajdbjkabdjabdadbjadbakbdk" },
        { type: "item", title: "one", desc: "AFTER ONE DAY", text: "jkabsdjksbajdbjkabdjabdadbjadbakbdk" },
        { type: "item", title: "one", desc: "AFTER ONE DAY", text: "jkabsdjksbajdbjkabdjabdadbjadbakbdk" },
        { type: "item", title: "one", desc: "AFTER ONE DAY", text: "jkabsdjksbajdbjkabdjabdadbjadbakbdk" },
        { type: "item", title: "one", desc: "AFTER ONE DAY", text: "jkabsdjksbajdbjkabdjabdadbjadbakbdk" },
        { type: "item", title: "one", desc: "AFTER ONE DAY", text: "jkabsdjksbajdbjkabdjabdadbjadbakbdk" }

    ];

    var healthList = new WinJS.Binding.List(healthArray);

    var healthExposer={
        healthList:healthList
    };

    WinJS.Namespace.define("HealthData", healthExposer);

})();