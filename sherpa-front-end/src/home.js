function displayHomePage(){
  const mainContainer = document.querySelector('main')
  mainContainer.innerHTML = `
  <div class="nav">
    <div class="hiddenNav"></div>
    <h1>Sherpa</h1>
    <div class="dropdown">
        <button class="dropbtn">Login | Signup</button>
        <div class="dropdown-content">
        <div>
            <span>Users </span>
            <button id="userLogin">Log in</button>
            <button id="userSignup">Sign up</button>
        </div>
        <div>
            <span>Coaches </span>
            <button id="coachLogin">Log in</button>
            <button id="coachSignup">Sign up</button>
        </div>
        </div>
    </div>
  </div>
  `

  renderModal('user', 'Login')
  renderModal('user', 'Signup')
  renderModal('coach', 'Login')
  renderModal('coach', 'Signup')

  displaySearchBar()

  modalLogic('user', 'Login')
  modalLogic('user', 'Signup')
  modalLogic('coach', 'Login')
  modalLogic('coach', 'Signup')
// refactor to have event delegation on the maincontainer (with conditionals)
// so render maincontainer, addEventListeners with conditional, render Modals
// alterntively replace .innerHTML += with appendElement for renderModal function
  displayLogin('user', 'Login')
  displayLogin('coach', 'Login')
  displaySignup('user', 'Signup')
  displaySignup('coach', 'Signup')
}

function renderModal(model, Use){
  const mainContainer = document.querySelector('main')
  mainContainer.innerHTML += `
  <div id="${model}${Use}Modal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <span id="${model}${Use}Close" class="close">&times;</span>
          <h2>Hi ${model}, ${Use}</h2>
        </div>
        <div id="${model}${Use}Form" class="modal-body">
          <p>Some text in the Modal Body</p>
          <p>Some other text...</p>
        </div>
        <div class="modal-footer">
          <h3>Modal Footer</h3>
        </div>
      </div>
    </div>
  `
}

function modalLogic(model, Use){
  let modal = document.getElementById(`${model}${Use}Modal`)
  let btn = document.getElementById(`${model}${Use}`)
  let span = document.getElementById(`${model}${Use}Close`)
  // change to addEventListeners
  btn.onclick = function() {
    modal.style.display = "block"
  }
  span.onclick = function() {
    modal.style.display = "none"
  }
  window.onclick = function(e) {
    if (e.target == modal){
      modal.style.display = "none"
    }
  }
}

function displaySignup(model, Use) {
  const signupContainer = document.getElementById(`${model}${Use}Form`)
  signupContainer.innerHTML = `
  <form>
    <div>Username: <input type="text" name="username"/></div>
    <div>Password: <input type="password" name="password"/></div>
    <div>Password Confirmation: <input type="password" name="password_confirmation"/></div>
    <div>Email: <input type="email" name="email"/></div>
    <div>Name: <input type="text" name="name"/></div>
    <div>Submit <input type="submit"/></div>
  </form>`

  const signupForm = signupContainer.querySelector('form')
  signupForm.addEventListener('submit', function(e) {
      e.preventDefault()
      const username = e.target.username.value
      const password = e.target.password.value
      const password_confirmation = e.target.password_confirmation.value
      const email = e.target.email.value
      const name = e.target.name.value
      fetch(`${BASE_URL}/${pluralize(model)}`, {
          method: "POST",
          headers: {
              "Content-Type": 'application/json'
          },
          body: JSON.stringify({
              username,
              password,
              password_confirmation,
              email,
              name
          })
      })
      .then(res => res.json())
      .then(data => {
      if (model == "user") {
        localStorage.setItem("user_id", data.id)
        displayUserPage(data)
      }
      if (model == "coach") {
        localStorage.setItem("coach_id", data.id)
        displayCoachPage(data)
      }
    })
  })
}

function displayLogin(model, Use) {
  const loginContainer = document.getElementById(`${model}${Use}Form`)
  loginContainer.innerHTML = `
  <form>
    <div>Username: <input type="text" name="username"/></div>
    <div>Password: <input type="password" name="password"/></div>
    <div><input type="submit"/></div>
  </form>`

  const loginForm = loginContainer.querySelector('form')
  loginForm.addEventListener('submit', function(e){
    e.preventDefault()

    const username = e.target.username.value
    const password = e.target.password.value
    fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(res => res.json())
    .then(data => {
      if (model == "user") {
        localStorage.setItem("user_id", data.id)
        displayUserPage(data)
      }
      if (model == "coach") {
        localStorage.setItem("coach_id", data.id)
        displayCoachPage(data)
      }
    })
  })
}