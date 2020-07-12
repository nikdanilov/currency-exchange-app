import React, { useEffect, useState } from 'react';

import './App.css';
import Header from './Header'
import Footer from './Footer'
import CurrencyInput from './CurrencyInput'

const EXCHANGE_RATES_URL = 'https://api.exchangeratesapi.io/latest'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState(1)
  const [currencyAmount, setCurrencyAmount] = useState(1)
  const [isLinearExchange, setIsLinearExchange] = useState(true)

  let toCurrencyAmount, fromCurrencyAmount
  if (isLinearExchange) {
    fromCurrencyAmount = currencyAmount
    toCurrencyAmount = (currencyAmount * exchangeRate)
    if (toCurrencyAmount % 1 !== 0) toCurrencyAmount = parseFloat(toCurrencyAmount.toFixed(5))

  } else {
    toCurrencyAmount = currencyAmount
    fromCurrencyAmount = (currencyAmount / exchangeRate)
    if (fromCurrencyAmount % 1 !== 0) fromCurrencyAmount = parseFloat(fromCurrencyAmount.toFixed(5))
  }

  useEffect(() => {
    fetch(EXCHANGE_RATES_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      if (fromCurrency === toCurrency) setExchangeRate(1)
      else {
        fetch(`${EXCHANGE_RATES_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
          .then(res => res.json())
          .then(data => setExchangeRate(data.rates[toCurrency]))
      }
    }
  }, [fromCurrency, toCurrency])

  const handleFromAmountChange = (e) => {
    setCurrencyAmount(e.target.value)
    setIsLinearExchange(true)
  }

  const handleToAmountChange = (e) => {
    setCurrencyAmount(e.target.value)
    setIsLinearExchange(false)
  }

  const handleCurrencySwap = (e) => {
    let tempCurrency = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(tempCurrency)
  }

  return (
    <div className="min-h-screen bg-neutral text-sepia-900">
      <Header
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
      />
      <div className="mt-4 mx-auto max-w-md px-6 py-4 bg-white rounded overflow-hidden shadow-lg">
        <form>
          <CurrencyInput
            label="Amount"
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={e => setFromCurrency(e.value)}
            onChangeCurrencyAmount={handleFromAmountChange}
            currencyAmount={fromCurrencyAmount}
          />
          <div className="mt-3 mb-4 flex justify-end">
            <button
              type="button"
              className="hover:bg-blue-100 py-2 px-4"
              onClick={e => handleCurrencySwap()}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px"><path d="M18.19 4.49l-.7.7L20.29 8H7.5v1h12.79l-2.8 2.81.7.7 4.02-4.01-4.02-4.01zM6.51 12.19l-.7-.7-4.02 4.01 4.02 4.01.7-.7L3.71 16H16.5v-1H3.71l2.8-2.81z" fill="#00b9ff"></path></svg>
            </button>
          </div>
          <CurrencyInput
            label="Converted to"
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={e => setToCurrency(e.value)}
            onChangeCurrencyAmount={handleToAmountChange}
            currencyAmount={toCurrencyAmount}
          />
        </form>
        <div className="mt-3 text-center">
          <h3 className="font-semibold text-secondary">1 {fromCurrency} = <span className="text-green-400">{exchangeRate}</span> {toCurrency}</h3>
          <small className="mb-1">Currency rates sourced from <a className="underline" href="https://api.exchangeratesapi.io/latest">api.exchangeratesapi.io</a> </small>
          <button
            className="mt-4 block mx-auto bg-transparent hover:bg-primary text-primary font-semibold hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded"
            onClick={e => alert('Coming soon!')}
          >
            Subscribe for Daily Updates
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
