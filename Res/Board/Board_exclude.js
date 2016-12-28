//========================Utils===============================/
function Utils(gameObject) {
    this.wdices = gameObject.wdices
    this.wconsole = gameObject.wconsole
    this.wplayer = gameObject.wplayer
    this.game = gameObject
}
Utils.prototype.constructor = Utils;
Utils.prototype.console = function (text) {
    var div = $("<p>", {"html":text})
    this.wconsole.block.prepend(div);
}
Utils.prototype.windowPlayerUpdate = function () {
    for (var x = 0; x < this.game.players.length; x++) {
        this.wplayer.updatePlayer(this.game.players[x])
    }
}
Utils.prototype.indexOfCards = function (card) {
    for (var x = 0; x < this.game.cards.length; x++) {
        if (this.game.cards[x] === card)
            return x;
    }
    return -1;
}

//========================Game===============================/
function Game(cardObjs, elementId) {
    this.players = [];
    this.board;
    this.wdices;
    this.wconsole;
    this.wplayer;    
    this.cards = [];

    this.board = new MonopolyBoard({ width: 12, height: 8 });
    this.board.appendTo(elementId);

    //$.each(this.board.cellIds, function (i, cellId) {       
    //    var card = new Card(cardObjs[i]);
    //    cards.push({ id: cellId, card: card });
    //    card.appendTo(cellId);
    //});

    for (var x = 0; x < this.board.cellIds.length; x++) {
        var card = new Card(cardObjs[x]);        
        card.appendTo(this.board.cellIds[x]);
        this.cards.push(card);
    }

    this.wdices = new WindowDice();
    this.wdices.appendTo(elementId + " .control-area-container");
    //this.dices = windowDice;

    this.wconsole = new WindowConsole();
    this.wconsole.appendTo(elementId + " .control-area-container");
    //this.console = windowConsole;

    this.wplayer = new WindowPlayerList();
    this.wplayer.appendTo(elementId + " .control-area-container");
    //this.wplayer = windowPlayer;   
}
Game.prototype.constructor = Game;
Game.prototype.initial = function () {

}
Game.prototype.addPlayer = function (playerNAC) {
    var player = new Player(playerNAC.name);
    player.dices = this.wdices;
    player.setAvatar(playerNAC.avatar);
    player.setColor(playerNAC.color);

    this.players.push(player);
    this.wplayer.addPlayer(player);
}
Game.prototype.movePlayer = function (player, toCardIndex) {
    for (var x = 0; x < this.cards.length; x++) {
        this.cards[toCardIndex].removePlayer(player);
    }
    this.cards[toCardIndex].setPlayer(player)
}
Game.prototype.reset = function () {
    for (var x = 0; x < this.players.length; x++) {
        this.players[x].reset();
        this.movePlayer(this.players[x], 0);
    }
}
Game.prototype.isGameOver = function () {
    var players = this.players;
    for (var x = 0; x < players.length; x++) {
        var monney = players[x].money;
        for (var y = 0; y < players[x].properties.length; y++) {
            monney += players[x].properties[y].money * players[x].properties[y].level;
        }
        if (money < debt)
            return true;
    }
    return false;
}
Game.prototype.play = function () {
    var players = this.players;
    var board = this.board;
    var wdices = this.wdices;
    var wconsole = this.wconsole;
    var wplayer = this.wplayer;
    var utils = this.utils;
    var cards = this.cards;

    while (!this.isGameOver) {

    }
}



//========================Player===============================/
function Player(playerName) {
    this.name = playerName
    this.money = 1500;
    this.properties = [];
    this.events = [];
    this.dices;
    this.avatar;
    this.color;
    this.debt = 0;
}
Player.prototype.constructor = Player;
Player.prototype.setAvatar = function (avatarName) {
    this.avatar = $("<i>", {
        "class": "player-avatar fa fa-2x fa-" + avatarName,
        "aria-hidden":"true"
    })
}
Player.prototype.setColor = function (hslColorText) {
    this.color = hslColorText;
    this.avatar.css({ "color": hslColorText });
}
Player.prototype.reset = function () {
    this.money = 1500;
    this.properties = [];
    this.events = [];
}
Player.prototype.dicing = function () {
    this.dices.dice();
}
Player.prototype.buy = function (card) {
    card.card.setOwner(this);
    this.properties.push(card.card);


    var price = (card.card.money * card.card.level)
    this.money = this.money - price;

    utils.console(this.name + " Buy " + card.card.name + " At: $" + price);
    utils.windowPlayerUpdate();
}
Player.prototype.payRent = function (card) {
    var rent = card.card.getRent();
    this.money -= rent;
    card.card.owner.money += rent;

    utils.console(this.name + " Paying Rent For " + card.card.owner.name + " At: $" + price);
    utils.windowPlayerUpdate();
}
Player.prototype.moveAnimation = function (cardFrom, cardTo) {
    var needToGlow = false;
    var fromIndex = utils.indexOfCards(cardFrom);
    var toIndex = utils.indexOfCards(cardTo);
    var cardNeedToGlow = [];

    if (fromIndex <= toIndex) {
        for (var x = fromIndex; x <= toIndex; x++) {
            cardNeedToGlow.push(utils.game.cards[x]);
        }
    }
    else {
        for (var x = fromIndex; x < utils.game.cards.length; x++) {
            cardNeedToGlow.push(utils.game.cards[x]);
        }
        for (var x = 0; x <= toIndex; x++) {
            cardNeedToGlow.push(utils.game.cards[x]);
        }
    }

    for (var x = 0; x < cardNeedToGlow.length; x++) {
        cardNeedToGlow[x].glow(this.color);
    }
    
    this.avatar.css({ "animation": "all 2s" });
    console.log(this.avatar)

    for (var x = 0; x < cardNeedToGlow.length; x++) {        
        cardNeedToGlow[x].setPlayer(this);
    }
}


