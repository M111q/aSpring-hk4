const API_URL = 'https://still-brook-15321.herokuapp.com/cars';
const carsDiv = document.getElementById('cars');

getAllCars();

function getAllCars() {
    fetch(API_URL).then(response => response.json()).then((carsArr) => {
        const cardElements = carsArr.map(car =>
            createCard(car)
        ).join('\n');
        carsDiv.innerHTML = cardElements;
    });
}

function createCard(car) {
    return `
    <div class="card" id="card${car.id}">
                <div class="card-header row d-flex justify-content-center" id="heading${car.id}">
                    <div class="col-2">
                        <button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteCar(${car.id})">Delete</button>
                    </div>
                    <div class="col-10 text-center">
                        <h2 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                data-target="#collapse${car.id}" aria-expanded="false" aria-controls="collapse${car.id}">
                                <span id="cardCarId${car.id}">${car.id}</span>  <span id="cardCarMark${car.id}">${car.mark}</span> <span id="cardCarModel${car.id}">${car.model}</span>  <span id="cardCarColor${car.id}">${car.color}</span>
                            </button>
                        </h2>
                    </div>
                </div>
                <div id="collapse${car.id}" class="collapse" aria-labelledby="heading${car.id}"
                    data-parent="#cars">
                    <div class="card-body">
                        ${getEditMenu(car)}
                    </div>
                </div>
    </div>
    `
}

function getEditMenu(car) {
    return `
<form>
<div class="form-group">
    <label for="markEditFormInput${car.id}">Mark</label>
    <input required type="text" class="form-control" id="markEditFormInput${car.id}" value="${car.mark}">
</div>
<div class="form-group">
    <label for="modelEditFormInput${car.id}">Model</label>
    <input required type="text" class="form-control" id="modelEditFormInput${car.id}" value="${car.model}">
</div>
<div class="form-group">
    <label for="colorEditFormInput${car.id}">Color</label>
    <input required type="text" class="form-control" id="colorEditFormInput${car.id}" value="${car.color}">
</div>
<button type="button" class="btn btn-outline-danger btn-sm" data-dismiss="modal" onclick="editCar(${car.id})">Accept edit</button>
</form>

`
}

function editCar(id) {
    const markInputValue = document.getElementById(`markEditFormInput${id}`).value;
    const modelInputValue = document.getElementById(`modelEditFormInput${id}`).value;
    const colorInputValue = document.getElementById(`colorEditFormInput${id}`).value;

    const newMark = (markInputValue) ? markInputValue : document.getElementById('cardCarMark' + id).innerText;
    const newModel = (modelInputValue) ? modelInputValue : document.getElementById('cardCarModel' + id).innerText;
    const newColor = (colorInputValue) ? colorInputValue : document.getElementById('cardCarColor' + id).innerText;

    newCar = {
        id: id,
        mark: newMark,
        model: newModel,
        color: newColor
    }

    fetch(API_URL, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
    })
        .then(processOkResponse)
        .then(updateCarCard(id, newCar))
        .catch(console.warn);

}

function refreshPage() {
    window.location.reload(true);
}

function updateCarCard(id, newCar) {

    const cardToUpdate = document.getElementById('card' + id);
    cardToUpdate.innerHTML = createCard(newCar);

}

function deleteCar(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    }).then(processOkResponse)
        .then(removeCarCard(id))
        .catch(console.warn);

}

function removeCarCard(id) {
    const cardToRemove = document.getElementById('card' + id);
    carsDiv.removeChild(cardToRemove);
}

function getParam() {
    return param = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loadCarFields())
    }
}

function loadCarFields() {
    return car = {
        id: document.getElementById('idFormInput').value,
        mark: document.getElementById('markFormInput').value,
        model: document.getElementById('modelFormInput').value,
        color: document.getElementById('colorFormInput').value
    }
}

function showModalAddMenu() {
    fetch(API_URL, getParam())
        .then(processOkResponse)
        .then(createNewCar)
        .catch(console.warn);

}

function createNewCar() {
    let doc = new DOMParser().parseFromString(createCard(loadCarFields()), 'text/html');
    carsDiv.append((doc.body.firstChild));
}

function processOkResponse(response = {}) {
    if (response.ok) {
        console.log(response);
        return true;
    }
    throw new Error(`Status not 200 (${response.status})`);
}