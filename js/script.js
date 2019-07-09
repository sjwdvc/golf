const colors = ['red', 'blue', 'yellow', 'white'];
const amountOfScoreButtons = 8;
const par = [0, 4, 4, 5, 3, 5, 4, 3, 3, 4, 3, 4, 3, 5, 4, 4, 4, 4, 4];
const wedstrijd = 2;


let masonries = [];
let masonriesElements = [];

var holes = 18;
var min = 0;

$(document).ready(function () {

<<<<<<< HEAD
$(".sliding-link").click(function(e) {
    e.preventDefault();
    var aid = $(this).attr("href");
    $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
});

localStorage.setItem('targetDiv', 'bottom');




    if(localStorage.getItem('team')){
        $(".splash").hide();
    } else {
        $(".splash").show();
        $(".splash").delay( 2000 ).fadeOut("slow");

=======
    if (localStorage.getItem('team')) {
        $(".splash").hide();
    } else {
        $(".splash").show();
        $(".splash").delay(5000).fadeOut("slow");
>>>>>>> b594f9fa21603912117d2650ee4fc277d6c2b98c
    }

    var nu = Date.now();
    if (localStorage.getItem('cookie') < nu) {
        localStorage.clear();
        restart();
        //getNextTeamGame();
        localStorage.setItem('cookie', Date.now() + (6 * 60 * 60 * 1000));//5*60*60*1000
        console.log('cookie gezet, geldt voor 6 uren');
    }
    generatePage();
<<<<<<< HEAD

    $("#vanLange").delay(5000).fadeIn();


});


function scherm(){
    var txt = "";
    txt += "Document width/height: " + $(document).width();
    txt += "x" + $(document).height() + "\n";
    txt += "Window width/height: " + $(window).width();
    txt += "x" + $(window).height();
    alert(txt);
}





function log(val){
    console.log(val);
}




function showRules(){
    $('#regelement').toggle();
  
  
    $([document.documentElement, document.body]).animate({
        scrollTop: $(`.${localStorage.getItem('targetDiv')}`).offset().top
    }, 2000);
  
  
    var targetDiv = localStorage.getItem('targetDiv');
     if (targetDiv === "bottom"){
         targetDiv = "top";
     } else {
         targetDiv = "bottom";
     }
     localStorage.setItem('targetDiv', targetDiv);
   // targetDiv = 'bottom';




}




function getTeamMembers(){
    if(localStorage.getItem('team')){

=======
});

function getTeamMembers() {
    if (localStorage.getItem('team')) {
>>>>>>> b594f9fa21603912117d2650ee4fc277d6c2b98c
        return (executeQuery(`select name from teamleden where teamId= ${localStorage.getItem('team')}`));
        //localStorage.setItem(getTeamMembers);
    }
}

function setMemberCount(memberObj, del) {
    if (localStorage.getItem('team')) {
        JSON.parse(memberObj).forEach(function (member) {
            if (!localStorage.getItem(member['name'])) {
                localStorage.setItem(member['name'], 0);
            }
        });
    }
}

function updateMemberCount(member) {
    var aantal = localStorage.getItem(member);
    aantal++;
    localStorage.setItem(member, aantal);

    if (!localStorage.getItem('memberTee')) {
        localStorage.setItem('memberTee', JSON.stringify([]));
    }

    var memberTee = JSON.parse(localStorage.getItem('memberTee'));
    memberTee.push(member);
    localStorage.setItem('memberTee', JSON.stringify(memberTee));
}


function klassement(game) {
    var klasse = {};
    var trArray = [];
    var scoreTabel = null;
    if (game === '2018') {
        scoreTabel = 'scoresCup2018';
    } else {
        scoreTabel = 'scores';
    }

    var klasQuery = `select  s.team AS team, teams.team as teamnaam,`;
    for (i = 1; i <= holes; i++) {
        klasQuery += (` sum(case when s.hole = ${i} then s.score end) AS H${i}`);
        if (i <= 17) {
            klasQuery += `,`;
        }
    }

    klasQuery += ` ,s.game from ${scoreTabel} s left join teams on teams.id = s.team  left join holes h on(h.hole = s.hole)  group by s.team, s.game `;

    var dbResult = executeQuery(klasQuery);
    dbResult.forEach(function (teams) {
        var teamRow = "";
        var totaal = 0;
        var team = teams['team'];
        var teamNaam = teams['teamnaam'];
        var game = teams['game'];
        var kleurObj = executeQuery(`SELECT kleur FROM ${scoreTabel} WHERE team = ${team} and game = ${game} order by id`);

        teamRow += `<tr><td colspan=22 class=text-left>${teamNaam}</td></tr><tr><td></td>`;

        for (hole = 1; hole <= holes; hole++) {
            var scoreBorder = ``;
            var bgColor = 'grey';

            if (!teams['H' + hole]) {
                score = par[hole];
                totaal += parseFloat(score);
            } else {
                score = teams['H' + hole];
                totaal += parseFloat(score);
                styleId = `<div class="circle">`;

                if (!kleurObj[hole - 1]) {
                    bgColor = 'grey';
                } else {
                    bgColor = kleurObj[hole - 1]['kleur'];
                }
            }

            if (score < par[hole]) {
                scoreBorder += `<div class="birdie">`;
            }
            if (score > par[hole]) {
                scoreBorder += `<div class="bogey">`;
            }

            teamRow += `<td width=4%  bgcolor= ${bgColor}> ${scoreBorder}`;

            teamRow += score;
            if (styleId != ``) {
                teamRow += `</div>`;
            }
            teamRow += "</td>";
        }

        var parKleur = 'marineblue';
        if ((totaal - 70) < 0) {
            var parKleur = 'red';
        } else if ((totaal - 70) == 0) {
            var parKleur = 'silver';
        }

        teamRow += `<td>` + totaal + `</td><td bgcolor=${parKleur}>` + (totaal - 70) + `</td></tr>`;
        trArray.push([totaal, team, teamNaam, teamRow]);
    });

    renderKlassement(trArray);
};


function renderKlassement(trArray) {
    trArray.sort(function (a, b) {
        return a[0] - b[0];
    });
    var table = `<table class="table table-border table-hover table-sm table-responsive-md text-center thead-dark">
    <tr><td>Pos.</td>`;//class='klassement'
    for (h = 1; h < 19; h++) {
        table += `<td>H` + h + `<br>${par[h]}</td>`
    }
    table += `<td>2B</td><td>#</td></tr>`;
    var pos = 0;
    var prevTotal = "";
    var posT

    trArray.forEach(function (row) {
        var posT = '';
        //pos++;
        if (row[0] != prevTotal) {
            pos++;
            prevTotal = row[0];
        } else {
            posT = "*";

        }
        tableRow = row[3];
        tableRow = tableRow.replace("<tr>", "<tr><td>" + pos + posT + "</td>");
        table += tableRow;

    });

    table += "</table>";
    $("#klassement").html(table);
}


function setColorCount() {
    //if(localStorage.getItem('colorCount')){
    var colorCount = {
        max: 5,
        maxCount: 0,
        red: 0,
        yellow: 0,
        blue: 0,
        white: 0
    }

    localStorage.setItem('colorCount', JSON.stringify(colorCount));
    //}
}


function checkMax(color) {
    var colorCount = JSON.parse(localStorage.getItem('colorCount'));
    //console.log('kleur');
    //console.log(colorCount[color]);
    //color moet hier eigenlijk verwijzen naar de var met die naam
    if (colorCount[color] < colorCount['max']) {
        colorCount[color]++;
        if (colorCount[color] == colorCount['max']) {
            colorCount['maxCount']++;
            if (colorCount['maxCount'] == 2) {
                colorCount['max'] = 4;
            }
        }

        localStorage.setItem('colorCount', JSON.stringify(colorCount));

        return true;
    } else {

        return false;
        //mischien zelfs knop weghalen
    }
}


function generatePage() {


    //teamSet zoekt automatisch in de DOM naar een element met id="teamSet"
    teamSet.style.display = noTeamSet.style.display = 'none';

    //init alle masonries tegelijkertijd
    initializeGrids();

    // if (getTeamFromURL()) {
    //     getTeamMembers(localStorage.getItem('team'));
    //     setMemberCount(localStorage.getItem('team'));
    //     showTeamSet();
    // } else {
    //     showNoTeamSet();
    // }

    if (localStorage.getItem('team')) {
        showTeamSet();
    } else {
        showNoTeamSet();
    }
<<<<<<< HEAD



    localStorage.setItem('member',`-`);
=======
    localStorage.setItem('member', `-`);
>>>>>>> b594f9fa21603912117d2650ee4fc277d6c2b98c
    var hole = localStorage.getItem('hole');
    showHole(hole);
    restructure();
}


function getNextTeamGame(team) {
    var teamGame = executeQuery(`SELECT max(game) as maxGame FROM scores `); //WHERE team = ` + team
    //console.log(teamGame[0]['maxGame']);
    var nextTeamGame = parseFloat(teamGame[0]['maxGame']) + 1;
    localStorage.setItem('game', nextTeamGame);
    //console.log(nextTeamGame);

}


function getTeamFromURL() {
    //bouw url
    var url = new URL(window.location.href);
    //vraag url parameter team op
    var team = url.searchParams.get("team");
    //team in url gevonden

    if (team) {
        if (team !== localStorage.getItem('team')) {
            localStorage.setItem('hole', 1);
            setColorCount();
        }
        localStorage.setItem('team', team);
        getNextTeamGame(team);
        return true;
    }
    //team niet gevonden in url
    else {
        //check if exists in localstorage
        if (localStorage.getItem('team')) {
            return true;
        }
        //check in url
        else {
            return false;
        }
    }
}

function showNoTeamSet() {
    noTeamSet.style.display = 'block';

    var result = executeQuery(`select * from teams where teams.id IN (select teamId from game where game.game = ${wedstrijd}) `);
    result.forEach(function (team) {
        //log(team['id']);

        localStorage.setItem('team-' + team['id'], JSON.stringify(executeQuery(`select name from teamleden where teamId = ${team['id']}`)));

    });
    var size = 12 / result.length;
    if (size < 6 || size === Infinity) {
        size = 6
    }

    //generate buttons voor elk bestaand team in database
    teams.innerHTML = '';
    result.forEach(function (team) {
        var div = document.createElement('div');
        //rond size af naar bove en gebruik size om een class te geven die de groote bepaald
        div.className = `col-${Math.ceil(size)} p-1 col-sm-4 grid-item`;
        var button = document.createElement('BUTTON');
        button.className = 'btn-large btn-light col-12 border p-2 bigger-text rounded text-wrap text-break';

        button.innerHTML = team.team + '<br>[';
        JSON.parse(localStorage.getItem('team-' + team.id)).forEach(function (names) {
            button.innerHTML += names['name'] + '-';
        });
        button.innerHTML += ']';

        button.onclick = function () {
            localStorage.setItem('team', team.id);
            showTeamSet();
            restructure();
        };

        div.appendChild(button);
        teams.appendChild(div);
    });
}


function showTeamSet() {
    setMemberCount(localStorage.getItem(`team-${localStorage.getItem('team')}`));
    noTeamSet.style.display = 'none';
    teamSet.style.display = 'block';
    playing.style.display = 'block';

    teeButtons.innerHTML = '';

    colors.forEach(function (color) {
        var div = document.createElement('div');
        div.className = 'p-1 col-6 col-sm-3 grid-item';

        var button = document.createElement('BUTTON');
        button.className = 'btn-large col-12 border text-secondary p-2 p-sm-4 p-lg-5 big-text rounded';

        //var colorTimes = localStorage.getItem('colorCount')[color];
        var colorCount = JSON.parse(localStorage.getItem('colorCount'));

        button.innerHTML = `${colorCount[color]} x`;
        button.style.backgroundColor = color;

        button.onclick = function () {
            //     button.className += 'kader';

            setTee(color);

            var colorCount = JSON.parse(localStorage.getItem('colorCount'));

            if (colorCount[localStorage.getItem('tee')] == 5) {
                Swal.fire({
                    title: 'Helaas!',
                    text: "Je hebt het maximale aantal afslagen voor deze tee bereikt, kies een andere tee",
                    type: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ik snap het...'
                })
            }
        };

        div.appendChild(button);
        teeButtons.appendChild(div);
    });


    scoreButtons.innerHTML = '';
    for (var i = 1; i <= amountOfScoreButtons; i++) {
        var div = document.createElement('div');

        div.className = 'p-1 m-0 col-3 col-sm-4 col-lg-3 grid-item';

        var button = document.createElement('BUTTON');
        button.className = 'btn-large btn-light col-12 border p-3 p-sm-4 p-lg-5 bigger-text rounded';
        button.innerHTML = i;
        button.onclick = function () {
            //  button.className += 'kader';
            setScore(i);
        };
        div.appendChild(button);
        scoreButtons.appendChild(div);
    }

    nameButtons.innerHTML = '';
    JSON.parse(localStorage.getItem('team-' + localStorage.getItem('team'))).forEach(function (names) {
        var div = document.createElement('div');

        div.className = 'p-1 m-0 col-3 col-sm-4 col-lg-3 grid-item';

        var button = document.createElement('BUTTON');
        button.className = 'btn-large btn-dark col-12 border p-2 p-sm-4 p-lg-5 bigger-text rounded';
        button.innerHTML = names['name'] + ` ` + localStorage.getItem(names.name) + 'x';

        button.onclick = function () {
            if (localStorage.getItem(names['name']) == 5) {
                Swal.fire({
                    title: 'Helaas!',
                    text: "Deze speler heeft geen afslagen meer, kies een ander",
                    type: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ik snap het...'
                })
            } else {
                localStorage.setItem('member', names['name']);
                colorCheck.innerText = localStorage.getItem('member');
            }
        };
        div.appendChild(button);
        nameButtons.appendChild(div);
    });
    checkContainer.style.backgroundColor = "#A0CABB";
}


function setTee(color) {
    localStorage.setItem('tee', color);
    checkContainer.style.backgroundColor = color;
}


function setScore(score) {
    localStorage.setItem('score', score);
    scoreCheck.innerText = score;
}

function showRules() {
    $('#regelement').show('slow');
}

function saveHole() {
    if (localStorage.getItem('tee') && localStorage.getItem('score') && localStorage.getItem('member') !== `-`) {
        if (checkMax(localStorage.getItem('tee'))) {
            $.ajax({
                url: "db_write.php?method=saveScore",
                data: {
                    team: localStorage.getItem('team'),
                    hole: localStorage.getItem('hole'),
                    tee: localStorage.getItem('tee'),
                    score: localStorage.getItem('score'),
                    game: localStorage.getItem('game')
                },
                type: "post",
                success: function (res) {
                    var response = JSON.parse(res);

                    if (response.success) {
                        //je response message is beschikbaar vie response.message
                        Swal.fire({
                            title: 'Opgeslagen!',
                            type: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        updateMemberCount(localStorage.getItem('member'));
                        localStorage.setItem('member', `-`);
                        nextHole();
                        renderTable(getTeamScore(), 'teamScore');
                    } else {
                        //show error
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: response.message,
                        });
                    }
                },
                fail: function () {
                    console.log('dat is niet gelukt!')
                }
            });
        } else {
            Swal.fire({
                title: 'Helaas!',
                text: "Je hebt het maximale aantal afslagen voor deze tee bereikt, kies een andere tee",
                type: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ik snap het...'
            })
        }
    } else {
        Swal.fire({
            title: 'OOPS',
            text: "Teekleur, Afslag en Score ingevuld??",
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ik begrijp het, sorry...'
        })
    }
}

function nextHole() {
    var hole = parseFloat(localStorage.getItem('hole'));
    hole++;
    localStorage.setItem('hole', hole);
    showTeamSet();
    showHole(hole);
}

function showHole(hole) {
    //if not set set to 0
    if (!hole) {
        hole = 1;
    }
    if (hole > holes) {
        finishGame();
    } else {
        renderHole(hole);
    }
}

function renderHole(hole) {
    localStorage.removeItem('score');
    localStorage.removeItem('tee');
    localStorage.setItem('hole', hole);

    colorCheck.style.color = "black";
    colorCheck.innerText = "XX";

    scoreCheck.innerText = "XX";

    //holecheck zoekt automatisch in de DOM naar een element met id="holeCheck"
    //zie voor extra uitleg https://www.tjvantoll.com/2012/07/19/dom-element-references-as-global-variables/
    //holeNumber.innerText = hole;
    holeCheck.innerText = hole;

    checkContainer.style.backgroundColor = '#A0CABB';
}


function executeQuery(query) {
    var result = [];
    $.ajax({
        url: "db_write.php?method=executeQuery",
        type: "post",
        async: false,
        data: {
            query: query,
        },
        success: function (res) {
            var response = JSON.parse(res);
            if (response.success) {
                //je response message (result van de query) is beschikbaar via response.message
                result = response.message;
                //console.log(result);

            } else {
                //show error
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: response.message,
                });
            }
        },
        fail: function () {
            console.log('dat is niet gelukt!')
        }
    });
    return result;
}


