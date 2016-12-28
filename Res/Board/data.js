var cardObjs = [
        {
            type: "go card",
            money: 200
        },
        {
            type: "property card",
            number: 1,
            name: "Mediterranean Avenue",
            rents: [
                { level: 1, rent: 70 },
                { level: 2, rent: 130 },
                { level: 3, rent: 220 },
                { level: 4, rent: 370 },
                { level: 5, rent: 750 },
            ],
            color: { h: 24, s: 80, l: 20 },
            money: 60
        },
        {
            type: "event card"
        },
        {
            type: "property card",
            number: 2,
            name: "Baltic Avenue",
            rents: [
                { level: 1, rent: 70 },
                { level: 2, rent: 130 },
                { level: 3, rent: 220 },
                { level: 4, rent: 370 },
                { level: 5, rent: 750 },
            ],
            color: { h: 24, s: 80, l: 20 },
            money: 60
        },
        {
            type: "event card"
        },
        {
            type: "property card",
            number: 3,
            name: "Oriental Avenue",
            rents: [
                { level: 1, rent: 80 },
                { level: 2, rent: 140 },
                { level: 3, rent: 240 },
                { level: 4, rent: 410 },
                { level: 5, rent: 800 },
            ],
            color: { h: 183, s: 80, l: 20 },
            money: 100
        },
        {
            type: "property card",
            number: 4,
            name: "Vermont Avenue",
            rents: [
                { level: 1, rent: 80 },
                { level: 2, rent: 140 },
                { level: 3, rent: 240 },
                { level: 4, rent: 410 },
                { level: 5, rent: 800 },
            ],
            color: { h: 183, s: 80, l: 20 },
            money: 100
        },
        {
            type: "location card",
            money: 100
        },
        {
            type: "property card",
            number: 5,
            name: "Connecticut Avenue",
            rents: [
                { level: 1, rent: 100 },
                { level: 2, rent: 160 },
                { level: 3, rent: 260 },
                { level: 4, rent: 440 },
                { level: 5, rent: 860 },
            ],
            color: { h: 183, s: 80, l: 20 },
            money: 120
        },
        {
            type: "inJail card",
            money: 100
        },
        {
            type: "property card",
            number: 6,
            name: "St. Charles Palce",
            rents: [
                { level: 1, rent: 110 },
                { level: 2, rent: 180 },
                { level: 3, rent: 290 },
                { level: 4, rent: 460 },
                { level: 5, rent: 900 },
            ],
            color: { h: 300, s: 80, l: 20 },
            money: 140
        },
        {
            type: "event card"
        },
        {
            type: "property card",
            number: 7,
            name: "State Avenue",
            rents: [
                { level: 1, rent: 110 },
                { level: 2, rent: 180 },
                { level: 3, rent: 290 },
                { level: 4, rent: 460 },
                { level: 5, rent: 900 },
            ],
            color: { h: 300, s: 80, l: 20 },
            money: 140
        },
        {
            type: "property card",
            number: 8,
            name: "Virginia Avenue",
            rents: [
                { level: 1, rent: 130 },
                { level: 2, rent: 200 },
                { level: 3, rent: 310 },
                { level: 4, rent: 490 },
                { level: 5, rent: 980 },
            ],
            color: { h: 300, s: 80, l: 20 },
            money: 160
        },
        {
            type: "property card",
            number: 9,
            name: "St. James Place",
            rents: [
                { level: 1, rent: 140 },
                { level: 2, rent: 210 },
                { level: 3, rent: 330 },
                { level: 4, rent: 520 },
                { level: 5, rent: 1000 },
            ],
            color: { h: 43, s: 80, l: 20 },
            money: 180
        },
        {
            type: "property card",
            number: 10,
            name: "Tennessee Avenue",
            rents: [
                { level: 1, rent: 140 },
                { level: 2, rent: 210 },
                { level: 3, rent: 330 },
                { level: 4, rent: 520 },
                { level: 5, rent: 1000 },
            ],
            color: { h: 43, s: 80, l: 20 },
            money: 180
        },
        {
            type: "location card",
            money: 100
        },
        {
            type: "property card",
            number: 11,
            name: "Newyork Avenue",
            rents: [
                { level: 1, rent: 160 },
                { level: 2, rent: 230 },
                { level: 3, rent: 350 },
                { level: 4, rent: 550 },
                { level: 5, rent: 1100 },
            ],
            color: { h: 43, s: 80, l: 20 },
            money: 200
        },
        {
            type: "freeParking card"
        },
        {
            type: "property card",
            number: 12,
            name: "Kentucky Avenue",
            rents: [
                { level: 1, rent: 170 },
                { level: 2, rent: 250 },
                { level: 3, rent: 380 },
                { level: 4, rent: 580 },
                { level: 5, rent: 1160 },
            ],
            color: { h: 353, s: 80, l: 20 },
            money: 220
        },
        {
            type: "event card"
        },
        {
            type: "property card",
            number: 13,
            name: "Indiana Avenue",
            rents: [
                { level: 1, rent: 170 },
                { level: 2, rent: 250 },
                { level: 3, rent: 380 },
                { level: 4, rent: 580 },
                { level: 5, rent: 1160 },
            ],
            color: { h: 353, s: 80, l: 20 },
            money: 220
        },
        {
            type: "property card",
            number: 14,
            name: "Illinois Avenue",
            rents: [
                { level: 1, rent: 190 },
                { level: 2, rent: 270 },
                { level: 3, rent: 400 },
                { level: 4, rent: 610 },
                { level: 5, rent: 1200 },
            ],
            color: { h: 353, s: 80, l: 20 },
            money: 240
        },
        {
            type: "property card",
            number: 15,
            name: "Atlantic Avenue",
            rents: [
                { level: 1, rent: 200 },
                { level: 2, rent: 280 },
                { level: 3, rent: 420 },
                { level: 4, rent: 640 },
                { level: 5, rent: 1300 },
            ],
            color: { h: 62, s: 80, l: 20 },
            money: 260
        },
        {
            type: "property card",
            number: 16,
            name: "Atlantic Avenue",
            rents: [
                { level: 1, rent: 200 },
                { level: 2, rent: 280 },
                { level: 3, rent: 420 },
                { level: 4, rent: 640 },
                { level: 5, rent: 1300 },
            ],
            color: { h: 62, s: 80, l: 20 },
            money: 260
        },
        {
            type: "location card",
            money: 100
        },
        {
            type: "property card",
            number: 17,
            name: "Marvin Gardens",
            rents: [
                { level: 1, rent: 220 },
                { level: 2, rent: 300 },
                { level: 3, rent: 440 },
                { level: 4, rent: 670 },
                { level: 5, rent: 1340 },
            ],
            color: { h: 62, s: 80, l: 20 },
            money: 280
        },
        {
            type: "goToJail card"
        },
        {
            type: "property card",
            number: 18,
            name: "Pacific Gardens",
            rents: [
                { level: 1, rent: 230 },
                { level: 2, rent: 320 },
                { level: 3, rent: 460 },
                { level: 4, rent: 700 },
                { level: 5, rent: 1400 },
            ],
            color: { h: 108, s: 80, l: 20 },
            money: 300
        },
        {
            type: "event card"
        },
        {
            type: "property card",
            number: 19,
            name: "North Carolina Gardens",
            rents: [
                { level: 1, rent: 230 },
                { level: 2, rent: 320 },
                { level: 3, rent: 460 },
                { level: 4, rent: 700 },
                { level: 5, rent: 1400 },
            ],
            color: { h: 108, s: 80, l: 20 },
            money: 300
        },
        {
            type: "property card",
            number: 20,
            name: "Pennsylvania Avenue",
            rents: [
                { level: 1, rent: 250 },
                { level: 2, rent: 340 },
                { level: 3, rent: 480 },
                { level: 4, rent: 730 },
                { level: 5, rent: 1440 },
            ],
            color: { h: 108, s: 80, l: 20 },
            money: 320
        },
        {
            type: "event card"
        },
        {
            type: "property card",
            number: 21,
            name: "Park Place",
            rents: [
                { level: 1, rent: 270 },
                { level: 2, rent: 360 },
                { level: 3, rent: 510 },
                { level: 4, rent: 740 },
                { level: 5, rent: 1500 },
            ],
            color: { h: 223, s: 80, l: 20 },
            money: 350
        },
        {
            type: "location card",
            money: 100
        },
        {
            type: "property card",
            number: 22,
            name: "Boardwalk",
            rents: [
                { level: 1, rent: 300 },
                { level: 2, rent: 400 },
                { level: 3, rent: 560 },
                { level: 4, rent: 810 },
                { level: 5, rent: 1600 },
            ],
            color: { h: 223, s: 80, l: 20 },
            money: 400
        },
        {
            type: "board",
            width: 12,
            height: 8,
            dice: 2
        },
        {
            type: "player",
            controller: "player",
            name: "Long",
            avatar: "icofont icofont-rocket-alt-1",
            color: { h: 25, s: 100, l: 50 },
            money: 1500

        },
        {
            type: "player",
            controller: "computer",
            name: "computer 1",
            avatar: "icofont icofont-airplane",
            color: { h: 45, s: 100, l: 50 },
            money: 1500
        },
        {
            type: "player",
            controller: "computer",
            name: "computer 2",
            avatar: "icofont icofont-auto-rickshaw",
            color: { h: 12, s: 100, l: 50 },
            money: 1500
        },
        {
            type: "player",
            controller: "computer",
            name: "computer 3",
            avatar: "icofont icofont-bicycle-alt-2",
            color: { h: 75, s: 100, l: 50 },
            money: 1500
        },

        {
            type: "event",
            title: "It's a boy",
            longTitle: "Your new arrival wakes up the whole street!",
            description: ["Select one of your property.","(Rent level jumps to +1 for you; drop -1 for your neighbors)"],
            eventType: "onePropertyRaiseNeighborsFall_oneLevel"
        },
        {
            type: "event",
            title: "House Party",
            longTitle: "The good times go on till late!",
            description: ["Select one of your property.", "(Rent level jumps to +1 for you; drop -1 for your neighbors)"],
            eventType: "onePropertyRaiseNeighborsFall_oneLevel"
        },
        {
            type: "event",
            title: "Boom Town",
            longTitle: "Property prices bounce back",
            description: ["Move to any property space", "You can buy it or raise rent level"],
            eventType: "locationEffect"
        },
        {
            type: "event",
            title: "Total Gridlock",
            longTitle: "Faulty traffic lights get the street in a jam!",
            description: ["All player go to freeparking", "Do not pass GO!", "If you are in Jail, stay there!"],
            eventType: "goToCard_freeParking"
        },
        {
            type: "event",
            title: "Crime Down",
            longTitle: "Police arrest local newspaper thief",
            description: ["Select one of you property to level up"],
            eventType: "onePropertyRaise_oneLevel"
        },
        {
            type: "event",
            title: "Demolished",
            longTitle: "Your builder get the wrong address",
            description: ["Select one of you property to level down"],
            eventType: "onePropertyFall_oneLevel"
        },
        {
            type: "event",
            title: "Stargazing",
            longTitle: "A hottest A-list celebrity moves in next door!",
            description: ["Select one of you property to level up"],
            eventType: "onePropertyRaise_oneLevel"
        },
        {
            type: "event",
            title: "Grand designs",
            longTitle: "One of your properties get a TV makeover!",
            description: ["Select one of you property to level up: max level"],
            eventType: "onePropertyRaise_maxLevel"
        },
        {
            type: "event",
            title: "Deal of the week",
            longTitle: "Word on the street says the market is booming!",
            description: ["Move to any property space", "You can buy it or raise rent level"],
            eventType: "locationEffect"
        },

];