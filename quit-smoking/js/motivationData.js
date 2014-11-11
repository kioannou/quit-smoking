(function () {
    "use strict";

    var motivationArray = [
        { type: 'item', title: 'one', text: 'jdhjshfksbfkbskbsbdfkbwbwjfjkwb' },
        { type: 'item', title: 'two', text: '4354545354353534545345454354354' },
        { type: 'item', title: 'three', text: 'cvcvcvcvcvcvcvcvcvcvcvcvcvcvc' }
    ];

    var motivationList = new WinJS.Binding.List(motivationArray);

    //Creating the namespace and exposing the members of my namespace

    var motivationExposer = {
        motivationList: motivationList
    };

    WinJS.Namespace.define("MotivationData", motivationExposer);

})();