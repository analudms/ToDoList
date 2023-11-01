"use strict";

const openModal = () => {
  document.getElementById("modal").classList.add("active");
};

const closeModal = () => {
  clearFields();
  document.getElementById("modal").classList.remove("active");
};

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("dbClient")) ?? []; // ?? avalia e retorna o valor da expressão a direita se o valor a esquerda for null ou undefined

const setLocalStorage = (dbClient) =>
  localStorage.setItem("dbClient", JSON.stringify(dbClient));

//>>>>>> CRUD - create read update delete <<<<<<

// -------- DELETE --------

const deleteClient = (index) => {
  const dbClient = readClient();
  dbClient.splice(index, 1);
  setLocalStorage(dbClient);
};

// -------- UPDATE --------
const updateClient = (index, client) => {
  const dbClient = readClient();
  dbClient[index] = client;
  setLocalStorage(dbClient);
};

// -------- READ --------
const readClient = () => getLocalStorage();
//pegando o que tem no local storage, transformando em json e armazenando na variável cliente / acrescentar no final com push / enviar pro local storage com dados e valores
// -------- CREATE --------
const createCliente = (client) => {
  const dbClient = getLocalStorage();
  dbClient.push(client);
  setLocalStorage(dbClient);
};

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

const clearFields = () => {
  const fields = document.querySelectorAll(".modalField");
  fields.forEach((fields) => (fields.value = ""));
  document.getElementById('name').dataset.index = 'new'
  document.querySelector(".modalHeader>h2").textContent  = 'New Customer'
};

//Interação com usuário
const registerClient = () => {
  if (isValidFields()) {
    const client = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      telephone: document.getElementById("telephone").value,
      city: document.getElementById("city").value,
    };

    const index = document.getElementById("name").dataset.index;
    if (index == "new") {
      createCliente(client);
      updateTable();
      closeModal();
    } else {
      updateClient(index, client);
      updateTable();
      closeModal();
    }
  }
};

const createRow = (client, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.telephone}</td>
        <td>${client.city}</td>
        <td>
            <button type ="button" class = "button Edit" id = "edit-${index}" >Edit</button>
            <button type ="button" class = "button Delete" id = "delete-${index}" >Delete</button>
        </td>
    `;
  document.querySelector("#tableClient>tbody").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableClient>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const dbClient = readClient();
  clearTable();
  dbClient.forEach(createRow);
};

const fillFields = (client) => {
  (document.getElementById("name").value = client.name),
    (document.getElementById("email").value = client.email),
    (document.getElementById("telephone").value = client.telephone),
    (document.getElementById("city").value = client.city);
  document.getElementById("name").dataset.index = client.index;
};

const editClient = (index) => {
  const client = readClient()[index];
  client.index = index;
  fillFields(client);
  document.querySelector(".modalHeader>h2",).textContent = `Editando ${client.name}`;
  openModal();
};

const editDelete = (event) => {
  if (event.target.type === "button") {
    const [action, index] = event.target.id.split("-");

    if (action == "edit") {
      editClient(index);
    } else {
      const client = readClient()[index];
      const response = confirm(
        `Deseja realmente excluir o(a) cliente '${client.name}'?`,
      );

      if (response) {
        deleteClient(index);
        updateTable();
      }
    }
  }
};

updateTable();

//Eventos
document
  .getElementById("registerCustomer")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

document
  .getElementById("register")
  .addEventListener("click", registerClient);




document
  .querySelector("#tableClient>tbody")
  .addEventListener("click", editDelete);

document.getElementById("delete").addEventListener("click", closeModal);
