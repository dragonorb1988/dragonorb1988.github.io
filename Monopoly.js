
//#region Monopoly

function Monopoly(rawData, jqueryContainer) {
    this.rawData = rawData;
    this.container = jqueryContainer;

    this.objects = [];
    this.properties = [];
    this.goCard;
    this.players = [];
    this.boardCards = [];
    this.board;
    this.jail;
    this.goToJail; 
    this.freeParking;

    this.windowDice;
    this.windowMenu;
    this.windowMenuAction;
    this.windowStatistics;

    this.currentPlayerTurn;
    this.events = [];
    this.eventsUsed = [];

    this.tempSelected;
    this.tempSelecteds = [];
}
Monopoly.prototype.constructor = Monopoly;
Monopoly.prototype.getObject = function (monopolyId) {
    for (var x = 0; x < this.objects.length; x++) {
        if (this.objects[x].monopolyId == monopolyId)
            return this.objects[x];
    }
}
Monopoly.prototype.createNewObject = function (inputData) {
    var object = {};

    //Create monopolyId
    var monopolyId = utils.randomNumber(0, 99999);
    while (this.getObject(monopolyId) != null) {
        monopolyId = utils.randomNumber(0, 99999);
    }

    //branch out object
    if (inputData.type == "property card") {
        object = new PropertyCard(inputData);
    }
    else if (inputData.type == "go card") {
        object = new GoCard(inputData);
    }
    else if (inputData.type == "location card") {
        object = new LocationCard(inputData);
    }
    else if (inputData.type == "event card") {
        object = new EventCard(inputData);
    }
    else if (inputData.type == "goToJail card") {
        object = new GoToJailCard(inputData);
    }
    else if (inputData.type == "inJail card") {
        object = new InJailCard(inputData);
    }
    else if (inputData.type == "freeParking card") {
        object = new FreeParkingCard(inputData);
    }
    else if (inputData.type == "board") {
        object = new Board(inputData);
    }
    else if (inputData.type == "player") {
        object = new Player(inputData);
    }
    else if (inputData.type == "dice") {
        object = new Dice();
    }
    else if (inputData.type == "windowDice") {
        object = new WindowDice(inputData);
    }
    else if (inputData.type == "windowMenu") {
        object = new WindowMenu(inputData);
    }
    else if (inputData.type == "windowMenuAction") {
        object = new WindowMenuAction(inputData);
    }
    else if (inputData.type == "event") {
        object = new MonopolyEvent(inputData);
    }
    else if (inputData.type == "windowStatistics") {
        object = new WindowStatistics(inputData);
    }


    //inital object and assign monopolyId
    object.initial();
    object.monopolyId = monopolyId;

    //==========================================================//

    //check if property object type
    if (inputData.type == "property card") {
        this.properties.push(object);

    }

    //check if board object type
    var boardCardsObjectTypes = ["property card", "event card",
        "goToJail card", "inJail card", "freeParking card", "location card", "go card"];
    if (boardCardsObjectTypes.indexOf(inputData.type) != -1) {
        this.boardCards.push(object);

    }

    //check if board type
    if (inputData.type == "board") {
        this.board = object;
    }

    //check if player type
    if (inputData.type == "player") {
        this.players.push(object);
    }

    if (inputData.type == "inJail card") {
        this.jail = object;
    }

    if (inputData.type == "windowDice") {
        this.windowDice = object;
    }

    if (inputData.type == "windowMenu") {
        this.windowMenu = object;
    }

    if (inputData.type == "windowMenuAction") {
        this.windowMenuAction = object;
    }

    if (inputData.type == "go card") {
        this.goCard = object;
    }

    if (inputData.type == "event") {
        this.events.push(object)
    }

    if (inputData.type == "freeParking card") {
        this.freeParking = object;
    }

    if (inputData.type == "goToJail card") {
        this.goToJail = object
    }

    if (inputData.type == "windowStatistics") {
        this.windowStatistics = object;
    }

    //==========================================================//

    //push object to array and return that object
    this.objects.push(object);
    return object;
}
Monopoly.prototype.batchCreateNewObject = function (inputDatas) {
    for (var x = 0; x < inputDatas.length; x++) {
        this.createNewObject(inputDatas[x]);
    }
}
Monopoly.prototype.dicing = function (number) {
    var totalDice = 0;
    if (number)
        this.windowDice.dicing(number)
    else
        this.windowDice.dicing()

    this.playerJustDicing();
    return totalDice;
}
Monopoly.prototype.lockDicing = function () {
    this.windowDice.body.buttonDice.addClass("button-disable");
}
Monopoly.prototype.unlockDicing = function () {
    this.windowDice.body.buttonDice.removeClass("button-disable");
}
Monopoly.prototype.console = function (text, clearConsole) {
    this.windowMenu.console(text, clearConsole);
}
Monopoly.prototype.refreshPlayerList = function () {
    if (this.windowMenu.body.playerInfoContainer == null ||
        this.windowMenu.body.playerInfoContainer.length == 0)
        this.windowMenu.rebuildPlayerInfoTable();
    else
        this.windowMenu.refresh();
}
Monopoly.prototype.nextPlayerTurn = function () {
    if (this.players.length > 0) {
        if (this.currentPlayerTurn == null) {
            this.currentPlayerTurn = this.players[0];
        }
        else {
            console.log("current player turn", this.currentPlayerTurn.name)
            var index = this.players.indexOf(this.currentPlayerTurn);
            if (index < this.players.length - 1) {
                this.currentPlayerTurn = this.players[index + 1];
            } else {
                this.currentPlayerTurn = this.players[0];
            }
        }
        this.currentPlayerTurn.indicateMyTurn();

        console.log("next player turn", this.currentPlayerTurn.name);
        this.currentPlayerTurn.location.glowing(this.currentPlayerTurn.color)

        return this.currentPlayerTurn;
    }
}
Monopoly.prototype.reset = function () {

    this.objects = [];
    this.properties = [];
    this.players = [];
    this.boardCards = [];
    this.board = null;
    this.jail = null;
    this.windowDice = null;
    this.windowMenu = null;
    this.currentPlayerTurn = null;

    if (this.container != null) {
        this.container.html("");
    }

    monopoly.batchCreateNewObject(cardObjs);
    monopoly.windowMenu.rebuildPlayerInfoTable();



    for (var x = 0; x < monopoly.players.length; x++) {
        monopoly.players[x].goToCard(); //move player to beginer card;
        monopoly.players[x].playerInfoContainer = this.windowMenu.body.playerInfoContainer[x]; //assign menu player list to player;
    }



}
Monopoly.prototype.start = function () {
    this.nextPlayerTurn();
}
Monopoly.prototype.glow_ownedProperties = function (playerId) {
    var player = this.getObject(playerId)
    player.glow_ownedProperties();
}
Monopoly.prototype.unGlow_ownedProperties = function (playerId) {
    var player = this.getObject(playerId)
    player.unglow_ownedProperties();
}
Monopoly.prototype.glow_allProperties = function (hslColor) {
    $.each(this.properties, function (i, property) {
        if (hslColor != null)
            property.glowing(hslColor);
        else
            property.glowing();
    })
}
Monopoly.prototype.unglow_allProperties = function () {
    $.each(this.properties, function (i, property) {
        property.unGlowing();
    })
}
Monopoly.prototype.flush_tempSelected = function () {
    this.tempSelecteds = [];
    this.tempSelected = null
}

Monopoly.prototype.gameOver = function () {
    this.windowStatistics.open();
}

Monopoly.prototype.playerJustDicing = function () {
    var diceTotal = this.windowDice.diceTotal;
    var currentPositionIndex = this.boardCards.indexOf(this.currentPlayerTurn.location);
    var goToPositionIndex = currentPositionIndex + diceTotal;

    this.console(this.currentPlayerTurn.name + " dicing: " + diceTotal, true);

    this.currentPlayerTurn.goToCard_Animation_IndexBase(currentPositionIndex, goToPositionIndex);
}
Monopoly.prototype.allowPlayerDicing = function () {
    this.nextPlayerTurn();
    if (this.jail.inJailPlayerIds.indexOf(this.currentPlayerTurn.monopolyId) != -1) {
        this.evaluateCurrentPlayerTurnForAction();
    }
    else
        this.unlockDicing();
}
Monopoly.prototype.selectable_allProperties = function () {
    var self = this;

    $.each(self.properties, function (i, property) {
        property.bodyHtml.css({ "cursor": "pointer" });
    })
}
Monopoly.prototype.unSelectable_allProperties = function () {
    var self = this;

    $.each(self.properties, function (i, property) {
        property.bodyHtml.css({ "cursor": "auto" });
        property.bodyHtml.off("click");
    })
}


