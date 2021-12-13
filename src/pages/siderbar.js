import React, { useState } from 'react'
import $ from 'jquery'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useWeb3React } from "@web3-react/core";
import axios from "axios"

const SiderBar = ({ Params }) => {
    // eslint-disable-next-line
    const { activate, active, account, deactivate, connector, error, setError, library, chainId } = useWeb3React();
    const history = useHistory()
    const [SpinPrice, setSpinPrice] = useState()
    const toggle = () => {
        $('.menu').toggleClass('active')
    }

    const selectSiderBar = (params) => {
        $(".pages-btn").removeClass("active")
        $(`#${params}`).addClass("active")
        history.push(params)
    }

    const load = async () => {
        $(`#${Params}`).addClass("active")
        await axios.get('https://api.coingecko.com/api/v3/coins/spintop').then(res => {
            const CurrentP = res.data.market_data.current_price.usd
            if (CurrentP) {
                setSpinPrice(CurrentP)
            } else {
                setSpinPrice(localStorage.tokenprice)
            }
        }).catch(() => {
            setSpinPrice(localStorage.tokenprice)

        })

    }

    useEffect(() => {
        if (active) {
            load()
        } else {
            setSpinPrice(0)
        }
    }, [active])

    return (
        <div className="left-side">
            <div className="menu" style={{ position: "fixed" }}>
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
                        <span className="tooltip-span">Exchange <span className="tool">Comming</span> </span>
                    </div>
                    <div className="pages-btn comming-soon">
                        <img src="./assets/images/liquidity_icon.svg" alt="" />
                        <img src="./assets/images/liquidity_icon_active.svg" alt="" />
                        <img src="./assets/images/liquidity_icon_coming.svg" alt="" />
                        <span className="tooltip-span">Liquidity <span className="tool">Comming</span> </span>
                    </div>
                    <div className="pages-btn comming-soon">
                        <img src="./assets/images/game_tokens_icon.svg" alt="" />
                        <img src="./assets/images/game_tokens_icon _active.svg" alt="" />
                        <img src="./assets/images/game_tokens_icon _coming.svg" alt="" />
                        <span className="tooltip-span">Game Tokens <span className="tool">Comming</span> </span>
                    </div>

                </div>
            </div>
            <div className="extra-info" style={{ position: "fixed", top: "450px" }}>
                <div className="values">
                    <img src="./assets/images/logo.png" alt="" />
                    <span>$&nbsp;{SpinPrice}</span>
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