---
---
(function() {
$.get("{{ site.url }}/assets/san-joaquin.json", null, function(data) { 
    ORIGINAL_DATA = data;
    draw()
});

var TYPHOON_DATE = moment("November 8, 2013");
var TYPHOON_DATE_FORMATTED = moment("November 8, 2013").format("MMM. D, YYYY");

var ORIGINAL_DATA = undefined;

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
    cont.data("name", record.name);
    cont.data("dob", record.dob);
    cont.data("ageYears", ageYears);
    return cont;
}

function setListeners() {
    var form = $("#grave-controls");
    form.find("#grave-form-name").keydown(setFilters);
    form.find("#grave-form-age-from").keydown(setFilters);
    form.find("#grave-form-age-to").keydown(setFilters);
}

function setFilters() {
    console.log("setFilters");
    $("#grave").empty()
    var ageMin = $("#grave-form-age-from").val()
    var ageMax = $("#grave-form-age-to").val()
    var name = $("#grave-form-name").val()
    draw(ORIGINAL_DATA.filter(function(a){
        var remove = false
        if(name != undefined) {
            if(a.name.indexOf(name) < 0) {
                remove = true;
            }
        }
        var ageYears = TYPHOON_DATE.diff(moment(a.dob), "years");
        if(ageMin != undefined) {
            if(ageYears < ageMin) {
                remove = true;
            }
        }
        if(ageMax != undefined) {
            if(ageYears > ageMax) {
                remove = true;
            }
        }
        return !remove;
    }));
}

function draw(data) {
    if(data == undefined) {
        data = ORIGINAL_DATA
    }
    var el = $("#grave")
    for(var i = 0; i < data.length; i++) {
        var record = data[i];
        el.append(getIndividual(record));
    }
    setListeners()
}
})();
