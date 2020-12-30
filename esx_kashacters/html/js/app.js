$(".character-box").hover(
    function() {
        $(this).css({
            "background": "rgba(42, 125, 193, 1.0)",
            "transition": "200ms",
        });
    }, function() {
        $(this).css({
            "background": "rgba(0,0,0,0.6)",
            "transition": "200ms",
        });
    }
);

$(".character-box").click(function () {
    $(".character-box").removeClass('active-char');
    $(this).addClass('active-char');
    if($(this).attr("data-charid") === "1") {
        $(".character-buttons").css({"display":"block", "float":"left", "width":"auto", "margin-left":"5px", "left":"0"});
    } 
    else if($(this).attr("data-charid") === "3") {
        $(".character-buttons").css({"display":"block", "float":"left", "position": "relative", "left":"42.5%"});
    } else {
        $(".character-buttons").css({"display":"block", "float":"right", "width":"auto", "left":"0", "margin-right":"5px"});
    }
    if ($(this).attr("data-ischar") === "true") {
        $("#delete").css({"display":"block"});
    } else {
        $("#delete").css({"display":"none"});
    }
});

$("#play-char").click(function () {
    $.post("http://esx_kashacters/CharacterChosen", JSON.stringify({
        charid: $('.active-char').attr("data-charid"),
        ischar: $('.active-char').attr("data-ischar"),
    }));
    Kashacter.CloseUI();
});

$("#deletechar").click(function () {
    $.post("http://esx_kashacters/DeleteCharacter", JSON.stringify({
        charid: $('.active-char').attr("data-charid"),
    }));
    Kashacter.CloseUI();
});

(() => {
    Kashacter = {};

    Kashacter.ShowUI = function(data) {
        $('.main-container').css({"display":"block"});

        if(data.characters !== null) {
            $.each(data.characters, function (index, char) {
                if (char.charid !== 0) {
                    var charid = char.identifier.charAt(4);
                    $('[data-charid=' + charid + ']').html('<h3 class="character-fullname">'+ char.firstname +' '+ char.lastname +'</h3><div class="character-info"><p class="character-info-work"><strong>Job: </strong><span>'+ char.job +'</span></p><p class="character-info-money"><strong>Bargeld: </strong><span>'+ char.money +'</span></p><p class="character-info-bank"><strong>Bank: </strong><span>'+ char.bank +'</span></p> <p class="character-info-dateofbirth"><strong>Handy: </strong><span>'+ char.phone +'</span></p> <p class="character-info-gender"><strong>Geschlecht: </strong><span>'+ char.sex +'</span></p></div>').attr("data-ischar", "true");
                }
            });
        }

        if(data.admin === false){
            $('[data-charid=3]').css({"display":"none"});
        }
    };

    Kashacter.CloseUI = function() {
        $('.main-container').css({"display":"none"});
        $(".character-box").removeClass('active-char');
        $("#delete").css({"display":"none"});
		$(".character-box").html('<h3 class="character-fullname"><i class="fas fa-plus"></i></h3><div class="character-info"><p class="character-info-new">Neuen Charakter erstellen</p></div>').attr("data-ischar", "false");
    };
    window.onload = function(e) {
        window.addEventListener('message', function(event) {
            switch(event.data.action) {
                case 'openui':
                    Kashacter.ShowUI(event.data);
                    break;
            }
        })
    }

})();