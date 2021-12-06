import React from 'react'
import $ from 'jquery'
import { useEffect } from 'react'
import { useHistory } from 'react-router'

const SiderBar = ({Params}) => {
    const history = useHistory()

    const toggle = () => {
        $('.menu').toggleClass('active')
    }

    const selectSiderBar = (params) => {
        $(".pages-btn").removeClass("active")
        $(`#${params}`).addClass("active")
        history.push(params)
    }

    const load = () => {
        $(`#${Params}`).addClass("active")
    }
    
    useEffect(() => {
        load()
    }, [])
    return (
        <div className="left-side">
            <div className="menu">
                <div className="left-closing-arrow" onClick={() => toggle()}></div>
                <div className="menu-btns">
                    <a onClick={() => selectSiderBar("home")}>
                        <div className="pages-btn" id="home">
                            <img src="./assets/images/home.svg" alt="" />
                            <img src="./assets/images/home_active.svg" alt="" />
                            <span>Home</span>
                        </div>
                    </a>
                    <a onClick={() => selectSiderBar("farms")}>
                        <div className="pages-btn" id="farms">
                            <img src="./assets/images/tractor_icon.svg" alt="" />
                            <img src="./assets/images/tractor_icon_active.svg" alt="" />
                            <span>Farms</span>
                        </div>
                    </a>
                    <a onClick={() => selectSiderBar("pools")}>
                        <div className="pages-btn" id="pools">
                            <img src="./assets/images/pools_icon.svg" alt="" />
                            <img src="./assets/images/pools_icon_active.svg" alt="" />
                            <span>Pools</span>
                        </div>
                    </a>
                    <div className="pages-btn comming-soon">
                        <img src="./assets/images/exchange_icon.svg" alt="" />
                        <img src="./assets/images/exchange_icon_active.svg" alt="" />
                        <img src="./assets/images/exchange_icon_coming.svg" alt="" />
                        <span className="tooltip-span">Exchange <span className="tool">comming soon!</span> </span>
                    </div>
                    <div className="pages-btn comming-soon">
                        <img src="./assets/images/liquidity_icon.svg" alt="" />
                        <img src="./assets/images/liquidity_icon_active.svg" alt="" />
                        <img src="./assets/images/liquidity_icon_coming.svg" alt="" />
                        <span className="tooltip-span">Liquidity <span className="tool">comming soon!</span> </span>
                    </div>
                    <div className="pages-btn comming-soon">
                        <img src="./assets/images/game_tokens_icon.svg" alt="" />
                        <img src="./assets/images/game_tokens_icon _active.svg" alt="" />
                        <img src="./assets/images/game_tokens_icon _coming.svg" alt="" />
                        <span className="tooltip-span">Game Tokens <span className="tool">comming soon!</span> </span>
                    </div>

                </div>
            </div>
            <div className="extra-info">
                <div className="values">
                    <img src="./assets/images/logo.png" alt="" />
                    <span>$15.33</span>
                </div>
                <div className="social-media">
                    <img src="./assets/images/gitbook.svg" alt="" />
                    <img src="./assets/images/discord.svg" alt="" />
                    <a href="https://twitter.com/SpintopNetwork"><img src="./assets/images/twitter.svg" alt="" /></a>
                    <img src="./assets/images/telegram.svg" alt="" />
                </div>
                <div className="audit">
                    <span>Audit in progress</span>
                </div>
                <img src="./assets/images/certik_logo.svg" alt="/" className="certik-logo" />
            </div>
        </div>
    )
}

export default SiderBar