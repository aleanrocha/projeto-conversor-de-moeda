const convertBtn = document.querySelector('#convertBtn')
const convertForm = document.querySelector('#convertForm')
const convertValue = document.querySelector('#convertValue')
const selectCurrency = document.querySelector('#selectCurrency')
const convertedCurrencyValue = document.querySelector('#convertedCurrencyValue')

const apiKey = `https://v6.exchangerate-api.com/v6/f33825a13fd2ed8583d0ee28/latest/BRL`

let isTrue = false

const getExChangeHate = async () => {
  try {
    const response = await fetch(apiKey)
    const data = await response.json()
    if (data.result === 'success') {
      return data.conversion_rates
    } else {
      return false
    }
  } catch (error) {
    console.log(`Erro na conexão a API ${error}`)
  }
}

const convertCurrency = async (e) => {
  e.preventDefault()
  const inputCurrencyValue = document.querySelector('#inputCurrencyValue').value
  if (inputCurrencyValue === '' && !isTrue) {
    alert('Digite um valor para fazer a conversão!')
    return
  } else if (inputCurrencyValue === '' && isTrue) {
    isTrue = false
    return
  }

  const currency = await getExChangeHate()

  convertValue.textContent = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(inputCurrencyValue)

  switch (selectCurrency.value) {
    case 'dollar':
      convertedCurrencyValue.textContent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(inputCurrencyValue * currency.USD || 4.9)
      break
    case 'euro':
      convertedCurrencyValue.textContent = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(inputCurrencyValue * currency.EUR || 5.37)
      break
    case 'libra':
      convertedCurrencyValue.textContent = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(inputCurrencyValue * currency.GBP || 6.18)
      break
    default:
      console.log('Moeda desconhecida')
  }
}

const changeCurrency = (e) => {
  if ( document.querySelector('#inputCurrencyValue').value === '') {
    convertValue.textContent = '0'
    convertedCurrencyValue.textContent = '0'
  }
  const currencyName = document.querySelector('#currencyName')
  const currencyImg = document.querySelector('#currencyImg')

  switch (e.target.value) {
    case 'dollar':
      currencyName.textContent = 'Dólar'
      currencyImg.src = './img/usa-flag.png'
      break
    case 'euro':
      currencyName.textContent = 'Euro'
      currencyImg.src = './img/euro.png'
      break
    case 'libra':
      currencyName.textContent = 'Libra'
      currencyImg.src = './img/libra.png'
      break
    default:
      console.log('Moeda desconhecida')
  }
  isTrue = true
  convertCurrency(e)
}

selectCurrency.addEventListener('change', changeCurrency)
convertBtn.addEventListener('click', convertCurrency)
convertForm.addEventListener('submit', convertCurrency)
