const updateUser = document.querySelector('.update-user')
const registerUser = document.querySelector('.registration-form')

if(registerUser){
  registerUser.addEventListener('submit', async (event) => {
    event.preventDefault()
    // console.log(event.target)

    const action = event.target.action
    const {username,email,password,role} = event.target
    let master = '0'
    if(role.value == 'Администратор'){
      master = document.querySelector('.registration-form').master
    }
    const response = await fetch(action, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ username: username.value, email: email.value, role: role.value,password: password.value,master: master.value })
    })
    let res = await response.text()

    if(res === '100'){
      window.location = '/'
    }
    let x = document.querySelector('.registration-form div:nth-child(1)')
    let newMessage = document.createElement('div');
    newMessage.innerHTML = `<article class="message is-danger">
    <div class="message-body">
      ${res}
    </div>
  </article>`
    event.target.insertBefore(newMessage, x)

    // console.log(username.value,email.value,password.value,role.value, master.value);

    
  //   let textResponse = await response.json()
    
  })
}

if(updateUser){
  updateUser.addEventListener('submit', async (event) => {
    event.preventDefault()

    const action = event.target.action
    const username = document.querySelector('#username').value
    const email = document.querySelector('#email').value
    const role= document.querySelector('#role').value
  console.log(username,email);

    const response = await fetch(action, {
      method: 'PUT',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ username, email, role })
    })
    let textResponse = await response.json()
    
  })
}

const deleteComment = document.querySelectorAll('.delete-button')
if(deleteComment.length > 0 ){

    deleteComment.forEach(el => {
      el.addEventListener('click', async(event)=>{
      console.log(event.target);
      event.preventDefault()
    action ='/comments/delete/'+ event.currentTarget.id
    const response = await fetch(action,{
      method:'delete'
    })
    let textResponse= await response.text()

    el.parentElement.parentElement.parentElement.parentElement.remove()
  })
})
}