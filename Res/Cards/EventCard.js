function EventCard(cardObject) {
    this.number = cardObject.number;
    this.name = cardObject.name;
    this.rents = cardObject.rents;
    this.color = cardObject.color
}

EventCard.prototype.constructor = EventCard;
EventCard.prototype.initital = function () {
    var number = this.number;
    var name = this.name;
    var rents = this.rents;
    var color = this.color;

    var $container = $("<div>", {
        "class": "properties-inner-container",
    });

    function createHSLText(hsl) {
        var text = "hsl(";
        text += hsl.h + ",";
        text += hsl.s + "%,";
        text += hsl.l + "%";
        text += ")";
        return text;
    }

    function createPropertyNumberContainer(propertyNumber) {
        var $propertyNumberContainer = $("<div>", {
            "class": "properties-number-container",
            "style": "background-color:" + createHSLText(color)
        });

        var $propertyNumber = $("<div>", {
            "class": "properties-number",
            "html": propertyNumber
        });

        $propertyNumberContainer.append($propertyNumber);

        return $propertyNumberContainer;
    }

    function createPropertyNameContainer(propertyName) {
        var $propertyNameContainer = $("<div>", {
            "class": "properties-name-container"
        });

        var $propertyName = $("<div>", {
            "html": propertyName,
            "class": "properties-name"
        });

        $propertyNameContainer.append($propertyName);

        return $propertyNameContainer;
    }

    function createPropertyRentsContainer(propertyRents) {
        var table = $("<table>", {
            "class": "table table-striped",
            "style": "",
            "html": "<tr><th>Rent Level</th><th>Rent</th></tr>",

        })

        $.each(propertyRents, function (i, rent) {
            var eachLevel = 60 / 4;
            var hslColor = {
                h: color.h,
                s: color.s - (4 - i) * eachLevel,
                l: color.l + (4 - i) * eachLevel
            }
            var tdLevel = $("<td>", {
                "html": rent.level,
                //"style":"font-weight: 600; color :black; text-indent: 5px;"
            });
            var tdRent = $("<td>", {
                "html": "$" + rent.rent,
                //"style": "font-weight: 600; color :black; text-indent: 5px;"
            });
            var tr = $("<tr>", {
                "style": "background-color: " + createHSLText(hslColor)
            });
            tr.append(tdLevel);
            tr.append(tdRent);
            table.append(tr);
        })

        var $propertyRentsContainer = $("<div>", {
            "class": "properties-rents-container"
        });

        $propertyRentsContainer.append(table);

        return $propertyRentsContainer;
    }


    $container.append(createPropertyNumberContainer(number))
    $container.append(createPropertyNameContainer(name))
    $container.append(createPropertyRentsContainer(rents))


    var $OuterContainer = $("<div>", {
        "class": "properties-container",
    });

    $OuterContainer.append($container);

    return $OuterContainer;
}
EventCard.prototype.appendTo = function (elementId) {
    var $block = $("#" + elementId);
    var container = this.initital();
    $block.append(container);
}