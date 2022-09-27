import React from 'react'

const Modal = ({ modalOpen, switchModalOpen, rates, currency, onChangeCurrency }) => {

  return (
    <div
      className={`modal${modalOpen ? " show" : ""}`}
    >
      <div className='svg__container'>
        <svg
          height="30"
          viewBox="0 0 200 200"
          width="30"
          onClick={switchModalOpen}
          cursor="pointer"
        >
          <title />
          <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
        </svg>
      </div>
      <ul
        className='currency-list'>
        {modalOpen && Object.keys(rates).map((rate, index) => {
          const curName = rate;
          return (
            <li className={curName === currency ? 'active' : ''}
              key={index}
              onClick={() => {
                onChangeCurrency(curName);
                switchModalOpen();
              }}
            >{rate}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default Modal