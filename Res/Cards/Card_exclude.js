
//==========================Card================================//
function Card(cardObject) {
    this.cardType = cardObject.cardType;
    this.cardObject = cardObject;
    this.players = [];
    this.block;
    this.avatarBlock;
    this.avatarArray = [];
    this.card;
}
Card.prototype.initial = function () {
    var cardType = this.cardType.toLowerCase();
    var cardObject = this.cardObject;
    var returnCardObject;

    if (cardType == "property card")
        returnCardObject = new PropertyCard(cardObject);
    else if (cardType == "event card")
        returnCardObject = new EventCard(cardObject);
    else if (cardType == "location card")
        returnCardObject = new LocationCard(cardObject);
    else if (cardType == "gotojail card")
        returnCardObject = new GoToJailCard(cardObject);
    else if (cardType == "injail card")
        returnCardObject = new InJailCard(cardObject);
    else if (cardType == "freeparking card")
        returnCardObject = new FreeParkingCard(cardObject);
    else if (cardType == "go card")
        returnCardObject = new GoCard(cardObject);

    this.card = returnCardObject;
    this.block = returnCardObject.initial();
    var avatarBlock = $("<div>", {
        "class": "avatar-block",
        "style": "position:absolute; top: 60%; left 40%",
    })
    
    this.block.append(avatarBlock);
    this.avatarBlock = avatarBlock;

    return this.block;
}
Card.prototype.appendTo = function (elementId) {
    var $block = $("#" + elementId);
    var container = this.initial();
    $block.append(container);
}
Card.prototype.getPlayers = function () {
    return this.players;
}
Card.prototype.setPlayer = function (player) {
    this.players.push(player);
    var avatar = player.avatar;
    //this.avatarArray.push(avatar);
    avatar.hide();
    this.avatarBlock.append(avatar);
    avatar.show(2000);
}
Card.prototype.removePlayer = function (player) {
    this.players.splice(player, 1);
    //var avatar = player.avatar.clone();
    //for (var x = 0; x < this.avatarArray.length; x++) {
    //    if (avatar == this.avatarArray[x])
    //        this.avatarArray[x].remove();
    //}
}
Card.prototype.glow = function (color) {
    console.log(this.card)
    this.block.find(".card-inner-container").css({ "border": "5px solid " + color })
}
Card.prototype.unGlow = function () {
    this.block.find(".card-inner-container").css({ "border": "none" })
}

//==========================Location Card================================//

function LocationCard(cardObject) {
    this.money = 100;
}
LocationCard.prototype.constructor = LocationCard;
LocationCard.prototype.initial = function () {
    var money = this.money;
   
    var $container = $("<div>", {
        "class": "card-inner-container gradient-black-background",
        "style": "text-align: center; "
    });

    function createHeader() {
        var div = $("<div>", {
            "class":" card-header-container card-location"
        })
        return div;
    }
    function createBody() {
        var div = $("<div>", {
            "class": " card-body-container card-location"           
        })
        var marker = $("<i>", {
            "class": "fa fa-map-marker gradient-blue-text",
            "aria-hidden": "true",
            "style": ""
        });

        div.append(marker);

        return div;
    }
    function createFooter() {
        var div = $("<div>", {
            "class": " card-footer-container card-location gradient-golden-text text-xlarge-bolder",           
            "html": "$" + money
        })
        return div;
    }

    $container.append(createHeader());
    $container.append(createBody());
    $container.append(createFooter())

    var $OuterContainer = $("<div>", {
        "class": "card card-container",
    });

    $OuterContainer.append($container);

    return $OuterContainer;
}
LocationCard.prototype.appendTo = function (elementId) {
    var $block = $("#" + elementId);
    var container = this.initial();
    $block.append(container);
}

