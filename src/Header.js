import React from "react"

const Header = (props) => {
    const { fromCurrency, toCurrency } = props
    return (
        <header className="bg-secondary text-white">
            <div className="flex flex-col md:flex-row items-center justify-between pb-2">
                <div className="flex-1 uppercase text-2xl ml-6 tracking-wider text-center md:text-left">
                    <a href="/">
                        Currency Exchange: {fromCurrency} to {toCurrency}
                    </a>
                </div>
                <div className="mt-6 md:mt-0">
                    {/* <nav className="text-sm text-sepia-900">
                        <a className="mr-6" href="#">Register</a>
                        <a className="mr-6" href="#">Sign in</a>
                    </nav> */}
                </div>
            </div>
        </header>
    )
}

export default Header