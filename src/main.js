
import Swal from 'sweetalert2'

const BUTTON = document.getElementById('input-button');
const DIV_RESULT = document.getElementById('cont-result')



const getData = (func) => {
  const INPUT = document.getElementById('coin-inp').value.toUpperCase();
  fetch(`https://api.exchangerate.host/latest?base=${INPUT}`).then((response) => response.json())
    .then((data) => {
      if (data.base !== INPUT ) {
        throw new Error(error)
      }
      func(data)
    }).catch(() => {
      Swal.fire({
        title: 'ops... ',
        text: 'Você precisa passar uma moeda válida',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } );
}

const printResult = ({ rates }) => { 

  Object.keys(rates).forEach((coin, i) => {
    const ol = document.createElement("ol");
    const li = document.createElement("li");
    li.innerHTML = `${coin}: <span class="yellow">
    ${Object.values(rates).map((Values) => Values)[i]
      .toFixed([3])}</span>`;
    ol.appendChild(li);
    DIV_RESULT.appendChild(li);
  });
}



window.onload = () => {
  BUTTON.addEventListener('click', () => {
    DIV_RESULT.replaceChildren() 
    getData(printResult)
  });
};



// getData(printResult)