Monopoly.prototype.evaluateCurrentPlayerTurnForAction = function () {
    var self = this;
    var currentPlayer = this.currentPlayerTurn;
    var currentLocation = currentPlayer.location;
    var option = {};
    var event;

    self.windowMenuAction.body.buttonOK.off("click");
    self.windowMenuAction.body.buttonYes.off("click");
    self.windowMenuAction.body.buttonNo.off("click");
    self.windowMenuAction.body.buttonPay.off("click");
    self.windowMenuAction.body.buttonDice.off("click");

    if (currentLocation.type == "property card") {
        option = this.evaluate_playerArriveAtProperty(currentPlayer, currentLocation);
    }
    else if (currentLocation.type == "event card") {
        console.log("event card")
        event = this.evaluate_playerArriveAtEvent(currentPlayer, currentLocation);
    }
    else if (currentLocation.type == "location card") {
        option = this.evaluate_playerArriveAtLocation(currentPlayer, currentLocation);
    }
    else if (currentLocation.type == "go card") {
        self.windowMenuAction.close();
    }
    else if (currentLocation.type == "inJail card") {
        option = this.evaluate_playerArriveAtInJail(currentPlayer, currentLocation);
    }
    else if (currentLocation.type == "goToJail card") {
        option = this.evaluate_playerArriveAtGoToJail(currentPlayer, currentLocation);
    }
    else if (currentLocation.type == "freeParking card") {
        self.windowMenuAction.close();
    }

    if (option.message) {
        this.windowMenuAction.open(option);
    }
    else if (event) {
        event.open();
    }

}
Monopoly.prototype.evaluate_playerArriveAtProperty = function (currentPlayer, currentLocation) {
    var option = {};
    var self = this;

    currentLocation.glowing();

    if (currentPlayer.monopolyId != currentLocation.ownerId) {
        if (currentLocation.isAvailable()) {
            option.message = "Are You Buying " + currentLocation.name + " at " + currentLocation.value;
            option.allowAction = "yesno";
            this.windowMenuAction.body.buttonYes.on("click", function () {
                currentLocation.unGlowing();
                self.windowMenuAction.body.buttonYes.off("click");
                self.windowMenuAction.close();
                currentPlayer.buy(currentPlayer.location);
            });

            this.windowMenuAction.body.buttonNo.on("click", function () {
                currentLocation.unGlowing();
                self.windowMenuAction.body.buttonNo.off("click");
                self.windowMenuAction.close();
            });
        }
        else {
            var playerOwner = this.getObject(currentLocation.ownerId)
            option.message = "You Have To Pay " + playerOwner.name + " For Renting " + currentLocation.name + " at $" + currentLocation.rent;
            option.allowAction = "ok";
            
            this.windowMenuAction.body.buttonOK.on("click", function () {
                currentLocation.unGlowing();
                self.windowMenuAction.body.buttonOK.off("click");
                //self.windowMenuAction.close();
                currentPlayer.payRent(currentPlayer.location);
            });
        }
    }
    else {
        if (currentLocation.maxLevel() != currentLocation.level) {
            currentLocation.levelUp();
            option.message = "Your " + currentLocation.name + " is Level Up: Level" + currentLocation.level;
            option.allowAction = "ok";
            this.windowMenuAction.body.buttonOK.on("click", function () {
                currentLocation.unGlowing();
                self.windowMenuAction.body.buttonOK.off("click");
                self.windowMenuAction.close();
            });
        }
        else {
            currentLocation.unGlowing();
            this.console(currentLocation.name + " Has Reach Max Level");
            this.unlockDicing();
        }
    }

    return option;
}
Monopoly.prototype.evaluate_playerArriveAtLocation = function (currentPlayer, currentLocation) {
    var option = {};
    var self = this;

    self.windowMenuAction.body.buttonYes.off("click");
    self.windowMenuAction.body.buttonNo.off("click");
    self.windowMenuAction.body.buttonOK.off("click");

    if (currentPlayer.money >= currentLocation.value) {
        option.message = "Do you wish to jump to a property."
        option.allowAction = "yesno";


        self.windowMenuAction.body.buttonYes.on("click", function () {
            self.windowMenuAction.body.buttonYes.off("click");
            self.windowMenuAction.message("Please Select a Property to Jump");
            self.glow_allProperties();
            self.selectable_allProperties();

            var propertySelected;

            $.each(self.properties, function (i, property) {
                property.body.innerContainer.click(function () {
                    propertySelected = property
                    self.windowMenuAction.message("You are selecting " + property.name + ". Yes to continue, No to stop");
                    self.windowMenuAction.actionAllow("yesno");
                })
            })

            self.windowMenuAction.body.buttonYes.on("click", function () {
                self.windowMenuAction.body.buttonYes.off("click");
                self.currentPlayerTurn.goToCard(propertySelected);
                self.currentPlayerTurn.money -= currentLocation.value;
                self.console(monopoly.currentPlayerTurn.name + " Pay " + currentLocation.value + " to jump")
                self.unglow_allProperties();
                self.unSelectable_allProperties();

                self.currentPlayerTurn.locationCt += 1;
                self.currentPlayerTurn.expense += currentLocation.value;

                self.evaluateCurrentPlayerTurnForAction();
            })



        });

        self.windowMenuAction.body.buttonNo.on("click", function () {
            console.log("no")
            self.windowMenuAction.body.buttonNo.off("click");
            self.unglow_allProperties();
            self.unSelectable_allProperties();
            self.windowMenuAction.close();
        })
    }
    else {
        option.message = "You do not have enough money to jump. Just stay there"
        option.allowAction = "ok";

        self.windowMenuAction.body.buttonOK.on("click", function () {
            self.windowMenuAction.body.buttonOK.off("click");
            self.windowMenuAction.close();
            //currentPlayer.buy(currentPlayer.location);
        });
    }
    return option;
}
Monopoly.prototype.evaluate_playerArriveAtGoToJail = function (currentPlayer, currentLocation) {
    var option = {};
    var self = this;

    option.message = "You Have To Go To Jail."
    option.allowAction = "ok";

    this.windowMenuAction.body.buttonOK.on("click", function () {
        self.windowMenuAction.body.buttonOK.off("click");
        currentPlayer.location.unGlowing();
        currentPlayer.goToJail();

        currentPlayer.inJailCt += 1;

        self.windowMenuAction.close();
    });

    return option;
}
Monopoly.prototype.evaluate_playerArriveAtInJail = function (currentPlayer, currentLocation) {
    var option = {};
    var self = this;

    if (currentLocation.inJailPlayerIds.indexOf(currentPlayer.monopolyId) != -1) {
        option.message = "- Dicing 3 times for any doubles. If fails, pay $100 or</br>- Pay $100 to get out oj Jail now"
        option.allowAction = "paydice"

        self.windowMenuAction.body.buttonPay.off("click");
        this.windowMenuAction.body.buttonPay.on("click", function () {
            self.windowMenuAction.body.buttonPay.off("click");
            
            if (currentPlayer.money_All() >= currentLocation.value) {
                currentPlayer.pay(currentLocation.value);
                self.jail.inJailPlayerIds.splice(self.jail.inJailPlayerIds.indexOf(currentPlayer.monopolyId), 1);
                currentPlayer.goToCard(monopoly.jail);
                self.windowMenuAction.close_notAdvanceToNextPlayer();
                self.unlockDicing();
            }
            else {
                currentPlayer.pay(currentLocation.value);
            }
            
        });
    }
    else {
        self.windowMenuAction.close();
    }
    return option;
}
Monopoly.prototype.evaluate_playerArriveAtEvent = function (currentPlayer, currentLocation) {
    var self = this;
    var event = {};

    if (self.events.length > 0) {
        var randomIndex = utils.randomNumber(0, self.events.length - 1)
        event = self.events[randomIndex];

        monopoly.eventsUsed.push(event);
        monopoly.events.splice(randomIndex, 1);
    }
    else {
        $.each(self.eventsUsed, function (i, event) {
            self.events.push(event);
        })
        self.eventsUsed = [];

        var randomIndex = utils.randomNumber(0, self.events.length - 1)
        event = self.events[randomIndex];

        monopoly.eventsUsed.push(event);
        monopoly.events.splice(randomIndex, 1);
    }

    currentPlayer.EventCt += 1;

    return event;
}



//#endregion Monopoly

//#region Utils

function Utils() {
    this.resizeElement = [];
    this.currentResizeClass;

    $(window).resize(function () { utils.resize(); });
}
Utils.prototype.constructor = Utils;
Utils.prototype.getRent = function (rentArray, level) {
    for (var x = 0; x < rentArray.length; x++) {
        if (rentArray[x].level == level)
            return rentArray[x].rent;
    }
}
Utils.prototype.onWatchListResize = function (element) {
    var w = window.innerWidth;
    var h = window.innerHeight;

    var allClass = ["size-xs", "size-sm", "size-md", "size-lg", "size-xlg"]
    var addClass = allClass[0];
    if (h <= 704)
        addClass = allClass[0];
    if (h > 704 && h < 750)
        addClass = allClass[1];
    if (h >= 750 && h <= 850)
        addClass = allClass[2];
    if (h > 850 && h < 950)
        addClass = allClass[3];
    if (h > 950)
        addClass = allClass[4];
    this.currentResizeClass = addClass
    $.each(allClass, function (index, eachClass) {
        element.removeClass(eachClass);
    });
    element.addClass(addClass);

    this.resizeElement.push(element);
}
Utils.prototype.resize = function () {
    var items = this.resizeElement
    var w = window.innerWidth;
    var h = window.innerHeight;

    var allClass = ["size-xs", "size-sm", "size-md", "size-lg", "size-xlg", "size-xxlg"]
    var addClass = allClass[0];
    if (h <= 704)
        addClass = allClass[0];
    if (h > 704 && h < 750)
        addClass = allClass[1];
    if (h >= 750 && h <= 850)
        addClass = allClass[2];
    if (h > 850 && h < 950)
        addClass = allClass[3];
    if (h > 950 && h < 1050)
        addClass = allClass[4];
    if (h >= 1050)
        addClass = allClass[5];

    if (this.currentResizeClass != addClass) {
        this.currentResizeClass = addClass
        $.each(items, function (i, item) {
            $.each(allClass, function (index, eachClass) {
                item.removeClass(eachClass);
            });
            item.addClass(addClass);
        })
    }

    var text = "Resize: " + w + " - " + h + " ; class: " + addClass;

    monopoly.console(text, true)
}
Utils.prototype.createHSLColor = function (hsl) {
    var text = "hsl(";
    text += hsl.h + ",";
    text += hsl.s + "%,";
    text += hsl.l + "%";
    text += ")";
    return text;
}
Utils.prototype.randomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
Utils.prototype.clone = function (orgObj) {
    return JSON.parse(JSON.stringify(orgObj));
}
Utils.prototype.hslWhite = function () {
    return { h: 0, s: 0, l: 100 };
}


//#endregion Utils

//#region Card

function Card(rawData) {
    this.rawData = rawData;
    this.type = "card";
    this.body = {};
    this.bodyHtml = {};
    this.monopolyId;
}
Card.prototype.constructor = Card;
Card.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
}
Card.prototype.initial = function () {
    var container = $("<div>", {
        "class": "card"
    });
    this.body.container = container;

    var innerContainer = $("<div>", {
        "class": "card-inner-container"
    });
    this.body.innerContainer = innerContainer;
    utils.onWatchListResize(innerContainer);

    var headerContainer = $("<div>", {
        "class": "card-header-container"
    })
    this.body.headerContainer = headerContainer;
    utils.onWatchListResize(headerContainer);

    var bodyContainer = $("<div>", {
        "class": "card-body-container"
    })
    this.body.bodyContainer = bodyContainer;
    utils.onWatchListResize(bodyContainer);

    var footerContainer = $("<div>", {
        "class": "card-footer-container"
    })
    this.body.footerContainer = footerContainer;
    utils.onWatchListResize(footerContainer);

    var avatarContainer = $("<div>", {
        "class": "card-avatar-container"
    });
    this.body.avatarContainer = avatarContainer;
    utils.onWatchListResize(avatarContainer);

    innerContainer.append(headerContainer);
    innerContainer.append(bodyContainer);
    innerContainer.append(footerContainer);
    innerContainer.append(avatarContainer);
    container.append(innerContainer);

    this.bodyHtml = container;
}

//===============================PROPERTY CARD==============================================//

