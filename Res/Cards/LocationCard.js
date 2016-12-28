function LocationCard(cardObject) {
    this.money = 100;
}

LocationCard.prototype.constructor = LocationCard;
LocationCard.prototype.initital = function () {
    var money = this.money;
   
    var $container = $("<div>", {
        "class": "card-inner-container",
        "style": "text-align: center"
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
        div.append("<i class=\"fa fa-map-marker\" aria-hidden=\"true\" style=\"font-size: 10em\"></i>");

        return div;
    }
    function createFooter() {
        var div = $("<div>", {
            "class": " card-footer-container card-location",
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
    var container = this.initital();
    $block.append(container);
}

