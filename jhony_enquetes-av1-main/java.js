let enquetes = [];

const form = document.getElementById('enqueteForm');
const listaEnquetes = document.getElementById('listaEnquetes');
const listarBtn = document.getElementById('listarBtn');
const clearListBtn = document.getElementById('clearListBtn');

// Adiciona nova enquete
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const titulo = document.getElementById('titulo').value.trim();
  const data = document.getElementById('data').value;
  const status = document.getElementById('status').value;
  const opcoesTexto = document.getElementById('opcoes').value.trim();

  if (!opcoesTexto) return alert("Adicione pelo menos uma opção.");

  const opcoes = opcoesTexto.split(',').map(op => op.trim()).filter(op => op);
  const votos = opcoes.reduce((obj, opcao) => { obj[opcao] = 0; return obj; }, {});

  const enquete = {
    id: Date.now(),
    titulo,
    data,
    status,
    opcoes,
    votos
  };

  enquetes.push(enquete);
  form.reset();
  exibirEnquetes();
});

listarBtn.addEventListener('click', exibirEnquetes);
clearListBtn.addEventListener('click', () => {
  enquetes = [];
  exibirEnquetes();
});

function exibirEnquetes() {
  listaEnquetes.innerHTML = '';
  if (enquetes.length === 0) {
    listaEnquetes.innerHTML = '<li>Nenhuma enquete cadastrada.</li>';
    return;
  }

  enquetes.forEach(enquete => {
    const li = document.createElement('li');

    const opcoesHtml = enquete.opcoes.map(op =>
      `<li>${op} - <strong>${enquete.votos[op]}</strong> votos 
        <button onclick="votar(${enquete.id}, '${op}')">Votar</button></li>`
    ).join('');

    li.innerHTML = `
      <strong>${enquete.titulo}</strong><br>
      Data: ${enquete.data}<br>
      Status: ${enquete.status}
      <ul>${opcoesHtml}</ul>
      <button onclick="editarEnquete(${enquete.id})">Editar</button>
      <button onclick="excluirEnquete(${enquete.id})">Excluir</button>
    `;
    listaEnquetes.appendChild(li);
  });
}

function votar(id, opcao) {
  const enquete = enquetes.find(e => e.id === id);
  if (enquete && enquete.votos.hasOwnProperty(opcao)) {
    enquete.votos[opcao]++;
    exibirEnquetes();
  }
}

function editarEnquete(id) {
  const enquete = enquetes.find(e => e.id === id);
  if (!enquete) return;

  document.getElementById('titulo').value = enquete.titulo;
  document.getElementById('data').value = enquete.data;
  document.getElementById('status').value = enquete.status;
  document.getElementById('opcoes').value = enquete.opcoes.join(', ');
  enquetes = enquetes.filter(e => e.id !== id);
  exibirEnquetes();
}

function excluirEnquete(id) {
  enquetes = enquetes.filter(e => e.id !== id);
  exibirEnquetes();
}
