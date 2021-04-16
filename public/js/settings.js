let addTea = document.querySelector('#addTea')
let closeModal = document.querySelector('.modal-close')
const deleteOne = document.querySelectorAll('#deletePost')



if (addTea){
  addTea.addEventListener('click', (e) => {
    document.querySelector('.modal').classList.toggle('is-active')
  })
}
if (closeModal){
  closeModal.addEventListener('click', (e) => {
    document.querySelector('.modal').classList.toggle('is-active')
  })
}

if (deleteOne.length > 0 ){
  deleteOne.forEach(el => {
    el.addEventListener('click', async(event)=>{
    console.log(event.target);
    event.preventDefault()
    event.stopPropagation()
  action = event.currentTarget.dataset.id
  const response = await fetch(action,{
    method:'delete'
  })
  let textResponse= await response.text()

  el.parentElement.remove()
  })
  })
}

