import React from 'react'

const AppContext = React.createContext({
    entries: [],
    entry: '',
    handleAddEntry: () => {},
    removeEntry: () => {},
})

export default AppContext