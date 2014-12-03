(function () {
    "use strict";

    var healthArray = [
        { type: "item", title: "12h", desc: "Within 12 hours", text: "The carbon monoxide in your blood drops to normal" },
        { type: "item", title: "1d", desc: "After 1 day", text: "Anxieties have peaked in intensity and within two weeks should return to near pre-cessation levels." },
        { type: "item", title: "2d", desc: "After 2 days", text: "Damaged nerve endings have started to regrow and your sense of smell and taste are beginning to return to normal. Cessation anger and irritability will have peaked." },
        { type: "item", title: "3d", desc: "After 3 days", text: "Your entire body will test 100% nicotine-free and over 90% of all nicotine metabolites (the chemicals it breaks down into) will now have passed from your body via your urine.  Symptoms of chemical withdrawal have peaked in intensity, including restlessness. The number of cue induced crave episodes experienced during any quitting day have peaked for the average ex-user. Lung bronchial tubes leading to air sacs are beginning to relax in recovering smokers. Breathing is becoming easier and your lung's functional abilities are starting to increase." },
        { type: "item", title: "5d", desc: "After 5 days", text: "The average ex-smoker will encounter an average of three cue induced crave episodes per day. Although we may not be average and although serious cessation time distortion can make minutes feel like hours, it is unlikely that any single episode will last longer than 3 minutes. Keep a clock handy and time them." },
        { type: "item", title: "10d", desc: "After 10 days", text: "10 days - The average ex-user is down to encountering less than two crave episodes per day, each less than 3 minutes." },
        { type: "item", title: "15d", desc: "After 15 days", text: "Recovery has likely progressed to the point where your addiction is no longer doing the talking. Blood circulation in your gums and teeth are now similar to that of a non-user." },
        { type: "item", title: "20d", desc: "After 20 days", text: "Regions of the brain have now substantially down-regulated, and receptor binding has returned to levels seen in the brains of non-smokers" },
        { type: "item", title: "1m", desc: "After 1 month", text: "Your heart attack risk has started to drop. Your lung function is beginning to improve." },
        { type: "item", title: "3m", desc: "After 3 months", text: "Your circulation has substantially improved. Walking has become easier. Your chronic cough, if any, has likely disappeared" },
        { type: "item", title: "7m", desc: "After 7 months", text: "Any smoking related sinus congestion, fatigue or shortness of breath has decreased. Cilia have regrown in your lungs, thereby increasing their ability to handle mucus, keep your lungs clean and reduce infections. Your body's overall energy has increased." },
        { type: "item", title: "1y", desc: "After 1 year", text: "Your excess risk of coronary heart disease, heart attack and stroke has dropped to less than half that of a smoker" },
        { type: "item", title: "5y", desc: "After 5 years", text: "Your risk of a subarachnoid haemorrhage has declined to 59% of your risk while still smoking. If a female ex-smoker, your risk of developing diabetes is now that of a non-smoker " },
        { type: "item", title: "10y", desc: "After 10 years", text: "Your risk of being diagnosed with lung cancer is between 30% and 50% of that for a continuing smoker. Risk of death from lung cancer has declined by almost half if you were an average smoker (one pack per day).  Risk of cancer of the mouth, throat, esophagus and pancreas have declined. Risk of developing diabetes for both men and women is now similar to that of a never-smoker " }


    ];

    var healthList = new WinJS.Binding.List(healthArray);

    var healthExposer={
        healthList:healthList
    };

    WinJS.Namespace.define("HealthData", healthExposer);

})();