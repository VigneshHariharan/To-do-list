const button = document.getElementById('add');
const body = document.getElementById('body');
const input = document.getElementById('input');
let liValue = '';
const ul = document.getElementById('ul');
const ulFragment = document.createDocumentFragment();

const defaultLists = [
	{
		title: 'head',
		description: 'body'
	},
	{
		title: 'head',
		description: 'body'
	},
	{
		title: 'head',
		description: 'body'
	}
];

const createNewList = (item) => {
	const fragment = document.createDocumentFragment();
	const li = document.createElement('li');
	const p = document.createElement('p');
	const deleteButton = document.createElement('button');
	const editButton = document.createElement('button');

	deleteButton.innerText = 'DELETE';
	editButton.innerText = 'EDIT';
	p.innerText = item.title;

	editButton.classList.add('edit-button');
	deleteButton.classList.add('delete-button');
	li.classList.add('li');

	li.appendChild(p);
	li.appendChild(deleteButton);
	li.appendChild(editButton);
	fragment.appendChild(li);

	// appending it to fragment so it will be stored as a separate node
	return fragment;
};

const createList = (list) => {
	const lists = [ ...list ];
	console.log(lists);
	lists.map((item) => {
		const newNode = createNewList(item);
		ulFragment.appendChild(newNode);
	});
	ul.appendChild(ulFragment);
};

createList(defaultLists);

const addList = () => {
	if (input.value === '') return '';
	const item = {
		title: input.value,
		description: 'value'
	};
	lists.push(item);
	const newNode = createNewList(item);
	ul.appendChild(newNode);
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
