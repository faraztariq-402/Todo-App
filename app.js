document.addEventListener('DOMContentLoaded', (event) => {
  let deleteButton = document.getElementById("delete");
  let delete1Button = document.getElementById("delete1");
  let delete2Button = document.getElementById("delete2");
  let editButton = document.getElementById("edit");
  let edit1Button = document.getElementById("edit1");
  let edit2Button = document.getElementById("edit2");
  let remove1 = document.getElementById("remove1")
  let remove2 = document.getElementById("remove2")
  let remove3 = document.getElementById("remove3")
  let remove4 = document.getElementById("remove4")

  deleteButton.addEventListener('click', handleDelete);
  delete1Button.addEventListener('click', handleDelete1);
  delete2Button.addEventListener('click', handleDelete2);
  editButton.addEventListener('click', handleEdit);
  edit1Button.addEventListener('click', handleEdit1);
  edit2Button.addEventListener('click', handleEdit2);
  remove1.addEventListener('click', handleRemove1);
  remove2.addEventListener('click', handleRemove2);
  remove3.addEventListener('click', handleRemove3);
  remove4.addEventListener('click', handleRemove4);

  // Handle Remove1 button click
  function handleRemove1() {
    const listItem = document.getElementById('list1');
    listItem.parentNode.removeChild(listItem);
  }

  // Handle Remove2 button click
  function handleRemove2() {
    const listItem = document.getElementById('list2');
    listItem.parentNode.removeChild(listItem);
  }

  // Handle Remove3 button click
  function handleRemove3() {
    const listItem = document.getElementById('list3');
    listItem.parentNode.removeChild(listItem);
  }

  // Handle Remove4 button click
  function handleRemove4() {
    const listItem = document.getElementById('list4');
    listItem.parentNode.removeChild(listItem);
  }
  let dragElement = null;

  function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragElement = this;
    e.dataTransfer.setData('text/html', this.outerHTML);
    dragElement.sourceSection = dragElement.closest('.section1, .section2, .section3');
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  
    // Check if the drop target is an SVG element
    if (e.target.nodeName === 'svg') {
      return true; // Do not remove the list item
    }
  
    if (dragElement !== this) {
      const sourceSection = dragElement.sourceSection;
      const targetSection = this.closest('.section1, .section2, .section3');
      if (sourceSection === targetSection) {
        const parentList = dragElement.parentNode;
        if (parentList.parentNode) {
          parentList.parentNode.removeChild(parentList);
        }
        const ul = this.closest('ul');
        ul.insertBefore(dragElement, this);
      } else if (targetSection.classList.contains('section2')) {
        const ul = targetSection.querySelector('ul');
        ul.appendChild(dragElement);
      } else if (targetSection.classList.contains('section1')) {
        const ul = targetSection.querySelector('ul');
        ul.appendChild(dragElement);
      } else if (targetSection.classList.contains('section3')) {
        const ul = targetSection.querySelector('ul');
        ul.appendChild(dragElement);
      }
    }
  
    // Remove the list item if dropped outside any section
    if (!dragElement.parentNode && !dragElement.classList.contains('remove')) {
      const ul = dragElement.closest('ul');
      ul.removeChild(dragElement);
    }
  
    return true;
  }
  
  
  
  

  function handleAddButtonClick(e) {
    const input = this.previousElementSibling;
    const inputValue = input.value.trim();
    if (inputValue !== '') {
      const targetSection = this.closest('.section1, .section2, .section3');
      const ul = targetSection.querySelector('ul');
      
      const li = document.createElement('li');
      li.draggable = true;
  
      const span = document.createElement('span');
      span.textContent = inputValue;
  
      const removeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      removeIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      removeIcon.setAttribute('width', '16');
      removeIcon.setAttribute('height', '16');
      removeIcon.setAttribute('fill', 'currentColor');
      removeIcon.setAttribute('class', 'bi bi-trash3-fill');
      removeIcon.setAttribute('viewBox', '0 0 16 16');
      removeIcon.style.cursor = 'pointer'; // Add cursor style
  
      const removePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      removePath.setAttribute('d', 'M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z');
  
      removeIcon.appendChild(removePath);
      li.appendChild(removeIcon);
      li.appendChild(span);
      ul.appendChild(li);
  
      input.value = '';
  
      // Attach event listeners to the dynamically added list item
      li.addEventListener('dragstart', handleDragStart, false);
      li.addEventListener('dragenter', handleDragEnter, false);
      li.addEventListener('dragover', handleDragOver, false);
      li.addEventListener('dragleave', handleDragLeave, false);
      li.addEventListener('drop', handleDrop, false);
      li.addEventListener('dragstart', handleDragStart, false);
      li.addEventListener('dragenter', handleDragEnter, false);
      li.addEventListener('dragover', handleDragOver, false);
      li.addEventListener('dragleave', handleDragLeave, false);
      li.addEventListener('drop', handleDrop, false);
  
      // Add click event listener to the remove icon
      removeIcon.addEventListener('click', function() {
        ul.removeChild(li);
      });
  
    }
  }
  
 
  
  function handleDragEnd(e) {
    this.style.opacity = '1';
    const sections = document.querySelectorAll('.section1, .section2, .section3');
    sections.forEach((section) => {
      section.classList.remove('over');
    });
  }

  function handleDelete() {
    const section1List = document.querySelectorAll('.section1 ul li');
    section1List.forEach(function (item) {
      item.parentNode.removeChild(item); // Remove each list item in section1
    });
  }

  function handleDelete1() {
    const section2Lists = document.querySelectorAll('.section2 ul li');
    section2Lists.forEach(function (item) {
      item.parentNode.removeChild(item); // Remove each list item in section2
    });
  }
  
  function handleDelete2() {
    const section3List = document.querySelectorAll('.section3 ul li');
    section3List.forEach(function (item) {
      item.parentNode.removeChild(item); // Remove each list item in section3
    });
  }

  function handleEdit() {
    const section1List = document.querySelectorAll('.section1 ul li');
    const section2Lists = document.querySelectorAll('.section2 ul li');
    const section3List = document.querySelectorAll('.section3 ul li');
  
    // Check if any list item is currently in edit mode
    const isEditing = Array.from(section1List).some(item => item.isContentEditable);
  
    section1List.forEach(function (item) {
      item.contentEditable = isEditing ? false : true; // Toggle the contentEditable property
    });
  
    section2Lists.forEach(function (item) {
      item.contentEditable = false; // Make each list item non-editable in section2
    });
  
    section3List.forEach(function (item) {
      item.contentEditable = false; // Make each list item non-editable in section3
    });
  }
  
  
  function handleEdit1() {
    const section1List = document.querySelectorAll('.section1 ul li');
    const section2Lists = document.querySelectorAll('.section2 ul li');
    const section3List = document.querySelectorAll('.section3 ul li');
  
    // Check if any list item is currently in edit mode
    const isEditing = Array.from(section2Lists).some(item => item.isContentEditable);
  
    section1List.forEach(function (item) {
      item.contentEditable = false; // Make each list item non-editable in section1
    });
  
    section2Lists.forEach(function (item) {
      item.contentEditable = isEditing ? false : true; // Toggle the contentEditable property
    });
  
    section3List.forEach(function (item) {
      item.contentEditable = false; // Make each list item non-editable in section3
    });
  }
  
  function handleEdit2() {
    const section1List = document.querySelectorAll('.section1 ul li');
    const section2Lists = document.querySelectorAll('.section2 ul li');
    const section3List = document.querySelectorAll('.section3 ul li');
  
    // Check if any list item is currently in edit mode
    const isEditing = Array.from(section3List).some(item => item.isContentEditable);
  
    section1List.forEach(function (item) {
      item.contentEditable = false; // Make each list item non-editable in section1
    });
  
    section2Lists.forEach(function (item) {
      item.contentEditable = false; // Make each list item non-editable in section2
    });
  
    section3List.forEach(function (item) {
      item.contentEditable = isEditing ? false : true; // Toggle the contentEditable property
    });
  }
  
  function handleEditItemClick() {
    const section1List = document.querySelectorAll('.section1 ul li');
    const section2Lists = document.querySelectorAll('.section2 ul li');
    const section3List = document.querySelectorAll('.section3 ul li');
      
    section1List.forEach(function (item) {
      item.contentEditable = false; // Make each list item non-editable in section1
    });
      
    section2Lists.forEach(function (item) {
      item.contentEditable = false; // Make each list item non-editable in section2
    });
      
    section3List.forEach(function (item) {
      item.contentEditable = false; // Make each list item non-editable in section3
    });
    
    this.contentEditable = false; // Make the clicked list item non-editable
    this.blur(); // Remove focus from the list item to exit edit mode
  }
  
  

  const items = document.querySelectorAll('.section1 li, .section2 li, .section3 li');
  const dropTargets = document.querySelectorAll('.section1, .section2, .section3');
  const addButtons = document.querySelectorAll('#todoButton, #workingButton, #doneButton');

  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
    item.addEventListener('touchstart', handleDragStart, false);
    item.addEventListener('dblclick', handleEditItemClick, false);
  });

  dropTargets.forEach(function (target) {
    target.addEventListener('dragover', handleDragOver, false);
    target.addEventListener('dragenter', handleDragEnter, false);
    target.addEventListener('dragleave', handleDragLeave, false);
    target.addEventListener('drop', handleDrop, false);
  });

  addButtons.forEach(function (button) {
    button.addEventListener('click', handleAddButtonClick);
  });
});