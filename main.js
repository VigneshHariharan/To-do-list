const button = document.getElementById('add');
const body = document.getElementById('body');
const input = document.getElementsByClassName('input')[0];
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

const createNewList = (item, index) => {
	const fragment = document.createDocumentFragment();
	const li = document.createElement('li');
	const p = document.createElement('p');
	const deleteButton = document.createElement('button');
	const editButton = document.createElement('button');

	deleteButton.innerText = 'DELETE';
	editButton.innerText = 'EDIT';
	li.key = index;
	p.innerText = item.title;

	editButton.classList.add('edit-button');
	deleteButton.classList.add('delete-button');
	li.classList.add('li');

	li.appendChild(p);
	li.appendChild(editButton);
	li.appendChild(deleteButton);
	fragment.appendChild(li);

	// appending it to fragment so it will be stored as a separate node
	return fragment;
};

const createList = (list) => {
	const lists = [ ...list ];
	lists.map((item, index) => {
		const newNode = createNewList(item, index);
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
	defaultLists.push(item);
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
		const editLi = e.target.parentNode;
		const childptag = editLi.children[0];
		childptag.value = '';
		const editInput = document.createElement('input');
		editInput.classList.add('input');
		editInput.autofocus = true;
		let editValue = '';
		editLi.replaceChild(editInput, childptag);
		editInput.addEventListener('input', (e) => {
			editInput.value = e.target.value;
			editValue = e.target.value;
		});
		editInput.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') {
				childptag.innerText = editValue;
				editLi.replaceChild(childptag, editInput);
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
