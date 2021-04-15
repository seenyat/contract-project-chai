const updateUser = document.forms.update.addEventListener('submit', async (event) => {
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

const deleteOne = document.querySelector('.delete-button')
console.log(deleteOne);
deleteOne.addEventListener('click', async(event)=>{
  event.preventDefault()
action =event.target.href
const response = await fetch(action,{
  method:'delete'
})
let textResponse= await response.text()

deleteOne.parentElement.parentElement.parentElement.parentElement.remove()



})