function renderTable(jsonResult, renderName) {
    var divToRenderIn = null;

    if (!renderName) {
        divToRenderIn = results;
    } else {
        if (document.getElementById(renderName)) {
            divToRenderIn = document.getElementById(renderName);
        } else {
            divToRenderIn = document.createElement('div');
            divToRenderIn.id = renderName;
            results.append(divToRenderIn);
        }
    }

    divToRenderIn.innerHTML =
        `<table class="table table-bordered table-striped">
    <thead>
    <tr role="row" id="${renderName}-thead">

    </tr>
    </thead>
    <tbody id="${renderName}-tbody">

    <tbody/>
    </table>`;

    //loop over alle rows
    jsonResult.forEach(function (row, index) {
        var tableRow = document.createElement('tr');
        tableRow.className = 'text-wrap';

        //loop over alle columns van de row
        for (let [key, value] of Object.entries(row)) {
            if (key === 'id') continue;
            //genereren van alle headers (alleen eerste iteratie)
            if (index === 0) {
                var theader = document.createElement('td');
                theader.innerText = key;
                theader.className = 'text-wrap';
                document.getElementById(`${renderName}-thead`).appendChild(theader);
            }

            //genereren van alle data die per rij beschikbaar is
            var scoreRowData = document.createElement('td');
            scoreRowData.className = 'text-wrap';
            scoreRowData.innerText = value;
            if (key === 'kleur') {
                scoreRowData.style.backgroundColor = value;
            }
            tableRow.appendChild(scoreRowData);
        }
        document.getElementById(`${renderName}-tbody`).appendChild(tableRow);
    });
}


