(function () {
    "use strict";

    var healthArray = [
        { type: "item", value: 1, seed: "", after: "After 1 day", text: "Less than 20 minutes after your last cigarette, your heart rate will already start to drop back towards normal levels. Your peripheral circulation may also improve. The carbon monoxide in your blood drops to normal." },
        { type: "item", value: 3, seed: "", after: "After 3 days", text: "Your entire body is 100% nicotine-free. Symptoms of chemical withdrawal have peaked in intensity, including restlessness. Breathing is becoming easier and your lung's functional abilities are increasing." },
        { type: "item", value: 5, seed: "", after: "After 5 days", text: "The average ex-smoker will encounter an average of three cue induced crave episodes per day. It is unlikely that any single episode will last longer than 3 minutes." },
        { type: "item", value: 10, seed: "", after: "After 10 days", text: "10 days - The average ex-user is down to encountering less than two crave episodes per day, each less than 3 minutes." },
        { type: "item", value: 15, seed: "", after: "After 15 days", text: "Recovery has likely progressed to the point where your addiction is no longer doing the talking. Blood circulation in your gums and teeth are now similar to that of a non-user." },
        { type: "item", value: 21, seed: "", after: "After 20 days", text: "Regions of the brain have now substantially down-regulated, and receptor binding has returned to levels seen in the brains of non-smokers." },
        { type: "item", value: 32, seed: "", after: "After 1 month", text: "Your heart attack risk has started to drop. Your lung function is beginning to improve." },
        { type: "item", value: 92, seed: "", after: "After 3 months", text: "Your circulation has substantially improved. Walking has become easier. Your chronic cough, if any, has likely disappeared." },
        { type: "item", value: 213, seed: "", after: "After 7 months", text: "Any smoking related sinus congestion, fatigue or shortness of breath has decreased.  Your body's overall energy has increased." },
        { type: "item", value: 365, seed: "", after: "After 1 year", text: "Your excess risk of coronary heart disease, heart attack and stroke has dropped to less than half that of a smoker." },
        { type: "item", value: 1826, seed: "", after: "After 5 years", text: "Your risk of a subarachnoid haemorrhage has declined to 59% of your risk while still smoking. If a female ex-smoker, your risk of developing diabetes is now that of a non-smoker. " },
        { type: "item", value: 3652, seed: "", after: "After 10 years", text: "Risk of death from lung cancer has declined by almost half if you were an average smoker.  Risk of cancer of the mouth and throat has declined." }


    ];

    var healthList = new WinJS.Binding.List(healthArray);

    var healthExposer={
        healthList:healthList
    };

    WinJS.Namespace.define("HealthData", healthExposer);

})();