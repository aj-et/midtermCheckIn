var placeId = ''
var imageResult = document.querySelector('.right-bar')
let observedOnArray = []

async function searchId() {
    var keyWord = document.querySelector('.findPlace')
    var stuffFound = document.querySelector('.stuff-found')

    API_LINK=`https://api.inaturalist.org/v1/places/autocomplete?q=${keyWord.value}`

    keyWord.value = ''
    stuffFound.innerHTML = ''
    
    await fetch(API_LINK)
    .then(response => response.json())
    .then(placesId => {
        result = placesId.results
        // Display the places
        result.forEach((place) => {
            // console.log(place)
            stuffFound.innerHTML += `<li class='places-found' id=${place.id}>${place.name}</li>`
        });

        // Event listener for each <li> element
        document.querySelectorAll('.stuff-found li').forEach((li) => {
            li.addEventListener('click', (e) => {
                placeId = e.target.id;
                searchPlaceById(placeId)
            })
        })
    })
}


async function searchPlaceById(idOfPlace) {
    imageResult.innerHTML = ''

    PLACE_URL = `https://api.inaturalist.org/v1/identifications?current=true&place_id=${idOfPlace}&order=desc&order_by=created_at`
    await fetch(PLACE_URL)
    .then(res => res.json())
    .then(placeById => {
        result = placeById.results
        // console.log(result)
        result.forEach((photo) => {
            let observation = photo.observation
            let photos = observation.observation_photos
            // filterByObservationDate(observation)

            if (photos.length !== 0) {
                photos.forEach((image) => {
                    let imageUrl = image.photo.url
                    let alt = image.photo.attribution
                    // console.log(photos)
                    imageResult.innerHTML += `<img class='image-results' src=${imageUrl} alt=${alt}>`
                })
            }
        })

        

    })
}

function filterByObservationDate(obs) {
    // console.log(obs)
    // console.log(obs.observed_on)

    observedOnArray.push(obs.observed_on)
    let removedDuplicateDates = Array.from( new Set(observedOnArray))

    // Add a div with text "hello" at the top
    const helloDiv = document.createElement('div');
    helloDiv.innerHTML = removedDuplicateDates;
    imageResult.insertBefore(helloDiv, imageResult.firstChild);
}