//==========================Event Card================================//
function EventCard(cardObject) {
    if (cardObject != null && cardObject.event != null)
        this.event = cardObject.event;
}
EventCard.prototype.initial = function () {
    if (this.event != null)
        var event = this.event;

    var $container = $("<div>", {
        "class": "card-inner-container gradient-blue-background",
        "style": "text-align: center;"
    });

    function createHeader() {
        var div = $("<div>", {
            "class": " card-header-container card-event"
        })
        return div;
    }
    function createBody() {
        var div = $("<div>", {
            "class": " card-body-container card-event",
            "style": ""

        })
        var marker = $("<i>", {
            "class": "fa fa-question-circle gradient-golden-text",
            "aria-hidden": "true",
            "style": ""
        });

        div.append(marker);

        return div;
    }
    function createFooter() {
        var div = $("<div>", {
            "class": " card-footer-container",
        })
        return div;
    }

    $container.append(createHeader());
    $container.append(createBody());
    $container.append(createFooter())

    var $OuterContainer = $("<div>", {
        "class": "card card-container",
    });

    $OuterContainer.append($container);

    return $OuterContainer;
}
EventCard.prototype.appendTo = function (elementId) {
    var $block = $("#" + elementId);
    var container = this.initial();
    $block.append(container);
}

//==========================Go Card================================//
function GoCard(cardObject) {
    if (cardObject != null && cardObject.money != null)
        this.money = cardObject.money;
}
GoCard.prototype.initial = function () {
    if (this.money != null)
        var money = this.money;

    var $container = $("<div>", {
        "class": "card-inner-container",
        "style": "text-align: center;background-color: black"
    });

    function createHeader() {
        var div = $("<div>", {
            "class": " card-header-container card-go gradient-golden-text text-large-bolder ",
            "html": "COLLECT $200 SALARY AS YOU PASS",
            "style": "font-family: fantasy;"
        })
        return div;
    }
    function createBody() {
        var div = $("<div>", {
            "class": " card-body-container card-go",
            "style": ""

        })
        var marker = $("<span>", {
            "class": "gradient-golden-text ",
            "html": "GO",
            //"style": "font-size: 8em;font-family: fantasy;"
            "style": "font-family: fantasy;"
        });

        div.append(marker);

        return div;
    }
    function createFooter() {
        var div = $("<div>", {
            "class": " card-footer-container card-go",            
            "style":"position:relative"
        })
        var marker = $("<i>", {
            "class": "fa fa-long-arrow-right",
            "aria-hidden": "true",
            //"style": "color:hsl(0, 87%, 31%); font-size: 6em; text-shadow: 0px 0px 10px  hsl(53, 84%, 51%)"
            "style": "color:hsl(0, 87%, 31%); text-shadow: 0px 0px 3px  hsl(53, 84%, 51%); "
        });
        
        div.append(marker);
        return div;
    }

    $container.append(createHeader());
    $container.append(createBody());
    $container.append(createFooter())

    var $OuterContainer = $("<div>", {
        "class": "card card-container",
    });

    $OuterContainer.append($container);

    return $OuterContainer;
}
GoCard.prototype.appendTo = function (elementId) {
    var $block = $("#" + elementId);
    var container = this.initial();
    $block.append(container);
}

//==========================FreeParking Card================================//
function FreeParkingCard() {
    
}
FreeParkingCard.prototype.initial = function () {
    
    var $container = $("<div>", {
        "class": "card-inner-container gradient-black-background",
        "style": "text-align: center"
    });

    function createHeader() {
        var div = $("<div>", {
            "class": " card-header-container card-freeparking gradient-golden-text text-large-bolder ",
            "html": "FREE",
            "style": "font-family: fantasy;"
        })
        return div;
    }
    function createBody() {
        var div = $("<div>", {
            "class": " card-body-container card-freeparking ",
            "style": ""

        })
        var marker = $("<span>", {
            "class": "fa fa-car gradient-red-text",
            "style": ""
        });

        div.append(marker);

        return div;
    }
    function createFooter() {
        var div = $("<div>", {
            "class": " card-footer-container card-freeparking gradient-golden-text text-large-bolder",
            "html": "PARKING",
            "style": "font-family: fantasy;"
        })
        
        return div;
    }

    $container.append(createHeader());
    $container.append(createBody());
    $container.append(createFooter())

    var $OuterContainer = $("<div>", {
        "class": "card card-container",
    });

    $OuterContainer.append($container);

    return $OuterContainer;
}
FreeParkingCard.prototype.appendTo = function (elementId) {
    var $block = $("#" + elementId);
    var container = this.initial();
    $block.append(container);
}

