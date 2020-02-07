const API_URL = 'http://localhost:8080/cars';

getAllCars();

function getAllCars() {
    fetch(API_URL).then(response => response.json()).then((carsArr) => {
        const cardElements = carsArr.map(car =>
            createCard(car)
        ).join('\n');
        document.getElementById('cars').innerHTML = cardElements;
    });
}

function createCard(c) {
    return `
    <div class="card">
                <div class="card-header row d-flex justify-content-center" id="heading${c.id}">
                    <div class="col-2">
                        <button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteCar(${c.id})">Delete</button>
                    </div>
                    <div class="col-10 text-center">
                        <h2 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                data-target="#collapse${c.id}" aria-expanded="false" aria-controls="collapse${c.id}">
                                ${c.id} ${c.mark} ${c.model} ${c.color}
                            </button>
                        </h2>
                    </div>
                </div>
                <div id="collapse${c.id}" class="collapse" aria-labelledby="heading${c.id}"
                    data-parent="#cars">
                    <div class="card-body">
                        ${getEditMenu(c.id)}
                    </div>
                </div>
    </div>
    `
}

function getEditMenu(id) {
return`
<form>
<div class="form-group">
    <label for="modelEditFormInput${id}">Model</label>
    <input type="text" class="form-control" id="modelEditFormInput${id}">
</div>
<div class="form-group">
    <label for="markEditFormInput${id}">Mark</label>
    <input type="text" class="form-control" id="markEditFormInput${id}">
</div>
<div class="form-group">
    <label for="colorEditFormInput${id}">Color</label>
    <input type="text" class="form-control" id="colorEditFormInput${id}">
</div>
</form>
<button type="button" class="btn btn-outline-danger btn-sm" data-dismiss="modal" onclick="editCar(${id})">Accept edit</button>

`
}

function editCar(id) {
    newCar = {
        id: id,
        mark: document.getElementById(`markEditFormInput${id}`).value,
        model: document.getElementById(`modelEditFormInput${id}`).value,
        color: document.getElementById(`colorEditFormInput${id}`).value
    }

    fetch(API_URL, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
    }).then(processOkResponse)
    .catch(console.warn);

    
}

function deleteCar(id){
    fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    }).then(processOkResponse)
    .catch(console.warn);

    getAllCars();
    //todo poprawic
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

function addCarModalMenu() {


    fetch(API_URL, getParam())
        .then(processOkResponse)
        .then(createNewCar)
        .catch(console.warn);

    getAllCars();  
    //todo poprawic
}

function createNewCar() {
    //todo moze wstawiac elementy

    console.log('create new car');

}
function processOkResponse(response = {}) {
    if (response.ok) {
        console.log(response);
        return true;
    }
    throw new Error(`Status not 200 (${response.status})`);
}