import React from "react"

const Store = React.createContext({
    theme: true,
    likedVideoList: [],
    dislikedVideoList: [],
    savedVideoList: [],
    isBannerShow: true,
    onChangeTheme: () => { },
    onLike: () => { },
    onDislike: () => { },
    onSave: () => { },
    onBannerClose: () => { },
})
export default Store