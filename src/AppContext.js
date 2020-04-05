import React from 'react'

const AppContext = React.createContext({
    entries: [],
    entry: '',
    handleAddEntry: () => {},
    removeEntry: () => {},
    watched: [],
})

export default AppContext