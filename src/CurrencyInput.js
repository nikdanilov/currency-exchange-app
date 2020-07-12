import React from 'react'
import Select, { createFilter, components } from 'react-select'

import countryData from './countryData'

const swapJson = (json) => {
    var result = {}
    for (var key in countryData) {
        result[countryData[key]] = key
    }
    return result
}

export default function CurrencyInput(props) {
    const { label, currencyOptions, selectedCurrency, onChangeCurrency, currencyAmount, onChangeCurrencyAmount } = props

    const filterFn = createFilter({
        ignoreCase: true,
        ignoreAccents: true,
        trim: true,
        matchFrom: 'start'
    })

    const { Option } = components
    const IconOption = props => (
        <Option {...props}>
            <img
            src={props.data.icon}
            style={{ width: 30, height:30 }}
            alt={props.data.label}
            />
            {props.data.label}
        </Option>
    )

    const styleFn = {
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#00b9ff' : '#fff',
        }),

        valueContainer: (base) => ({
            ...base,
            paddingBottom: '0.6rem'
        })
    }

    const currencyCountryMap = swapJson(countryData)
    const options = currencyOptions.map(option => {
        return { value: option, label: option, icon:`https://www.countryflags.io/${currencyCountryMap[option]}/flat/64.png`}
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
                            className="mt-7 appearance-none w-full block bg-white hover:border-gray-500 focus:outline-none"
                            value={{ label: selectedCurrency, value: selectedCurrency }}
                            filterOption={filterFn}
                            options={options}
                            components={{ Option: IconOption }}
                            styles={styleFn}
                            onChange={onChangeCurrency}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
