// script.js

// Array que vai armazenar as enquetes
let enquetes = [];

// Função para cadastrar a enquete
document.getElementById('enqueteForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Capturando os dados do formulário
  const titulo = document.getElementById('titulo').value;
  const data = document.getElementById('data').value;
  const status = document.getElementById('status').value;

  // Criando um objeto para representar a enquete
  const novaEnquete = {
    titulo,
    data,
    status
  };

  // Adicionando a nova enquete no array
  enquetes.push(novaEnquete);

  // Limpando o formulário
  document.getElementById('enqueteForm').reset();

  // Exibindo as enquetes atualizadas
  mostrarEnquetes();
});

// Função para listar as enquetes na tela
function mostrarEnquetes() {
  const listaEnquetes = document.getElementById('listaEnquetes');
  listaEnquetes.innerHTML = ''; // Limpar lista antes de adicionar novamente

  // Criando elementos de lista para cada enquete
  enquetes.forEach((enquete, index) => {
    const li = document.createElement('li');
    li.textContent = `Título: ${enquete.titulo}, Data: ${enquete.data}, Status: ${enquete.status}`;
    
    // Adicionando botões para editar e excluir
    const editarBtn = document.createElement('button');
    editarBtn.textContent = 'Editar';
    editarBtn.classList.add('btn', 'editar');
    editarBtn.onclick = () => editarEnquete(index);

    const excluirBtn = document.createElement('button');
    excluirBtn.textContent = 'Excluir';
    excluirBtn.classList.add('btn', 'excluir');
    excluirBtn.onclick = () => excluirEnquete(index);

    // Adicionando os botões à lista
    li.appendChild(editarBtn);
    li.appendChild(excluirBtn);
    listaEnquetes.appendChild(li);
  });
}

// Função para excluir uma enquete
function excluirEnquete(index) {
  enquetes.splice(index, 1); // Removendo a enquete pelo índice
  mostrarEnquetes(); // Atualizando a lista
}

// Função para editar uma enquete
function editarEnquete(index) {
  const enquete = enquetes[index];

  // Preenchendo o formulário com os dados da enquete
  document.getElementById('titulo').value = enquete.titulo;
  document.getElementById('data').value = enquete.data;
  document.getElementById('status').value = enquete.status;

  // Removendo a enquete após a edição (já que vamos recriar ela)
  excluirEnquete(index);
}
