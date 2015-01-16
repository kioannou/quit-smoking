(function () {

    "user strict";

    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

    var backDay = roamingSettings.values["savedDay"];
    var backMonth = roamingSettings.values["savedMonth"];
    var backYear = roamingSettings.values["savedYear"];
    var backCost = roamingSettings.values["savedCost"];
    var backMany = roamingSettings.values["savedHowMany"];
    var backCurrency = roamingSettings.values["savedCurrency"];

    var today = new Date();
    var todayDay = today.getDate();
    var todayMonth = today.getMonth() + 1; //January is 0!
    var todayYear = today.getFullYear();

    var daysDiff = Math.abs(todayDay - backDay);
    var monthsDiff = Math.abs(todayMonth - backMonth) * 30;
    var yearsDiff = Math.abs(todayYear - backYear) * 365;
    //Days for live tile.
    var days = daysDiff + monthsDiff + yearsDiff + 1; //+1 in case of the user choose the same day and days variable equals 0.
    //How many cigarettes for live tile.
    var cigarettesNotSmoked = days * backMany;
    //Saved money for live tile.
    var moneySaved = cigarettesNotSmoked * (backCost / 20);

    //LIVE TILE---------------------------------------------------------------------------------------

    var notifications = Windows.UI.Notifications;

    var template = notifications.TileTemplateType.tileSquareText03;
    var tileXml = notifications.TileUpdateManager.getTemplateContent(template);

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

    //How the tile should look like.
    var tileTextAttributes = tileXml.getElementsByTagName("text");
    tileTextAttributes[0].appendChild(tileXml.createTextNode("Smoke free: " + days + " days."));
    tileTextAttributes[1].appendChild(tileXml.createTextNode("Cigs avoided: " + cigarettesNotSmoked));
    tileTextAttributes[2].appendChild(tileXml.createTextNode("Money saved: " + moneySaved + backCurrency));
    tileTextAttributes[3].appendChild(tileXml.createTextNode("Achievements: " + numberOfAchievements + "/12"));

    //Wide version of the tile.

    var wideTemplate = notifications.TileTemplateType.tileWideText05;
    var wideTileXml = notifications.TileUpdateManager.getTemplateContent(wideTemplate);
    var wideTileTextAttributes = wideTileXml.getElementsByTagName("text");
    wideTileTextAttributes[0].appendChild(wideTileXml.createTextNode("You haven't smoked for " + days + " days."));
    wideTileTextAttributes[1].appendChild(wideTileXml.createTextNode("You haven't smoked " + cigarettesNotSmoked + " cigarettes."));
    wideTileTextAttributes[2].appendChild(wideTileXml.createTextNode("You have saved " + moneySaved + backCurrency + " so far."));
    wideTileTextAttributes[4].appendChild(wideTileXml.createTextNode("Next achievement in " + res + " day(s)."));
    wideTileTextAttributes[3].appendChild(wideTileXml.createTextNode("Achievements: " + numberOfAchievements + "/12"));

    var node = tileXml.importNode(wideTileXml.getElementsByTagName("binding").item(0), true);
    tileXml.getElementsByTagName("visual").item(0).appendChild(node);


    //Create the notification based on the XML content you've specified.
    var tileNotification = new notifications.TileNotification(tileXml);

    //Send the update !!!
    notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);



    //TOAST NOTIFICATION---------------------------------------------------------------------------------

    if (days === 3 || days === 5 || days === 10 || days === 15 || days === 21 || days === 32 || days === 92 || days === 213 || days === 365 || days === 1826 || days === 3652) {

        var toastTemplate = notifications.ToastTemplateType.toastText01;
        var toastXml = notifications.ToastNotificationManager.getTemplateContent(toastTemplate);

        var toastTextElements = toastXml.getElementsByTagName("text");
        toastTextElements[0].appendChild(toastXml.createTextNode("New health achievement unlocked!"));
        //toastXml.selectSingleNode("/toast").setAttribute("launch", '{"type":"toast","param1":"12345"}');
        //Create the toast notification based on the XML content you've specified.
        var toast = new notifications.ToastNotification(toastXml);

        // Send your toast notification.
        var toastNotifier = notifications.ToastNotificationManager.createToastNotifier();
        toastNotifier.show(toast);
    }


    close();
})();