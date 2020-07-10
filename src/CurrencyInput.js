import React from 'react'
import Select from 'react-select'

export default function CurrencyInput(props) {
    const { label, currencyOptions, selectedCurrency, onChangeCurrency, currencyAmount, onChangeCurrencyAmount } = props
    
    const divStyle = {
        backgroundImage: 'url(https://www.countryflags.io/be/flat/64.png)'
    }
    
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    return (
        <>
            <div className="flex">
                <div className="w-3/4">
                    <div className="form-group mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{label}</label>
                        <input
                            type="number"
                            className="mr-8 appearance-none block border border-gray-400 focus:border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none"
                            value={currencyAmount}
                            onChange={onChangeCurrencyAmount}
                        />
                    </div>
                </div>
                <div className="w-1/4">
                    <div className="relative w-24">
                        <Select options={options} />
                        {/* <select
                            className="mt-7 appearance-none w-full block bg-white border border-gray-400 hover:border-gray-500 rounded px-4 py-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedCurrency}
                            onChange={onChangeCurrency}>
                            {currencyOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
