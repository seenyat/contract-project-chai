let addTea = document.querySelector('#addTea')
let closeModal = document.querySelector('.modal-close')
const deleteOne = document.querySelectorAll('#deletePost')
const editProfile = document.querySelector('#edit-profile-form')
const admin = document.querySelector('#selectRole')


// Select admin

if (admin){
  // console.log(123)
  let x = document.querySelector('.registration-form div:nth-child(3)')
  if (admin.value=="Администратор"){
    let newNode = document.createElement("div")
    newNode.innerHTML=`<div class="control has-icons-left">
    <input class="input master-input" required placeholder="Какого чая не существует?" name="master" type="text">
    <span class="icon is-small is-left">
    <i class="fa fa-user-secret"></i>
    </span>
    </div>`
    newNode.className="field";
    newNode.classList.add("field-secret");
    admin.parentElement.parentElement.parentElement.parentElement.insertBefore(newNode,x)
  }
  admin.addEventListener('change', (e) => {
    if (e.target.value == "Администратор"){

      let newNode = document.createElement("div")
      newNode.innerHTML=`<div class="control has-icons-left">
      <input class="input" required placeholder="Какого чая не существует?" name="master" type="text">
      <span class="icon is-small is-left">
      <i class="fa fa-user-secret"></i>
      </span>
      </div>`
      newNode.className="field";
      newNode.classList.add("field-secret");
      e.target.parentElement.parentElement.parentElement.parentElement.insertBefore(newNode,x)
      
    } else{
      let sec = document.querySelector('.field-secret').remove();
      if(sec){
        sec.remove()
      }
    }
    })
  }
  
  // Edit profile
if (editProfile){
  editProfile.addEventListener('click', (e) => {
    let inputs = document.querySelectorAll('form.box input');
    inputs.forEach(el => {
      el.disabled = false;
      el.classList.toggle('disabled')
    })

    document.querySelector('.edit-form').style.display = 'block'
  })
}

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