function PropertyCard(rawData) {
    this.rawData = rawData;
    this.type = "property card";
    this.body = {};
    this.bodyHtml = {};

    this.monopolyId;
    this.numnber;
    this.value;
    this.rent;
    this.level;
    this.name;
    this.ownerId;
    this.playerIds = [];
    this.isGlowing = false;

    this.history = [];

    var aHistory = {
        monopolyId: "",
        action: "",
        value: ""
    }
}
PropertyCard.prototype.constructor = PropertyCard;
PropertyCard.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
}
PropertyCard.prototype.initial = function () {
    var card = new Card(this.rawData)
    card.initial();

    this.body = card.body;
    this.bodyHtml = card.bodyHtml;
    this.number = this.rawData.number;
    this.level = 1;
    this.value = this.rawData.money * this.level;
    this.rent = utils.getRent(this.rawData.rents, this.level);
    this.name = this.rawData.name;

    //==================================================//
    this.body.levelAvatar = $("<i>", {
        "class": "fa fa-home"
    })

    //==================================================//
    this.body.innerContainer.addClass("gradient-black-background");
    this.body.headerContainer.addClass("card-property");
    this.body.bodyContainer.addClass("card-property");
    this.body.footerContainer.addClass("card-property");

    //==================================================//
    this.body.headerContainer.css({
        "background-color": utils.createHSLColor(this.rawData.color)
    });


    //==================================================//
    var tableHeader = $("<table>", { "class": "table", })
    var tr = $("<tr>");
    var levelContainer = $("<td>", { "style": "text-align: left; padding-left: 5px;", });
    var ownerContainer = $("<td>", {
        "style": "text-align: right; padding-right: 5px;",
        "class": "font-size-xs"
    });

    levelContainer.append(this.body.levelAvatar.clone())
    tr.append(levelContainer);
    tr.append(ownerContainer);
    tableHeader.append(tr);
    this.body.headerContainer.append(tableHeader);

    this.body.levelContainer = levelContainer;
    this.body.ownerContainer = ownerContainer;
    //==================================================//

    var divNumber = $("<div>", {
        "class": "property-number gradient-golden-background font-bolder circle-container",
        "html": this.number,
        "style": "width: 30%; margin: 0 auto;"
    })
    var divName = $("<div>", {
        "class": "property-name gradient-golden-text font-bold",
        "html": this.name
    })
    this.body.bodyContainer.append(divNumber)
    this.body.bodyContainer.append(divName)

    //==================================================//
    var divValueTable = $("<table>", {
        "class": "table property-value-rent golden-text font-bold"
    })
    var trValueTable = $("<tr>", {});
    var thBuy = $("<td>", {
        "html": "V:",
        "style": "text-align: right;"
    });
    var valueContainer = $("<td>", {
        "style": "text-align: left;",
        "html": this.value
    });
    var thRent = $("<td>", {
        "html": "R:",
        "style": "text-align: right;"
    });
    var rentContainer = $("<td>", {
        "style": "text-align: left;",
        "html": this.rent
    });
    trValueTable.append(thBuy);
    trValueTable.append(valueContainer);
    trValueTable.append(thRent);
    trValueTable.append(rentContainer);
    divValueTable.append(trValueTable);
    this.body.footerContainer.append(divValueTable);

    this.body.valueContainer = valueContainer;
    this.body.rentContainer = rentContainer;
    this.body.valueTable = divValueTable;

}
PropertyCard.prototype.isAvailable = function () {
    var isAvailable = true;
    if (this.ownerId != null && this.ownerId != "")
        return false;
    return isAvailable;
}
PropertyCard.prototype.registerOwner = function (monopolyObject) {

    var index = monopolyObject.properties.indexOf(this.monopolyId);

    if (index == -1) {
        monopolyObject.properties.push(this.monopolyId);
    }

    this.ownerId = monopolyObject.monopolyId;

    this.refresh("owner");

    var aHistory = {
        monopolyId: this.ownerId,
        action: "buy",
        value: this.value
    }

    this.history.push(aHistory);
}
PropertyCard.prototype.unRegisterOwner = function () {

    var ownerPlayer = monopoly.getObject(this.ownerId);

    var aHistory = {
        monopolyId: this.ownerId,
        action: "sell",
        value: this.value
    }
    this.history.push(aHistory);

    ownerPlayer.unRegisterProperty(this);

    this.refresh("owner");

    

}
PropertyCard.prototype.refresh = function (option) {
    if (option != null)
        option = option.toLowerCase();
    //recreate the visual data
    if (option == null || option == "level") {
        this.body.levelContainer.hide();
        this.body.levelContainer.text("");
        for (x = 0; x < this.level; x++)
            this.body.levelContainer.append(this.body.levelAvatar.clone());
        this.body.levelContainer.fadeIn(1000);
    }

    if (option == null || option == "owner") {
        this.body.ownerContainer.hide();
        this.body.ownerContainer.text("");
        if (monopoly.getObject(this.ownerId) != null)
            this.body.ownerContainer.append(monopoly.getObject(this.ownerId).avatar.clone());
        this.body.ownerContainer.fadeIn(1000)
    }

    if (option == null || option == "avatar") {
        this.body.avatarContainer.text("");
        for (x = 0; x < this.playerIds.length; x++)
            this.body.avatarContainer.append(monopoly.getObject(this.playerIds[x]).avatar);
    }

    if (option == null || option == "rent" || option == "value" || option == "rentvalue") {
        this.body.valueContainer.text("");
        this.body.rentContainer.text("");
        this.body.valueTable.hide()
        this.body.valueContainer.append(this.value);
        this.body.rentContainer.append(this.rent);
        this.body.valueTable.fadeIn(1000);
    }

}
PropertyCard.prototype.glowing = function (hslColor) {
    this.isGlowing = true;
    if (hslColor == null) {
        if (this.ownerId == null) {
            hslColor = { h: 0, s: 0, l: 100 };
        }
        else {
            hslColor = monopoly.getObject(this.ownerId).color
        }
    }

    this.body.innerContainer.css({
        "border": "5px solid " + utils.createHSLColor(hslColor)
    });
}
PropertyCard.prototype.unGlowing = function () {
    this.isGlowing = false;
    this.body.innerContainer.css({
        "border": "none"
    });
}
PropertyCard.prototype.maxLevel = function () {
    var max = 0;
    for (var x = 0; x < this.rawData.rents.length; x++) {
        if (this.rawData.rents[x].level > max)
            max = this.rawData.rents[x].level;
    }
    return max;
}
PropertyCard.prototype.levelUp = function (level) {
    var max = this.maxLevel();
    if (level == null) {
        if (this.level < max) {
            this.level += 1;
        }
    } else {
        this.level = level;
    }

    this.rent = utils.getRent(this.rawData.rents, this.level);
    this.value = this.rawData.money * this.level;

    monopoly.console(this.name + " Level Up: " + this.level);
    monopoly.console("Value: $" + this.value + " - Rent: $" + this.rent);

    this.refresh();
}
PropertyCard.prototype.levelDown = function (level) {
    var min = 1;
    if (level == null) {
        if (this.level > min) {
            this.level -= 1;
        }
    } else {
        this.level = level;
    }

    this.rent = utils.getRent(this.rawData.rents, this.level);
    this.value = this.rawData.money * this.level;

    monopoly.console(this.name + " Level Down: " + this.level);
    monopoly.console("Value: $" + this.value + " - Rent: $" + this.rent);

    this.refresh();
}
PropertyCard.prototype.playerArrive = function (monopolyId) {
    if (this.playerIds.indexOf(monopolyId) == -1) {
        this.playerIds.push(monopolyId)
        this.refresh("avatar");
    }
}
PropertyCard.prototype.playerLeave = function (monopolyId) {
    var index = this.playerIds.indexOf(monopolyId);
    if (index != -1) {
        this.playerIds.splice(index, 1);
        this.refresh("avatar");
    }
}
PropertyCard.prototype.neighbors = function () {
    var self = this;
    var neighbors = [];
    var index = monopoly.properties.indexOf(self);
    if (index == monopoly.properties.length - 1) {
        neighbors.push(monopoly.properties[index - 1]);
        neighbors.push(monopoly.properties[0]);
    }
    else if (index == 0) {
        neighbors.push(monopoly.properties[monopoly.properties.length - 1]);
        neighbors.push(monopoly.properties[index + 1]);
    }
    else {
        neighbors.push(monopoly.properties[index - 1]);
        neighbors.push(monopoly.properties[index + 1]);
    }
    return neighbors;
}


//===============================GO CARD==============================================//

function GoCard(rawData) {
    this.rawData = rawData;
    this.type = "go card";
    this.body = {};
    this.bodyHtml = {};
    this.monopolyId;

    this.name = "GO"
    this.value;
    this.playerIds = [];
}
GoCard.prototype.constructor = GoCard;
GoCard.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
}
GoCard.prototype.initial = function () {
    var card = new Card(this.rawData)
    card.initial();

    this.body = card.body;
    this.bodyHtml = card.bodyHtml;
    this.value = this.rawData.money;

    //============================================//
    this.body.innerContainer.addClass("gradient-black-background");
    this.body.headerContainer.addClass("card-go");
    this.body.bodyContainer.addClass("card-go");
    this.body.footerContainer.addClass("card-go");

    //============================================//
    this.body.headerContainer.append("COLLECT $" + this.value + " SALARY AS YOU PASS");
    this.body.headerContainer.addClass("gradient-golden-text");
    this.body.headerContainer.addClass("font-bold");
    //============================================//
    this.body.bodyContainer.append("GO");
    this.body.bodyContainer.addClass("gradient-golden-text");
    this.body.bodyContainer.addClass("font-bolder");
    this.body.bodyContainer.addClass("font-size-1x5");
    //============================================//
    this.body.footerContainer.append("<i class=\"fa fa-2x fa-long-arrow-right\"></i>");
    this.body.footerContainer.addClass("red-text")
}
GoCard.prototype.playerArrive = function (monopolyId) {
    if (this.playerIds.indexOf(monopolyId) == -1) {
        this.playerIds.push(monopolyId)
        this.refresh();
    }
}
GoCard.prototype.playerLeave = function (monopolyId) {
    var index = this.playerIds.indexOf(monopolyId);
    if (index != -1) {
        this.playerIds.splice(index, 1);
        this.refresh();
    }
}
GoCard.prototype.refresh = function () {
    //remove all visual data    
    this.body.avatarContainer.text("");

    //recreate the visual data    
    for (x = 0; x < this.playerIds.length; x++)
        this.body.avatarContainer.append(monopoly.getObject(this.playerIds[x]).avatar);

}
GoCard.prototype.glowing = function (hslColor) {
    if (hslColor != null) {
        this.body.innerContainer.css({
            "border": "5px solid " + utils.createHSLColor(hslColor)
        });
    }
}
GoCard.prototype.unGlowing = function () {
    this.body.innerContainer.css({
        "border": "none"
    });
}
//===============================LOCATION CARD==============================================//

function LocationCard(rawData) {
    this.rawData = rawData;
    this.type = "location card";
    this.body = {};
    this.bodyHtml = {};
    this.monopolyId;

    this.name = "Location"
    this.value;
    this.playerIds = [];
}
LocationCard.prototype.constructor = LocationCard;
LocationCard.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
}
LocationCard.prototype.initial = function () {
    var card = new Card(this.rawData)
    card.initial();

    this.body = card.body;
    this.bodyHtml = card.bodyHtml;
    this.value = this.rawData.money;

    //============================================//
    this.body.locationAvatar = $("<i>", {
        "class": "fa fa-2x fa-map-marker"
    })

    //============================================//
    this.body.innerContainer.addClass("gradient-black-background");
    this.body.headerContainer.addClass("card-location");
    this.body.bodyContainer.addClass("card-location");
    this.body.footerContainer.addClass("card-location");

    //============================================//
    this.body.bodyContainer.append(this.body.locationAvatar);
    this.body.bodyContainer.addClass("blue-text");
    this.body.bodyContainer.addClass("font-bolder");
    this.body.bodyContainer.addClass("font-size-2x");
    //============================================//
    this.body.footerContainer.append(this.value);
    this.body.footerContainer.addClass("gradient-golden-text");
    this.body.footerContainer.addClass("font-bolder");
}
LocationCard.prototype.playerArrive = function (monopolyId) {
    if (this.playerIds.indexOf(monopolyId) == -1) {
        this.playerIds.push(monopolyId)
        this.refresh();
    }
}
LocationCard.prototype.playerLeave = function (monopolyId) {
    var index = this.playerIds.indexOf(monopolyId);
    if (index != -1) {
        this.playerIds.splice(index, 1);
        this.refresh();
    }
}
LocationCard.prototype.refresh = function () {
    //remove all visual data    
    this.body.avatarContainer.text("");

    //recreate the visual data    
    for (x = 0; x < this.playerIds.length; x++)
        this.body.avatarContainer.append(monopoly.getObject(this.playerIds[x]).avatar);

}
LocationCard.prototype.glowing = function (hslColor) {
    if (hslColor != null) {
        this.body.innerContainer.css({
            "border": "5px solid " + utils.createHSLColor(hslColor)
        });
    }
}
LocationCard.prototype.unGlowing = function () {
    this.body.innerContainer.css({
        "border": "none"
    });
}


//===============================EVENT CARD==============================================//

