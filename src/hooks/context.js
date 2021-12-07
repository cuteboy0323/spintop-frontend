import React, { useState, createContext } from 'react'

const ValueContext = createContext({
    value: {},
    setValue: () => { }
})

const ValueProvider = ({ children }) => {
    /*eslint-disable */
    const setValue = (data) => {
        toggleLoading(prevState => {
            return {
                value: {...data}
            }
        })
    }

    const loadingState = {
        value: {},
        setValue
    }
    const [loading, toggleLoading] = useState(loadingState)
    /*eslint-enable */

    return (
        <ValueContext.Provider value={loading}>
            {children}
        </ValueContext.Provider>
    )
}

export { ValueContext, ValueProvider }