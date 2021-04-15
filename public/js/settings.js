let addTea = document.querySelector('#addTea')
let closeModal = document.querySelector('.modal-close')


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