function EventCard(rawData) {
    this.rawData = rawData;
    this.type = "event card";
    this.body = {};
    this.bodyHtml = {};
    this.monopolyId;

    this.name = "Event"
    this.playerIds = [];
}
EventCard.prototype.constructor = EventCard;
EventCard.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
}
EventCard.prototype.initial = function () {
    var card = new Card(this.rawData)
    card.initial();

    this.body = card.body;
    this.bodyHtml = card.bodyHtml;

    //============================================//
    this.body.eventAvatar = $("<i>", {
        "class": "fa fa-2x fa-question-circle-o"
    })

    //============================================//
    this.body.innerContainer.addClass("gradient-blue-background");
    this.body.headerContainer.addClass("card-event");
    this.body.bodyContainer.addClass("card-event");
    this.body.footerContainer.addClass("card-event");

    //============================================//
    this.body.bodyContainer.append(this.body.eventAvatar);
    this.body.bodyContainer.addClass("golden-text");
    this.body.bodyContainer.addClass("font-bolder");
    this.body.bodyContainer.addClass("font-size-2x");
    //============================================//

}
EventCard.prototype.playerArrive = function (monopolyId) {
    if (this.playerIds.indexOf(monopolyId) == -1) {
        this.playerIds.push(monopolyId)
        this.refresh();
    }
}
EventCard.prototype.playerLeave = function (monopolyId) {
    var index = this.playerIds.indexOf(monopolyId);
    if (index != -1) {
        this.playerIds.splice(index, 1);
        this.refresh();
    }
}
EventCard.prototype.refresh = function () {
    //remove all visual data    
    this.body.avatarContainer.text("");

    //recreate the visual data    
    for (x = 0; x < this.playerIds.length; x++)
        this.body.avatarContainer.append(monopoly.getObject(this.playerIds[x]).avatar);

}
EventCard.prototype.glowing = function (hslColor) {
    if (hslColor != null) {
        this.body.innerContainer.css({
            "border": "5px solid " + utils.createHSLColor(hslColor)
        });
    }
}
EventCard.prototype.unGlowing = function () {
    this.body.innerContainer.css({
        "border": "none"
    });
}

//===============================GOTOJAIL CARD==============================================//

function GoToJailCard(rawData) {
    this.rawData = rawData;
    this.type = "goToJail card";
    this.body = {};
    this.bodyHtml = {};
    this.monopolyId;

    this.name = "'Go To Jail'";
    this.playerIds = [];
}
GoToJailCard.prototype.constructor = GoToJailCard;
GoToJailCard.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
}
GoToJailCard.prototype.initial = function () {
    var card = new Card(this.rawData)
    card.initial();

    this.body = card.body;
    this.bodyHtml = card.bodyHtml;

    //============================================//
    this.body.goToJailAvatar = $("<i>", {
        "class": "icofont icofont-police"
    })

    //============================================//
    this.body.innerContainer.addClass("gradient-black-background");
    this.body.headerContainer.addClass("card-goToJail");
    this.body.bodyContainer.addClass("card-goToJail");
    this.body.footerContainer.addClass("card-goToJail");


    this.body.headerContainer.append("GO TO");
    this.body.headerContainer.addClass("gradient-golden-text");
    this.body.headerContainer.addClass("font-bolder");
    //============================================//
    this.body.bodyContainer.append(this.body.goToJailAvatar);
    this.body.bodyContainer.addClass("gradient-blue-text");
    this.body.bodyContainer.addClass("font-bolder");
    this.body.bodyContainer.addClass("font-size-3x");
    //============================================//
    this.body.footerContainer.append("JAIL");
    this.body.footerContainer.addClass("gradient-golden-text");
    this.body.footerContainer.addClass("font-bolder");

}
GoToJailCard.prototype.playerArrive = function (monopolyId) {
    if (this.playerIds.indexOf(monopolyId) == -1) {
        this.playerIds.push(monopolyId)
        this.refresh();
    }
}
GoToJailCard.prototype.playerLeave = function (monopolyId) {
    var index = this.playerIds.indexOf(monopolyId);
    if (index != -1) {
        this.playerIds.splice(index, 1);
        this.refresh();
    }
}
GoToJailCard.prototype.refresh = function () {
    //remove all visual data    
    this.body.avatarContainer.text("");

    //recreate the visual data    
    for (x = 0; x < this.playerIds.length; x++)
        this.body.avatarContainer.append(monopoly.getObject(this.playerIds[x]).avatar);

}
GoToJailCard.prototype.glowing = function (hslColor) {
    if (hslColor != null) {
        this.body.innerContainer.css({
            "border": "5px solid " + utils.createHSLColor(hslColor)
        });
    }
}
GoToJailCard.prototype.unGlowing = function () {
    this.body.innerContainer.css({
        "border": "none"
    });
}


//===============================INJAIL CARD==============================================//

function InJailCard(rawData) {
    this.rawData = rawData;
    this.type = "inJail card";
    this.body = {};
    this.bodyHtml = {};
    this.monopolyId;

    this.name = "Jail";
    this.subName = ": Just Visit"
    this.value;
    this.playerIds = [];
    this.inJailPlayerIds = [];
}
InJailCard.prototype.constructor = InJailCard;
InJailCard.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
}
InJailCard.prototype.playerArrive = function (monopolyId) {
    if (this.playerIds.indexOf(monopolyId) == -1) {
        this.playerIds.push(monopolyId)
        this.refresh();
    }
}
InJailCard.prototype.playerLeave = function (monopolyId) {
    var index = this.playerIds.indexOf(monopolyId);
    if (index != -1) {
        this.playerIds.splice(index, 1);
        this.refresh();
    }
}
InJailCard.prototype.refresh = function () {
    //remove all visual data    
    this.body.avatarContainer.text("");
    this.body.jailContainer.html("")
    //recreate the visual data    
    for (var x = 0; x < this.playerIds.length; x++)
        this.body.avatarContainer.append(monopoly.getObject(this.playerIds[x]).avatar);
    for(var x = 0; x < this.inJailPlayerIds.length; x++){
        this.body.jailContainer.append(monopoly.getObject(this.inJailPlayerIds[x]).avatar);
    }

}
InJailCard.prototype.initial = function () {
    var card = new Card(this.rawData)
    card.initial();

    this.value = this.rawData.money;
    this.body = card.body;
    this.bodyHtml = card.bodyHtml;

    //============================================//
    this.body.goToJailAvatar = $("<i>", {
        "class": "icofont icofont-jail"
    })

    //============================================//
    this.body.innerContainer.addClass("gradient-black-background");
    this.body.headerContainer.addClass("card-inJail");
    this.body.bodyContainer.addClass("card-inJail");
    this.body.footerContainer.addClass("card-inJail");


    this.body.headerContainer.append("IN JAIL");
    this.body.headerContainer.addClass("gradient-golden-text");
    this.body.headerContainer.addClass("font-bolder");
    //============================================//
    this.body.bodyContainer.append(this.body.goToJailAvatar);
    this.body.bodyContainer.addClass("gradient-blue-text");
    this.body.bodyContainer.addClass("font-bolder");
    this.body.bodyContainer.addClass("font-size-2x");

    var jailContainer = $("<div>", {
        "class": "jail-container",
    })
    this.body.bodyContainer.append(jailContainer);
    this.body.jailContainer = jailContainer;
    //============================================//
    this.body.footerContainer.append("JUST VISITING");
    this.body.footerContainer.addClass("gradient-golden-text");
    this.body.footerContainer.addClass("font-bolder");

}
InJailCard.prototype.glowing = function (hslColor) {
    if (hslColor != null) {
        this.body.innerContainer.css({
            "border": "5px solid " + utils.createHSLColor(hslColor)
        });
    }
}
InJailCard.prototype.unGlowing = function () {
    this.body.innerContainer.css({
        "border": "none"
    });
}
//===============================FREEPARKING CARD==============================================//

function FreeParkingCard(rawData) {
    this.rawData = rawData;
    this.type = "freeParking card";
    this.body = {};
    this.bodyHtml = {};
    this.monopolyId;

    this.name = "Free Parking";
    this.playerIds = [];
}
FreeParkingCard.prototype.constructor = FreeParkingCard;
FreeParkingCard.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
}
FreeParkingCard.prototype.initial = function () {
    var card = new Card(this.rawData)
    card.initial();

    this.body = card.body;
    this.bodyHtml = card.bodyHtml;

    //============================================//
    this.body.goToJailAvatar = $("<i>", {
        "class": "fa fa-2x fa-car"
    })

    //============================================//
    this.body.innerContainer.addClass("gradient-black-background");
    this.body.headerContainer.addClass("card-freeParking");
    this.body.bodyContainer.addClass("card-freeParking");
    this.body.footerContainer.addClass("card-freeParking");

    this.body.headerContainer.append("FREE");
    this.body.headerContainer.addClass("gradient-golden-text");
    this.body.headerContainer.addClass("font-bolder");
    //============================================//
    this.body.bodyContainer.append(this.body.goToJailAvatar);
    this.body.bodyContainer.addClass("red-text");
    this.body.bodyContainer.addClass("font-bolder");
    this.body.bodyContainer.addClass("font-size-2x");
    //============================================//
    this.body.footerContainer.append("PARKING");
    this.body.footerContainer.addClass("gradient-golden-text");
    this.body.footerContainer.addClass("font-bolder");

}
FreeParkingCard.prototype.playerArrive = function (monopolyId) {
    if (this.playerIds.indexOf(monopolyId) == -1) {
        this.playerIds.push(monopolyId)
        this.refresh();
    }
}
FreeParkingCard.prototype.playerLeave = function (monopolyId) {
    var index = this.playerIds.indexOf(monopolyId);
    if (index != -1) {
        this.playerIds.splice(index, 1);
        this.refresh();
    }
}
FreeParkingCard.prototype.refresh = function () {
    //remove all visual data    
    this.body.avatarContainer.text("");

    //recreate the visual data    
    for (x = 0; x < this.playerIds.length; x++)
        this.body.avatarContainer.append(monopoly.getObject(this.playerIds[x]).avatar);

}
FreeParkingCard.prototype.glowing = function (hslColor) {
    if (hslColor != null) {
        this.body.innerContainer.css({
            "border": "5px solid " + utils.createHSLColor(hslColor)
        });
    }
}
FreeParkingCard.prototype.unGlowing = function () {
    this.body.innerContainer.css({
        "border": "none"
    });
}
//#endregion Card

//#region Board

