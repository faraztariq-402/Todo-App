document.addEventListener('DOMContentLoaded', (event) => {
  let dragElement = null;

  function handleDragStart(e) {
    this.style.opacity = '1';
    dragElement = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    dragElement.sourceSection = dragElement.closest('.section1, .section2');
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
    if (dragElement !== this) {
      const sourceSection = dragElement.sourceSection;
      const targetSection = this.closest('.section1, .section2');
      if (sourceSection === targetSection) {
        const parentList = dragElement.parentNode;
        if (parentList.parentNode) {
          parentList.parentNode.removeChild(parentList);
        }
        const ul = this.closest('ul');
        ul.insertBefore(dragElement, this);
      } else {
        const parentList = dragElement.parentNode;
        if (parentList.parentNode) {
          parentList.parentNode.removeChild(parentList);
        }
        let ul = this.querySelector('ul');
        if (!ul) {
          ul = document.createElement('ul');
          this.appendChild(ul);
        }
        const li = document.createElement('li');
        li.innerHTML = e.dataTransfer.getData('text/html');
        ul.appendChild(li);
      }
    }
    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    const items = document.querySelectorAll('.section1 li, .section2 li');
    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }

  const items = document.querySelectorAll('.section1 li, .section2 li');
  const dropTargets = document.querySelectorAll('.section1, .section2');

  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });

  dropTargets.forEach(function (target) {
    target.addEventListener('dragover', handleDragOver, false);
    target.addEventListener('dragenter', handleDragEnter, false);
    target.addEventListener('dragleave', handleDragLeave, false);
    target.addEventListener('drop', handleDrop, false);
  });
});







// drop(event);
