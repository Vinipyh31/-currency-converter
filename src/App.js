import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

  const [fromCurrency, setFromCurrency] = useState('RUB')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [rates, setRates] = useState({})

  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((res) => res.json())
      .then((res) => { setRates(res.rates) })
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
    setToPrice(result.toFixed(2))
  }

  const onChangeToPrice = (value) => {
    const price = value / rates[toCurrency];
    const result = price * rates[fromCurrency];
    setToPrice(value)
    setFromPrice(result.toFixed(2))
  }

  const switchModalOpen = () => {
    setModalOpen(!modalOpen);
  }

  return (
    <div>
      <div className="App">
        <Block
          value={+fromPrice}
          currency={fromCurrency}
          onChangeCurrency={onChangeFromCurrency}
          onChangeValue={onChangeFromPrice}
          switchModalOpen={switchModalOpen}
        />
        <Block
          value={+toPrice}
          currency={toCurrency}
          onChangeCurrency={onChangeToCurrency}
          onChangeValue={onChangeToPrice}
          switchModalOpen={switchModalOpen}
        />

      </div>
      <div
        className={`modal${modalOpen ? " show" : ""}`}
      >
        <svg
          height="30"
          viewBox="0 0 200 200"
          width="30"
          onClick={switchModalOpen}
          cursor="pointer"
          style={{
            textAlign: "right",
          }}
        >
          <title />
          <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
        </svg>
        <ul
          className='currency-list'>
          {modalOpen && Object.keys(rates).map((rate, index) => {
            const curName = rate;
            return (
              <li
                onClick={() => {
                  onChangeFromCurrency(curName);
                  switchModalOpen();
                }}
              >{rate}</li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