function Board(rawData) {
    this.rawData = rawData;
    this.type = "board";
    this.body = {};
    this.bodyHtml = {};
    this.monopolyId;

    this.width;
    this.height;
    this.cellIds = [];
    this.windowDice = {};
    this.windowMenu = {};
}
Board.prototype.constructor = Board;
Board.prototype.initial = function () {
    this.width = this.rawData.width;
    this.height = this.rawData.height;
    this.cellIds = this.getCellIds();

    var width = this.width;
    var height = this.height;

    var $boardContainer = $("<table>", {
        "class": "monopoly-board",
        "style": "margin: auto"
    });

    //this.windowDice = monopoly.createNewObject({
    //    type: "windowDice",
    //    dice: this.rawData.dice
    //});

    this.windowMenu = monopoly.createNewObject({
        type: "windowMenu",
        dice: this.rawData.dice
    })
    this.windowStatistic = monopoly.createNewObject({
        type: "windowStatistics"
    })


    var notInnerSpanYet = true;
    for (var x = 0; x < height; x++) {
        var tr = $("<tr>");

        for (var y = 0; y < width; y++) {
            if ((y == 0) || (y == width - 1) || (x == 0) || (x == height - 1)) {
                var td = $("<td>", {
                    "width": "auto",
                    "height": "auto",
                    "id": "monopoly-cell-" + x + "-" + y,
                    "class": "monopoly-cell"
                });
                tr.append(td);
            }
            else {
                if (notInnerSpanYet) {

                    var td = $("<td>", {
                        "colspan": width - 2,
                        "rowspan": height - 2,
                        "id": "monopoly-cell-bigInner",
                    });
                    var h1 = $("<h1>", {
                        "html": "Monopoly",
                        "class": "gradient-golden-text font-bolder cursor-pointer",
                        "style": "display: inline-block; width: auto"
                    });

                    
                    
                    this.body.buttonStatistics = h1;
                    td.append(h1);
                    //td.append(this.windowDice.bodyHtml);
                    td.append(this.windowMenu.bodyHtml);
                    //td.append(this.windowStatistic.bodyHtml);
                    tr.append(td);
                    notInnerSpanYet = false;
                }
            }
        }
        $boardContainer.append(tr);
    }

    this.bodyHtml = $boardContainer;
    this.body.boardContainer = $boardContainer;

    if (monopoly.container != null)
        this.appendTo(monopoly.container);
}
Board.prototype.getCellIds = function () {
    var width = this.width;
    var height = this.height;
    var cells = [];
    for (x = 0; x < width; x++) {
        var cell = "monopoly-cell-0-" + x;
        if (cells.indexOf(cell) == -1)
            cells.push(cell);
    }
    for (x = 0; x < height; x++) {
        var cell = "monopoly-cell-" + x + "-" + (width - 1);
        if (cells.indexOf(cell) == -1)
            cells.push(cell);
    }
    for (x = width - 1; x >= 0 ; x--) {
        var cell = "monopoly-cell-" + (height - 1) + "-" + x;
        if (cells.indexOf(cell) == -1)
            cells.push(cell);
    }
    for (x = height - 1; x >= 0 ; x--) {
        var cell = "monopoly-cell-" + x + "-" + 0;
        if (cells.indexOf(cell) == -1)
            cells.push(cell);
    }
    return cells;
}
Board.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
    JqueryHtmlBlock.append(this.windowStatistic.bodyHtml);

    this.body.buttonStatistics.on("click", function () {
        monopoly.windowStatistics.open();
    })

    this.fillCells();
    utils.resize();
}
Board.prototype.fillCells = function () {
    if (monopoly.boardCards.length == this.cellIds.length) {
        for (var x = 0 ; x < this.cellIds.length; x++) {
            $("#" + this.cellIds[x]).append(monopoly.boardCards[x].bodyHtml);
        }
    }
    else {
        console.log("Error", "board Cells numer != board Cards number");
    }
}


function Dice() {
    this.type = "dice";
    this.body = {};
    this.bodyHtml = {};
    this.monopolyId;

    this.number;
}
Dice.prototype.constructor = Dice;
Dice.prototype.initial = function () {

    this.number = utils.randomNumber(1, 6);

    var container = $("<div>", {
        "class": "dice-cube gradient-black-background",
        "html": this.number
    })

    this.body.diceContainer = container;
    this.bodyHtml = container;
}
Dice.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
}
Dice.prototype.dicing = function (number) {

    if (number != null) {
        this.body.diceContainer.html(this.number);
    } else {
        this.number = utils.randomNumber(1, 6);
        this.body.diceContainer.html(this.number);
    }

    return this.number;
}


function WindowDice(rawData) {
    this.rawData = rawData;
    this.type = "windowDice";
    this.body = {};
    this.bodyHtml = {};
    this.monopolyId;

    this.numberOfDice;
    this.dices = [];
    this.diceTotal;
}
WindowDice.prototype.constructor = WindowDice;
WindowDice.prototype.initial = function () {
    this.numberOfDice = this.rawData.dice;
    var self = this;

    var container = $("<div>", {
        "class": "windowDice-container gradient-black-background",
        "style": "display:block"
    })

    var diceButton = $("<button>", {
        "class": "btn btn-default font-bolder font-size-1x5 gradient-golden-background",
        "html": "Dice",
        "style": "margin-right: 0.5em "
    })

    diceButton.click(function () {
        self.dicing();
        monopoly.playerJustDicing();
    })

    container.append(diceButton);

    this.body.diceContainers = [];
    for (x = 0; x < this.numberOfDice; x++) {
        var dice = monopoly.createNewObject({
            type: "dice"
        });
        dice.body.diceContainer.addClass("cursor-pointer");
        container.append(dice.bodyHtml);

        this.body.diceContainers.push(dice.body.diceContainer)
        this.dices.push(dice);
    }

    container.draggable({ handle: ".dice-cube" });

    this.bodyHtml = container;

    this.body.windowDice = container;
    this.body.buttonDice = diceButton;
};
WindowDice.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
}
WindowDice.prototype.dicing = function (number) {
    var total = 0;

    if (number != null) {
        $.each(this.dices, function (i, dice) {
            dice.dicing(-1);
        });
        total = number;
    } else {
        $.each(this.dices, function (i, dice) {
            total += dice.dicing();
        });

    }
    this.diceTotal = total;

    return total;
}


function WindowMenu(rawData) {
    this.rawData = rawData;
    this.type = "windowMenu";
    this.body = {};
    this.bodyHtml = {};
    this.monopolyId;
}
WindowMenu.prototype.constructor = WindowMenu;
WindowMenu.prototype.initial = function () {

    var outerContainer = $("<div>", {
        "class": "gradient-black-background",
        "style": "width: 350px; position: absolute; z-index: 10; top:20% "
    })

    var container = $("<div>", {
        "class": "panel panel-primary windowMenu-container gradient-black-background",
        "style": "margin-bottom: 0"
    })

    var containerHeader = $("<div>", {
        "class": "panel-heading cursor-pointer",
        "html": "Monopoly"
    });

    var containerBody = $("<div>", {
        "class": "panel-body",
    });

    var playerInfoTable = $("<table>", {
        "class": "table player-info-table",
    })
    this.body.playerInfoContainer = [];
    this.body.playerMoneyContainer = [];
    $.each(monopoly.players, function (i, player) {
        var tr = $("<tr>", {
            'id': 'player-info-' + player.monopolyId,
        });
        var tdName = $("<td>", {
            'class': 'font-bold player-info-name',
            'html': player.name,
            "style": "color: #ccc"
        });
        var tdAvatar = $('<td>', {
            'class': 'player-info-avatar',
            'html': player.avatar.clone()
        });
        var tdMoney = $('<td>', {
            'class': 'font-bold player-info-money',
            'html': player.money,
            "style": "color: #ccc"
        });

        tr.append(tdName);
        tr.append(tdAvatar);
        tr.append(tdMoney);

        this.body.playerMoneyContainer.push(tdMoney);
        this.body.playerInfoContainer.push(tr);

        playerInfoTable.append(tr);
    });

    var consoleLogContainer = $("<div>", {
        "class": "console-log-container font-bold",
        "style": "height: 150px; overflow: overlay; word-break: break-word; color: #ccc; margin-top: 10px; text-align: left"
    });

    containerBody.append(playerInfoTable)
    containerBody.append(consoleLogContainer);

    container.append(containerHeader);
    container.append(containerBody);

    var windowDice = monopoly.createNewObject({
        type: "windowDice",
        dice: this.rawData.dice
    });

    var windowMenuAction = monopoly.createNewObject({
        type: "windowMenuAction"
    });

    outerContainer.append(container)
    outerContainer.append(windowDice.bodyHtml)
    outerContainer.append(windowMenuAction.bodyHtml)

    outerContainer.draggable({ handle: ".panel-heading" });

    this.body.container = container;
    this.body.console = consoleLogContainer;
    this.body.playerInfoTable = playerInfoTable;

    this.bodyHtml = outerContainer;
}
WindowMenu.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
}
WindowMenu.prototype.refresh = function () {
    for (var x = 0; x < monopoly.players.length; x++) {
        var currentMoney = this.body.playerMoneyContainer[x].html().trim();
        var playerMoney = monopoly.players[x].money.toString().trim();

        if (currentMoney !== playerMoney) {
            this.body.playerInfoContainer[x].hide();
            this.body.playerMoneyContainer[x].html(playerMoney);
            this.body.playerInfoContainer[x].fadeIn(1000);
        }
    }
}
WindowMenu.prototype.console = function (text, clearConsole) {
    if (clearConsole)
        this.body.console.html("");
    this.body.console.append(text + "</br>");
}
WindowMenu.prototype.rebuildPlayerInfoTable = function () {
    this.body.playerInfoContainer = [];
    this.body.playerMoneyContainer = [];
    for (var x = 0 ; x < monopoly.players.length; x++) {
        var player = monopoly.players[x];
        var playerId = player.monopolyId;

        var tr = $("<tr>", {
            'id': 'player-info-' + player.monopolyId,
            'onclick': "monopoly.triggerGlow(" + player.monopolyId + ");$(this).triggerClass('player-selector')"
        });
        var tdName = $("<td>", {
            'class': 'font-bold player-info-name',
            'html': player.name,
            "style": "color: #ccc"
        });
        var tdAvatar = $('<td>', {
            'class': 'player-info-avatar',
            'html': player.avatar.clone()
        });
        var tdMoney = $('<td>', {
            'class': 'font-bold player-info-money',
            'html': player.money,
            "style": "color: #ccc"
        });

        tr.append(tdName);
        tr.append(tdAvatar);
        tr.append(tdMoney);

        this.body.playerMoneyContainer.push(tdMoney);
        this.body.playerInfoContainer.push(tr);

        this.body.playerInfoTable.append(tr);
    }
}


