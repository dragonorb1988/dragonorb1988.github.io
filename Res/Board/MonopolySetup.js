
function PlayerContainerTr() {
    this.body = {};
    this.bodyHtml = {};

    this.name;
    this.controller;
    this.money;
    this.color;
    this.avatar;   
}
PlayerContainerTr.prototype.constructor = PlayerContainerTr;
PlayerContainerTr.prototype.initial = function () {
    var self = this;
    
    var container = $("<tr>", {
        "class": "player-container-tr",
        "style":"margin-top: 5px"

    })
    this.body.container = container

    //===================================================================================//
    var tdName = $("<td>");
    var tdNameInput = $("<input>", {
        "class": "player-container-td player-container-td-name form-control",
        "value":"Player"
    })
    self.name = "Player";
    tdName.append(tdNameInput)
    this.body.tdNameInput = tdNameInput
    tdNameInput.on("input", function(event){
        self.name = $(event.currentTarget).val();
    })

    //===================================================================================//
    var tdController = $("<td>");
    var tdControllerSelect = $("<select>", {
        "class": "player-container-td player-container-td-controller btn btn-default",
    })
    var controllerOption = ["Player", "Computer"];
    $.each(controllerOption, function (i, item) {
        if (item == "Computer") {
            var option = $("<option>", {
                "html": item,
                "value": item.toLowerCase(),
                "selected":"selected"
            })
        } else {
            var option = $("<option>", {
                "html": item,
                "value": item.toLowerCase(),
            })
        }
        
        tdControllerSelect.append(option);
    })
    tdController.append(tdControllerSelect);
    this.body.tdControllerSelect = tdControllerSelect;
    self.controller = "computer";
    tdControllerSelect.on("change", function (event) {
        self.controller = $(event.currentTarget).val();
    })

    //===================================================================================//
    var tdMoney = $("<td>");
    var tdMoneySelect = $("<select>", {
        "class": "player-container-td player-container-td-money btn btn-default",
    })
    var moneyOption = [0, 100, 500, 1000, 1500, 2000, 2500];
    $.each(moneyOption, function (i, item) {
        var option = $("<option>", {
            "html": item,
            "value": item
        })
        if (item == 1500)
            option.attr("selected", "selected")
        tdMoneySelect.append(option);
    })
    tdMoney.append(tdMoneySelect);
    self.money = 1500;
    this.body.tdMoneySelect = tdMoneySelect;
    tdMoneySelect.on("change", function (event) {
        self.money = $(event.currentTarget).val();
    })

    //===================================================================================//
    var tdColor = $("<td>");
    var tdColorSelect = $("<select>", {
        "class": "player-container-td player-container-td-color btn btn-default",
    })
    
    var colorOption = [
        { value: { h: 0, s: 100, l: 50 }, title: "Red" },
        { value: { h: 36, s: 100, l: 50 }, title: "Orage" }, { value: { h: 65, s: 100, l: 47 }, title: "Yellow" },
        { value: { h: 93, s: 100, l: 50 }, title: "Green" }, { value: { h: 180, s: 100, l: 50 }, title: "Light Blue" },
        { value: { h: 228, s: 100, l: 50 }, title: "Blue" }, { value: { h: 276, s: 100, l: 50 }, title: "Purple" },
        { value: { h: 320, s: 100, l: 50 }, title: "Pink" }];
    var colorIndex = self.randomNumber(0, colorOption.length-1)
    $.each(colorOption, function (i, item) {
        if (colorIndex == i) {
            var option = $("<option>", {
                "html": item.title,
                "value": JSON.stringify(item.value),
                "style": "background-color:" + self.createHSLColor(item.value),
                "selected": "selected"
            })
        }
        else {
            var option = $("<option>", {
                "html": item.title,
                "value": JSON.stringify(item.value),
                "style": "background-color:" + self.createHSLColor(item.value)
            })
        }
        
        tdColorSelect.append(option);
    });
    tdColor.append(tdColorSelect);
    this.body.tdColorSelect = tdColorSelect;
    self.color = colorOption[colorIndex].value;
    tdColorSelect.on("change", function (event) {
        self.color = JSON.parse($(event.currentTarget).val());
        self.refresh();
    })

    //===================================================================================//
    var tdAvatar = $("<td>");
    var tdAvatarSelect = $("<select>", {
        "class": "player-container-td player-container-td-avatar btn btn-default",
    })
    var avatarOption = [
        { value: "icofont icofont-native-american", title: "Native American" },
        { value: "icofont icofont-hand-power", title: "Hand Power" }, { value: "icofont icofont-castle", title: "Castle" },
        { value: "icofont icofont-king-crown", title: "King" }, { value: "icofont icofont-queen-crown", title: "Queen" },
        { value: "icofont icofont-snail", title: "Snail" }, { value: "icofont icofont-animal-panda", title: "Panda" },
        { value: "icofont icofont-animal-horse-head-alt-2", title: "Horse" },
        { value: "icofont icofont-paralysis-disability", title: "Disability" },
        { value: "icofont icofont-cyclist", title: "Cyclist" },
        { value: "icofont icofont-airplane", title: "Airplane" },
        { value: "icofont icofont-golf-cart", title: "Golf Cart" },
        { value: "icofont icofont-tractor", title: "Tractor" },
        { value: "icofont icofont-motor-bike", title: "Bike" },
        { value: "icofont icofont-man-in-glasses", title: "Glasses Man" },
        { value: "icofont icofont-toy-duck", title: "Toy Duck" }
    ];
    var avatarIndex = self.randomNumber(0,avatarOption.length-1)
    $.each(avatarOption, function (i, item) {
        if (i == avatarIndex) {
            var option = $("<option>", {
                "html": item.title,
                "value": item.value,
                "selected" :"selected"
            })
        }
        else {
            var option = $("<option>", {
                "html": item.title,
                "value": item.value,
            })
        }       
        tdAvatarSelect.append(option);
    })
    tdAvatar.append(tdAvatarSelect);
    this.body.tdAvatarSelect = tdAvatarSelect;
    self.avatar = avatarOption[avatarIndex].value;
    tdAvatarSelect.on("change", function (event) {
        self.avatar = $(event.currentTarget).val();
        self.refresh();
    })


    //===================================================================================//
    var tdIcon = $("<td>");
    var tdIconI = $("<i>", {
        "class": "",
        "style":"font-size: 2em"
    })
    tdIcon.append(tdIconI)
    this.body.tdIconI = tdIconI;


    //===================================================================================//
    var tdDelete = $("<td>");
    var tdDeleteButton = $("<button>", {
        "class": "btn btn-danger",
        "html": "Delete"
    })
    tdDelete.append(tdDeleteButton)
    this.body.tdDeleteButton = tdDeleteButton;
    tdDeleteButton.on("click", function () {
        playerTable.remove_player(self);
        self.body.container.remove();        
    })

    //==================================================================================//

    container.append(tdName);
    container.append(tdController);
    container.append(tdMoney)
    container.append(tdColor);
    container.append(tdAvatar);
    container.append(tdIcon)
    container.append(tdDelete)

    this.bodyHtml = container

}
PlayerContainerTr.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
    this.refresh();
}
PlayerContainerTr.prototype.import = function (playerData) {
    this.controller = playerData.controller;
    this.name = playerData.name;
    this.avatar = playerData.avatar;
    this.color = playerData.color;
    this.money = playerData.money;

    this.body.tdNameInput.val(this.name);
    this.body.tdControllerSelect.val(this.controller);
    this.body.tdMoneySelect.val(this.money);
    this.body.tdColorSelect.val(JSON.stringify(this.color));
    this.body.tdAvatarSelect.val(this.avatar);
}
PlayerContainerTr.prototype.export = function () {
    var self = this;
    return {
        type: "player",
        controller: self.controller,
        name: self.name,
        avatar: self.avatar,
        color: self.color,
        money: self.money
    }
}
PlayerContainerTr.prototype.refresh = function () {
    var self = this;

    self.body.tdIconI.hide();
    self.body.tdIconI.attr("class", "");
    self.body.tdIconI.addClass(self.avatar);
    self.body.tdIconI.css({ "color": self.createHSLColor(self.color) });
    self.body.tdIconI.fadeIn();
}
PlayerContainerTr.prototype.createHSLColor = function (hsl) {
    var text = "hsl(";
    text += hsl.h + ",";
    text += hsl.s + "%,";
    text += hsl.l + "%";
    text += ")";
    return text;
}
PlayerContainerTr.prototype.randomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function PlayerContainerTable() {
    this.body = {};
    this.bodyHtml;

    this.container = {};
    this.trths = {};
    this.trtds = [];
}
PlayerContainerTable.prototype.constructor = PlayerContainerTable;
PlayerContainerTable.prototype.initial = function () {
    var container = $("<table>", {
        "class": "table menu-section-player-container",
    })
    var tbody = $("<tbody>")

    var trths = $("<tr>");
    trths.append($("<th>", { "html": "Name" }));
    trths.append($("<th>", { "html": "Controller" }))
    trths.append($("<th>", { "html": "Money" }))
    trths.append($("<th>", { "html": "Color" }))
    trths.append($("<th>", { "html": "Avatar" }))
    trths.append($("<th>", { "html": "" }))
    trths.append($("<th>", { "html": "" }))

    this.trths = trths;

    container.append(tbody);
    tbody.append(trths);

    this.container = container;
    this.body.container = container;
    this.body.tbody = tbody
    this.bodyHtml = container;
}
PlayerContainerTable.prototype.appendTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.append(this.bodyHtml);
}
PlayerContainerTable.prototype.prependTo = function (JqueryHtmlBlock) {
    if (this.bodyHtml == null)
        this.initial();
    JqueryHtmlBlock.prepend(this.bodyHtml);
}
PlayerContainerTable.prototype.add_player = function (PlayerObject) {

    var self = this;
    var tr = {};

    if (PlayerObject) {
        tr = new PlayerContainerTr();
        tr.initial();
        tr.import(PlayerObject);
    }
    else {
        tr = new PlayerContainerTr();
        tr.initial();
    }

    tr.appendTo(self.body.tbody);
    self.trtds.push(tr);
    
}
PlayerContainerTable.prototype.remove_player = function (PlayerContainerTr) {
    var self = this;

    var index = self.trtds.indexOf(PlayerContainerTr);
    if (index != -1) {
        self.trtds.splice(index, 1);
    }
}
PlayerContainerTable.prototype.export = function () {
    var self = this;
    var array = [];
    $.each(self.trtds, function (i, tr) {
        array.push(tr.export());
    })
    return array;
}
PlayerContainerTable.prototype.import = function (playerDatas) {
    var self = this;
    $.each(playerDatas, function (i, playerData) {
        self.add_player(playerData);
    })
}
