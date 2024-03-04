import React from 'react'

const ThemeAndVideoContext = React.createContext({
  isDarkTheme: false,
  savedVideos: [],
  activeTab: 'Home',
  changeTheme: () => {},
  changeTab: () => {},
  addVideo: () => {},
})

export default ThemeAndVideoContext
