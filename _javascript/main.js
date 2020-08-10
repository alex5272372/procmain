document.addEventListener('DOMContentLoaded', () => {
  switch (document.location.pathname) {
  case '/':
    document.getElementById('menu__dashboard').className = 'is-active'
    break

  case '/users':
    document.getElementById('menu__users').className = 'is-active'
    break
    
  case '/roles':
    document.getElementById('menu__roles').className = 'is-active'
    break
    
  case '/groups':
    document.getElementById('menu__groups').className = 'is-active'
    break
  
  case '/settings':
    document.getElementById('menu__settings').className = 'is-active'
    break

  case '/organizations':
    document.getElementById('menu__organizations').className = 'is-active'
    break

  case '/customers':
    document.getElementById('menu__customers').className = 'is-active'
    break

  case '/products':
    document.getElementById('menu__products').className = 'is-active'
    break

  case '/invoices':
    document.getElementById('menu__invoices').className = 'is-active'
    break

  case '/orders':
    document.getElementById('menu__orders').className = 'is-active'
    break
  
  case '/balance':
    document.getElementById('menu__balance').className = 'is-active'
    break
  }
})

// eslint-disable-next-line no-unused-vars
function menuClick() {
  Array.prototype.forEach.call(document.getElementsByClassName('is-active'), e => e.className = '')
}

// eslint-disable-next-line no-unused-vars
function tableClick(el) {
  Array.prototype.forEach.call(document.getElementsByClassName('is-selected'), e => e.className = '')
  el.className = 'is-selected'
}