function WindowMenuAction(rawData) {
    this.rawData = rawData;
    this.type = "windowMenuAction";
    this.body = {};
    this.bodyHtml = {};
    this.monopolyId;
}
WindowMenuAction.prototype.constructor = WindowMenuAction;
WindowMenuAction.prototype.reset = function () {

}
WindowMenuAction.prototype.initial = function () {

    var self = this;

    var container = $("<div>", {
        "class": "panel window-menu-action-container panel-primary gradient-black-background ",
        "style": "margin-bottom: 0; position: absolute; top: 0; left: 100%; width: 300px;"
    })

    var headerContainer = $("<div>", {
        "class": "panel-heading cursor-pointer",
        "html": "Action"
    })

    var bodyContainer = $("<div>", {
        "class": "panel-body",
    })

    var messageContainer = $("<div>", {
        "style": "color: #ccc ;",
        "class": "font-bolder"
    });

    var actionContainer = $("<div>", {
        "style": "margin-top: 10px;"
    });

    var buttonOK = $("<button>", {
        "class": "btn btn-default",
        "html": "OK",
        "style": "margin-right: 10px;"
    })

    var buttonYes = $("<button>", {
        "class": "btn btn-primary",
        "html": "Yes",
        "style": "margin-right: 10px;"
    })

    var buttonNo = $("<button>", {
        "class": "btn btn-danger",
        "html": "No",
        "style": "margin-right: 10px;"
    })

    var buttonPay = $("<button>", {
        "class": "btn btn-info",
        "html": "Pay",
        "style": "margin-right: 10px;"
    })

    var buttonDice = $("<button>", {
        "class": "btn btn-primary",
        "html": "Dice",
        "style": "margin-right: 10px;"
    })

    buttonNo.click(function () { self.close() });
    buttonOK.click(function () { self.close() });

    actionContainer.append(buttonOK)
    actionContainer.append(buttonYes)
    actionContainer.append(buttonNo)
    actionContainer.append(buttonPay);
    actionContainer.append(buttonDice)

    bodyContainer.append(messageContainer)
    bodyContainer.append(actionContainer)

    container.append(headerContainer)
    container.append(bodyContainer)

    this.body.container = container
    this.body.messageContainer = messageContainer
    this.body.actionContainer = actionContainer;
    this.body.actionContainer = actionContainer;
    this.body.buttonOK = buttonOK;
    this.body.buttonYes = buttonYes;
    this.body.buttonNo = buttonNo;
    this.body.buttonPay = buttonPay;
    this.body.buttonDice = buttonDice;

    container.hide();

    this.bodyHtml = container;
}
WindowMenuAction.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
}
WindowMenuAction.prototype.open = function (option) {
    var self = this;
    if (option != null) {

        this.message(option.message);
        this.actionAllow(option.allowAction);
        this.body.container.slideDown(500, function () {

        })
    }
}
WindowMenuAction.prototype.close = function () {
    var self = this;
    this.body.container.slideUp(500, function () {
        self.body.buttonOK.off("click");
        self.body.buttonYes.off("click");
        self.body.buttonNo.off("click");
        self.body.buttonPay.off("click");
        self.body.buttonDice.off("click");
        monopoly.allowPlayerDicing();
    })
}
WindowMenuAction.prototype.close_notAdvanceToNextPlayer = function () {
    var self = this;
    this.body.container.slideUp(500, function () {
        self.body.buttonOK.off("click");
        self.body.buttonYes.off("click");
        self.body.buttonNo.off("click");
        self.body.buttonPay.off("click");
        self.body.buttonDice.off("click");
    })
}
WindowMenuAction.prototype.message = function (text) {
    this.body.messageContainer.html(text);
}
WindowMenuAction.prototype.actionAllow = function (option) {
    this.body.buttonOK.hide();
    this.body.buttonYes.hide();
    this.body.buttonNo.hide();
    this.body.buttonPay.hide();
    this.body.buttonDice.hide();

    if (option == null || option == "ok")
        this.body.buttonOK.show();
    else if (option == "yesno") {
        this.body.buttonYes.show();
        this.body.buttonNo.show();
    } else if (option == "paydice") {
        this.body.buttonPay.show();
        this.body.buttonDice.show();
    }

}


function MonopolyEvent(rawData) {
    this.rawData = rawData;
    this.type = "event";
    this.monopolyId;
    this.title = rawData.title;
    this.longTitle = rawData.longTitle;
    this.description = rawData.description;
    this.eventType = rawData.eventType;

    this.body = {};
    this.bodyHtml = {};

}
MonopolyEvent.prototype.constructor = MonopolyEvent;
MonopolyEvent.prototype.initial = function () {
    var self = this;

    var container = $("<div>", {
        "class": "panel panel-info gradient-black-background",
        "style": "margin-bottom: 0px; position: absolute; top: 0px; left: 100%; width: 200px; color: #ccc"
    })
    this.body.container = container;

    var containerHeader = $("<div>", {
        "class": "panel-heading",
        "html": "New Event"
    })
    this.body.containerHeader = containerHeader;

    var containerBody = $("<div>", {
        "class": "panel-body",
    });
    this.body.containerBody = containerBody;

    var eventTitle = $("<div>", {
        "html": self.title,
        "class": "gradient-golden-background font-size-2x font-bolder",
        "style": "margin-top: 10px; color: black"
    })
    this.body.eventTitle = eventTitle;

    var eventLongTitle = $("<div>", {
        "html": self.longTitle,
        "class": "font-bold",
        "style": "margin-top: 10px;"
    })
    this.body.eventLongTitle = eventLongTitle;

    var des = "";
    $.each(self.description, function (i, line) {
        des += line + "</br>"
    })
    var eventDescription = $("<div>", {
        "html": des,
        "class": "bold",
        "style": "margin-top: 10px;"
    })
    this.body.eventDescription = eventDescription;

    var message = $("<div>", {
        "class": "bold",
        "style": "margin-top: 10px; border-top: 1px solid #ccc"
    })
    this.body.message = message;

    var buttonOK = $("<button>", {
        "class": "btn btn-default font-bold",
        "html": "OK",
        "style": "margin-right: 10px; margin-top: 10px; "
    })
    this.body.buttonOK = buttonOK;

    containerBody.append(eventTitle);
    containerBody.append(eventLongTitle);
    containerBody.append(eventDescription);
    containerBody.append(message);
    containerBody.append(buttonOK);

    container.append(containerHeader)
    container.append(containerBody)

    this.bodyHtml = container;
}
MonopolyEvent.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
}
MonopolyEvent.prototype.open = function () {
    var self = this;
    self.appendTo(monopoly.windowMenu.bodyHtml);
    self.runEvent();
}
MonopolyEvent.prototype.close = function () {
    var self = this;
    monopoly.currentPlayerTurn.unglow_ownedProperties();
    monopoly.currentPlayerTurn.unSelectable_ownedProperties();
    self.message("");
    self.bodyHtml.detach();
}
MonopolyEvent.prototype.message = function (text) {
    this.body.message.html(text);
}
MonopolyEvent.prototype.console = function (text) {
    this.body.message.html(text);
}
MonopolyEvent.prototype.runEvent = function () {
    var self = this;

    if (self.eventType == "onePropertyRaiseNeighborsFall_oneLevel") {
        self.onePropertyRaiseNeighborsFall_oneLevel();
    }
    else if (self.eventType == "locationEffect") {
        self.locationEffect();
    }
    else if (self.eventType == "goToCard_freeParking") {
        self.goToCard_freeParking();
    }
    else if (self.eventType == "onePropertyRaise_oneLevel") {
        self.onePropertyRaise_oneLevel();
    }
    else if (self.eventType == "onePropertyFall_oneLevel") {
        self.onePropertyFall_oneLevel();
    }
    else if (self.eventType == "onePropertyRaise_maxLevel") {
        self.onePropertyRaise_maxLevel();
    }
}

MonopolyEvent.prototype.onePropertyRaiseNeighborsFall_oneLevel = function () {
    var self = this;

    if (monopoly.currentPlayerTurn.properties.length > 0) {
        monopoly.currentPlayerTurn.selectable_ownedProperties();
        monopoly.currentPlayerTurn.glow_ownedProperties();


        $.each(monopoly.currentPlayerTurn.properties, function (i, propertyId) {
            var property = monopoly.getObject(propertyId);
            property.bodyHtml.on("click", function () {
                self.console(property.name);
                monopoly.currentPlayerTurn.glow_ownedProperties();
                monopoly.tempSelected = property;
                property.glowing({ h: 0, s: 0, l: 100 });
            });
        })

        self.body.buttonOK.on("click", function () {
            if (monopoly.tempSelected != null) {

                $.each(monopoly.currentPlayerTurn.properties, function (i, propertyId) {
                    var property = monopoly.getObject(propertyId);
                    property.bodyHtml.off("click")
                })

                self.body.buttonOK.off("click");
                monopoly.tempSelected.bodyHtml.off("click");

                $.each(monopoly.tempSelected.neighbors(), function (i, property) {
                    property.levelDown();
                });
                monopoly.tempSelected.levelUp();
                monopoly.tempSelected = null;
                monopoly.unglow_allProperties();
                monopoly.currentPlayerTurn.unSelectable_ownedProperties();
                monopoly.flush_tempSelected();
                self.close();
                monopoly.allowPlayerDicing();
            }
            else {
                monopoly.console("Please select a property");
            }
        });
    }

    else {
        monopoly.console("You don't owned any properties. This event is void");
        self.console("You don't owned any properties. This event is void");
        self.body.buttonOK.on("click", function () {
            monopoly.unglow_allProperties();
            monopoly.currentPlayerTurn.unSelectable_ownedProperties();
            self.close();
            monopoly.allowPlayerDicing();
        });
    }


}
MonopolyEvent.prototype.locationEffect = function () {
    var self = this;

    monopoly.glow_allProperties();
    monopoly.selectable_allProperties();
    $.each(monopoly.properties, function (i, property) {
        property.bodyHtml.on("click", function () {
            self.console(property.name);
            monopoly.glow_allProperties();
            monopoly.tempSelected = property;
            property.glowing({ h: 0, s: 0, l: 100 });
        });
    });

    self.body.buttonOK.on("click", function () {
        if (monopoly.tempSelected != null) {

            $.each(monopoly.currentPlayerTurn.properties, function (i, propertyId) {
                var property = monopoly.getObject(propertyId);
                property.bodyHtml.off("click")
            })

            self.body.buttonOK.off("click");
            monopoly.tempSelected.bodyHtml.off("click");

            monopoly.unglow_allProperties();
            monopoly.unSelectable_allProperties();
            monopoly.currentPlayerTurn.goToCard(monopoly.tempSelected);
            monopoly.flush_tempSelected();
            self.close();
            monopoly.evaluateCurrentPlayerTurnForAction();

        }
        else {
            monopoly.console("Please select a property");
            self.console("Please select a property");
        }
    });
}
MonopolyEvent.prototype.goToCard_freeParking = function () {

    monopoly.console("Event: Total Gridlock");
    var self = this;
    self.body.buttonOK.on("click", function () {
        var playerNotInJail = [];
        $.each(monopoly.players, function (i, player) {
            if (monopoly.jail.inJailPlayerIds.indexOf(player.monopolyId) == -1) {
                playerNotInJail.push(player);
            }
        })
        $.each(playerNotInJail, function (i, player) {
            player.goToCard(monopoly.freeParking);
        })
        self.body.buttonOK.off("click");
        self.close();
        monopoly.evaluateCurrentPlayerTurnForAction();
    });
}
MonopolyEvent.prototype.onePropertyRaise_oneLevel = function () {
    var self = this;

    if (monopoly.currentPlayerTurn.properties.length > 0) {
        monopoly.currentPlayerTurn.selectable_ownedProperties();
        monopoly.currentPlayerTurn.glow_ownedProperties();

        $.each(monopoly.currentPlayerTurn.properties, function (i, propertyId) {
            var property = monopoly.getObject(propertyId);
            property.bodyHtml.on("click", function () {
                self.console(property.name);
                monopoly.currentPlayerTurn.glow_ownedProperties();
                monopoly.tempSelected = property;
                property.glowing({ h: 0, s: 0, l: 100 });
            });
        })

        self.body.buttonOK.on("click", function () {
            if (monopoly.tempSelected != null) {

                $.each(monopoly.currentPlayerTurn.properties, function (i, propertyId) {
                    var property = monopoly.getObject(propertyId);
                    property.bodyHtml.off("click")
                })

                self.body.buttonOK.off("click");
                monopoly.tempSelected.bodyHtml.off("click");

                monopoly.tempSelected.levelUp();
                monopoly.tempSelected = null;
                monopoly.unglow_allProperties();
                monopoly.currentPlayerTurn.unSelectable_ownedProperties();
                monopoly.flush_tempSelected();
                self.close();
                monopoly.allowPlayerDicing();
            }
            else {
                monopoly.console("Please select a property");
            }
        });
    }
    else {
        monopoly.console("You don't owned any properties. This event is void");
        self.message("You don't owned any properties. This event is void");

        self.body.buttonOK.on("click", function () {
            self.close();
            monopoly.allowPlayerDicing();
        });
    }
}
MonopolyEvent.prototype.onePropertyRaise_maxLevel = function () {
    var self = this;

    if (monopoly.currentPlayerTurn.properties.length > 0) {
        monopoly.currentPlayerTurn.selectable_ownedProperties();
        monopoly.currentPlayerTurn.glow_ownedProperties();

        $.each(monopoly.currentPlayerTurn.properties, function (i, propertyId) {
            var property = monopoly.getObject(propertyId);
            property.bodyHtml.on("click", function () {
                self.console(property.name);
                monopoly.currentPlayerTurn.glow_ownedProperties();
                monopoly.tempSelected = property;
                property.glowing({ h: 0, s: 0, l: 100 });
            });
        })

        self.body.buttonOK.on("click", function () {
            if (monopoly.tempSelected != null) {

                $.each(monopoly.currentPlayerTurn.properties, function (i, propertyId) {
                    var property = monopoly.getObject(propertyId);
                    property.bodyHtml.off("click")
                })

                self.body.buttonOK.off("click");
                monopoly.tempSelected.bodyHtml.off("click");

                monopoly.tempSelected.levelUp(5);
                monopoly.tempSelected = null;
                monopoly.unglow_allProperties();
                monopoly.currentPlayerTurn.unSelectable_ownedProperties();
                monopoly.flush_tempSelected();
                self.close();
                monopoly.allowPlayerDicing();
            }
            else {
                monopoly.console("Please select a property");
            }
        });
    }
    else {
        monopoly.console("You don't owned any properties. This event is void");
        self.message("You don't owned any properties. This event is void");

        self.body.buttonOK.on("click", function () {
            self.close();
            monopoly.allowPlayerDicing();
        });
    }
}
MonopolyEvent.prototype.onePropertyFall_oneLevel = function () {
    var self = this;

    if (monopoly.currentPlayerTurn.properties.length > 0) {
        monopoly.currentPlayerTurn.selectable_ownedProperties();
        monopoly.currentPlayerTurn.glow_ownedProperties();

        $.each(monopoly.currentPlayerTurn.properties, function (i, propertyId) {
            var property = monopoly.getObject(propertyId);
            property.bodyHtml.on("click", function () {
                self.console(property.name);
                monopoly.currentPlayerTurn.glow_ownedProperties();
                monopoly.tempSelected = property;
                property.glowing({ h: 0, s: 0, l: 100 });
            });
        })

        self.body.buttonOK.on("click", function () {
            if (monopoly.tempSelected != null) {

                $.each(monopoly.currentPlayerTurn.properties, function (i, propertyId) {
                    var property = monopoly.getObject(propertyId);
                    property.bodyHtml.off("click")
                })

                self.body.buttonOK.off("click");
                monopoly.tempSelected.bodyHtml.off("click");

                monopoly.tempSelected.levelDown();
                monopoly.tempSelected = null;
                monopoly.unglow_allProperties();
                monopoly.currentPlayerTurn.unSelectable_ownedProperties();
                monopoly.flush_tempSelected();
                self.close();
                monopoly.allowPlayerDicing();
            }
            else {
                self.message("Please select a property");
            }
        });
    }
    else {
        monopoly.console("You don't owned any properties. This event is void");
        self.message("You don't owned any properties. This event is void");

        self.body.buttonOK.on("click", function () {
            self.close();
            monopoly.allowPlayerDicing();
        });
    }
}


