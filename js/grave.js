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
    if(record.dob != undefined && record.dob != "") {
        console.log(record.dob);
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
        var ageDays = TYPHOON_DATE.diff(dob, "days");
        if(ageYears == 0 && ageMonths == 0) {
            el.append("<span class='age'>"+ageDays+" days old</span>");
        }
        else if(ageYears == 0) {
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
    form.find("#grave-form-name").keyup(setFilters);
    form.find("#grave-form-age-from").keyup(setFilters);
    form.find("#grave-form-age-to").keyup(setFilters);

    form.find("#grave-form-name").on("input", setFilters);
    form.find("#grave-form-age-from").on("input", setFilters);
    form.find("#grave-form-age-to").on("input", setFilters);
}

function setFilters() {
    var filterAgeMin = $("#grave-form-age-from").val()
    var filterAgeMax = $("#grave-form-age-to").val()
    var filterName = $("#grave-form-name").val()
    var visibleCount = 0;
    $("#grave .grave-record").each(function(index) {
        var name = $(this).data("name");
        var age = $(this).data("ageYears");
        var omit = false;
        if(filterName != undefined && filterName != "") {
            if(name.toLowerCase().indexOf(filterName.toLowerCase()) < 0) {
                omit = true;
            }
        }
        if(parseInt(filterAgeMin)) {
            if(age < filterAgeMin || age == undefined) {
                omit = true;
            }
        }
        if (parseInt(filterAgeMax)) {
            if(age > filterAgeMax || age == undefined) {
                omit = true;
            }
        }
            
        if(omit) {
            $(this).hide();
        }
        else {
            $(this).show();
            visibleCount += 1;
        }
    });
    $("#grave-info > .number").text(visibleCount);
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
    setListeners();
    setFilters();
}
})();
