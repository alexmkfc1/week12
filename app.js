const API_URL = 'http://localhost:3000/items';
const form = document.getElementById('itemForm');
const input = document.getElementById('itemInput');
const list = document.getElementById('itemList');

// Fetch and display items
async function getItems() {
  const res = await fetch(API_URL);
  const items = await res.json();
  list.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      ${item.name}
      <button class="btn btn-danger btn-sm" onclick="deleteItem(${item.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

// Add new item
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = input.value.trim();
  if (name) {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    input.value = '';
    getItems();
  }
});

// Delete item
async function deleteItem(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  getItems();
}

// Initial fetch
getItems();