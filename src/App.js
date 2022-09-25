import { findAllByAltText } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

  const [fromCurrency, setFromCurrency] = useState('RUB')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(0)
  
  const [rates, setRates] = useState({})

  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
    .then((res) => res.json())
      .then((res) => { setRates(res.rates)})
  }, [])

  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

  const onChangeFromCurrency = (cur) => {
    setFromCurrency(cur)
  }

  const onChangeToCurrency = (cur) => {
    setToCurrency(cur)
  }

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setFromPrice(value)
    setToPrice(result.toFixed(3))
  }

  const onChangeToPrice = (value) => {
    const price = value / rates[toCurrency];
    const result = price * rates[fromCurrency];
    setToPrice(value)
    setFromPrice(result.toFixed(3))
  }
  return (
    <div className="App">
      <Block value={+fromPrice} currency={fromCurrency} onChangeCurrency={onChangeFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={+toPrice} currency={toCurrency} onChangeCurrency={onChangeToCurrency} onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;