//========================BOARD===============================/
function MonopolyBoard(sizeObject) {
    if (sizeObject != null && sizeObject.width != null && sizeObject.height != null) {
        this.width = sizeObject.width;
        this.height = sizeObject.height;
    }    
    else {
        this.width = 10;
        this.height = 10;
    }
    this.cellIds = [];
    this.table;
}
MonopolyBoard.prototype.constructor = MonopolyBoard;
MonopolyBoard.prototype.initial = function () {
    var width = this.width;
    var height = this.height;
    this.cellIds = this.getCellIds();

    var $boardContainer = $("<table>", { "class": "monopoly-board" });
    var notInnerSpanYet = true;
    for (var x = 0; x < height; x++) {
        var tr = $("<tr>");
        
        for (var y = 0; y < width; y++) {
            if ((y == 0) || (y == width -1) || (x == 0) || (x == height - 1)) {
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
                        "html":"<h1>Monopoly</h1>"
                    });
                    tr.append(td);
                    notInnerSpanYet = false;
                }
            }                     
        }
        $boardContainer.append(tr);
    }   
    this.table = $boardContainer;
    return $boardContainer
};
MonopolyBoard.prototype.appendTo = function (elementId) {
    var $block = $("#" + elementId);
    var container = this.initial();

    $block.append(container);

    var controlContainer = $("<div>", {
        "class": "control-area-container",
        "id": "control-area-container"
    });

    $block.append(controlContainer);
};
MonopolyBoard.prototype.getCellIds = function () {
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


//========================DICE===============================/

function Dice() {
    this.dice = Math.floor(Math.random() * (7 - 1)) + 1;
    this.block = $("<div>", {
        "class": "dice-container btn btn-default",
        "html": this.dice,
        "style": "pointer-events: none; "
    });
}
Dice.prototype.constructor = Dice;
Dice.prototype.appendTo = function (jqueryElement) {
    var $block = $("#" + elementId);
    var container = this.block;
    $block.append(container);
}
Dice.prototype.dicing = function () {
    this.dice = Math.floor(Math.random() * (7 - 1)) + 1;
    this.block.html(this.dice);
};


//========================WINDOW===============================/

function WindowDice() {
    this.dice1 = new Dice();
    this.dice2 = new Dice();
    this.btPlay = $("<i>", {
        "class": "fa fa-play btn btn-primary",
        "aria-hidden": "true",
    });
}
WindowDice.prototype.constructor = WindowDice;
WindowDice.prototype.initial = function () {
    var dice1 = this.dice1;
    var dice2 = this.dice2;
    var btPlay = this.btPlay;
    var self = this;

    var $diceAreaContainer = $("<div>", {
        "class": "draggable-area-container panel panel-primary",
    });

    var $diceAreaContainerHeader = function () {
        var $diceAreaContainerHeader = $("<div>", { "class": "panel-heading", })
        var table = $("<table>", { "class": "table" });
        var tr = $("<tr>");
        var th = $("<th>", { "html": "Dice" });
        var td = $("<td>");
        var moveHandle = $("<i>", { "class": "fa fa-arrows window-move-handle" });

        td.append(moveHandle)
        tr.append(th);
        tr.append(td);
        table.append(tr);
        $diceAreaContainerHeader.append(table);
        $diceAreaContainer.append($diceAreaContainerHeader);
    }

    var $diceAreaContainerBody = function () {
        var $diceAreaContainerBody = $("<div>", {
            "class": "panel-body",
        });

        var $playDice = btPlay

        $playDice.click(function () {
            dice1.dicing();
            dice2.dicing();
        })

        $diceAreaContainerBody.append($playDice);
        $diceAreaContainerBody.append(dice1.block);
        $diceAreaContainerBody.append(dice2.block);

        $diceAreaContainer.append($diceAreaContainerBody);
    }


    $diceAreaContainerHeader();
    $diceAreaContainerBody();

    $diceAreaContainer.draggable({ handle: ".panel-heading" });
    //$diceAreaContainer.draggable();
    return $diceAreaContainer;
}
WindowDice.prototype.appendTo = function (elementId) {
    var $block = $("#" + elementId);
    var container = this.initial();
    $block.append(container);
};
WindowDice.prototype.dice = function () {
    this.dice1.dice();
    this.dice2.dice();
    return (this.dic1.dice + this.dic2.dice)
};
WindowDice.prototype.disable = function () {
    this.btPlay.attr("disabled", true);
    this.btPlay.css({ "pointer-events": "none" });
}
WindowDice.prototype.enable = function () {
    this.btPlay.attr("disabled", false);
    this.btPlay.css({ "pointer-events": "auto" });
}

function WindowConsole() {
    this.block;
}
WindowConsole.prototype.constructor = WindowConsole;
WindowConsole.prototype.initial = function () {
    var block = this.block;

    var $diceAreaContainer = $("<div>", {
        "class": "draggable-area-container panel panel-primary",
    });

    var $diceAreaContainerHeader = function () {
        var $diceAreaContainerHeader = $("<div>", { "class": "panel-heading", })
        var table = $("<table>", { "class": "table" });
        var tr = $("<tr>");
        var th = $("<th>", { "html": "Console" });
        var td = $("<td>");
        var moveHandle = $("<i>", { "class": "fa fa-arrows window-move-handle" });
        
        td.append(moveHandle)
        tr.append(th);
        tr.append(td);
        table.append(tr);
        $diceAreaContainerHeader.append(table);
        $diceAreaContainer.append($diceAreaContainerHeader);
    }

    var $diceAreaContainerBody = function () {
        var $diceAreaContainerBody = $("<div>", {
            "class": "panel-body",
            "style":"max-height: 200px"
        });
        block = $diceAreaContainerBody;
        $diceAreaContainer.append($diceAreaContainerBody);
    }
    
    $diceAreaContainerHeader();
    $diceAreaContainerBody();

    $diceAreaContainer.draggable({ handle: ".panel-heading" });
    //$diceAreaContainer.draggable();

    this.block = block;
    return $diceAreaContainer;
}
WindowConsole.prototype.appendTo = function (elementId) {
    var $block = $("#" + elementId);
    var container = this.initial();
    $block.append(container);
}

function WindowPlayerList() {
    this.block;
}
WindowPlayerList.prototype.constructor = WindowPlayerList;
WindowPlayerList.prototype.initial = function () {
    var $diceAreaContainer = $("<div>", {
        "class": "draggable-area-container panel panel-primary",
    });

    var $diceAreaContainerHeader = function () {
        var $diceAreaContainerHeader = $("<div>", { "class": "panel-heading", })
        var table = $("<table>", { "class": "table" });
        var tr = $("<tr>");
        var th = $("<th>", { "html": "Players" });
        var td = $("<td>");
        var moveHandle = $("<i>", { "class": "fa fa-arrows window-move-handle" });

        td.append(moveHandle)
        tr.append(th);
        tr.append(td);
        table.append(tr);
        $diceAreaContainerHeader.append(table);
        $diceAreaContainer.append($diceAreaContainerHeader);
    }

    var $diceAreaContainerBody = function () {
        var $diceAreaContainerBody = $("<div>", {
            "class": "panel-body",
            "style": "max-height: 200px; text-align: left"
        });
        var table = $("<table>", {
            "class":"table table-player-list"
        })
        $diceAreaContainerBody.append(table)

        $diceAreaContainer.append($diceAreaContainerBody);
    }

    $diceAreaContainerHeader();
    $diceAreaContainerBody();

    $diceAreaContainer.draggable({ handle: ".panel-heading" });
    //$diceAreaContainer.draggable();

    this.block = $diceAreaContainer;
    return this.block;
}
WindowPlayerList.prototype.appendTo = function (elementId) {
    var $block = $("#" + elementId);
    var container = this.initial();
    $block.append(container);
}
WindowPlayerList.prototype.addPlayer = function (player) {

    var divPlayer = $("<tr>");
    var thName = $("<th>", {
        "class": "playerName",
        "html": player.name,
    })
    var tdAvatar = $("<td>", {
        "class": "playerAvatar",
        "html": player.avatar.clone()
    })
    var tdMoney = $("<td>", {
        "class": "playerMoney",
        "html": "$" + player.money,
        "style":"font-weight: bold"
    })

    divPlayer.append(tdAvatar);
    divPlayer.append(thName);    
    divPlayer.append(tdMoney);

    this.block.find(".panel-body .table.table-player-list").append(divPlayer);
}
WindowPlayerList.prototype.updatePlayer = function (player) {
    var table = this.block.find(".panel-body .table.table-player-list");
    var rows = table.find("tr");
    $.each(rows, function (i, row) {
        if ($(row).find(".playerName").html() == player.name) {
            $(row).find(".playerMoney").html(player.money);
        }
    })
}