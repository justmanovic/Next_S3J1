var main_courses = ["Filet de turbot de la mer Noire", "Tablier de sapeur", "Gigot d'agneau", "Faisan de forêt", "Trio de quinoa, chou kale et pousses d'épinard"]
var techniques = ["à la cocotte", "minute", "avec sa sauce hollandaise", "façon sud-ouest", "comme chez ma grand-mère", "déglacé au saké", "maturé en fût de chêne"]
var sides = ["une purée de topinambour", "ses frites truffées", "des châtaignes croustillantes", "une brunoise carotte-cèleri", "un oeuf parfait", "sa crème veloutée de fromages affinés"]
var seasonings = ["au yuzu rouge", "au poivre vert de Sichuan", "et une pointe de safran", "à l'ail noir", "et un peu de sucre en poudre"]




const body = document.querySelector("body")
const menuEl = document.querySelector(".container-menu")
const changeMenuBtn = document.querySelector("#change-menu")
const popupContainer = document.querySelector("#popup-container")
const popup = document.querySelector("#popup")
const close = document.querySelector("#close")
const draggables = document.querySelectorAll(".draggable")
const photoContainer = document.querySelector(".container-photo")


function changeMenu() {
  var random_main_course = main_courses[Math.floor(Math.random() * main_courses.length)]
  var random_technique = techniques[Math.floor(Math.random() * techniques.length)]
  var random_side = sides[Math.floor(Math.random() * sides.length)]
  var random_seasoning = seasonings[Math.floor(Math.random() * seasonings.length)]
  const menu = `${random_main_course} ${random_technique}, avec ${random_side} ${random_seasoning}`
  menuEl.innerHTML = `<h3>${menu}</h3>`
}

function showPopup() {
  popupContainer.style.display = "block"
}

function hidePopup() {
  popupContainer.style.display = "none"
}

if (changeMenuBtn) {
  changeMenuBtn.addEventListener("click", changeMenu)
}

// body.addEventListener('mouseleave', showPopup)

close.addEventListener('click', hidePopup)

body.addEventListener("click", (e) => {
  if (e.target === popupContainer)
    hidePopup()
  else console.log(e.target)
})

draggables.forEach(draggable => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging")
  })
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging")
  })
})

if (photoContainer) {
  photoContainer.addEventListener("dragover", (e) => {
    e.preventDefault()
    // const afterElement = getDragAfterElement(photoContainer, e.clientY)
    const draggable = document.querySelector(".dragging")
    // photoContainer.appendChild(draggable)
    photoContainer.insertAdjacentElement('afterbegin', draggable)
  })
}


function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

}

const draggableElements = [...photoContainer.querySelectorAll('.draggable:not(.dragging)')]
console.log(draggableElements)

// ---------------------------------------------------------------------------------------------------------------------------------------
// ci-dessous, code trouvé sur https://codepen.io/coryrylan/pen/PobJbvX ... à implémenter !
// ---------------------------------------------------------------------------------------------------------------------------------------
function sortable(section, onUpdate) {
  var dragEl, nextEl, newPos, dragGhost;

  let oldPos = [...section.children].map(item => {
    item.draggable = true
    let pos = document.getElementById(item.id).getBoundingClientRect();
    return pos;
  });

  function _onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    var target = e.target;
    if (target && target !== dragEl && target.nodeName == 'DIV') {
      if (target.classList.contains('inside')) {
        e.stopPropagation();
      } else {
        //getBoundinClientRect contains location-info about the element (relative to the viewport)
        var targetPos = target.getBoundingClientRect();
        //checking that dragEl is dragged over half the target y-axis or x-axis. (therefor the .5)
        var next = (e.clientY - targetPos.top) / (targetPos.bottom - targetPos.top) > .5 || (e.clientX - targetPos.left) / (targetPos.right - targetPos.left) > .5;
        section.insertBefore(dragEl, next && target.nextSibling || target);

        console.log(oldPos);
      }
    }
  }

  function _onDragEnd(evt) {
    evt.preventDefault();
    newPos = [...section.children].map(child => {
      let pos = document.getElementById(child.id).getBoundingClientRect();
      return pos;
    });
    dragEl.classList.remove('ghost');
    section.removeEventListener('dragover', _onDragOver, false);
    section.removeEventListener('dragend', _onDragEnd, false);

    nextEl !== dragEl.nextSibling ? onUpdate(dragEl) : false;
  }

  section.addEventListener('dragstart', function (e) {
    dragEl = e.target;
    nextEl = dragEl.nextSibling;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('Text', dragEl.textContent);

    section.addEventListener('dragover', _onDragOver, false);
    section.addEventListener('dragend', _onDragEnd, false);

    setTimeout(function () {
      dragEl.classList.add('ghost');
    }, 0)

  });
}

sortable(document.getElementById('list'), function (item) {
  /* console.log(item); */
});