function WindowStatistics(rawData) {
    this.rawData = rawData;
    this.type = "windowStatistics";
    this.body = {};
    this.bodyHtml = {};
    this.monopolyId;

}
WindowStatistics.prototype.initial = function () {
    var self = this;

    var container = $("<div>", {
        "class": "monopoly-statistics-container panel panel-success",
        "style": "display: none; position: absolute; z-index: 99; margin: 15px 15px 15px 15px; top: 0; left: 0"
    })

    var headerContainer = $("<div>", {
        "class": "panel-heading monopoly-statistics-container-header cursor-pointer",
        "html" : "Player Statistics"
    })

    var bodyContainer = $("<div>", {
        "class": "panel-body",
    })

    var buttonBack = $("<button>", {
        "class": "btn btn-default",
        "html": "Back",
        "style":"display: none"
    })
    var buttonClose = $("<button>", {
        "class": "btn btn-default",
        "html": "Close",
        "style": "display: none"
    })
    var buttonReset = $("<button>", {
        "class": "btn btn-danger",
        "html": "Reset",
        "style": "display: none"
    })

    var titleContainer = $("<div>", {
        "class": "font-size-2x font-bolder",
    })

    var playerTable = $("<table>", {
        "class": "table standardTable",
        "style":"max-height: 100%"
    })

    $(buttonBack).on("click", function () {
        self.open();
    })
    $(buttonClose).on("click", function () {
        self.close();
    })
    $(buttonReset).on("click", function () {
        monopoly.reset();
    })

    bodyContainer.append(buttonBack);
    bodyContainer.append(buttonClose);
    bodyContainer.append(buttonReset);
    bodyContainer.append(titleContainer);
    bodyContainer.append(playerTable);
    container.append(headerContainer);
    container.append(bodyContainer);

    this.body.buttonBack = buttonBack;
    this.body.buttonClose = buttonClose;
    this.body.buttonReset = buttonReset;
    this.body.container = container;
    this.body.headerContainer = headerContainer;
    this.body.bodyContainer = bodyContainer;
    this.body.playerTable = playerTable;
    this.body.titleContainer = titleContainer;

    container.draggable({ handle: ".monopoly-statistics-container-header" });

    this.bodyHtml = container;
}
WindowStatistics.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
}
WindowStatistics.prototype.open = function () {
    var self = this;

    //reset the table
    self.body.playerTable.html("");
    self.body.titleContainer.html("");

    this.body.buttonBack.hide();
    this.body.buttonClose.show();
    this.body.buttonReset.show();
    self.body.titleContainer.html("Players Statistics");

    //first row
    var firstRow = $("<tr>")
    var firstRowValue = ["Name", "Avatar", "Money", "Income", "Expense", "Properties Ct", "Go Ct", "In Jail ct", "Location Ct", "Event Ct" ]
    $.each(firstRowValue, function (i, value) {
        var th = $("<th>", {"html": value})
        firstRow.append(th);
    })
    self.body.playerTable.append(firstRow)

    $.each(monopoly.players, function (i, player) {
        var tr = $("<tr>");
        
        var tdName = $("<td>", { "html": player.name }); tr.append(tdName);
        var tdAvatar = $("<td>", { "html": player.avatar.clone() }); tr.append(tdAvatar);
        var tdMoney = $("<td>", { "html": player.money }); tr.append(tdMoney);
        var tdIncome = $("<td>", { "html": player.income }); tr.append(tdIncome);
        var tdExpense = $("<td>", { "html": player.expense }); tr.append(tdExpense);
        var tdProperties = $("<td>", { "html": player.properties.length }); tr.append(tdProperties);
        var tdGo = $("<td>", { "html": player.goCt }); tr.append(tdGo);
        var tdInJail = $("<td>", { "html": player.inJailCt }); tr.append(tdInJail);
        var tdLocation = $("<td>", { "html": player.locationCt }); tr.append(tdLocation);
        var tdEvent = $("<td>", { "html": player.EventCt }); tr.append(tdEvent);

        tr.on("click", { playerId: player.monopolyId }, function (event) {
            self.openSub(event.data.playerId);
        })

        self.body.playerTable.append(tr)
    })
    
    self.bodyHtml.show();
}
WindowStatistics.prototype.openSub = function (playerId) {
    var self = this;

    //reset the table
    self.body.playerTable.html("");
    self.body.titleContainer.html("");

    this.body.buttonBack.show();
    this.body.buttonClose.hide();
    this.body.buttonReset.hide();
    var player = monopoly.getObject(playerId);

    self.body.titleContainer.html(player.name + " statistics");

    //first row
    var firstRow = $("<tr>")
    var firstRowValue = ["Number","Name" ,"Owner" , "Level", "Value", "Rent" , "Rent Income", "Rent Expense", "Buy", "Sell"]
    $.each(firstRowValue, function (i, value) {
        var th = $("<th>", { "html": value })
        firstRow.append(th);
    })
    self.body.playerTable.append(firstRow)

    var totalRentIncome = 0;
    var totalRentExpense = 0;
    var totalBuy = 0;
    var totalSell = 0;
    $.each(monopoly.properties, function (i, property) {
        var tr = $("<tr>", {})

        var tdNumber = $("<td>", { "html": property.number }); tr.append(tdNumber);

        var tdName = $("<td>", { "html": property.name }); tr.append(tdName);

        var tdOwner = $("<td>", {
            "html": monopoly.getObject(property.ownerId) != null ? monopoly.getObject(property.ownerId).name : "N/A"
        }); tr.append(tdOwner);

        var tdLevel = $("<td>", { "html": property.level }); tr.append(tdLevel);

        var tdValue = $("<td>", { "html": property.value }); tr.append(tdValue);

        var tdRent = $("<td>", { "html": property.rent }); tr.append(tdRent);

        var rentIncome = 0;
        var rentExpense = 0;
        var buy = 0;
        var sell = 0;
        $.each(property.history, function (i, aHistory) {
            if (aHistory.monopolyId == playerId) {
                if (aHistory.action == "incomeRent") {
                    rentIncome += aHistory.value;
                    totalRentIncome += aHistory.value;
                }
                else if (aHistory.action == "payRent") {
                    rentExpense += aHistory.value;
                    totalRentExpense += aHistory.value;
                }
                else if (aHistory.action == "buy") {
                    buy += aHistory.value;
                    totalBuy += aHistory.value;
                }
                else if (aHistory.action == "sell") {
                    sell += aHistory.value;
                    totalSell += aHistory.value;
                }
            }
        })

        var tdRentIncome = $("<td>", { "html": rentIncome }); tr.append(tdRentIncome);

        var tdRentExpense = $("<td>", { "html": rentExpense }); tr.append(tdRentExpense);

        var tdBuy = $("<td>", { "html": buy }); tr.append(tdBuy);

        var tdSell = $("<td>", { "html": sell }); tr.append(tdSell);
        
        self.body.playerTable.append(tr)
    })

    var lastRow = $("<tr>", {})
    var tdTotal = $("<td>", {
        "colspan": "6",
        "html":" Total"
    })
    lastRow.append(tdTotal);

    var tdRentIncome = $("<td>", { "html": totalRentIncome }); lastRow.append(tdRentIncome);

    var tdRentExpense = $("<td>", { "html": totalRentExpense }); lastRow.append(tdRentExpense);

    var tdBuy = $("<td>", { "html": totalBuy }); lastRow.append(tdBuy);

    var tdSell = $("<td>", { "html": totalSell }); lastRow.append(tdSell);

    self.body.playerTable.append(lastRow);

    self.bodyHtml.show();
}
WindowStatistics.prototype.close = function () {
    var self = this;
    self.bodyHtml.hide();
    self.body.playerTable.html("");
}



//#endregion Board

//#region Player

