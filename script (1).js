document.getElementById('addButton').addEventListener('click', addFood);

let totalCalories = 0;
let totalFats = 0;
let totalProteins = 0;
let totalCarbs = 0;

function addFood() {
    const foodData = getFoodData();

    if (!isValidFoodData(foodData)) {
        alert('Пожалуйста, заполните все поля корректно.');
        return;
    }

    addRowToTable(foodData);
    clearFields();
    updateTotals(foodData);
}

function getFoodData() {
    return {
        name: document.getElementById('name').value.trim(),
        weight: parseFloat(document.getElementById('weight').value) || 0,
        calories: parseFloat(document.getElementById('calories').value) || 0,
        fats: parseFloat(document.getElementById('fats').value) || 0,
        proteins: parseFloat(document.getElementById('proteins').value) || 0,
        carbs: parseFloat(document.getElementById('carbs').value) || 0,
    };
}

function isValidFoodData(data) {
    return data.name !== '' && data.weight > 0 && data.calories >= 0 &&
           data.fats >= 0 && data.proteins >= 0 && data.carbs >= 0;
}

function addRowToTable(data) {
    const tableBody = document.getElementById('food-list');
    const row = tableBody.insertRow();

    Object.values(data).forEach((value, index) => {
        row.insertCell(index).innerText = value;
    });

    // Добавление кнопок редактирования и удаления
    const editCell = row.insertCell(Object.values(data).length);
    const deleteCell = row.insertCell(Object.values(data).length + 1);

    const editButton = document.createElement('button');
    editButton.innerText = 'Редактировать';
    editButton.onclick = () => editRow(row, data);
    editCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Удалить';
    deleteButton.onclick = () => deleteRow(row, data);
    deleteCell.appendChild(deleteButton);
}

function clearFields() {
    document.getElementById('food-form').reset();
}

function updateTotals(data) {
    totalCalories += data.calories;
    totalFats += data.fats;
    totalProteins += data.proteins;
    totalCarbs += data.carbs;

    displayTotals();
}

function displayTotals() {
    const totalsElement = document.getElementById('totals');
    totalsElement.innerHTML = `
        <strong>Итого:</strong> 
        Калории: ${totalCalories}, Жиры: ${totalFats}, Белки: ${totalProteins}, Углеводы: ${totalCarbs}
    `;
}

function editRow(row, data) {
    document.getElementById('name').value = data.name;
    document.getElementById('weight').value = data.weight;
    document.getElementById('calories').value = data.calories;
    document.getElementById('fats').value = data.fats;
    document.getElementById('proteins').value = data.proteins;
    document.getElementById('carbs').value = data.carbs;

    deleteRow(row, data);
}

function deleteRow(row, data) {
    row.parentNode.removeChild(row);
    totalCalories -= data.calories;
    totalFats -= data.fats;
    totalProteins -= data.proteins;
    totalCarbs -= data.carbs;

    displayTotals();
}