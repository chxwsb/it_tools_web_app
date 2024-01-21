//Zmienne globalne
const excelFilePath = 'narzedziainformatykiwykresy.xlsx';
let selectedBars = [];
const defaultBarColor = 'red';
const selectedBarColor = 'yellow';

//####################################################################### GENEROWANIE WYKRESÓW
function generateChart1(jsonData) {
    const ctx = document.getElementById('myChart1').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: jsonData.map(item => item.Kraj), 
            datasets: [{
                label: 'Kraj',
                data: jsonData.map(item => item['Odsetek ludzi 1']), 
                backgroundColor: 'red',
                borderColor: 'black',
                borderWidth: 1
            }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Procent uzytkownikow w wieku od 16 do 64 lat, ktorzy planuja czesciej pracowac zdalnie',
                    font: {
                        size: 15
                    },
                    color: '#111',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            },
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: handleBarClick
        }
    });
    document.getElementById('calculateDifference1').addEventListener('click', function () {
        diff(myChart, 'result1');
        selectedBars = [];
    });

    document.getElementById('calculateAverage1').addEventListener('click', function () {
        avg(myChart, 'result1');
        selectedBars = [];
    });
}

function generateChart2(jsonData) {
    const ctx = document.getElementById('myChart2').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: jsonData.map(item => item.Kraj), 
            datasets: [{
                label: 'Kraj',
                data: jsonData.map(item => item['Odsetek ludzi 2']), 
                backgroundColor: 'red',
                borderColor: 'black',
                borderWidth: 1
            }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Procent uzytkownikow w wieku od 16 do 64 lat, ktorzy planuja czesciej korzystac z wideokonferencji',
                    font: {
                        size: 15
                    },
                    color: '#111', 
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            },
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: handleBarClick
        }
    });
    document.getElementById('calculateDifference2').addEventListener('click', function () {
        diff(myChart, 'result2');
        selectedBars = [];
    });

    document.getElementById('calculateAverage2').addEventListener('click', function () {
        avg(myChart, 'result2');
        selectedBars = [];
    });
}

function generateChart3(jsonData) {
    const ctx = document.getElementById('myChart3').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: jsonData.map(item => item.Kraj),
            datasets: [{
                label: 'Kraj',
                data: jsonData.map(item => item['Odsetek ludzi 2']), 
                backgroundColor: 'red',
                borderColor: 'black',
                borderWidth: 1
            }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Procent uzytkownikow w wieku od 16 do 64 lat, ktorzy planuja czesciej robic zakupy online',
                    font: {
                        size: 15
                    },
                    color: '#111',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            },
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: handleBarClick
        }
    });
    document.getElementById('calculateDifference3').addEventListener('click', function () {
        diff(myChart, 'result3');
        selectedBars = [];
    });

    document.getElementById('calculateAverage3').addEventListener('click', function () {
        avg(myChart, 'result3');
        selectedBars = [];
    });
}

function generateChart4(jsonData) {
    const ctx = document.getElementById('myChart4').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: jsonData.map(item => item.Kraj),
            datasets: [{
                label: 'Kraj',
                data: jsonData.map(item => item['Odsetek ludzi 2']), 
                backgroundColor: 'red',
                borderColor: 'black',
                borderWidth: 1
            }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Przecietna predkosc internetu w poszczegolnych krajach wyrazona w Mbps',
                    font: {
                        size: 15
                    },
                    color: '#111',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            },
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: handleBarClick
        }
    });
    document.getElementById('calculateDifference4').addEventListener('click', function () {
        diff(myChart, 'result4');
        selectedBars = [];
    });

    document.getElementById('calculateAverage4').addEventListener('click', function () {
        avg(myChart, 'result4');
        selectedBars = [];
    });
}
//####################################################################### KONIEC GENEROWANIA WYKRESÓW

//Obs³uga wyniku ró¿nicy
function diff(myChart, result) {
    if (selectedBars.length === 2) {
        const value1 = myChart.data.datasets[0].data[selectedBars[0]];
        const value2 = myChart.data.datasets[0].data[selectedBars[1]];
        const difference = Math.abs(value1 - value2);
        const selectedLabels = selectedBars.map(index => myChart.data.labels[index]).join(" i ");
        document.getElementById(`${result}`).textContent = 'Roznica: ' + difference + ' (dla krajow ' + selectedLabels + ')';
        resetSelectedBarsAndRefreshChart(myChart);
    } else {
        alert('Wybierz dokladnie dwa slupki.');
        resetSelectedBarsAndRefreshChart(myChart);
    }
}
//Obs³uga wyniku œredniej
function avg(myChart, result) {
    if (selectedBars.length > 0) {
        const average = calculateAverage(myChart, selectedBars);
        const selectedLabels = selectedBars.map(index => myChart.data.labels[index]).join(", ");
        document.getElementById(`${result}`).textContent = 'Srednia: ' + average.toFixed(2) + ' (Wybrane: ' + selectedLabels + ')';
        resetSelectedBarsAndRefreshChart(myChart);
    } else {
        alert('Wybierz co najmniej jeden slupek.');
    }
}
//Przywracanie s³upków do domyœlnych wartoœci
function resetSelectedBarsAndRefreshChart(chart) {
    selectedBars = [];
    chart.data.datasets[0].backgroundColor = chart.data.datasets[0].data.map(() => defaultBarColor);
    chart.update();
}

function calculateAverage(chart, selectedBars) {
    const sum = selectedBars.reduce((total, index) => {
        return total + chart.data.datasets[0].data[index];
    }, 0);

    return sum / selectedBars.length;
}

// Funkcja do obs³ugi klikniêcia na s³upek
function handleBarClick(event, elements, chart) {

    if (elements.length > 0) {
        const firstIndex = elements[0].index;

        const selectedIndex = selectedBars.indexOf(firstIndex);
        if (selectedIndex === -1) {
            selectedBars.push(firstIndex);
        } else {
            selectedBars.splice(selectedIndex, 1);
        }
        console.log(selectedBars);

        chart.data.datasets[0].backgroundColor = chart.data.datasets[0].data.map((_, index) => {
            return selectedBars.includes(index) ? selectedBarColor : defaultBarColor;
        });

        chart.update();

    }
}




fetch(excelFilePath)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const Sheet2 = workbook.SheetNames[1];
        const worksheet = workbook.Sheets[Sheet2];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData);
        generateChart1(jsonData);
        generateChart2(jsonData);
        generateChart3(jsonData);
        generateChart4(jsonData);

    })
    .catch(error => console.error('B³¹d wczytywania pliku:', error));



