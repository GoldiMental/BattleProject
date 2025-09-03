var maps = {
    MAP: {
        name: "MAP",
        Height: 2500,
        Width: 4750,
        startX: -25,
        startY: -75,
        blockedArea: [
            //HomeTown
            { minX: -250, maxX: 0, minY: -50, maxY: 100 },
            { minX: -650, maxX: -400, minY: -50, maxY: 100 },
            { minX: -1050, maxX: -800, minY: -50, maxY: 100 },
            { minX: -1050, maxX: -800, minY: -500, maxY: -350 },
            { minX: -400, maxX: -150, minY: -550, maxY: -400 },
            { minX: -150, maxX: 25, minY: -550, maxY: -250 },
            { minX: 75, maxX: 150, minY: -250, maxY: -25 },
            { minX: -375, maxX: -275, minY: 75, maxY: 75 },
            { minX: -775, maxX: -675, minY: 75, maxY: 75 },
            { minX: -1275, maxX: -1075, minY: 75, maxY: 75 },
            { minX: -1300, maxX: -1275, minY: -75, maxY: 75 },
            { minX: -1450, maxX: -1125, minY: -225, maxY: -125 },
            { minX: -1450, maxX: -1075, minY: -475, maxY: -375 },
            { minX: -1275, maxX: 25, minY: -925, maxY: -775 },
            { minX: 25, maxX: 125, minY: -725, maxY: -575 },
            { minX: -625, maxX: -575, minY: -325, maxY: -275 },
            { minX: 75, maxX: 75, minY: 25, maxY: 25 },
            { minX: -225, maxX: 225, minY: 125, maxY: 225 },
            { minX: -1275, maxX: -1275, minY: -725, maxY: -525 },
            { minX: 75, maxX: 225, minY: -925, maxY: -925 },
            { minX: -425, maxX: -425, minY: -525, maxY: -475 },
            { minX: -775, maxX: -775, minY: -475, maxY: -425 },
            { minX: -1075, maxX: -1075, minY: -225, maxY: -225 },
            //Map(Hohes Gras). 
            { minX: -1475, maxX: -1475, minY: -250, maxY: 250 },
            { minX: -1575, maxX: -1525, minY: -125, maxY: 250 },
            { minX: -1975, maxX: -1625, minY: -125, maxY: -75 },
            { minX: -1852, maxX: -1625, minY: 175, maxY: 225 },
            { minX: -2975, maxX: -1875, minY: 125, maxY: 225 },
            { minX: -2975, maxX: -2875, minY: -475, maxY: 225 },
            //{ minX: -2975, maxX: -2925, minY: -625, maxY: -525 },
            { minX: -2825, maxX: -2625, minY: -475, maxY: -475 },
            { minX: -2625, maxX: -2625, minY: -525, maxY: -525 },
            { minX: -2975, maxX: -2325, minY: -825, maxY: -675 },
            { minX: -2475, maxX: -2325, minY: -625, maxY: -625 },
            { minX: -2375, maxX: -2325, minY: -575, maxY: -125 },
            { minX: -2275, maxX: -1475, minY: -775, maxY: -725 },
            { minX: -1625, maxX: -1475, minY: -675, maxY: -475 },
            { minX: -1475, maxX: -1475, minY: -425, maxY: -375 },
            //Map(DunkelWald). Max=Min und Min=Max!!!!
            { minX: -3175, maxX: -3025, minY: -475, maxY: -125 },
            { minX: -3675, maxX: -3025, minY: -975, maxY: -625 },
            { minX: -3675, maxX: -3325, minY: -575, maxY: -325 },
            { minX: -3975, maxX: -3875, minY: -675, maxY: -25 },
            { minX: -4475, maxX: -3875, minY: -975, maxY: -775 },
            { minX: -4475, maxX: -4425, minY: -725, maxY: 225 },
            { minX: -4375, maxX: -3475, minY: 225, maxY: 225 },
            { minX: -3425, maxX: -3275, minY: 25, maxY: 225 },
            { minX: -3525, maxX: -3375, minY: -175, maxY: -25 },
            { minX: -3575, maxX: -3525, minY: -225, maxY: -225 },
            { minX: -3225, maxX: -3175, minY: -25, maxY: -25 },
            { minX: -3275, maxX: -3025, minY: 25, maxY: 225 },
            { minX: -3025, maxX: -3025, minY: -75, maxY: -25 },
            //Map(Hohes Graß Arena) Max=Min und Min=Max!!!!
            { minX: -3725, maxX: 225, minY: -1075, maxY: -975 },
            { minX: -625, maxX: 225, minY: -1525, maxY: -1125 },
            { minX: -125, maxX: 225, minY: -1825, maxY: -1575 },
            { minX: -625, maxX: -175, minY: -1825, maxY: -1775 },
            { minX: -625, maxX: -225, minY: -1675, maxY: -1575 },
            { minX: -3752, maxX: -3675, minY: -1575, maxY: -1125 },
            { minX: -4475, maxX: -3825, minY: -1475, maxY: -975 },
            { minX: -3925, maxX: -3825, minY: -1875, maxY: -1575 },
            { minX: -4475, maxX: -3975, minY: -1875, maxY: -1825 },
            { minX: -3825, maxX: -3725, minY: -1725, maxY: -1675 },
            { minX: 225, maxX: 225, minY: -2225, maxY: -1875 },
            { minX: -4475, maxX: 225, minY: -2225, maxY: -2225 },
        ],
        //BattleMapZone. 
        battleArea: [
            { minX: -2275, maxX: -1675, minY: -675, maxY: -675 },
            { minX: -2275, maxX: -2275, minY: -625, maxY: -625 },
            { minX: -2475, maxX: -2275, minY: -575, maxY: -125 },
            { minX: -1825, maxX: -1725, minY: -575, maxY: -475 },
            { minX: -2125, maxX: -1875, minY: -575, maxY: -175 },
            { minX: -2125, maxX: -2025, minY: -125, maxY: -75 },
            { minX: -2825, maxX: -1925, minY: -25, maxY: 75 },
            { minX: -2825, maxX: -2575, minY: -425, maxY: -75 },
            { minX: -2875, maxX: -2775, minY: -625, maxY: -525 },
        ],
        battleAreaDW: [
            { minX: -3225, maxX: -3225, minY: 525, maxY: -125 },
            { minX: -3475, maxX: -3375, minY: -225, maxY: -225 },
            { minX: -3675, maxX: -3475, minY: -225, maxY: 175 },
            { minX: -4375, maxX: -3725, minY: 75, maxY: 175 },
            { minX: -4375, maxX: -4125, minY: -725, maxY: 25 },
            { minX: -4025, maxX: -4025, minY: -675, maxY: -25 },
            { minX: -3825, maxX: -3725, minY: -675, maxY: -325 },
            { minX: -3825, maxX: -3775, minY: -275, maxY: -25 },
        ],
        battleAreaHG: [
            { minX: -625, maxX: 175, minY: -2175, maxY: -1875 },
            { minX: -3625, maxX: -675, minY: -2175, maxY: -1125 },
            { minX: -3675, maxX: -3675, minY: -2175, maxY: -1625 },
            { minX: -3775, maxX: -3725, minY: -2175, maxY: -1775 },
            { minX: -4475, maxX: -3825, minY: -2175, maxY: -1925 },
            //{ minX: , maxX: , minY: , maxY:  },
            //{ minX: , maxX: , minY: , maxY:  },
            //{ minX: , maxX: , minY: , maxY:  },
        ],
        //ProfHome. 
        profHome: [
            { minX: -925, maxX: -925, minY: -525, maxY: -525 },
        ],
        //SelfHome. 
        selfHome: [
            { minX: -125, maxX: -125, minY: -75, maxY: -75 },
        ],
        //ShopHome. 
        shopHome: [
            { minX: -275, maxX: -275, minY: -575, maxY: -575 },
        ],
        //ShopHomeHG. 
        shopHomeHG: [
            { minX: -4425, maxX: -4425, minY: -1525, maxY: -1525 },
        ],
        //trainerBattle. 
        trainerBattle: [
            { minX: -1075, maxX: -1075, minY: -325, maxY: -275, name: "Trainer000" },
            { minX: -2675, maxX: -2675, minY: -675, maxY: -525, name: "Trainer001" },
        ],
        battleMaps: {
            wald: {
                opp_List: ["Mäusschen", "Kaninchen", "Streuner",],
                maxLv: 4
            },
            dunkelwald: {
                opp_List: ["Maus", "Wachhund", "Kleiner_Wolf", "Wolf", "Zosse",],
                maxLv: 9
            },
            hohesgras: {
                opp_List: ["Böser_Wolf", "Kampfmaus", "Kaninchen_des_Todes", "Schutzhund", "Streitross",],
                maxLv: 25
            },
        },
    },
    TroysHaus: {
        name: "TroysHaus",
        Height: 300,
        Width: 500,
        startX: -25,
        startY: -25,
        startStadtX: -925,
        startStadtY: -525,
        blockedArea: [
            { minX: 75, maxX: 255, minY: -25, maxY: 25 },
            { minX: -225, maxX: -125, minY: -25, maxY: 25 },
            { minX: -225, maxX: 225, minY: 175, maxY: 225 },
            { minX: -225, maxX: -225, minY: 125, maxY: 125 },
        ],
        //ProfHome. 
        profHome: [
            { minX: -25, maxX: -25, minY: -25, maxY: -25 },
        ],
        //Professor. 
        professor: [
            { minX: -175, maxX: -175, minY: 125, maxY: 125 },
        ],
    },
    MeinHaus: {
        name: "MeinHaus",
        Height: 250,
        Width: 250,
        startX: 125,
        startY: 25,
        startStadtX: -125,
        startStadtY: -75,
        blockedArea: [
            { minX: 175, maxX: 225, minY: 25, maxY: 25 },
            { minX: 25, maxX: 75, minY: 25, maxY: 25 },
            { minX: 225, maxX: 225, minY: 175, maxY: 175 },
            { minX: 25, maxX: 225, minY: 225, maxY: 225 },
            { minX: 25, maxX: 25, minY: 125, maxY: 125 },
        ],
        //SelfHome. 
        selfHome: [
            { minX: 125, maxX: 125, minY: 25, maxY: 25 },
        ],
        tulpaPc: [
            { minX: 225, maxX: 225, minY: 125, maxY: 125 },
        ],
    },
    ShopHaus: {
        name: "ShopHaus",
        Height: 300,
        Width: 500,
        startX: 75,
        startY: -25,
        startStadtX: -275,
        startStadtY: -575,
        blockedArea: [
            { minX: 125, maxX: 225, minY: -25, maxY: 25 },
            { minX: -225, maxX: 25, minY: -25, maxY: -25 },
            { minX: -225, maxX: -175, minY: 25, maxY: 25 },
            { minX: -125, maxX: -25, minY: 75, maxY: 75 },
            { minX: -225, maxX: -175, minY: 125, maxY: 125 },
            { minX: -175, maxX: 75, minY: 175, maxY: 175 },
            { minX: 75, maxX: 225, minY: 125, maxY: 125 },
        ],
        //ShopHome. 
        shopHome: [
            { minX: 75, maxX: 75, minY: -25, maxY: -25 },
        ],
        shopHandel: [
            { minX: 175, maxX: 175, minY: 75, maxY: 75 },
        ],
    },
    ShopHausHG: {
        name: "ShopHausHG",
        Height: 250,
        Width: 250,
        startX: 125,
        startY: 25,
        startStadtX: -4225,
        startStadtY: -1525,
        blockedArea: [
            { minX: 25, maxX: 225, minY: 125, maxY: 225 },
            { minX: 25, maxX: 25, minY: 25, maxY: 75 },
            { minX: 225, maxX: 225, minY: 25, maxY: 25 },
            //{ minX: , maxX: , minY: , maxY:  },
            //{ minX: , maxX: , minY: , maxY:  },
            //{ minX: , maxX: , minY: , maxY:  },
            //{ minX: , maxX: , minY: , maxY:  },
        ],
        //ShopHome. 
        shopHomeHG: [
            { minX: 125, maxX: 125, minY: -25, maxY: -25 },
        ],
        //shopHandel: [
        //    { minX: 175, maxX: 175, minY: 75, maxY: 75 },
        //],
    },
}
