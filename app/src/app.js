const itemsList = document.getElementById("items");
const addForm = document.querySelector("form");
const taskInput = document.getElementById("task");

const serverBasePath = "http://192.168.20.5:3000";

// Load all items from the API
function loadItems() {
	fetch(`${serverBasePath}/api/todo`)
		.then((response) => response.json())
		.then((items) => {
			itemsList.innerHTML = "";
			items.forEach((item) => {
				const li = document.createElement("li");
				li.textContent = item.task;
				if (item.done) {
					li.classList.add("done");
				}

				const markCheckbox = document.createElement("input");
				markCheckbox.type = "checkbox";
				markCheckbox.checked = item.done;
				markCheckbox.addEventListener("change", () =>
					markAsDone(item.id, !item.done)
				);
				li.appendChild(markCheckbox);

				const deleteButton = document.createElement("button");
				deleteButton.textContent = "Remove";
				deleteButton.addEventListener("click", () =>
					removeItem(item.id)
				);
				li.appendChild(deleteButton);

				itemsList.appendChild(li);
			});
		})
		.catch((error) => console.error(error));
}

// Add a new item to the API
function addItem(task) {
	fetch(`${serverBasePath}/api/todo`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ task: task }),
	})
		.then((response) => response.json())
		.then(() => loadItems())
		.catch((error) => console.error(error));
}

// Mark an item as done or undone in the API
function markAsDone(id, done) {
	fetch(`${serverBasePath}/api/todo/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ done: done }),
	})
		.then((response) => response.json())
		.then(() => loadItems())
		.catch((error) => console.error(error));
}

// Remove an item from the API
function removeItem(id) {
	fetch(`${serverBasePath}/api/todo/${id}`, {
		method: "DELETE",
	})
		.then((response) => response.json())
		.then(() => loadItems())
		.catch((error) => console.error(error));
}

// Handle form submit event
addForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const task = taskInput.value.trim();
	if (task) {
		addItem(task);
		taskInput.value = "";
		taskInput.focus();
	}
});

// Load items on page load
loadItems();
