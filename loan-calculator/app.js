// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  document.getElementById('results').style.display = 'none'
  document.getElementById('loading').style.display = 'block'

  setTimeout(calculateResults, 1000)

  e.preventDefault()
})

// Calculate Results
function calculateResults() {
  const amountEl = document.getElementById('amount')
  const interestEl = document.getElementById('interest')
  const yearsEl = document.getElementById('years')
  const monthlyPaymentEl = document.getElementById('monthly-payment')
  const totalPaymentEl = document.getElementById('total-payment')
  const totalInterestEl = document.getElementById('total-interest')

  const principal = parseFloat(amountEl.value)
  const calculatedInterest = parseFloat(interestEl.value) / 100 / 12
  const calculatedPayments = parseFloat(yearsEl.value) * 12

  // Monthly Payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments)
  const monthly = (principal * x * calculatedInterest) / (x - 1)

  if (isFinite(monthly)) {
    monthlyPaymentEl.value = monthly.toFixed(2) // Limit to two decimals
    totalPaymentEl.value = (monthly * calculatedPayments).toFixed(2)
    totalInterestEl.value = (monthly * calculatedPayments - principal).toFixed(
      2
    )
    document.getElementById('results').style.display = 'block'
    document.getElementById('loading').style.display = 'none'
  } else {
    showError('Please check your numbers')
  }
}

// Show Error
function showError(error) {
  document.getElementById('results').style.display = 'none'
  document.getElementById('loading').style.display = 'none'

  const errorDiv = document.createElement('div')
  const cardEl = document.querySelector('.card')
  const headingEl = document.querySelector('.heading')

  errorDiv.className = 'alert alert-danger'
  errorDiv.appendChild(document.createTextNode(error))

  cardEl.insertBefore(errorDiv, headingEl)

  setTimeout(clearError, 3000)
}

// Clear Error
function clearError() {
  document.querySelector('.alert').remove()
}
