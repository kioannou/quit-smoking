(function () {
    "use strict";
    var motivationArray = [
      {
          type: "item", title: "Asthma",
          t1: "What Is Asthma?",
          pro: "Asthma is a chronic disease that affects the airways of the lungs. During an asthma attack, airways (tubes that carry air to your lungs) become swollen, making it hard to breathe. As the walls of the airways swell, they narrow, and less air gets in and out of the lungs. Cells in the airways can make more mucus (a sticky, thick liquid) than usual, which can make breathing even harder.",
          t2: "How Is Smoking Related to Asthma?",
          main: "If you have asthma, an asthma attack can occur when something irritates your airways and \"triggers\" an attack. Your triggers might be different from other people’s triggers. Tobacco smoke is one of the most common asthma triggers. Tobacco smoke—including secondhand smoke—is unhealthy for everyone, especially people with asthma. Secondhand smoke contains more than 7,000 chemicals, including hundreds that are toxic and about 70 that can cause cancer.",
          t3: "How Can Asthma Attacks Be Prevented?",
          epi: "If you or a family member has asthma, you can manage it with the help of your health care provider (for example, by taking your medicines exactly as your doctor tells you) and by avoiding triggers. Staying far away from tobacco smoke is one important way to avoid asthma attacks."
      },
      {
          type: "item",
          title: "Buerger's Disease",
          t1: "What Is Buerger's Disease?",
          pro: "Buerger’s disease affects blood vessels in the arms and legs. Blood vessels swell, which can prevent blood flow, causing clots to form. This can lead to pain, tissue damage, and even gangrene (the death or decay of body tissues).",
          t2: "How Is Smoking Related to Buerger's Disease?",
          main: "Almost everyone with Buerger’s disease smokes cigarettes. However, Buerger’s disease can occur in people who use other forms of tobacco, like chewing tobacco. People who smoke 1½ packs a day or more are most likely to develop Buerger's disease. Researchers are working to understand how tobacco increases the risk for Buerger's disease. One idea is that chemicals in tobacco irritate the lining of the blood vessels and cause them to swell.",
          t3: "How Can Buerger's Disease Be Prevented?",
          epi: "If you want to prevent getting Buerger’s disease, don’t smoke or use any other tobacco products."
      },
      {
          type: "item", title: "Cancer",
          t1: "What Is Cancer?",
          t2: "How Is Smoking Related to Cancer?",
          t3: "How Can Smoking-Related Cancers Be Prevented?",
          epi: "Quitting smoking lowers the risks for cancers of the lung, mouth, throat, esophagus, and larynx. Within 5 years of quitting, your chance of cancer of the mouth, throat, esophagus, and bladder is cut in half, chance of cancer drops by half. If nobody smoked, one of every three cancer deaths in the United States would not happen.",
          pro: "Cancer refers to diseases in which abnormal cells divide out of control and are able to invade other tissues. Cancer cells can spread to other parts of the body through the blood and lymph systems.",
          main: "Poisons in cigarette smoke can weaken the body’s immune system, making it harder to kill cancer cells. When this happens, cancer cells keep growing without being stopped. Poisons in tobacco smoke can damage or change a cell's DNA. DNA is the cell's \"instruction manual\" that controls a cell's normal growth and function. When DNA is damaged, a cell can begin growing out of control and create a cancer tumor."
      },
      {
          type: "item", title: "COPD",
          t1: "What Is COPD?",
          pro: "Chronic obstructive pulmonary disease (COPD) is a serious lung disease that gradually makes it harder and harder to breathe. COPD includes emphysema and chronic bronchitis. With COPD, less air flows through the airways—the tubes that carry air in and out of your lungs",
          t2: "How Is Smoking Related to COPD?",
          main: "COPD most often occurs in people age 40 and older with a history of smoking (either current or former smokers). However, as many as one out of six people with COPD never smoked.",
          t3: "How Can COPD Be Prevented?",
          epi: "The best way to prevent COPD is to never start smoking, and if you smoke, quit. Talk with your health care provider about programs and products that can help you quit. Also, stay away from secondhand smoke, which is smoke in the air from other people smoking."
      },
      {
          type: "item", title: "Diabetes",
          t1: "What Is Diabetes?",
          pro: "Diabetes is a group of diseases in which blood sugar levels are higher than normal. Most of the food a person eats is turned into glucose (a kind of sugar) for the body’s cells to use for energy. The pancreas, an organ near the stomach, makes a hormone called insulin that helps glucose get into the body’s cells. When you have diabetes, your body either doesn't make enough insulin or can't use the insulin very well. Less glucose gets into the cells and instead builds up in the blood.There are different types of diabetes. Type 2 is the most common in adults and accounts for more than 90% of all diabetes cases.",
          t2: "How Is Smoking Related to Diabetes?",
          main: "We now know that smoking causes type 2 diabetes. In fact, smokers are 30–40% more likely to develop type 2 diabetes than nonsmokers. And people with diabetes who smoke are more likely than nonsmokers to have trouble with insulin dosing and with controlling their disease.The more cigarettes you smoke, the higher your risk for type 2 diabetes.",
          t3: "How Can Diabetes Be Prevented?",
          epi: "Don’t smoke. Smoking increases your chance of having type 2 diabetes."
      },
      {
          type: "item", title: "Gum (Periodontal) Disease",
          pro: "Gum (periodontal) disease is an infection of the gums and can affect the bone structure that supports your teeth. In severe cases, it can make your teeth fall out. Gum disease starts with bacteria (germs) on your teeth that get under your gums. If the germs stay on your teeth for too long, layers of plaque (film) and tartar (hardened plaque) develop. This buildup leads to early gum disease, called gingivitis.",
          t1: "What Is Gum Disease? ",
          t2: "How Is Smoking Related to Gum Disease?",
          main: "Smoking weakens your body's infection fighters (your immune system). This makes it harder to fight off a gum infection. Once you have gum damage, smoking also makes it harder for your gums to heal.",
          t3: "How Can Gum Disease Be Prevented?",
          epi: "Don't smoke. If you smoke, quit."
      },
      {
          type: "item", title: "Heart Disease and Stroke",
          t1: "What Are Heart Disease and Stroke?",
          pro: "Heart disease and stroke are cardiovascular (heart and blood vessel) diseases. Heart disease includes several types of heart conditions. The most common type is coronary heart disease (also known as coronary artery disease), which is narrowing of the blood vessels that carry blood to the heart. A stroke, sometimes called a brain attack, can occur when a clot blocks the blood supply to part of the brain. Stroke can also occur when a blood vessel in or around the brain bursts. In either case, parts of the brain become damaged or die.",
          t2: "How Are Smoking and Exposure to Secondhand Smoke Related to Heart Disease and Stroke?",
          main: "Smoking is a leading cause of heart disease. Smoking can: 1)Raise triglycerides (a type of fat in your blood) 2)Lower \"good\" cholesterol (HDL) 3)Damage cells that line the blood vessels 4)Cause thickening and narrowing of blood vessels 5)Cause clots to form, blocking blood flow to the heart",
          t3: "How Can Heart Disease and Stroke Be Prevented?",
          epi: "One major factor is smoking . If you smoke, quit."
      },
      {
          type: "item", title: "Pregnancy",
          t1: "How Does Smoking Affect Fertility?",
          pro: "Smoking can cause fertility problems for you or your partner. Women who smoke have more trouble getting pregnant than women who don't smoke. In men, smoking can damage sperm and contribute to impotence (erectile dysfunction, or ED). Both problems can make it harder for a man to father a baby when he and his partner are ready.",
          t2: "How Can a Premature Birth Harm Your Baby?",
          main: "If you smoke during pregnancy, you are more likely to give birth too early. A baby born 3 weeks or more before your due date is premature. Babies born too early miss important growth that happens in the womb during the final weeks and months of pregnancy.",
          t3: "How Can Quitting Help You and Your Baby?",
          epi: "The best time to quit smoking is before you get pregnant, but quitting at any time during pregnancy can help your baby get a better start on life. Your baby gets more oxygen, even after just 1 day. Your baby will grow better. Your baby is less likely to be born too early."
      }
    ];

    var motivationList = new WinJS.Binding.List(motivationArray);

    var motivationExposer = {
        motivationList: motivationList
    };

    WinJS.Namespace.define("MotivationData", motivationExposer);
})();