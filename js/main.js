const cepField = document.querySelector('#cep')
const cepErrorField = document.querySelector('#cepError')
const streetField = document.querySelector('#street')
const numberField = document.querySelector('#number')
const neighborhoodField = document.querySelector('#neighborhood')
const cityField = document.querySelector('#city')
const stateField = document.querySelector('#state')
const loadingField = document.querySelector('img#loading')
const formField = document.querySelector('form')

cepField.addEventListener('focus', () => {
  cleanCepError()
})

cepField.addEventListener('blur', () => {
  let cep = cepField.value

  if (/\d{5}-?\d{3}/.test(cep)) {
    loadCepInfo(cep)
  } else {
    showCepError()
  }
})

function loadCepInfo(cep) {
  loadingField.classList.toggle('hidden')
  formField.classList.toggle('loading')
  let url = `https://viacep.com.br/ws/${cep}/json/`
  fetch(url)
    .then(res => res.json())
    .then(cepInfo => {
      if(cepInfo.erro) {
        cleanAddressFields()
      } else {
        formField.classList.toggle('loading')
        loadingField.classList.toggle('hidden')
        
        // Animar preenchimento dos campos com delay
        animateFieldFill(streetField, cepInfo.logradouro, 100)
        animateFieldFill(neighborhoodField, cepInfo.bairro, 200)
        animateFieldFill(cityField, cepInfo.localidade, 300)
        animateFieldFill(stateField, cepInfo.uf, 400)
  
        setTimeout(() => {
          numberField.focus()
        }, 500)
        cleanCepError()
      }
    })
    .catch(error => {
      showCepError()
    })
}

function cleanCepError() {
  cepField.classList.remove('input-cep-error')
  cepErrorField.classList.add('hidden')
}

function showCepError() {
  cepField.classList.add('input-cep-error')
  cepErrorField.classList.remove('hidden')
  cleanAddressFields()
}

function cleanAddressFields() {
  streetField.value = ''
  neighborField.value = ''
  neighborhoodField.value = ''
  cityField.value = ''
  stateField.value = ''
  

  removeAnimationClasses()
}


function animateFieldFill(field, value, delay) {
  setTimeout(() => {
    field.value = value
    field.classList.add('auto-fill-animation', 'highlight-fill')
    
   
    setTimeout(() => {
      field.classList.remove('highlight-fill')
    }, 300)
    
    setTimeout(() => {
      field.classList.remove('auto-fill-animation')
    }, 500)
  }, delay)
}


function removeAnimationClasses() {
  const fields = [streetField, neighborhoodField, cityField, stateField]
  fields.forEach(field => {
    field.classList.remove('auto-fill-animation', 'highlight-fill')
  })
}