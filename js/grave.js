---
---
(function() {
$.get("{{ site.url }}/assets/san-joaquin.json", null, draw);

var TYPHOON_DATE = moment("November 8, 2013");
var TYPHOON_DATE_FORMATTED = moment("November 8, 2013").format("MMM. D, YYYY");


function getIndividual(record) {
    var cont = $("<div class='large-3 small-12 columns grave-record'>");
    var el = $("<div class='grave-record-inner'>");
    el.appendTo(cont);
    if(record.image != undefined) {
        cont.prepend("<img src='{{ site.url }}/assets/images/grave/"+record.image+".jpg'>")
    }
    el.append("<span class='name'>"+record.name+"</span>");
    if(record.dob != undefined) {
        // DOB
        var dates = $("<div class='dates'>")
        var dob = moment(record.dob)
        dates.append("<span class='dob'>"+dob.format("MMM. D, YYYY")+"</span>");
        dates.append(" - ");
        dates.append("<span class='dod'>"+TYPHOON_DATE_FORMATTED+"</span>");
        el.append(dates)

        // Age
        var ageYears = TYPHOON_DATE.diff(dob, "years");
        var ageMonths = TYPHOON_DATE.diff(dob, "months") % 12;
        if(ageYears == 0) {
            el.append("<span class='age'>"+ageMonths+" months old</span>");
        }
        else if(ageYears < 2 && ageMonths > 0) {
            el.append("<span class='age'>"+ageYears+" year, "+ageMonths+" months old</span>");
        }
        else {
            el.append("<span class='age'>"+ageYears+" years old</span>");
        }
        
    }
    return cont;
}

function draw(data) {
    var el = $("#grave")
    for(var i = 0; i < data.length; i++) {
        var record = data[i];
        el.append(getIndividual(record));
    }
}
})();
