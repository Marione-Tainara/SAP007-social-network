import {
  updateDocument,
  deleteDocument,
} from '../../firebase/firestoreauth.js';

export function editPub(item, containerFeed) {
  const containerEdit = document.createElement('div');

  const templateEdit = `
  <div id='changes-container' class='changes-container'>
  <div id='modal-content' class='modal-content'>
    <div id='message-container' class='message-container'>
    <h1>Editar postagem?</h1>
      <textarea id='message' class='message' maxlength='200'
        placeholder='Vamos melhorar o planeta terra hoje? Digite aqui a sua mensagem.'>${item.message}</textarea>
    </div>
  </div>
  <div class='btns-edit'>
    <button id='btn-save' class='btn-save'>Salvar alterações</button>
    <button id='btn-cancel' class='btn-cancel'>Cancelar alterações</button>
  </div>
</div>
    `;
  containerEdit.innerHTML = templateEdit;

  const modalEdit = containerEdit.querySelector('#changes-container');
  const confirmEdit = containerEdit.querySelector('#btn-save');
  const cancelEdit = containerEdit.querySelector('#btn-cancel');
  const message = containerEdit.querySelector('#message');

  confirmEdit.addEventListener('click', () => {
    updateDocument(item.id, message.value).then(() => {
      const messageEdit = containerFeed.querySelector('#message');
      messageEdit.innerHTML = message.value;
      containerEdit.remove();
    });
  });
  cancelEdit.addEventListener('click', () => {
    containerEdit.remove();
  });
  window.addEventListener('click', (e) => {
    if (e.target === modalEdit) {
      containerEdit.remove();
    }
  });
  return containerEdit;
}

export function delPub(item, containerFeed) {
  const containerDel = document.createElement('div');

  const templateChanges = `
    <div id='container-del' class='container-del'>
      <div class='content'>
        <div class='delete-container' >
        <h2 id='text-modal' class='text-modal'>Apagar a postagem?</h2>
          <p class='text-modal'>Você tem certeza que deseja excluir esta publicação?</p>
          <div>
            <button id='btn-yes' class='btn-yes'>Confirmar</button>
            <button id='btn-no' class='btn-no'>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
    `;
  containerDel.innerHTML = templateChanges;
  const modalDel = containerDel.querySelector('#container-del');
  const btnConfirm = containerDel.querySelector('#btn-yes');
  const btnCancel = containerDel.querySelector('#btn-no');

  btnConfirm.addEventListener('click', () => {
    deleteDocument(item.id).then(() => {
      containerFeed.remove();
    });
  });
  btnCancel.addEventListener('click', () => {
    containerDel.remove();
  });
  window.addEventListener('click', (e) => {
    if (e.target === modalDel) {
      containerDel.remove();
    }
  });
  return containerDel;
}
