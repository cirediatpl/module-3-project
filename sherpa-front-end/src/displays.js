function displayUserPage(user){
  const mainContainer = document.querySelector('main')
  mainContainer.innerHTML = `<h2>Welcome back, ${user.name}</h2>
  <button id="logout">Logout</button>`
  displayCoachIndex()
  renderAppointments("accepted")
  
  const logoutButton = document.getElementById('logout')
  logoutButton.addEventListener('click', function(e){
    localStorage.removeItem('user_id')
    displayHomePage()
  })
}

function displayCoachPage(coach){
  const mainContainer = document.querySelector('main')
  mainContainer.innerHTML = `<h2>Welcome back, ${coach.name}</h2>
  <button id="logout">Logout</button>`
  renderAppointments("pending")
  
  const logoutButton = document.getElementById('logout')
  logoutButton.addEventListener('click', function(e){
    localStorage.removeItem('coach_id')
    displayHomePage()
  })
}

function addAppointment(e) {
  const coachId = e.target.dataset.coachId
  const userId = localStorage.getItem('user_id')
  fetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      coach_id: coachId,
      user_id: userId,
      status: "pending",
      // datetime: 
      duration: 30,
      address: "New Haven, CT"
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))
}
  
function renderAppointments(status) {
  // need to make back-end so only appointments for specific coach are returned
  const mainContainer = document.querySelector('main')
  const adapter = new Adapter(BASE_URL)
  adapter.getAppointments(status)
  .then(appointments => {
    appointments.forEach(appointment => {
      const div = document.createElement('div')
      mainContainer.append(div)
      div.innerHTML += `
        <div>
          <span>${appointment.coach_id}</span>
          <span>${appointment.user_id}</span>
          <span>${appointment.duration} minutes</span>
          <span>${appointment.address}</span>
          <span>${appointment.status}</span>
        </div>
      `
      // start_time is not listed above
      if (status == "pending") {
        const button = document.createElement('button')
        button.addEventListener('click', e => acceptAppointment(e, appointment.id))
        const text = document.createTextNode(`Accept`)
        div.append(button)
        button.append(text)
      } else {
      }
    })
  })
}

function acceptAppointment(e, id) {
  const adapter = new Adapter(BASE_URL)
  adapter.patchAppointment(id, {status: "accepted"})
  .then(appointment => {
    console.log(appointment)
    e.target.parentElement.remove()
    // pessimistically render right now, change to optimistic after testing it works
  })
}