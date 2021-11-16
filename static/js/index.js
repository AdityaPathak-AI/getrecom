// let movieNumber = 0;
// let filterApplied=false;
// const addMovieDiv =()=>{
//     movieNumber++;
//     const movies = $(".movies");
//     movies.append(`
//     <div id="movie${movieNumber}" class="movie">
//         Enter Movie Name 
//         <input type="text" id="movie${movieNumber}Input" placeholder="Enter A Movie Name" /> 
//         <button onclick="removeMovieDiv(this)" id="${movieNumber+'remove'}" class="removeButton"">trash icon</button>
//     </div>
//     `);
//     checkIfOne();
// }
// const checkIfOne=()=>{
//     const movieCount = $(".movie").length;
//     const removeButton = $(".removeButton");
//     if(movieCount == 1) removeButton.hide();
//     else removeButton.show();
// }
// const removeMovieDiv=(ele)=>{
//     const movieDivNum = parseInt(ele.id);
//     console.log(movieDivNum);
//     const movieDiv = $("#movie"+movieDivNum);
//     movieDiv.remove();
//     checkIfOne();
// }
// const sendForPrediction =()=>{
//     const movies = [];
//     $(".movie > input").each(
//         (index,movieInputDiv) => {
//             if(movieInputDiv.value.length > 0)
//                 movies.push(movieInputDiv.value.toLowerCase())
//         }
//     );
//     let filter = "";
//     if(filterApplied) filter = $("#filter")[0].value;
//     let dataToSend = {
//         movies,
//         filterApplied,
//         filter,
//     }
//     console.log(JSON.stringify(dataToSend));
//     fetch("getmovie",{
//         "method" : "POST",
//         "headers": {
//             'Content-Type': 'application/json'
//         },
//         "body" : JSON.stringify(dataToSend),
//     })
//     .then(response=>{
//         if(!response.ok) throw "response not ok";
//         return response.json()
//     })
//     .then(data=>console.log(data))
//     .catch(err=>console.log(err));
// }
// $(()=>{ 
//     $("#applyFilter").click(()=>{    
//         $("#filterDiv").show();
//         filterApplied=true;
//     });
//     $("#surpriseMe").click(()=>{
//         $("#filterDiv").hide();
//         filterApplied=false;
//     });

//     $("#addButton").click();
//     $("#surpriseMe").click();
// });

$(() => {
    $("#movieComponent").hide();
    $("#startButton").click(() => {
        $("#homeComponent").hide(500, () => {
            $("#movieComponent").show(500);
        });
        $(".rect3, .rect4").hide(500);
        // changes
        $("#movieLink").addClass('active')
        $("#homeLink").removeClass('active')
            // changes ends
            // for adding
            $(".rect1, .rect2").addClass("rect12-Movie");
    });

    $("#movieLink").click(() => {
        $("#homeComponent").hide(500, () => {
            $("#movieComponent").show(500);
        });
        $(".rect3, .rect4").hide(500);
        // changes
        $("#movieLink").addClass('active')
        $("#homeLink").removeClass('active')
            // changes ends
            // for adding
            $(".rect1, .rect2").addClass("rect12-Movie");
    });

    $("#homeLink").click(() => {
        $("#movieComponent").hide(500, () => {
            $("#homeComponent").show(500);
        });
        $(".rect3, .rect4").show(500);
        // changes
        $("#homeLink").addClass('active')
        $("#movieLink").removeClass('active')
            // changes ends
        $(".rect1, .rect2").removeClass("rect12-Movie");

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