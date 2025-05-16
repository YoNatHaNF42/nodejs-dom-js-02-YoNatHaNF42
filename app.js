const form = document.getElementById('expense-form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const category = document.getElementById('category');
const table = document.getElementById('expense-table');
const totalEl = document.getElementById('total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let total = 0;

// Inicializar tabla desde localStorage
expenses.forEach(expense => {
  addExpenseToTable(expense);
  total += expense.amount;
});
updateTotalDisplay();

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const desc = description.value.trim();
  const amt = parseFloat(amount.value);
  const cat = category.value;

  if (!desc || isNaN(amt) || !cat) return;

  const expense = { desc, amount: amt, category: cat };
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  addExpenseToTable(expense);
  updateTotal(amt);
  form.reset();
});

function addExpenseToTable({ desc, amount, category }) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${desc}</td>
    <td>$${amount.toFixed(2)}</td>
    <td>${category}</td>
    <td><button class="delete">Eliminar</button></td>
  `;
  table.appendChild(row);

  row.querySelector('.delete').addEventListener('click', function () {
    row.remove();
    updateTotal(-amount);

    
    expenses = expenses.filter(e => !(e.desc === desc && e.amount === amount && e.category === category));
    localStorage.setItem('expenses', JSON.stringify(expenses));
  });
}

function updateTotal(value) {
  total += value;
  updateTotalDisplay();
}

function updateTotalDisplay() {
  totalEl.textContent = total.toFixed(2);
}
