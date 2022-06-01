const url = window.location.href

const qSel = (elemClass) => {
  return document.querySelector(elemClass)
}

const addEvLis = (element, eventType, cb) => {
  return element.addEventListener(eventType, cb)
}

const mainDiv = qSel('.contentContainer')

const toDoForm = qSel('.toDoForm');

const toDoFormBtn = qSel('.toDoFormBtn')

const todoItemsDiv = qSel('.displayToDo-container')

const cardWrap = qSel('.cardWrapper')

const editCard = qSel('.editCard')

const editCloseBtn = qSel('.editClose')

const editFormId = qSel('.editFormId')

const editFormSubmit = qSel('.editFormBtn')

const editForm = qSel('.editForm')

const editFormOpen = (e) =>{
  e.preventDefault();
  
  editFormId.textContent = e.target.id;
  editFormSubmit.setAttribute('id', e.target.id)
  editCard.style.display = 'block';
  mainDiv.style.display = 'none';
 
}

const editFormClose = (e) =>{
  e.preventDefault()
  editCard.style.display = 'none';
  mainDiv.style.display = 'flex';
}

const deleteToDo = async (e) => {
  let postIdToDelete = document.getElementById(e.target.id)
  postIdToDelete.remove();
  try {
    const response = await fetch(`${url}${e.target.id}`, {
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json'
        },
      });
      console.log(response.json())
    } catch (error) {
    console.log(error);
    }
}

const modifyToDoCard = (obj) =>{
  console.log(obj.id, obj.title, obj.content)

  let targetCard = document.getElementById(obj.id)
  let childrenCol = targetCard.children

  childrenCol[1].textContent= obj.title
  childrenCol[2].textContent = obj.content
}

/**for editSubmit */
const editPost = async (e) => {
  e.preventDefault();

  const formData = new FormData(editForm)
  const values = [...formData.entries()]
  const objFromVals = Object.fromEntries(values)
  const valuesStr = JSON.stringify(objFromVals)

  editForm.style.display = "none";
  mainDiv.style.display = "flex";
  try {
    const response = await fetch(`${url}${e.target.id}`, {
      method: 'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body: valuesStr
    })

    let data = await response.json()
    modifyToDoCard(data)

  } catch (error) {
    console.log(error)
  }
}

const toDoCard = (obj) => {
  let cardCont = document.createElement('div');
  cardCont.classList.add('toDoCard')
  cardCont.setAttribute('id', obj.id)

  let cardSpan = document.createElement('span')
  cardSpan.classList.add('delete')
  cardSpan.innerHTML = '&times;'
  cardSpan.setAttribute('id', obj.id)
  cardSpan.addEventListener('click', deleteToDo)

  let cardTitle = document.createElement('h3')
  cardTitle.classList.add('cardTitle')
  cardTitle.textContent = obj.title

  let cardContent = document.createElement('p1')
  cardContent.classList.add('cardContent')
  cardContent.textContent = obj.content

  let cardEditBtn = document.createElement('button')
  cardEditBtn.classList.add('editBtn')
  cardEditBtn.setAttribute('id', obj.id)
  cardEditBtn.textContent = 'Edit'
  cardEditBtn.addEventListener('click', editFormOpen)

  cardCont.appendChild(cardSpan)
  cardCont.appendChild(cardTitle)
  cardCont.appendChild(cardContent)
  cardCont.appendChild(cardEditBtn)
  cardWrap.appendChild(cardCont)
}



const getToDo = async () => {
  try {
    const response = await fetch(`${url}posts`)
    let data  = await response.json();
    data.forEach(ele=>{toDoCard(ele)})
    
  } catch (error) {
    console.log(error)
  }
}
getToDo()


const newToDo = async (e) =>{
  e.preventDefault();

  const formData = new FormData(toDoForm)
  const values = [...formData.entries()]
  const objFromVals = Object.fromEntries(values)
  const valuesStr = JSON.stringify(objFromVals)

  try {
    const response = await fetch(`${url}posts`, {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: valuesStr
    })

    let data = await response.json()
    toDoCard(data)

  } catch (error) {
    console.log(error)
  }
}

addEvLis(toDoFormBtn, 'click', newToDo) 
addEvLis(editCloseBtn, 'click', editFormClose)
addEvLis(editFormSubmit, 'click', editPost)