function Player(rawData) {
    this.rawData = rawData;
    this.name;
    this.avatar = {};
    this.money = 0;
    this.color = {};
    this.credit = 0;
    this.properties = [];
    this.events = [];
    this.location = {};
    this.controller;
    this.monopolyId;

    this.income = 0;
    this.expense = 0;
    this.locationCt = 0;
    this.goCt = 0;
    this.inJailCt = 0;
    this.EventCt = 0;

    this.playerInfoContainer;   //reference to menu player list
    this.playerMoneyContainer;  //reference to menu player list
}
Player.prototype.constructor = Player;
Player.prototype.initial = function () {
    var rawData = this.rawData;

    this.name = rawData.name;
    this.money = rawData.money;
    this.color = rawData.color;
    this.controller = rawData.controller

    this.credit = 0;
    this.properties = [];
    this.events = [];

    this.avatar = $("<i>", {
        "class": "font-size-2x player-avatar-main " + rawData.avatar,
        "style": "color: " + utils.createHSLColor(this.color)
    });
    //this.avatar.css({ "color": utils.createHSLColor(this.color) });

    this.location = monopoly.boardCards[0];

}
Player.prototype.goToCard = function (boardCard) {
    if (this.location) {
        this.location.playerLeave(this.monopolyId)
    }

    if (boardCard != null) {
        this.location = boardCard;
        this.location.playerArrive(this.monopolyId)
    }
    else {
        this.location = monopoly.boardCards[0];
        this.location.playerArrive(this.monopolyId)
    }
}
Player.prototype.goToJail = function () {
    monopoly.jail.inJailPlayerIds.push(this.monopolyId);
    monopoly.jail.body.jailContainer.append(this.avatar);

    monopoly.goToJail.playerLeave(this.monopolyId);
    this.location = monopoly.jail;
    monopoly.console(this.name + " go to Jail: Stay In Jail");

}
Player.prototype.buy = function (propertyCard) {
    var self = this;
    if (propertyCard.isAvailable()) {
        if (propertyCard.value <= this.money) {
            this.money -= propertyCard.value;
            this.expense += propertyCard.value;
            this.registerProperty(propertyCard);
            //propertyCard.registerOwner(self);           
            monopoly.refreshPlayerList();            
        }
    }
}
Player.prototype.registerProperty = function (propertyCard) {
    if (this.properties.indexOf(propertyCard.monopolyId) == -1) {
        this.properties.push(propertyCard.monopolyId);
    }
    propertyCard.ownerId = this.monopolyId;
    propertyCard.refresh("owner");

    var aHistory = {
        monopolyId: this.monopolyId,
        action: "buy",
        value: propertyCard.value
    }

    propertyCard.history.push(aHistory);
}
Player.prototype.unRegisterProperty = function (propertyCard) {
    var index = this.properties.indexOf(propertyCard.monopolyId)
    if (index != -1) {
        this.properties.splice(index, 1);

        var aHistory = {
            monopolyId: this.monopolyId,
            action: "sell",
            value: propertyCard.value
        }

        propertyCard.history.push(aHistory);

    }
    propertyCard.ownerId = null;
    propertyCard.refresh("owner")
}
Player.prototype.payRent = function (propertyCard) {
    var self = this;
    if (!propertyCard.isAvailable()) {
        console.log(propertyCard.ownerId)
        console.log(this.monopolyId)
        if (propertyCard.ownerId != this.monopolyId) {
            var propertyCardOwner = monopoly.getObject(propertyCard.ownerId);

            self.expense += propertyCard.rent;
            propertyCardOwner.income += propertyCard.rent;

            var aHistory = {
                monopolyId: this.monopolyId,
                action: "payRent",
                value: propertyCard.rent
            }
            propertyCard.history.push(aHistory);

            var aHistory = {
                monopolyId: propertyCard.ownerId,
                action: "incomeRent",
                value: propertyCard.rent
            }
            propertyCard.history.push(aHistory);


            propertyCardOwner.money += propertyCard.rent;
            this.money -= propertyCard.rent;
            monopoly.refreshPlayerList();

            if (this.money < 0) {

                if (self.money_All() < 0) {
                    monopoly.gameOver();
                    //monopoly.windowMenuAction.close();
                }
                else {
                    self.sellProperty();
                }
            }
            else {
                monopoly.console(this.name + " Pay " + monopoly.getObject(propertyCard.ownerId).name + " $" + propertyCard.rent);
                self.expense += propertyCard.rent;
                propertyCard.levelUp();
                monopoly.refreshPlayerList();
                monopoly.windowMenuAction.close();
            }          
        }
    }
}
Player.prototype.pay = function (money) {
    if (money > this.money_All()) {
        monopoly.console(this.name + "is bankrup. GAME OVER");
        monopoly.gameOver();
    } else {
        this.money -= money;
        this.expense += money;
        monopoly.refreshPlayerList();
        if (this.money < 0) {
            this.sellProperty();
        }
    }
}
Player.prototype.indicateMyTurn = function () {
    $.each(monopoly.players, function (i, player) {
        if (player.playerInfoContainer != null) {
            player.playerInfoContainer.removeClass("my-turn-signal")
        }
    })

    if (this.playerInfoContainer != null) {
        this.playerInfoContainer.addClass("my-turn-signal")
    }
}
Player.prototype.glow_ownedProperties = function () {

    for (var x = 0 ; x < this.properties.length; x++) {
        var property = monopoly.getObject(this.properties[x]);
        property.glowing(this.color);
    }
}
Player.prototype.unglow_ownedProperties = function () {
    for (var x = 0 ; x < this.properties.length; x++) {
        var property = monopoly.getObject(this.properties[x]);
        property.unGlowing();
    }
}
Player.prototype.selectable_ownedProperties = function () {
    for (var x = 0 ; x < this.properties.length; x++) {
        var property = monopoly.getObject(this.properties[x]);
        property.bodyHtml.css({ "cursor": "pointer" });
    }
}
Player.prototype.unSelectable_ownedProperties = function () {
    for (var x = 0 ; x < this.properties.length; x++) {
        var property = monopoly.getObject(this.properties[x]);
        property.bodyHtml.css({ "cursor": "auto" });
    }
}
Player.prototype.sellProperty = function () {
    var self = this;

    var pleaseSelect = "Please select property(s) to sell:</br>"

    var propertyname = "<hr/></br>Properties:"

    var totalCash = "<hr/></br>Total:"
   
    monopoly.windowMenuAction.open({ message: pleaseSelect + propertyname + totalCash, allowAction: "ok" });
    monopoly.windowMenuAction.body.buttonOK.hide();

    self.glow_ownedProperties();
    self.selectable_ownedProperties();

    for (var x = 0 ; x < self.properties.length; x++) {
        
        var property = monopoly.getObject(self.properties[x]);
        property.bodyHtml.on("click", { value: property }, function (event) {

            var property = event.data.value;
            console.log(property.monopolyId);
            monopoly.tempSelected = property;
            var index = monopoly.tempSelecteds.indexOf(monopoly.tempSelected);

            var propertyname = "";
            var totalCash = monopoly.currentPlayerTurn.money;
            var message = "Please select property(s) to sell:<hr/></br>";
            var total = monopoly.currentPlayerTurn.money;

            if (index == -1) {
                monopoly.tempSelecteds.push(monopoly.tempSelected);
                monopoly.tempSelected.glowing(utils.hslWhite());
            }
            else {
                monopoly.tempSelecteds.splice(index, 1);
                property.glowing();
            }

            for (var x = 0 ; x < monopoly.tempSelecteds.length; x++) {
                propertyname += monopoly.tempSelecteds[x].name + ",";
                total += monopoly.tempSelecteds[x].value;
                totalCash += " + " + monopoly.tempSelecteds[x].value;                
            }
            totalCash += " = " + total

            propertyname += "<hr/></br>";
            totalCash += "<hr/></br>"

            monopoly.windowMenuAction.message(message + propertyname + totalCash);

            console.log("total", total)
            console.log("tempSelecteds",monopoly.tempSelecteds)

            if (total < 0) {
                monopoly.windowMenuAction.body.buttonOK.hide();
            } else {
                monopoly.windowMenuAction.body.buttonOK.show();
            }

            monopoly.windowMenuAction.body.buttonOK.off("click");
            monopoly.windowMenuAction.body.buttonOK.on("click", function () {

                $.each(monopoly.currentPlayerTurn.properties, function (i, propertyId) {
                    var property = monopoly.getObject(propertyId);
                    property.bodyHtml.off("click")
                })

                monopoly.windowMenuAction.body.buttonOK.off("click");
                totalCash = 0;

                monopoly.currentPlayerTurn.unglow_ownedProperties();
                monopoly.currentPlayerTurn.unSelectable_ownedProperties();

                $.each(monopoly.tempSelecteds, function (i, property) {
                    property.unRegisterOwner();
                    totalCash += property.value;
                    monopoly.currentPlayerTurn.income += property.value;
                });
                monopoly.currentPlayerTurn.money += totalCash;

                monopoly.flush_tempSelected();

                if (monopoly.currentPlayerTurn.location != monopoly.jail) {
                    monopoly.currentPlayerTurn.location.levelUp();
                    monopoly.refreshPlayerList();
                    monopoly.windowMenuAction.close();
                }
                else {
                    monopoly.jail.inJailPlayerIds.splice(monopoly.jail.inJailPlayerIds.indexOf(monopoly.currentPlayerTurn.monopolyId), 1);
                    monopoly.console(monopoly.currentPlayerTurn.name + "is out of jail")
                    monopoly.currentPlayerTurn.goToCard(monopoly.jail);
                    monopoly.windowMenuAction.close();
                }

            })
        })
    }

}


Player.prototype.goToCard_Animation_IndexBase = function (fromBoardCardIndex, toBoardCardIndex) {
    var color = this.color;
    var self = this;


    //Locked the dicing button. prevent palyer accidnet click it
    monopoly.lockDicing();

    //Get the destination info prepared
    var indexOfDestination = toBoardCardIndex;
    if (indexOfDestination > monopoly.boardCards.length - 1) {
        indexOfDestination = toBoardCardIndex - monopoly.boardCards.length;
    }
    monopoly.boardCards[indexOfDestination].glowing(color)
    var placeName = monopoly.boardCards[indexOfDestination].name;
    if (monopoly.boardCards[indexOfDestination].subName)
        placeName += monopoly.boardCards[indexOfDestination].subName;
    monopoly.console(this.name + " go to " + placeName);


    //Moving the avatar through
    fromBoardCardIndex++;
    var animate = setInterval(function () {
        if (fromBoardCardIndex <= toBoardCardIndex) {
            if (fromBoardCardIndex > monopoly.boardCards.length - 1) { // finish a round
                monopoly.console(this.name + " Have Finish a Round : +$" + monopoly.goCard.value);

                self.money += monopoly.goCard.value;
                self.income += monopoly.goCard.value;
                self.goCt += 1;

                monopoly.windowMenu.refresh();

                fromBoardCardIndex = 0;
                toBoardCardIndex = toBoardCardIndex - monopoly.boardCards.length
            }
            if (fromBoardCardIndex - 1 >= 0)
                monopoly.boardCards[fromBoardCardIndex - 1].unGlowing()
            else
                monopoly.boardCards[monopoly.boardCards.length - 1].unGlowing()

            monopoly.boardCards[fromBoardCardIndex].glowing(color);
            self.goToCard(monopoly.boardCards[fromBoardCardIndex])
            fromBoardCardIndex++;
        }
        else {
            clearTimeout(animate);
            monopoly.boardCards[fromBoardCardIndex - 1].unGlowing();
            monopoly.evaluateCurrentPlayerTurnForAction();

        }
    }, 250);
}
Player.prototype.money_All = function () {
    var allMoney = this.money;
    for (var x = 0; x < this.properties.length; x++) {
        var property = monopoly.getObject(this.properties[x]);
        allMoney += property.value;
    }
    return allMoney;
}

function AI(playerObject) {

}
AI.prototype.constructor = AI;
AI.prototype.initial = function () {

}


//#endregion Player
