---
---
(function() {
$.getJSON("{{ site.url }}/assets/san-joaquin.json", null, function(data) { 
    ORIGINAL_DATA = data;
    $(document).ready(function(){
        draw();
        initBanner(data);
    });
});

function initBanner(data) {
    var el = $("#grave-cover-back");
    var FAKE_COVER_HEIGHT = 620 + 250;
    function fillCover() {
        var i = 0;
        var last = el.find(".grave-image").last();
        if(last.length > 0 && last.position().top > FAKE_COVER_HEIGHT) {
            return;
        }
        while(true && i < 100) {
            i += 1;
            var index = parseInt(Math.random() * data.length);
            var individualImage = data[index].image;
            if(individualImage == undefined || individualImage == "") {
                continue;
            }
            var newElement = $("<div class='grave-image' style='background-image: url({{ site.url }}/assets/images/grave/thumbs/"+individualImage+".jpg)' />")
            el.append(newElement);
            if(newElement.position().top > FAKE_COVER_HEIGHT) {
                break;
            }
        }
    }
    fillCover();

    function tick() {
        var id = window.requestAnimationFrame(tick);
        var newPosition = el.position().top- 0.25
        if(newPosition <= -150) {
            newPosition = 0;
            var toRemove = [];
            el.children().each(function() {
                if($(this).position().top == 0) {
                    toRemove.push(this);
                }
            });
            for(var i = 0; i < toRemove.length; i++) {
                toRemove[i].remove();
            }
            fillCover();
        }
        el.css("top", newPosition + "px");
    }
    requestAnimationFrame(tick);
}


var TYPHOON_DATE = moment("November 8, 2013");
var TYPHOON_DATE_FORMATTED = moment("November 8, 2013").format("MMM. D, YYYY");

var ORIGINAL_DATA = undefined;

/* Thanks http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function getIndividual(record) {
    var cont = $("<div class='large-3 small-12 columns grave-record'>");
    var el = $("<div class='grave-record-inner'>");
    el.appendTo(cont);
    if(record.image != undefined && record.image != "") {
        cont.prepend("<a href='{{site.url}}/assets/images/grave/"+record.image+".jpg'><img src='{{ site.url }}/assets/images/grave/thumbs/"+record.image+".jpg'></a>");
    }
    else {
        cont.prepend("<img src='{{ site.url }}/assets/images/grave/thumbs/unmarked.jpg'>");
    }
    el.append("<span class='name'>"+record.name+"</span>");
    if(record.dob != undefined && record.dob != "") {
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
    data = shuffle(data);
    for(var i = 0; i < data.length; i++) {
        var record = data[i];
        el.append(getIndividual(record));
    }
    setListeners();
    setFilters();
    $(".grave-record a").fancybox();
    $(".grave-record a").click(function(e) { e.preventDefault(); });
}
})();
