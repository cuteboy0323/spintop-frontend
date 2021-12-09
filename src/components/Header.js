import React, { useState } from 'react'
import $ from 'jquery'
import Cwallet from "./Cwallet";
import { Button } from "@mui/material"
import { useWeb3React } from "@web3-react/core";

const Header = () => {
    const close = () => {
        $('body').removeClass('active')
    }

    const menutoggle = () => {
        $('body').addClass('active')
    }

    const [isOpenDialog, setIsOpenDialog] = useState(false);
    // eslint-disable-next-line
    const { activate, active, account, deactivate, connector, error, setError } = useWeb3React();

    const onConnectWallet = async () => {
        setIsOpenDialog(true);
    }

    return (
        <header>
            <img src="./assets/images/menu.svg" alt="" className="menu-icon" onClick={() => menutoggle()} />
            <div className="menu-mob">
                <img src="./assets/images/close.svg" alt="" className="close" onClick={() => close()} />
                <div className="menu-btns">
                    <div className="menu-btns">
                        <a href="home">
                            <div className="pages-btn active">
                                <img src="./assets/images/home.svg" alt="" />
                                <img src="./assets/images/home_active.svg" alt="" />
                                <span>Home</span>
                            </div>
                        </a>
                        <a href="farms">
                            <div className="pages-btn">
                                <img src="./assets/images/tractor_icon.svg" alt="" />
                                <img src="./assets/images/tractor_icon_active.svg" alt="" />
                                <span>Farms</span>
                            </div>
                        </a>
                        <a href="pools">
                            <div className="pages-btn">
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
                <div className="extra-info">
                    <div className="values">
                        <img src="./assets/images/logo.png" alt="" />
                        <span>$15.33</span>
                    </div>
                    <div className="social-media">
                        <img src="./assets/images/gitbook.svg" alt="" />
                        <img src="./assets/images/discord.svg" alt="" />
                        <img src="./assets/images/twitter.svg" alt="" />
                        <img src="./assets/images/telegram.svg" alt="" />
                    </div>
                    <div className="audit">
                        <span>Audit in progress</span>
                    </div>
                    <img src="./assets/images/certik_logo.svg" alt="" className="certik-logo" />
                </div>
            </div>

            <img src="./assets/images/logo.png" alt="" className="logo-mob" />
            <div className="head-title">
                <span>Network</span>
                <span>DEX</span>
                <span>Gamepedia</span>
            </div>
            {
                active ?
                    <Button
                        variant="contained"
                        startIcon={
                            <img width={22} src="./assets/images/meta-mask.svg" alt="connected" />
                        }
                        onClick={onConnectWallet}
                        style={{ background: "#f10088" }}
                        color="secondary"
                    >
                        {account.substring(0, 3)} ... {account.substring(account.length - 3)}
                    </Button>
                    :
                    <Button
                        variant="contained"
                        endIcon={
                            <img width={22} src="./assets/images/exit_icon.svg" alt="connect" />
                        }
                        onClick={onConnectWallet}
                        style={{ background: "#f10088" }}
                        color="secondary"
                    >
                        Connect
                    </Button>
            }
            <Cwallet isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
        </header>
    )
}

export default Header