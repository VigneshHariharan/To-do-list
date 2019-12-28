const input = document.getElementById('input');
const button = document.getElementById('add');
const body = document.getElementById('body');
let liValue = '';
const ul = document.createElement('ul');
const deleteButton = document.getElementsByClassName('delete-button');

ul.classList.add('ul');
body.appendChild(ul);

const addList = () => {
	if (input.value === '') return '';
	const fragment = document.createDocumentFragment();
	const li = document.createElement('li');
	const p = document.createElement('p');
	const deleteButton = document.createElement('button');
	const editButton = document.createElement('button');

	fragment.appendChild(li);
	deleteButton.innerText = 'DELETE';
	deleteButton.classList.add('delete-button');
	editButton.innerText = 'EDIT';
	editButton.classList.add('edit-button');
	li.classList.add('li');
	p.innerText = liValue;
	li.appendChild(p);
	li.appendChild(deleteButton);
	li.appendChild(editButton);
	// appending it to fragment so it will be stored as a separate node
	ul.appendChild(fragment);

	input.value = '';
	liValue = '';
};

// Event Delegation
ul.addEventListener('click', (e) => {
	if (e.target.className === 'delete-button') {
		e.target.id = 'delete';
		const deleteTarget = document.getElementById(e.target.id);
		ul.removeChild(deleteTarget.parentNode);
	}

	if (e.target.className === 'edit-button') {
		e.target.id = 'edit';
		const input = document.createElement('input');
		input.id = 'input';

		const editTarget = document.getElementById(e.target.id);
		editTarget.parentNode.id = 'edit';
		const p = editTarget.parentNode.children[0];
		const li = editTarget.parentNode;
		li.replaceChild(input, p);

		let liValue = '';
		input.addEventListener('input', (e) => {
			liValue = e.target.value;
		});
		input.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') {
				const p = document.createElement('p');
				p.value = liValue;
				li.replaceChild(p, input);
			}
		});
	}
	// stopping the event bubbling
	e.stopPropagation();
});

input.addEventListener('input', (e) => {
	liValue = e.target.value;
});

input.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		addList();
	}
});

button.addEventListener('click', addList);
// deleteButton.addEventListener('click', (e) => console.log(e));
