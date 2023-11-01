"use strict";

const openModal = () => {
    document.getElementById("modal").classList.add("active");
}

const closeModal = () =>{
    clearFields()
    document.getElementById("modal").classList.remove("active");
}

const getLocalStorage = () =>
    JSON.parse(localStorage.getItem("dbClient")) ?? []; // ?? avalia e retorna o valor da expressão a direita se o valor a esquerda for null ou undefined

const setLocalStorage = (dbClient) =>
    localStorage.setItem("dbClient", JSON.stringify(dbClient));

//CRUD - create read update delete

// -------- DELETE --------

const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

// -------- UPDATE --------
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

// -------- READ --------
const readClient = () => getLocalStorage()
//pegando o que tem no local storage, transformando em json e armazenando na variável cliente / acrescentar no final com push / enviar pro local storage com dados e valores
// -------- CREATE --------
const createCliente = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client);
    setLocalStorage(dbClient)
};

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modalField')
    fields.forEach(fields => fields.value = "")
}

//Interação com usuário
const registerClient = () => {
    if (isValidFields()){
        const client = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            telephone: document.getElementById('telephone').value,
            city: document.getElementById('city').value

        }
        createCliente(client)
        updateTable()
        closeModal()

    }
}

const createRow = (client) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = 
    `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button Edit">Edit</button>
            <button type="button" class="button Delete">Delete</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

updateTable()

//Eventos
document
    .getElementById('registerCustomer')
    .addEventListener('click', openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

document.getElementById('register')
    .addEventListener('click', registerClient)
