let titles = [];

$(() => {
    $("#detailsModal").hide();
    fetch("getmovie")
        .then(response => {
            if (!response.ok) throw "response not ok";
            return response.json()
        })
        .then(data => {
            titles = data.suggestion
                // console.log(titles);
        })
        .catch(err => alert(err.message))

    const autoSuggest = (inputEle) => {
        inputEle.autocomplete({
            source: (obj, giveBackThrough) => {
                const data = obj.term;
                const lst = [];
                if (data.length < 5) {
                    for (const title of titles)
                        if (data.toLowerCase() === title.toLowerCase()) lst.push(title);
                } else {
                    for (const title of titles)
                        if (title.toLowerCase().startsWith(data.toLowerCase())) lst.push(title);
                }
                console.log("Results Found : ", lst.length);
                giveBackThrough(lst);
            },
            maxShowItems: 5,
        });
        inputEle.blur((ev) => {
            const val = ev.target.value;
            const idx = titles.indexOf(val);
            console.log(idx);
            if (idx === -1) ev.target.value = "";
        });
    }

    $("#movieComponent").hide();
    $("#startButton").click(() => {
        $("#homeComponent").hide(500, () => {
            $("#movieComponent").show(500);
        });
        $(".rect3, .rect4").hide(500);
        // changes
        $("#movieLink").addClass('active')
        $("#homeLink").removeClass('active')
        $("#seriesLink").removeClass('active')
            // changes ends
            // for adding
        $(".rect1, .rect2").addClass("rect12-Movie");
        $(".rect1, .rect2").removeClass("react12-series");

    });

    $("#movieLink").click(() => {
        $("#homeComponent").hide(500, () => {
            $("#movieComponent").show(500);
        });
        $(".rect3, .rect4").hide(500);
        // changes
        $("#movieLink").addClass('active')
        $("#homeLink").removeClass('active')
        $("#seriesLink").removeClass('active')
            // changes ends
            // for adding
        $(".rect1, .rect2").addClass("rect12-Movie");
        $(".rect1, .rect2").removeClass("react12-series");
    });

    $("#homeLink,#logoMainComponant").click(() => {
        $("#movieComponent").hide(500, () => {
            $("#homeComponent").show(500);
        });
        $(".rect3, .rect4").show(500);
        // changes
        $("#homeLink").addClass('active')
        $("#movieLink").removeClass('active')
        $("#seriesLink").removeClass('active')
            // changes ends
        $(".rect1, .rect2").removeClass("rect12-Movie");
        $(".rect1, .rect2").removeClass("react12-series");

    });

    $("#seriesLink").click(() => {

        $("#homeComponent").hide(500, () => {
            $("#movieComponent").show(500);
        });

        $("#seriesLink").addClass('active')
        $("#homeLink").removeClass('active')
        $("#movieLink").removeClass('active')
        $(".rect1, .rect2").removeClass("rect12-Movie");
        $(".rect1, .rect2").addClass("react12-series");
    });

    $("#addButton").click(() => {
        movieNum++;
        movieCount++;
        var movie = $(`
        <div class="movie" id="${movieNum}movie">
            <input type="text" class = "movie-title-text" id="${movieNum}input" placeholder="Enter Movie Name">
            <i class='bx bx-trash trashButton movieTrash' onclick=remove(${movieNum})></i>
        </div> `);
        $(".movies").append(movie);
        console.log(movie);
        $(".movieTrash").show();

        const newInput = $(`#${movieNum}input`);
        autoSuggest(newInput);
    });
    $("#addButton").click();
    $(".movieTrash").hide();
});
var movieNum = 0;
var movieCount = 0;

const remove = (num) => {
    if (movieCount == 1) return;
    console.log($(`#${num}movie`)[0]);
    $(`#${num}movie`).remove();
    movieCount--;
    if (movieCount == 1)
        $(".movieTrash").hide();
}

const getMovieSuggestions = () => {

    $("#description").html("");
    const movies = [];
    for(const ele of $(".movie-title-text"))
    {
        movies.push(ele.value);
    }
    const jsonToSend = {
        movies : movies,
    }   
    console.log(jsonToSend);
    fetch("getmovie", {
            "method": "POST",
            "body" : JSON.stringify(jsonToSend)
        })
        .then(response => {
            if (!response.ok) throw "response not ok";
            return response.text()
        })
        .then(data => dataRecieved(data))
        .catch(err => console.error(err.message));
}

function processResponseText(text)
{
    // console.log(text)
    const t = text.replaceAll("NaN", "null");
    const json = JSON.parse(t);
    return json;
}

function convertJSONtoArray(json)
{
    const props = Object.keys(json);
    const indexes = Object.keys(json['original_title']);
    const array = [];
    for(const index of indexes)
    {
        const arrJSON = {};
        for(const prop of props)
        {
            arrJSON[prop] = json[prop][index];
        }
        array.push(arrJSON);
    }
    return array;
}

function dataRecieved(text)
{

    const resJson = processResponseText(text);
    const resArr = convertJSONtoArray(resJson);
    const resComponent = $("#results");
    document.body.style.overflowY = "scroll";
    resComponent.html(`<h3>Click Them To View Details</h3>`);
    for(const res of resArr)
    {
        console.log(res)
        const result = $(`
            <div class="result">
                ${res.original_title}
            </div>
        `); 
        result.click(()=>{
            const description = $("#description");
            description.focus();
            description.slideUp(2000, ()=>{
                description.html(" ");
                const imgComponent = $("<img>");
                fetchAndSetImage(res.original_title , imgComponent);
                description.append(imgComponent);
                description.append(`
                    <div>
                        <h3>Title</h3> ${res.original_title}
                        <h3>Genre</h3> ${res.genre}
                        <h3>Cast</h3> ${res.actors}
                        <h3>Duration</h3> ${(res.duration)} Minutes
                        <h3>Description</h3> ${res.description}
                        <h3>Director</h3> ${res.director} 
                        <h3>Production</h3> ${res.production_company} 
                        <h3>Writer</h3> ${res.writer} Minutes
                    </div>
                `);
                description.slideDown(2000);
            });
        });
        resComponent.append(result);
    }
    
    // to set overflowY
    $("a").click(function(){
        if(this.id != "movieLink") 
        {
            document.body.style.overflowY = "hidden";
            $("#results").html(``);
            $("#description").html(``);
        }
    })
}



async function fetchAndSetImage(title, imgComp)
{
    var url = "https://api.themoviedb.org/3/search/"+
    "movie?api_key=5bbbc627da4af8444f8d95d7f13fa3af&query=" + encodeURIComponent(title) ;
    var req = new Request(url);
    fetch(url).then(res=>{
        if(res.ok) return res.json();
        else throw Error(res.status);
    }).then(data=>{
        imgComp.prop("src",`http://image.tmdb.org/t/p/w500/${data.results[0].poster_path}`);
    }).catch(err=> console.log(err.message))
}