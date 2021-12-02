import React, { useCallback, useEffect, useState } from 'react'
import SiderBar from "./siderbar"
import $ from "jquery"
import { Col, Row } from 'reactstrap'
import { FormControlLabel, FormGroup, Skeleton, Switch, Typography, Tooltip } from '@mui/material'

import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import Cwallet from "../components/Cwallet";
import ABI from "../config/abi"
import Token from "../config/app"
const Farms = () => {
    // eslint-disable-next-line
    const { activate, active, account, deactivate, connector, error, setError, library, chainId } = useWeb3React();
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [CalUsdValue, setCalUsdValue] = useState(0.00)
    // eslint-disable-next-line
    const [CalSpinValue, setCalSpinValue] = useState(0.00)
    const [Multiplier, setMultiplier] = useState(false)
    const [APR, setAPR] = useState(false)
    const [Liquidity, setLiquidity] = useState(false)
    const [Earned, setEarned] = useState(false)
    const [LpToken, setLpToken] = useState(false)
    const [StakingValue, setStakingValue] = useState(0)
    const TotalTokens = 3250000
    const myNotification = window.createNotification({})
    const [TotalValue, setTotalValue] = useState(0)
    const [selDate, setselDate] = useState(1)
    const onConnectWallet = async () => {
        setIsOpenDialog(true);
    }
    const fromWei = useCallback((web3, val) => {
        if (val) {
            val = val.toString();
            return web3.utils.fromWei(val);
        } else {
            return "0"
        }
    }, []);

    const finish = () => {
        $('#live').removeClass('active')
        $('#finished').addClass('active')
    }

    const live = () => {
        $('#live').addClass('active')
        $('#finished').removeClass('active')
    }

    const harvest = () => {
        $('.harvest button.one').addClass('loading')
        $('.harvest button.one').html('<img src="./assets/images/Progress indicator.svg" class="loading rotating"> Harvesting')
        setTimeout(function () {
            $('.harvest button.one').removeClass('loading')
            $('.harvest button.one').html('Harvested')
        }, 2500)
    }

    const enableContract = async () => {
        $('.contract-btn').addClass('loading')
        $('.contract-btn').html('<img src="./assets/images/Progress indicator.svg" class="loading rotating"> Enable Contract')
        const web3 = new Web3(library.provider);
        const spinC = new web3.eth.Contract(
            ABI.Cake,
            Token.Lp.CakeL.address
        );
        const appr = await spinC.methods.approve(account, 0).call();
        console.log(appr)
        if (appr) {
            $('.contract-btn.one').fadeOut()
            $('.spin-earned.one').fadeOut()
            $('.harvest button.one').hide()
            $('.harvest button.one.active').html('')
            $('.harvest button.one.active').html('Stake LP')
            $('.harvest button.one.active').show()
            $('.harvest button.one.active.stake-lp.act').hide()
        } else {
            $('.contract-btn.one').fadeOut()
        }
    }

    const confirm = () => {
        if (Number(StakingValue) <= 0) {
            myNotification({
                title: 'Fail',
                message: 'Please enter value correctly.',
                showDuration: 3500
            })
            return;
        }
        if (Number(StakingValue) > Number(LpToken)) {
            myNotification({
                title: 'Fail',
                message: 'Your SpinTop-BNB token is not enough.',
                showDuration: 3500
            })
            return;
        } else {
            $('.confirm').addClass('loading')
            $('.confirm').html('<img src="./assets/images/Progress indicator.svg" class="loading rotating"> Confirming')
            setTimeout(function () {
                $('#exampleModal').hide()
                $('.one.active').html('Harvest')
                $('.last-show-hide').show()
                $('.modal-backdrop').hide()
                $('.harvest button.one.active').hide()
                $('.harvest button.one.stake-lp.act').show()
            }, 2500)
        }
    }
    const harvested = () => {
        $(".act").addClass('loading')
        $(".act").html('<img src="./assets/images/Progress indicator.svg" class="loading rotating"> Harvesting')
        setTimeout(function () {
            $('.act').removeClass('loading')
            $('.act').html('Harvest')
            myNotification({
                title: 'Harvested',
                message: 'Your SPINTOP earning is sent to your wallet!',
                showDuration: 3500
            })
        }, 2500)
    }

    const calStake = (val) => {
        setCalUsdValue(val)
        setCalSpinValue(val * 100)
        setTotalValue(val * 10 * selDate)
    }

    const selectD = (id) => {
        $('.datebutton').removeClass('active')
        $(`#${id}`).addClass('active')
        setselDate(id)
    }


    useEffect(() => {
        calStake(CalUsdValue)
    }, [selDate])

    const load = async () => {
        try {
            const web3 = new Web3(library.provider);
            const spinF = new web3.eth.Contract(
                Token.farms.abi,
                Token.farms.address
            );
            const spinL = new web3.eth.Contract(
                Token.Lp.CakeL.abi,
                Token.Lp.CakeL.address
            );
            const lptokenB = await spinL.methods.balanceOf(account).call()
            const earnValue = await spinF.methods.earned(account).call()
            const liquidity = await spinF.methods.totalStaked().call()
            setEarned(earnValue)
            setAPR(Math.floor(TotalTokens / liquidity))
            setMultiplier("40X")
            setLiquidity(liquidity)
            setLpToken(fromWei(web3, lptokenB))
        } catch (err) {
            console.log(err)
        }
    }

    const clear = () => {
        setEarned(false)
        setAPR(false)
        setLiquidity(false)
        setLpToken(false)
        setMultiplier(false)
    }

    useEffect(() => {
        if (active) {
            load()
        } else {
            clear()
        }
    }, [active])

    return (
        <div>
            <div className="main-container">
                <SiderBar Params="farms" />
                <div className="right-side">
                    <div className="cust-card steak-only mobile">
                        <input type="text" placeholder="Search" />
                        <span className="magnify"></span>
                        <img src="./assets/images/filter.svg" alt="" className="filter" />
                    </div>
                    <Row className="mobile-margin">
                        <Col md={12}>
                            <div className="cust-card steak-only">
                                <FormGroup>
                                    <FormControlLabel
                                        label="Staked only"
                                        control={
                                            <Switch color="secondary" defaultChecked />
                                        }
                                    />
                                </FormGroup>
                                <div className="live-buttons">
                                    <div className="btns-lf active" id="live" onClick={() => live()}>
                                        <span>Live</span>
                                    </div>
                                    <div className="btns-lf" id="finished" onClick={() => finish()}>
                                        <span>Finished</span>
                                    </div>
                                </div>
                                <input type="text" placeholder="Search" />
                                <span className="magnify"></span>
                            </div>
                        </Col>
                    </Row>

                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                            <div className="cust-card contract">
                                <div className="blue-contain"></div>
                                <div className="d-flex main-two-logos">
                                    <img src="./assets/images/two-logos.svg" alt="" className="two-logos" />
                                    <div className="d-flex flex-column align-items-end">
                                        <span className="bnb">Spintop-BNB</span>
                                        {(() => {
                                            if (Multiplier != false || typeof (Multiplier) == "string") {
                                                return (
                                                    <Typography className="value big" color="primary">
                                                        <span className="x-40">{Multiplier}</span>
                                                    </Typography>
                                                )
                                            } else {
                                                return <Typography><Skeleton animation="wave" className="smallskelton" style={{ minWidth: "100px" }} /></Typography>
                                            }
                                        })()}
                                        {/* <span className="x-40">40X</span> */}
                                    </div>
                                </div>
                                <div className="d-flex content-one first">
                                    <span>APR</span>
                                    {(() => {
                                        if (APR != false || typeof (APR) == "string") {
                                            return (
                                                <>
                                                    <Typography className="value big" color="primary">
                                                        <span className="col-whtie">{APR}&nbsp;%&nbsp;</span>
                                                    </Typography>
                                                    <img src="./assets/images/calculator-alt.svg" alt="" data-bs-toggle="modal" data-bs-target="#calmodal" />
                                                </>
                                            )
                                        } else {
                                            return <Typography><Skeleton animation="wave" className="smallskelton" style={{ minWidth: "100px" }} /></Typography>
                                        }
                                    })()}
                                    {/* <span>54.85%</span> */}
                                </div>
                                <div className="d-flex content-one">
                                    <span>Earn</span>
                                    <span>SpinTop</span>
                                </div>
                                <p className="spin-earned">Spin Earned</p>
                                <div className="d-flex harvest">
                                    {/* <span>0.0</span> */}
                                    {(() => {
                                        if (Earned != false || typeof (Earned) == "string") {
                                            return (
                                                <Typography className="value big" color="primary">
                                                    <span>$&nbsp;{Earned}</span>
                                                </Typography>
                                            )
                                        } else {
                                            return <Typography><Skeleton animation="wave" className="smallskelton" style={{ minWidth: "100px" }} /></Typography>
                                        }
                                    })()}
                                    <button className="one" onClick={() => harvest()} disabled>Harvest</button>
                                    <button className="one active stake-lp" data-bs-toggle="modal" data-bs-target="#exampleModal">Stake LP</button>
                                    <button className="one active stake-lp act" onClick={() => harvested()}>Harvested</button>
                                </div>
                                <p className="spin-earned one">SPIN-BNB LP STAKED</p>
                                {
                                    active ? <button className="contract-btn one" onClick={() => enableContract()}>Enable Contract</button>
                                        :
                                        <button className="contract-btn one" onClick={() => onConnectWallet()}>Connect Wallet</button>
                                }
                                <div className="last-show-hide">
                                    <p className="spin-earned harvest-show-hide">SPIN-BNB LP STAKED</p>
                                    <div className="d-flex">
                                        <div className="d-flex harvest-show-hide">
                                            <span>{StakingValue}</span>
                                            <span>~26.91 USD</span>
                                        </div>
                                        <div className="d-flex">
                                            <img className="plus-minus-icon" src="./assets/images/minus.svg" alt="" />
                                            <img className="plus-minus-icon" src="./assets/images/plus.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <p className="line"></p>
                                <div className="hide-show" data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample1">
                                    <span>Hide</span>
                                    <span style={{ marginBottom: "15px" }}>Details</span>
                                    <img src="./assets/images/dropup.svg" alt="" />
                                    <img src="./assets/images/drop_hover.svg" alt="" />
                                </div>
                                <div className="collapse show" id="collapseExample1">
                                    <div className="inner-card">
                                        <div className="d-flex justify-content-between align-content-center">
                                            <span>Total liquidity</span>
                                            {/* <span>$793,761,779</span> */}
                                            {(() => {
                                                if (Liquidity != false || typeof (Liquidity) == "string") {
                                                    return (
                                                        <Typography className="value big" color="primary">
                                                            <span>$&nbsp;{Liquidity}</span>
                                                        </Typography>
                                                    )
                                                } else {
                                                    return <Typography><Skeleton animation="wave" className="smallskelton" style={{ minWidth: "100px" }} /></Typography>
                                                }
                                            })()}
                                        </div>
                                        <a href="https://pancakeswap.finance/add/BNB/0xF9d52aeA6097c2064964F8A59EDD4F3AAA7CE895" target="_blank" rel="noreferrer">
                                            <div className="d-flex cursor-pointer">
                                                <p className="links first">Get SPINTOP-BNB LP</p>
                                                <img src="./assets/images/link_open.svg" alt="" className="link-open first" />
                                            </div>
                                        </a>
                                        <a href="https://testnet.bscscan.com/address/0x68ad4067b8c9e98C8c63bE5B34c84c1627EE1164#writeContract" target="_blank" rel="noreferrer">
                                            <div className="d-flex cursor-pointer">
                                                <p className="links first">View Contract</p>
                                                <img src="./assets/images/link_open.svg" alt="" className="link-open first" />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Cwallet isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
                        <div className="modal fade" id="calmodal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <span>ROI Calculator</span>
                                        <img src="./assets/images/close-icon.png" alt="" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body">
                                        <p className="spin-earned">SPINTOP STAKED</p>
                                        <div className="inner-cust-card active">
                                            <div className="card-two-head">
                                                <span style={{ display: "inline-block" }}><input type="number" style={{ border: "none", background: "#240e48", color: "white" }} value={CalUsdValue} onChange={(e) => calStake(e.target.value)} /> USD</span>
                                                <span style={{ marginTop: "10px" }}>{CalSpinValue} SPINTOP</span>
                                            </div>
                                            <div className="card-content">
                                                <img src="./assets/images/sort-alt.svg" alt="" />
                                            </div>
                                        </div>

                                        <div className="d-flex dollar-btns">
                                            <button className="dollar" onClick={() => calStake(100)}>
                                                $100
                                            </button>
                                            <button className="dollar" onClick={() => calStake(1000)}>
                                                $1000
                                            </button>
                                            <button className="dollar" disabled>
                                                My Balance
                                            </button>
                                            <Tooltip title="“My Balance” here includes both LP Tokens in your wallet, and LP Tokens already staked in this farm.">
                                                <img src="./assets/images/question-24px.png" className="question-p" alt="" />
                                            </Tooltip>
                                        </div>
                                        <p className="spin-earned mt-4">STAKED FOR</p>
                                        <div className="year-contain">
                                            <button className="datebutton active" id="1" onClick={() => selectD("1")}>1D</button>
                                            <button className="datebutton" id="7" onClick={() => selectD("7")}>7D</button>
                                            <button className="datebutton" id="30" onClick={() => selectD("30")}>30D</button>
                                            <button className="datebutton" id="365" onClick={() => selectD("365")}>1Y</button>
                                            <button className="datebutton" id="1825" onClick={() => selectD("1825")}>5Y</button>
                                        </div>
                                        <div className="down-arrow">
                                            <img src="./assets/images/down2.svg" alt="" />
                                        </div>
                                        <div className="inner-cust-card active">
                                            <div className="card-two-head">
                                                <p>ROI AT CURRENT RATES</p>
                                                <span>{TotalValue}</span>
                                                <span>~ 0 SPINTOP (0.00%)</span>
                                            </div>
                                            <div className="card-content">
                                                <img src="./assets/images/pen.svg" alt="" />
                                            </div>
                                        </div>

                                        <p className="line"></p>
                                        <div className="hide-show-parent">
                                            <div className="hide-show" data-bs-toggle="collapse" href="#collapseExample1"
                                                role="button" aria-expanded="false" aria-controls="collapseExample1">
                                                <span>Hide</span>
                                                <span>Details</span>
                                                <img src="./assets/images/dropup.svg" alt="" />
                                                <img src="./assets/images/drop_hover.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="collapse show" id="collapseExample1">
                                            <div className="inner-card">
                                                <div className="d-flex justify-content-between align-content-center mb-2">
                                                    <span>APR</span>
                                                    {(() => {
                                                        if (APR != false || typeof (APR) == "string") {
                                                            return (
                                                                <>
                                                                    <Typography className="value big" color="primary">
                                                                        <span className="col-whtie">{APR}&nbsp;%&nbsp;</span>
                                                                    </Typography>
                                                                </>
                                                            )
                                                        } else {
                                                            return <Typography><Skeleton animation="wave" className="smallskelton" style={{ minWidth: "100px" }} /></Typography>
                                                        }
                                                    })()}
                                                </div>
                                                <div className="d-flex justify-content-between align-content-center mt-1">
                                                    <span>APY (5000x daily compound)</span>
                                                    <span>93.85%</span>
                                                </div>
                                                <ul>
                                                    <ul>
                                                        <li>Calculated based on current rates.</li>
                                                        <li>All figures are estimates provided for your convenience only, and by no means represent guaranteed returns.</li>
                                                        <li>All estimated rates take into account this pool’s 2% performance fee</li>
                                                    </ul>
                                                </ul>
                                                <a href="https://pancakeswap.finance/add/BNB/0xF9d52aeA6097c2064964F8A59EDD4F3AAA7CE895" target="_blank" rel="noreferrer">
                                                    <div className="links-contain">
                                                        <p className="links">Get SPINTOP</p>
                                                        <img src="./assets/images/link_open.svg" alt="" className="link-open" />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="exampleModal" style={{ zIndex: "2" }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <span>Stake LP token</span>
                                        <img src="./assets/images/close-icon.png" alt="" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body">
                                        <div className="inner-cust-card">
                                            <div className="card-heading">
                                                <span>Stake</span>
                                                {(() => {
                                                    if (LpToken != false || typeof (LpToken) == "string") {
                                                        return (
                                                            <Typography className="value big" color="primary">
                                                                <span>Blanace  &nbsp;${LpToken}</span>
                                                            </Typography>
                                                        )
                                                    } else {
                                                        return <Typography><Skeleton animation="wave" className="smallskelton" style={{ minWidth: "100px" }} /></Typography>
                                                    }
                                                })()}
                                            </div>
                                            <div className="card-content">
                                                <input type="number" style={{ border: "none", background: "#240e48", color: "white" }} value={StakingValue} onChange={(e) => setStakingValue(e.target.value)} />
                                                <button className="max-button" onClick={() => setStakingValue(LpToken)}>Max</button>
                                                <span style={{ color: "rgba(184, 197, 236, 0.65)" }}>SPINTOP - BNB LP</span>
                                            </div>
                                        </div>
                                        {/* <img src="./assets/images/alert-octagon-16px.svg" alt="" /> */}
                                        {/* <span className="alert-span">No token to stake. Get BUSD-BNB LP</span> */}
                                        <div className="btn-contain">
                                            <button className="cancel" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                            <button className="confirm" onClick={() => confirm()}>Confirm</button>
                                        </div>
                                        <div className="links-contain">
                                            <p className="links">Swap 10 BUSD for 0.025 BNB</p>
                                            <img src="./assets/images/link_open.svg" alt="" className="link-open" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="exampleModal22" tabIndex="-1" aria-labelledby="exampleModal22Label" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <span>Unstake LP token</span>
                                        <img src="./assets/images/close-icon.png" alt="" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body">
                                        <div className="inner-cust-card">
                                            <div className="card-heading">
                                                <span>Stake</span>
                                                <span>Blanace 0.598</span>
                                            </div>
                                            <div className="card-content">
                                                <span>0.5241654651</span>
                                                <span>MAX</span>
                                                <span>BUSD -BNB LP</span>
                                            </div>
                                        </div>
                                        <img src="./assets/images/alert-octagon-16px.svg" alt="" />
                                        <span className="alert-span">No token to stake. Get BUSD-BNB LP</span>
                                        <div className="btn-contain">
                                            <button className="cancel">Cancel</button>
                                            <button className="confirm">Confirm</button>
                                        </div>
                                        <div className="links-contain">
                                            <p className="links">Swap 10 BUSD for 0.025 BNB</p>
                                            <img src="./assets/images/link_open.svg" alt="" className="link-open" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Farms