// Cria a variável que armazena o local onde os dados serão inseridos no HTML
var content = document.getElementById("content");
// Indica a URL do arquivo JSON com as informações
var requestURL = "./assets/json/data.json";
// Inicia uma instância da classe XMLHttpReques chamado request
var request = new XMLHttpRequest();

// Abre uma conexão utilizando o método GET para a URL indicada
request.open("GET", requestURL);
// Indica para aplicação que a resposta será do tipo JSON
request.responseType = "json";
// Realiza a requisição
request.send();

// Quando a requisição for carrega executa a função
request.onload = function () {
  // Armazena a resposta da requisição na variável resp
  var resp = request.response;
  // Executa a função showMembers utilizando a resposta da requisição
  showList(resp);
};

// creates a <table> element and a <tbody> element
const tbl = document.createElement("table");
tbl.id = "myTable";
const tblBody = document.createElement("tbody");

// Função para carregar cada membro encontrado
function showList(list) {
  var tr = document.createElement("tr"); // Header row
  tr.className = 'header'

  for (var x = 0; x < Object.keys(list[0]).length; x++) {
    var th = document.createElement("th"); //column
    var text = document.createTextNode(`${Object.keys(list[0])[x]}`); //cell
    th.appendChild(text);
    tr.appendChild(th);
  }

  tblBody.appendChild(tr);

  // Condição para verificar qual o tamanho da lista
  for (var i = 0; i < list.length; i++) {
    // creating all cells
    // creates a table row
    const row = document.createElement("tr");
    row.className = 'lines'

    for (let j = 0; j < Object.keys(list[i]).length; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      const cell = document.createElement("td");
      cell.className = 'item'
      const cellText = document.createTextNode(`${Object.values(list[i])[j]}`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
  }
}

// put the <tbody> in the <table>
tbl.appendChild(tblBody);
// appends <table> into <body>
content.appendChild(tbl);
// sets the border attribute of tbl to '2'
//tbl.setAttribute("border", "1");

const myFunction = () => {
  const trs = document.querySelectorAll("#myTable tr:not(.header)");
  const filter = document.querySelector("#myInput").value;
  const regex = new RegExp(filter, "i");
  const isFoundInTds = (td) => regex.test(td.innerHTML);
  const isFound = (childrenArr) => childrenArr.some(isFoundInTds);
  const setTrStyleDisplay = ({ style, children }) => {
    style.display = isFound([
      ...children, // <-- All columns
    ])
      ? ""
      : "none";
  };

  trs.forEach(setTrStyleDisplay);
};
