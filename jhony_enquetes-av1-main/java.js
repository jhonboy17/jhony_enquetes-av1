const form = document.getElementById('enqueteForm');
const listaEnquetes = document.getElementById('listaEnquetes');
const clearListBtn = document.getElementById('clearListBtn');

// Função para salvar as enquetes no banco de dados (usando AJAX)
function salvarEnqueteNoBanco(titulo, data, status, opcoes) {
  const formData = new FormData();
  formData.append('titulo', titulo);
  formData.append('data', data);
  formData.append('status', status);
  formData.append('opcoes', opcoes);

  fetch('salvar_enquete.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      exibirEnquetes();
    } else {
      alert('Erro ao salvar a enquete.');
    }
  })
  .catch(error => console.error('Erro:', error));
}


function exibirEnquetes() {
  fetch('listar_enquetes.php')
  .then(response => response.json())
  .then(enquetes => {
    listaEnquetes.innerHTML = '';

    if (enquetes.length === 0) {
      listaEnquetes.innerHTML = '<li>Nenhuma enquete cadastrada.</li>';
      return;
    }

    enquetes.forEach(enquete => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${enquete.titulo}</strong><br>
        <small>Data: ${enquete.data}</small><br>
        <span>Status: <strong>${enquete.status}</strong></span><br>
        <small>Opções: ${enquete.opcoes}</small><br>
        <button class="edit-btn" onclick="editarEnquete(${enquete.id})">Editar</button>
        <button class="delete-btn" onclick="excluirEnquete(${enquete.id})">Excluir</button>
      `;
      listaEnquetes.appendChild(li);
    });
  })
  .catch(error => console.error('Erro ao listar enquetes:', error));
}


function adicionarEnquete(event) {
  event.preventDefault();

  const titulo = document.getElementById('titulo').value.trim();
  const data = document.getElementById('data').value;
  const status = document.getElementById('status').value;
  const opcoes = document.getElementById('opcoes').value.trim();

  if (!titulo || !data || !status || !opcoes) return;

  salvarEnqueteNoBanco(titulo, data, status, opcoes);
}


function excluirEnquete(id) {
  if (confirm("Deseja realmente excluir esta enquete?")) {
    const formData = new FormData();
    formData.append('id', id);

    fetch('excluir_enquete.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        exibirEnquetes();
      } else {
        alert('Erro ao excluir a enquete.');
      }
    })
    .catch(error => console.error('Erro:', error));
  }
}


function limparLista() {
  if (confirm("Deseja apagar todas as enquetes?")) {
    fetch('limpar_lista.php', { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          exibirEnquetes();
        } else {
          alert('Erro ao limpar a lista.');
        }
      })
      .catch(error => console.error('Erro:', error));
  }
}


form.addEventListener('submit', adicionarEnquete);
clearListBtn.addEventListener('click', limparLista);


exibirEnquetes();

