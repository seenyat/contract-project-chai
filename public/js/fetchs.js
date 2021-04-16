const updateUser = document.querySelector('.update-user')

if(updateUser){
  updateUser.addEventListener('submit', async (event) => {
    event.preventDefault()

    const action = event.target.action
    const username = document.querySelector('#username').value
    const email = document.querySelector('#email').value
    const role= document.querySelector('#role')
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