import React from 'react'
import Select, { createFilter } from 'react-select'

export default function CurrencyInput(props) {
    const { label, currencyOptions, selectedCurrency, onChangeCurrency, currencyAmount, onChangeCurrencyAmount } = props

    const divStyle = {
        backgroundImage: 'url(https://www.countryflags.io/be/flat/64.png)'
    }

    const filterFn = createFilter({
        ignoreCase: true,
        ignoreAccents: true,
        trim: true,
        matchFrom: 'start'
    })

    const options = currencyOptions.map(option => {
        return { value: option, label: option }
    })

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
                        <Select
                            className="mt-7 appearance-none w-full block bg-white hover:border-gray-500 focus:outline-none focus:shadow-outline"
                            value={{ label: selectedCurrency, value: selectedCurrency }}
                            filterOption={filterFn}
                            options={options}
                            onChange={onChangeCurrency}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
