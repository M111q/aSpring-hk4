let API_URL = 'http://localhost:8080/cars';
    
        fetch(API_URL).then(response => response.json()).then((carsArr) => {
            const cardElements = carsArr.map(c => `
            <div class="card">
                        <div class="card-header" id="heading${c.id}">
                            <h2 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                    data-target="#collapse${c.id}" aria-expanded="false" aria-controls="collapse${c.id}">
                                    Collapsible Group Item ${c.id}
                                </button>
                            </h2>
                        </div>
                        <div id="collapse${c.id}" class="collapse" aria-labelledby="heading${c.id}"
                            data-parent="#cars">
                            <div class="card-body">
                                ${c.id} ${c.mark} ${c.model} ${c.color}
                            </div>
                        </div>
            </div>
            `).join('\n');
            document.getElementById('cars').innerHTML = cardElements;
        });