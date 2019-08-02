function displaySearchBar(){
  const mainContainer = document.querySelector('main')
  mainContainer.innerHTML += `
  <div class="searchBar">
    <h3>Find Your Sherpa!</h3>
    <form class="search">
        <label for="search">Search: </label>
        <input name="search" type="text">
        <button id="filter" type="submit"><img src="../src/assets/search.png" alt="Magnifying Glass"></button>
    </form>
  </div>
  `
  mainContainer.innerHTML += `<div id="coach-list"></div>`
  mainContainer.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault()
    let coachList = document.getElementById("coach-list")
    coachList.innerHTML = ""
    let query = e.target.children[1].value
    let sort = "name"
    let limit = "10"
    let page = "0"
    fetch(`${BASE_URL}/coaches/?query=${query}&sort=${sort}&limit=${limit}&page=${page}`)
    .then(res => res.json())
    .then(coaches => {
      if(coaches !== null && coaches.length > 0){
        coaches.forEach((coach) => {
          coachList.innerHTML += `
          <div>
            <p>${coach.name}
            <button>Book Appointment</button></p>
          </div>`
        })
      } else {
        coachList.innerHTML += `<h3>No results. Search again!</h3>`
      }
    })
  })
  // figure out how to rerender the entire page and maintain this information with CoachIndex
}

function displayCoachIndex(){
  displaySearchBar()
  const mainContainer = document.querySelector('main')
  mainContainer.innerHTML += `<div id="coach-list"></div>`
  mainContainer.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault()
    let coachList = document.getElementById("coach-list")
    coachList.innerHTML = ""
    let query = e.target.children[1].value
    let sort = "name"
    let limit = "10"
    let page = "0"
    fetch(`${BASE_URL}/coaches/?query=${query}&sort=${sort}&limit=${limit}&page=${page}`)
    .then(res => res.json())
    .then(coaches => {
      if(coaches !== null && coaches.length > 0){
        coaches.forEach((coach) => {
          const div = document.createElement("div")
          div.innerHTML = `${coach.name} `
          const button = document.createElement("button")
          button.dataset.coachId = coach.id
          button.classList.add("addAppointment")
          button.innerText = "Add Appointment"
          button.addEventListener('click', e => {addAppointment(e)})
          div.append(button)
          coachList.append(div)
        })
      } else {
        coachList.innerHTML += `<h3>No results. Search again!</h3>`
      }
    })
  })
}