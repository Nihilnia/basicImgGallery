var divContainer = document.querySelector("#container");
var divPicPlace = document.querySelector("#picPlace");
var btnBottom = document.querySelector("#btnBottom");
var carouselExampleIndicators = document.querySelector("#carouselExampleIndicators");
var divContentContainer = document.querySelector("#contentContainer");


//* Tag Buttonz */
var allTagButtonz = document.querySelectorAll(".btnTag");

const url = "https://api.unsplash.com/photos/?client_id=c6JqYdtanGa7tqPL9VuHIJT39R3pheFqMBoo_HXmOgE";



function unsplashApi(theUrl){
    console.log("Url:", theUrl);
    fetch(theUrl)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        var pictureArray = [];
        var htmlPicturez = ``;
        var htmlButtonz = ``;

        data.forEach(element => {
            var height = element.height;
            var width = element.width;
            if(width > height){
                pictureArray.push(element.urls.regular);
            }
        });

        pictureArray.forEach((pic, index) => {
            if(index === 0){
                htmlPicturez += `
            <div class="carousel-item active">
                <img src="${pic}" class="d-block w-100" alt="...">
            </div>
            `;

            htmlButtonz += `<button type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1">
            </button>`;
            }else{
                htmlPicturez += `
            <div class="carousel-item">
                <img src="${pic}" class="d-block w-100" alt="...">
            </div>
            `;

            htmlButtonz += `
            <button type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="${index}" aria-label="Slide ${index}">
            </button>
            `;
            }
        });

        divPicPlace.innerHTML += htmlPicturez;
        btnBottom.innerHTML += htmlButtonz;
        
    })
    .catch(err => {
        console.log(err);
    })
}

unsplashApi(url);

/* ########################## */


btnTagz = document.querySelectorAll(".btnTag");
btnTagz.forEach((button) => {
    var searchUrl = `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${button.textContent}&client_id=c6JqYdtanGa7tqPL9VuHIJT39R3pheFqMBoo_HXmOgE`;

    button.addEventListener('click', function(){
        
    console.log("Input from user:", button.textContent);
        fetch(searchUrl)
        .then(response => {
            return response.json();
		})
        .then(data => {
            console.log(data);
            var categoryPics = [];
            var categoryPicsDikey = [];
			var htmlCtgPics = ``;
			var categoryButtons = ``;

            var htmlBottomPics = ``;

			data.results.forEach(image => {
			var width = image.width;
			var height = image.height;
                
                if(width > height && categoryPics.length <= 2){
                    categoryPics.push(image.urls.regular);
                }else if(width < height  && categoryPicsDikey.length < 9){
                    categoryPicsDikey.push(image.urls.regular + "&w=1440&fit=clamp");
                }
			});

        categoryPicsDikey.forEach((dikey, index) => {
            htmlBottomPics += `<img src="${dikey}" alt="..." class="img-thumbnail" id ="dikeyResimler">`;
        });

		categoryPics.forEach((pic, index) => {
		if(index === 0){
        htmlCtgPics += `
        <div class="carousel-item active">
            <img src="${pic}" class="d-block w-100" alt="..." >
        </div>`;
       
        categoryButtons += `
		<button type="button"
			data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1">
        </button>`;
        
		}else{
        htmlCtgPics += `
        <div class="carousel-item">
            <img src="${pic}" class="d-block w-100" alt="...">
        </div>`;
        
        categoryButtons += `
        <button type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="${index}" aria-label="Slide ${index}">
        </button>`;
		}
		});

        console.log(htmlBottomPics);
		divPicPlace.innerHTML = htmlCtgPics;
		btnBottom.innerHTML = categoryButtons;
        divContentContainer.innerHTML = htmlBottomPics;
		}).catch(err => {
			console.log("Error:", err);
		
		})
        
    
    })

})