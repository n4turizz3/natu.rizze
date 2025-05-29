let chartInstance = null;

function calcularGastoCalorico() {
    const idade = parseInt(document.getElementById('idade').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const sexo = document.getElementById('sexo').value;
    const atividade = parseFloat(document.getElementById('atividade').value);

    if (!idade || !peso || !altura) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    let tmb;

    if (sexo === 'masculino') {
        tmb = 10 * peso + 6.25 * altura - 5 * idade + 5;
    } else {
        tmb = 10 * peso + 6.25 * altura - 5 * idade - 161;
    }

    const gastoTotal = tmb * atividade;

    document.getElementById('resultado').innerHTML = `
        <p><strong>TMB (Taxa Metabólica Basal):</strong> ${tmb.toFixed(2)} kcal/dia</p>
        <p><strong>Gasto Calórico Total:</strong> ${gastoTotal.toFixed(2)} kcal/dia</p>
    `;

    desenharGrafico(gastoTotal);
}

function desenharGrafico(gastoTotal) {
    const carbo = gastoTotal * 0.5;
    const proteina = gastoTotal * 0.2;
    const gordura = gastoTotal * 0.3;

    const ctx = document.getElementById('grafico').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Carboidratos', 'Proteínas', 'Gorduras'],
            datasets: [{
                data: [carbo, proteina, gordura],
                backgroundColor: ['#a2d5ab', '#d7c9aa', '#6aa84f'],
                borderColor: '#2e5d34',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribuição de Macronutrientes (kcal)',
                    color: '#2e5d34',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#2e5d34'
                    }
                }
            }
        }
    });
}