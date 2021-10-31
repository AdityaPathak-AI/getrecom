let movieNumber = 0;
let filterApplied=false;
const addMovieDiv =()=>{
    movieNumber++;
    const movies = $(".movies");
    movies.append(`
    <div id="movie${movieNumber}" class="movie">
        Enter Movie Name 
        <input type="text" id="movie${movieNumber}Input" placeholder="Enter A Movie Name" /> 
        <button onclick="removeMovieDiv(this)" id="${movieNumber+'remove'}" class="removeButton"">trash icon</button>
    </div>
    `);
    checkIfOne();
}
const checkIfOne=()=>{
    const movieCount = $(".movie").length;
    const removeButton = $(".removeButton");
    if(movieCount == 1) removeButton.hide();
    else removeButton.show();
}
const removeMovieDiv=(ele)=>{
    const movieDivNum = parseInt(ele.id);
    console.log(movieDivNum);
    const movieDiv = $("#movie"+movieDivNum);
    movieDiv.remove();
    checkIfOne();
}
const sendForPrediction =()=>{
    const movies = [];
    $(".movie > input").each(
        (index,movieInputDiv) => {
            if(movieInputDiv.value.length > 0)
                movies.push(movieInputDiv.value.toLowerCase())
        }
    );
    let filter = "";
    if(filterApplied) filter = $("#filter")[0].value;
    let dataToSend = {
        movies,
        filterApplied,
        filter,
    }
    console.log(JSON.stringify(dataToSend));
    fetch("getmovie",{
        "method" : "POST",
        "headers": {
            'Content-Type': 'application/json'
        },
        "body" : JSON.stringify(dataToSend),
    })
    .then(response=>{
        if(!response.ok) throw "response not ok";
        return response.json()
    })
    .then(data=>console.log(data))
    .catch(err=>console.log(err));
}
$(()=>{ 
    $("#applyFilter").click(()=>{    
        $("#filterDiv").show();
        filterApplied=true;
    });
    $("#surpriseMe").click(()=>{
        $("#filterDiv").hide();
        filterApplied=false;
    });

    $("#addButton").click();
    $("#surpriseMe").click();
});