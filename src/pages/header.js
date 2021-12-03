import React from 'react'
import $ from 'jquery'
import { Box } from '@mui/material'

const Header = () => {
    const close = () => {
        $('body').removeClass('active')
    }

    const menutoggle = () => {
        $('body').addClass('active')
    }

    return (
        <header>
            <img src="./assets/images/menu.svg" alt="" className="menu-icon" onClick={() => menutoggle()} />
            <Box className="menu-mob">
                <img src="./assets/images/close.svg" alt="" className="close" onClick={() => close()} />
                <Box className="menu-btns">
                    <Box className="menu-btns">
                        <a href="index">
                            <Box className="pages-btn active">
                                <img src="./assets/images/home.svg" alt="" />
                                <img src="./assets/images/home_active.svg" alt="" />
                                <span>Home</span>
                            </Box>
                        </a>
                        <a href="farm">
                            <Box className="pages-btn">
                                <img src="./assets/images/tractor_icon.svg" alt="" />
                                <img src="./assets/images/tractor_icon_active.svg" alt="" />
                                <span>Farms</span>
                            </Box>
                        </a>
                        <a href="pools">
                            <Box className="pages-btn">
                                <img src="./assets/images/pools_icon.svg" alt="" />
                                <img src="./assets/images/pools_icon_active.svg" alt="" />
                                <span>Pools</span>
                            </Box>
                        </a>
                        <Box className="pages-btn comming-soon">
                            <img src="./assets/images/exchange_icon.svg" alt="" />
                            <img src="./assets/images/exchange_icon_active.svg" alt="" />
                            <img src="./assets/images/exchange_icon_coming.svg" alt="" />
                            <span className="tooltip-span">Exchange <span className="tool">comming soon!</span> </span>
                        </Box>
                        <Box className="pages-btn comming-soon">
                            <img src="./assets/images/liquidity_icon.svg" alt="" />
                            <img src="./assets/images/liquidity_icon_active.svg" alt="" />
                            <img src="./assets/images/liquidity_icon_coming.svg" alt="" />
                            <span className="tooltip-span">Liquidity <span className="tool">comming soon!</span> </span>
                        </Box>
                        <Box className="pages-btn comming-soon">
                            <img src="./assets/images/game_tokens_icon.svg" alt="" />
                            <img src="./assets/images/game_tokens_icon _active.svg" alt="" />
                            <img src="./assets/images/game_tokens_icon _coming.svg" alt="" />
                            <span className="tooltip-span">Game Tokens <span className="tool">comming soon!</span> </span>
                        </Box>

                    </Box>
                </Box>
                <Box className="extra-info">
                    <Box className="values">
                        <img src="./assets/images/logo.png" alt="" />
                        <span>$15.33</span>
                    </Box>
                    <Box className="social-media">
                        <img src="./assets/images/gitbook.svg" alt="" />
                        <img src="./assets/images/discord.svg" alt="" />
                        <img src="./assets/images/twitter.svg" alt="" />
                        <img src="./assets/images/telegram.svg" alt="" />
                    </Box>
                    <Box className="audit">
                        <span>Audit in progress</span>
                    </Box>
                    <img src="./assets/images/certik_logo.svg" alt="" className="certik-logo" />
                </Box>
            </Box>
            <img src="./assets/images/logo.png" alt="" className="logo-mob" />
            <Box className="head-title">
                <span>Network</span>
                <span>DEX</span>
                <span>Gamepedia</span>
            </Box>
            <img src="./assets/images/settings_icon.svg" alt="" />
            <button className="connect">Connect</button>
        </header>
    )
}

export default Header