//==========================GoToJail Card================================//
function GoToJailCard() {

}
GoToJailCard.prototype.initial = function () {

    var $container = $("<div>", {
        "class": "card-inner-container gradient-black-background",
        "style": "text-align: center"
    });

    function createHeader() {
        var div = $("<div>", {
            "class": " card-header-container card-goToJail gradient-golden-text text-large-bolder ",
            "html": "GO TO",
            "style": "font-family: fantasy;"
        })
        return div;
    }
    function createBody() {
        var div = $("<div>", {
            "class": " card-body-container card-goToJail ",
            "style": ""

        })
        var marker = $("<span>", {
            "class": "fa fa-thumbs-o-down gradient-red-text",
            "style": ""
        });

        div.append(marker);

        return div;
    }
    function createFooter() {
        var div = $("<div>", {
            "class": " card-footer-container card-goToJail gradient-golden-text text-large-bolder",
            "html": "JAIL",
            "style": "font-family: fantasy;"
        })

        return div;
    }

    $container.append(createHeader());
    $container.append(createBody());
    $container.append(createFooter())

    var $OuterContainer = $("<div>", {
        "class": "card card-container",
    });

    $OuterContainer.append($container);

    return $OuterContainer;
}
GoToJailCard.prototype.appendTo = function (elementId) {
    var $block = $("#" + elementId);
    var container = this.initial();
    $block.append(container);
}
GoToJailCard.prototype.sendToJail = function (playerObject) {

}
//==========================GoToJail Card================================//
function InJailCard() {

}
InJailCard.prototype.initial = function () {

    var $container = $("<div>", {
        "class": "card-inner-container gradient-black-background",
        "style": "text-align: center"
    });

    function createHeader() {
        var div = $("<div>", {
            "class": " card-header-container card-inJail gradient-golden-text text-large-bolder ",
            "style": "font-family: fantasy;"
        })
        return div;
    }
    function createBody() {
        var div = $("<div>", {
            "class": " card-body-container card-inJail",
            "style": ""
        })

        var innerDiv = $("<div>", {
            "style": "border-bottom: 1px solid hsl(53, 84%, 51%);"
        })

        var jail = $("<div>", {
            "class": "fa-stack fa-lg",
            "style": "font-size: 2em;",
            "html": "<i class=\"fa fa-user-o fa-stack-1x gradient-golden-text\" aria-hidden=\"true\"></i><i class=\"fa fa-bars fa-stack-2x fa-rotate-90 gradient-red-text\" aria-hidden=\"true\"></i>"
        });
        var jailText = $("<div>", {
            "class": " card-footer-container card-inJail gradient-golden-text text-large-bolder",
            "html": "IN JAIL",
            "style": "font-family: fantasy;"
        });
        innerDiv.append(jail);
        innerDiv.append(jailText);
        return div.append(innerDiv);
    }
    function createFooter() {
        var div = $("<div>", {
            "class": " card-footer-container card-inJail gradient-golden-text text-xlarge-bolder",
            "html": "JUST VISITING",
            "style": "font-family: fantasy;"
        })

        return div;
    }

    $container.append(createHeader());
    $container.append(createBody());
    $container.append(createFooter())

    var $OuterContainer = $("<div>", {
        "class": "card card-container",
    });

    $OuterContainer.append($container);

    return $OuterContainer;
}
InJailCard.prototype.appendTo = function (elementId) {
    var $block = $("#" + elementId);
    var container = this.initial();
    $block.append(container);
}

