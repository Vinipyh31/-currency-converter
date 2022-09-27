import React, { useEffect, useState } from 'react';
import { Block } from './components/Block';
import Modal from './components/Modal';
import './index.scss';

const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];

function App() {

  const [fromCurrency, setFromCurrency] = useState('RUB')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [rates, setRates] = useState({})
  const [modalType, setModalType] = useState()

  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((res) => res.json())
      .then((res) => { setRates(res.rates) });

    const keyDownHandler = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setModalOpen(false)
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };

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
          defaultCurrencies={defaultCurrencies}
          setModalType={() => { setModalType("from") }}
        />
        <Block
          value={+toPrice}
          currency={toCurrency}
          onChangeCurrency={onChangeToCurrency}
          onChangeValue={onChangeToPrice}
          switchModalOpen={switchModalOpen}
          defaultCurrencies={defaultCurrencies}
          setModalType={() => { setModalType("to") }}
        />

      </div>
      <Modal
        modalOpen={modalOpen}
        switchModalOpen={switchModalOpen}
        rates={rates}
        currency={modalType === "from" ? fromCurrency : toCurrency}
        onChangeCurrency={modalType === "from" ? onChangeFromCurrency : onChangeToCurrency}
      />
    </div>
  );
}

export default App;
