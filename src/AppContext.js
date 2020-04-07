import React from 'react'

const AppContext = React.createContext({
    entries: [],
    entry: '',
    handleAddEntry: () => {},
    removeEntry: () => {},
    watched: [],
    getItems: () => {},
    editItem: () => {},
    addScore: () => {},
    score: 0,
    userBadges: [],
})

export default AppContext