function finishGame() {
    results.innerHTML = '';
    replay.innerHTML = '';
    renderTable(getTeamScore(), 'teamScore');

    playing.style.display = 'none';

    message.style.display = `block`;
    replay.style.display = `block`;
    var replayButton = document.createElement('button');
    replayButton.className = 'btn btn-success border btn-block text-light p-2 p-sm-3 bigger-text';
    replayButton.onclick = function () {
        restart();
    };
    replayButton.innerText = 'Start nieuwe ronde';
    replay.appendChild(replayButton);
    message.innerHTML = `Ronde volbracht, hieronder de resultaten.`;
    finished.style.display = `block`;
    setColorCount();
    setMemberCount(localStorage.getItem(`team-` + localStorage.getItem('team')));
}


function restart() {
    localStorage.clear();

    // localStorage.removeItem('team');
    // localStorage.removeItem('score');
    // localStorage.removeItem('tee');
    // localStorage.removeItem('hole');

    finished.style.display = 'none';

    results.innerHTML = '';
    replay.innerHTML = '';
    setColorCount();
    getNextTeamGame();
    generatePage();
}

function initializeGrids() {
    masonries = document.getElementsByClassName('grid');
    Array.from(masonries).forEach(function (grid, index) {
        masonriesElements[index] = new Masonry(grid, {
            itemSelector: '.grid-item',
        });
    });
}

function restructure() {
    masonriesElements.forEach(function (masonry) {
        masonry.reloadItems();
        //masonry.imagesLoaded().progress().layout();
        masonry.layout();

    });



}

function getTeamScore() {
    var query = `SELECT s.hole,s.game,s.kleur,s.score,sum(s.score-h.par) as verschil,s.team as team FROM scores as s left join holes as h on h.hole=s.hole group by s.id having s.game =  ${localStorage.getItem('game')} and team = ${localStorage.getItem('team')}`;
    //Roep de generieke generate functie aan en geef daar de result van de query mee
    return executeQuery(query);
}