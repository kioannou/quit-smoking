(function () {

    "user strict";

    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

    var backDay = roamingSettings.values["userDay"];
    var backMonth = roamingSettings.values["userMonth"];
    var backYear = roamingSettings.values["userYear"];
    var backCost = roamingSettings.values["cost"];
    var backMany = roamingSettings.values["numberPerDay"];
    var backCurrency = roamingSettings.values["currency"];

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

    if (days < 3) {
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
    tileTextAttributes[0].appendChild(tileXml.createTextNode("Days: " + days));
    tileTextAttributes[1].appendChild(tileXml.createTextNode("Cigs: " + cigarettesNotSmoked));
    tileTextAttributes[2].appendChild(tileXml.createTextNode("Money: " + moneySaved + backCurrency));
    tileTextAttributes[3].appendChild(tileXml.createTextNode("Achieved: " + numberOfAchievements + "/12"));

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

    //Large version of tile.

    var largeTemplate = notifications.TileTemplateType.tileSquare310x310TextList01;
    var largeTileXml = notifications.TileUpdateManager.getTemplateContent(largeTemplate);
    var largeTextAttributes = largeTileXml.getElementsByTagName("text");
    largeTextAttributes[0].appendChild(largeTileXml.createTextNode("Days passed: " + days));
    largeTextAttributes[1].appendChild(largeTileXml.createTextNode("Achievements: " + numberOfAchievements + "/12"));
    largeTextAttributes[2].appendChild(largeTileXml.createTextNode("Next achievement in " + res + " day(s)"));

    var lastDate = roamingSettings.values["userLastDate"];
    largeTextAttributes[3].appendChild(largeTileXml.createTextNode("Avoided " + cigarettesNotSmoked + " cigs"));
    largeTextAttributes[4].appendChild(largeTileXml.createTextNode("Date you quitted: " + lastDate));
    //largeTextAttributes[5].appendChild(largeTileXml.createTextNode("jhjh"));


    var monthly = (backCost / 20) * (backMany * 30);
    largeTextAttributes[6].appendChild(largeTileXml.createTextNode("Money: " + moneySaved + backCurrency));
    largeTextAttributes[7].appendChild(largeTileXml.createTextNode("Monthly: " + monthly + backCurrency));
    largeTextAttributes[8].appendChild(largeTileXml.createTextNode("Yearly: " + monthly * 12 + backCurrency));
   
    var node = tileXml.importNode(largeTileXml.getElementsByTagName("binding").item(0), true);
    tileXml.getElementsByTagName("visual").item(0).appendChild(node);

    //Create the notification based on the XML content you've specified.
    var tileNotification = new notifications.TileNotification(tileXml);

    //Send the update !!!
    notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);


    var flag = roamingSettings.values["theFlag"];
    //TOAST NOTIFICATION---------------------------------------------------------------------------------

    if ((days === 3 && flag === 0) || (days === 5 && flag < 2) || (days === 10 && flag < 3) || (days === 15 && flag < 4) || (days === 21 && flag < 5) || (days === 32 && flag < 6) || (days === 92 && flag < 7) || (days === 213 && flag < 8) || (days === 365 && flag < 9) || (days === 1826 && flag < 10) || (days === 3652 && flag < 11) ) {

        var flag = flag + 1;
        roamingSettings.values["theFlag"] = flag;
        
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