async function start(period = "weekly") {
  document.getElementById('container').insertAdjacentHTML('afterbegin', `<span class="loader" id="loading"></span>`)
  const errorMessage = document.getElementById('errorMessage')

  try {
    const response = await fetch('data.json');
    const data = await response.json();
   
    createCardContainer(data,period, "Last Week")

    changePeriod("daily", data, "Yesterday")
    changePeriod("weekly", data, "Last Week")
    changePeriod("monthly", data, "Last Month")

  }
  catch(e) {
    errorMessage.style.display = 'block'
    setTimeout(() => errorMessage.style.display = 'none', 5000)
    console.error("Error loading card list", e)
  }

  document.getElementById('container').removeChild(document.getElementById("loading"))
}

window.addEventListener("DOMContentLoaded", () => {
  start()
})


function changePeriod(period, data, lastPeriod) {
  document.getElementById(period).addEventListener("click", () =>{
    const navItems = document.querySelectorAll('.nav__item')
    const cards = document.querySelectorAll('.card')
    cards.forEach((card,index) => {
      card.querySelector('.card__time'). innerHTML = `${data[index].timeframes[period].current}hrs`
      card.querySelector('.card__last_week'). innerHTML = `${lastPeriod} - ${data[index].timeframes[period].previous}hrs`
    })

    navItems.forEach(item => {
      item.classList.remove('active')
    })

    document.getElementById(period).classList.add('active')
  })
}


function createCardContainer(cardList, period, lastPeriod) { 
  document.getElementById('container').innerHTML += `
  <div class="main">
    <div class="person">
      <img class="person__image" src="images/image-jeremy.png" alt="Jeremy">
      <div class="person__text">
        <p class="person__subtext">Report for</p>
        <h1  class="person__name">Jeremy Robson</h1>
      </div>
    </div>
    <div class="nav">
      <a class="nav__item" id="daily">Daily</a>
      <a class="nav__item active" id="weekly">Weekly</a>
      <a class="nav__item" id="monthly">Monthly</a>
    </div>
  </div>

  ${cardList.map(card =>`
  <div class="card_container card_container--${(card.title).split(" ").join("").toLowerCase()}">
  <div class="card_image--${(card.title).split(" ").join("").toLowerCase()}">
  
  </div>
  <div class="card card--${(card.title).split(" ").join("").toLowerCase()}">
    <div class="card__header">
      <h3 class="card__title">${card.title}</h3>
      <div>
        <img class="card__ellipsis" src="images/icon-ellipsis.svg" alt="ellipsis">
      </div>
    </div>
    <div class="card__info">
      <p class="card__time" id="currentTime">${card.timeframes[period].current}hrs</p>
      <p class="card__last_week">${lastPeriod} - ${card.timeframes[period].previous}hrs</p>
    </div>
  </div>
  </div>`
  ).join('')}

    `
}


// < img src="/images/icon-${(card.title).split(" ").join("").toLowerCase()}.svg" alt="${(card.title)}">