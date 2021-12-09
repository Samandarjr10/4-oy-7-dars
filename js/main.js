// Dom element
var elFlex = document.querySelector("#d-flex");
var elForm = document.querySelector("#form_submit");
var elInput = document.querySelector("#input_rating");
var elSelectCategories = document.querySelector("#select_genre");
var elSelect2 = document.querySelector("#select2");
var elInput2 = document.querySelector("#input_title");
var elTitleMovies = document.querySelector("#search_heading");
var elList = document.querySelector("#list");


var twoMovies = movies.slice(0, 40);

var normolizeMovies = twoMovies.map((item, index) => {
    return {
        id: index,
        title: item.Title.toString(),
        categories: item.Categories,
        rating: item.imdb_rating,
        year: item.movie_year,
        imagelink: `http://i3.ytimg.com/vi/${item.ytid}/mqdefault.jpg`,
        ytlink: `https://www.youtube.com/watch?v=${item.ytid}`
    }
})
var renderCategories = (filmList, renderSelect) => {
    var resultCategoriList = [];

    filmList.forEach(item => {
        var splitCategories = item.categories.split("|");

        splitCategories.forEach(categoryItem => {
            var categoriesIncludes = resultCategoriList.includes(categoryItem);
            if (!categoriesIncludes) {
                resultCategoriList.push(categoryItem)       
            }
        })
    })
    resultCategoriList.sort();

    var elOptionSelect = document.createDocumentFragment();
    resultCategoriList.forEach(category => {
        var categoryOption = document.createElement("option");
        categoryOption.textContent = category;
        categoryOption.value = category;

        elOptionSelect.appendChild(categoryOption);
    })

    renderSelect.appendChild(elOptionSelect);
}
renderCategories(normolizeMovies, elSelectCategories);

function renderMovies(moviesArray) {

    moviesArray.forEach(films => {
        var newDiv = document.createElement("div");
        var newP = document.createElement("p");
        var newH4 = document.createElement("h4");
        var newImg = document.createElement("img");
        var newP2 = document.createElement("p");
        var newDiv2 = document.createElement("div");
        var newInput1 = document.createElement("a");
        var newInput2 = document.createElement("a");
        var newInput3 = document.createElement("a");
        newDiv.setAttribute("class", "card border-secondary me-2 mb-2 pb-2");
        newDiv.setAttribute("style", "width: 22rem;");

        newImg.setAttribute("src", films.imagelink);
        newImg.setAttribute("height", "250");
        newImg.setAttribute("alt", "moies picture");
        newImg.setAttribute("clas", "card-img-top");

        newH4.setAttribute("class", "ms-3 card-title fw-bolder text-info");
        newH4.textContent = films.title;

        newP.textContent = films.year;
        newP.setAttribute("class", "fs-4 ms-2 text-danger");

        newP2.textContent = films.rating;
        newP2.setAttribute("class", "fst-italic ms-1 text-warning");

        newDiv2.setAttribute("class", "d-flex justify-content-center");

        newInput1.setAttribute("class", "btn btn-sm btn-outline-primary d-inline me-4")
        newInput1.textContent = "Watch trailer";
        newInput1.setAttribute("href", films.ytlink);
        newInput1.setAttribute("target", "blank");
    
        newInput2.setAttribute("class", "btn btn-sm btn-outline-info d-inline me-4");
        newInput2.textContent = "More info";
        newInput2.setAttribute("href", films.ytlink);
        newInput2.setAttribute("target", "blank");
    
        newInput3.setAttribute("class", "btn btn-sm btn-outline-success d-inline")
        newInput3.textContent = "Bookmark";
        newInput3.setAttribute("data-id", films.id);
        newInput3.setAttribute("target", "blank");
    
        newDiv.appendChild(newImg);
        newDiv.appendChild(newH4);
        newDiv.appendChild(newP);
        newDiv.appendChild(newP2);
        newDiv.appendChild(newDiv2);
        newDiv2.appendChild(newInput1);
        newDiv2.appendChild(newInput2);
        newDiv2.appendChild(newInput3);
        elFlex.appendChild(newDiv);
    });
    elTitleMovies.textContent = `Search results: ${moviesArray.length}`;

}
renderMovies(normolizeMovies, elFlex);

var findFilms = (title, minRating, janr) => {
    return normolizeMovies.filter(movie => {
        var doesMatchCategory = janr === "All" || movie.categories.includes(janr);

        return movie.title.match(title) && movie.rating >= minRating && doesMatchCategory;
    });
}

function renderBookmark(list) {
    var elLi = document.createDocumentFragment()
    list.forEach(item => {
        newLi2 = document.createElement("li");
        newDivRem = document.createElement("div");
        newBtn = document.createElement("button");
        
        newLi2.setAttribute("class", "list-group-item");
        newLi2.textContent = item.title; 

        newDivRem.setAttribute("class", "mt-1");

        newBtn.setAttribute("class", "btn btn-sm bg-danger");
        newBtn.setAttribute("type", "submit");
        newBtn.textContent = "Remove";

        newDivRem.appendChild(newBtn);
        newLi2.appendChild(newDivRem);
        elLi.appendChild(newLi2);
    })
    elList.innerHTML = null;
    elList.appendChild(elLi);
}

var bookmarkArray = [];
elFlex.addEventListener("click", (evt) => {
    var listId = evt.target.dataset.id;
    if (listId) {
        var findIdItem = normolizeMovies.find(item => {
            if (item.id == listId) {
                return item
            }
        });
        bookmarkArray.push(findIdItem)
    }
    renderBookmark(bookmarkArray)    
});


elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    var searchInput = elInput2.value.trim();
    var searchInputRating = elInput.value.trim();
    var searchKey = new RegExp(searchInput, "gi");
    var categorySelect = elSelectCategories.value
    var resultFindMovies = findFilms(searchKey, searchInputRating, categorySelect);

    if (resultFindMovies.length > 0) {
        elFlex.innerHTML = null;
        renderMovies(resultFindMovies, elFlex);    
    }else {
        elFlex.innerHTML = "Kino yo'q"
        elTitleMovies.textContent = "0"
    }
})
