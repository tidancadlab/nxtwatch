import React from "react"

const Store = React.createContext({
    theme: true,
    likedVideoList: [],
    dislikedVideoList: [],
    savedVideoList: [],
    isBannerShow: true,
    showSidebar: false,
    onChangeTheme: () => { },
    onLike: () => { },
    onDislike: () => { },
    onSave: () => { },
    onBannerClose: () => { },
    onShowSidebar: () => { },
})
export default Store