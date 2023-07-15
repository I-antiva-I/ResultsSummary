
// 1st variant
// https://stackoverflow.com/questions/14388452/how-do-i-load-a-json-object-from-a-file-with-ajax
/*
function readJSON(pathToJSON="/data.json", callback=null)
{   
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', pathToJSON);
    httpRequest.send(); 
}
*/


// 2nd variant
// https://www.w3schools.com/jsref/api_fetch.asp
async function readJSON(pathToJSON="./data.json", callback=null)
{
    // (!)
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin
    var sites=
        [
            "http://localhost",
            "https://github.com",
            "https://www.frontendmentor.io"
        ]
    var fetchParameters=
    {
        method : "GET",
        mode: 'cors',
        headers: { 'Access-Control-Allow-Origin': sites}
    };

    var fileObject =    await fetch(pathToJSON, fetchParameters);
    var jsonData =      await fileObject.json();
    if (callback)
    {
        callback(jsonData)
    }
}


function parseDataIntoHTML(jsonData)
{
    var containerForCategories= document.getElementById("categories");
    var elementAverage=         document.getElementById("average");
    var numberOfCategories =    jsonData.length;
    var totalScore=             0;

    // Summary
    for (var item of jsonData) 
    {
        var containerForCategory = document.createElement("div");
        containerForCategory.classList.add("container","for-category",item["category"].toLowerCase());

        var categoryScore = document.createElement("div");
        categoryScore.classList.add("category-score");
        categoryScore.innerHTML= +item["score"]+"<span> / 100</span>";

        var categoryImage = document.createElement("img");
        categoryImage.classList.add("category-image");
        categoryImage.src= item["icon"];

        var categoryLabel = document.createElement("div");
        categoryLabel.classList.add("category-label");
        categoryLabel.innerHTML= item["category"];

        containerForCategory.appendChild(categoryImage);
        containerForCategory.appendChild(categoryLabel);
        containerForCategory.appendChild(categoryScore);

        var wrapperForCategory = document.createElement("div");
        wrapperForCategory.classList.add("wrapper","for-category",item["category"].toLowerCase());

        wrapperForCategory.appendChild(containerForCategory)
        containerForCategories.appendChild(wrapperForCategory);

        totalScore=totalScore+parseInt(item["score"]);
    }
    
    // Average
    var averageScore=           Math.round((totalScore/(numberOfCategories*100))*100);
    elementAverage.innerHTML=   averageScore;
}