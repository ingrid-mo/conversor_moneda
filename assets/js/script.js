async function getcoins() {
  try {
    const response = await fetch("https://mindicador.cl/api");
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

async function getDays() {
  try {
    const response = await fetch("https://mindicador.cl/api/" + coin);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
const input = document.getElementById("input_coins");
const selectCoins = document.getElementById("select_coins");
const button = document.getElementById("button");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  result.innerHTML = "";

  getDays()
    .then((data) => {
      for (let i = 0; i < 10; i++) {
        const fechaSinHora = data.serie[i].fecha.split("T")[0];
        valores[i] = {
          fecha: fechaSinHora,
          valor: data.serie[i].valor,
        };
      }

      showChart();
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  getcoins()
    .then((data) => {
      writeData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
let coin = "dolar";

const writeData = (data) => {
  const optionDolar = document.getElementById("dolar");
  const optionEuro = document.getElementById("euro");

  let operacionDolar = data.dolar.valor * input.value;
  let operacionEuro = data.euro.valor * input.value;
  console.log(operacionEuro);

  if (coin == "dolar") {
    console.log("hola soy un dolar");
    result.innerHTML += `<p> El resultado es: ${operacionDolar.toLocaleString(
      "es-CL",
      {
        style: "currency",
        currency: "CHL",
      }
    )}  </p>`;
  } else if (coin == "euro") {
    console.log("hola soy un euro");
    result.innerHTML += `<p> el resultado es: ${operacionEuro.toLocaleString(
      "es-CL",
      {
        style: "currency",
        currency: "CHL",
      }
    )} </p>`;
  }
};

selectCoins.addEventListener("change", function () {
  const optionSeleccionada = selectCoins.options[selectCoins.selectedIndex];
  const idSeleccionado = optionSeleccionada.id;
  coin = idSeleccionado;
  console.log(coin);
});

let valores = [];

let chart;

const showChart = () => {
  let ctx = document.getElementById("miGrafico").getContext("2d");
  if (chart) {
    chart.destroy();
  }

  let data = {
    labels: [
      valores[0].fecha,
      valores[1].fecha,
      valores[2].fecha,
      valores[3].fecha,
      valores[4].fecha,
      valores[5].fecha,
      valores[6].fecha,
      valores[7].fecha,
      valores[8].fecha,
      valores[9].fecha,
    ],
    datasets: [
      {
        label: "Valor",
        data: [
          valores[0].valor,
          valores[1].valor,
          valores[2].valor,
          valores[3].valor,
          valores[4].valor,
          valores[5].valor,
          valores[6].valor,
          valores[7].valor,
          valores[8].valor,
          valores[9].valor,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 3,
      },
    ],
  };

  let options = {
    responsive: true,
    scales: {},
  };

  chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
};