//==========================Property Card================================//
function PropertyCard(cardObject) {
    this.number = cardObject.number;
    this.name = cardObject.name;
    this.rents = cardObject.rents;
    this.color = cardObject.color;
    this.level = cardObject.level != null ? cardObject.level : 1;
    this.owner = cardObject.owner;
    this.money = cardObject.money;
    this.blocks = {};
}
PropertyCard.prototype.initial = function () {
    var number = this.number;
    var name = this.name;
    var rents = this.rents;
    var color = this.color;
    var level = this.level;
    var owner = this.owner;
    var money = this.money;

    var blocks = this.blocks;
   

    var self = this;

    var $container = $("<div>", {
        "class": "card-inner-container gradient-black-background",
        "style": "text-align: center"
    });

    function createHSLText(hsl) {
        var text = "hsl(";
        text += hsl.h + ",";
        text += hsl.s + "%,";
        text += hsl.l + "%";
        text += ")";
        return text;
    }
    function createLevelText(level) {
        var textLevel = level != null && level != "" ? Number(level) : 1;
        var text = "";
        for (var x = 0; x < textLevel; x++) {
            text += "<i class=\"fa fa-home\" aria-hidden=\"true\"></i>";
        }
        return text;
    }


    function createHeader() {
        var div = $("<div>", {
            "class": " card-header-container card-property",
            "style": "background-color:" + createHSLText(color)
        })
        var table = $("<table>", { "class": "property-header-table" })

        var tr = $("<tr>", { "class": "text-xlarge-bolder", })

        var tdLevel = $("<td>", {
            "html": createLevelText(level),
            "style": "text-align: left; padding-left: 1%",
            "class":"property-level"
        })

        var tdOwner = $("<td>", {
            "html": owner != null && owner.avatar != null ? owner.avatar : "",
            "style": "text-align: right; padding-right: 1%; font-size: 0.7em",
            "class": "property-owner"
        })

        blocks.level = tdLevel;
        blocks.owner = tdOwner;

        tr.append(tdLevel);
        tr.append(tdOwner)
        table.append(tr);
        div.append(table);

        return div;
    }
    function createBody() {
        var div = $("<div>", {
            "class": " card-body-container card-property"
        })
        var table = $("<table>", {
            "class": "table",
            //"style":"margin: 5px;"
        });
        for (var x = 0; x < 2; x++) {
            var tr = $("<tr>");
            var td = $("<td>");
            if (x == 0) {
                var span = $("<div>", {
                    "html": number,
                    "class": "text-circle gradient-golden-background text-xxlarge-bolder",
                    "style": "margin: 0 auto;"
                });
                td.append(span);
            }
            else {
                var span = $("<div>", {
                    "html": name,
                    "class": "gradient-golden-text text-xlarge-bolder"
                });
                td.append(span)
            }
            tr.append(td);
            table.append(tr);
        }
        div.append(table);

        return div;
    }
    function createFooter() {
        var div = $("<div>", {
            "class": " card-footer-container card-property golden-text",
            //"style":"padding-top: 10px"
        })
        var value = $("<div>", { "html": "$" + money, "class": "text-xlarge-bolder" })
        var rent = $("<div>", { "html": "$" + self.getRent(), "class": "text-xlarge-bolder" })

        blocks.value = value;
        blocks.rent = rent;

        if (owner == null || owner == "")
            div.append(value);
        else
            div.append(rent);
        return div;
    }

    $container.append(createHeader())
    $container.append(createBody())
    $container.append(createFooter())


    var $OuterContainer = $("<div>", {
        "class": "card card-container",
    });

    $OuterContainer.append($container);

    return $OuterContainer;
}
PropertyCard.prototype.appendTo = function (elementId) {
    var $block = $("#" + elementId);
    var container = this.initial();
    $block.append(container);
}
PropertyCard.prototype.getRent = function () {
    var rents = this.rents;
    var level = this.level;

    var R = rents[0].rent;
    for (var x = 0; x < rents; x++) {
        if (rents[x].level == level) {
            R = rents[x].rent;
        }
    }
    return R;
}
PropertyCard.prototype.getOwner = function () {
    return this.owner;
}
PropertyCard.prototype.setOwner = function (player)
{
    this.owner = player;
    this.blocks.owner.html(player.avatar.clone())
}
PropertyCard.prototype.levelUp = function () {
    this.level++;
}