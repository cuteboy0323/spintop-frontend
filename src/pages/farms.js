import React, { useCallback, useEffect, useState } from 'react'
import SiderBar from "./siderbar"
import $ from "jquery"
import { Col, Row } from 'reactstrap'
import { FormControlLabel, FormGroup, Skeleton, Switch, Typography, Tooltip, Box, Grid } from '@mui/material'

import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import Cwallet from "../components/Cwallet";
import ABI from "../config/abi"
import Config from "../config/app"
const Farms = () => {
    // eslint-disable-next-line
    const { activate, active, account, deactivate, connector, error, setError, library, chainId } = useWeb3React();
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [CalUsdValue, setCalUsdValue] = useState(0.00)
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

    const enableContract = async (id) => {
        console.log(id)
        $(`.contract-btn.one.${id}`).addClass('loading')
        $(`.contract-btn.one.${id}`).html('<img src="./assets/images/Progress indicator.svg" class="loading rotating"> Enable Contract')
        const web3 = new Web3(library.provider);
        const spinC = new web3.eth.Contract(
            ABI.Cake,
            Config.Lp.CakeL.address
        );
        const appr = await spinC.methods.approve(account, 0).call();
        if (appr) {
            $(`.contract-btn.one.${id}`).fadeOut()
            $(`.spin-earned.one.${id}`).fadeOut()
            $(`.harvest button.${id}`).hide()
            $(`.harvest button.${id}.active`).html('')
            $(`.harvest button.${id}.active`).html('Stake LP')
            $(`.harvest button.${id}.active`).show()
            $(`.harvest button.${id}.active.stake-lp.act`).hide()
        } else {
            $(`.contract-btn.one.${id}`).fadeOut()
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
                Config.farms.abi,
                Config.farms.address
            );
            const spinL = new web3.eth.Contract(
                Config.Lp.CakeL.abi,
                Config.Lp.CakeL.address
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
        <Box>
            <Box className="main-container">
                <SiderBar Params="farms" />
                <Box className="right-side">
                    <Box className="cust-card steak-only mobile">
                        <input type="text" placeholder="Search" />
                        <span className="magnify"></span>
                        <img src="./assets/images/filter.svg" alt="" className="filter" />
                    </Box>
                    <Row className="mobile-margin">
                        <Col md={12}>
                            <Box className="cust-card steak-only">
                                <FormGroup>
                                    <FormControlLabel
                                        label="Staked only"
                                        control={
                                            <Switch color="secondary" defaultChecked />
                                        }
                                    />
                                </FormGroup>
                                <Box className="live-buttons">
                                    <Box className="btns-lf active" id="live" onClick={() => live()}>
                                        <span>Live</span>
                                    </Box>
                                    <Box className="btns-lf" id="finished" onClick={() => finish()}>
                                        <span>Finished</span>
                                    </Box>
                                </Box>
                                <input type="text" placeholder="Search" />
                                <span className="magnify"></span>
                            </Box>
                        </Col>
                    </Row>

                    <Grid container spacing={3}>
                        {
                            Config.Contracts.map((item, key) => {
                                return (
                                    <Grid item xs={4} key={key}>
                                        <Box className="cust-card contract">
                                            <Box className="blue-contain"></Box>
                                            <Box className="d-flex main-two-logos">
                                                <img src={item.icon} alt="" className="two-logos" />
                                                <Box className="d-flex flex-column align-items-end">
                                                    <span className="bnb">{item.name}</span>
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
                                                </Box>
                                            </Box>
                                            <Box className="d-flex content-one first">
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
                                            </Box>
                                            <Box className="d-flex content-one">
                                                <span>Earn</span>
                                                <span>SpinTop</span>
                                            </Box>
                                            <p className="spin-earned">Spin Earned</p>
                                            <Box className="d-flex harvest">
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
                                                <button className={item.id} onClick={() => harvest(item.id)} disabled>Harvest</button>
                                                <button className={`${item.id} active stake-lp`} data-bs-toggle="modal" data-bs-target="#exampleModal">Stake LP</button>
                                                <button className={`${item.id} active stake-lp act`} onClick={() => harvested(item.id)}>Harvested</button>
                                            </Box>
                                            <p className={`spin-earned one ${item.id}`}>SPIN-BNB LP STAKED</p>
                                            {
                                                active ? <button className={`contract-btn one ${item.id}`} onClick={() => enableContract(item.id)}>Enable Contract</button>
                                                    :
                                                    <button className={`contract-btn one ${item.id}`} onClick={() => onConnectWallet(item.id)}>Connect Wallet</button>
                                            }
                                            <Box className="last-show-hide">
                                                <p className="spin-earned harvest-show-hide">SPIN-BNB LP STAKED</p>
                                                <Box className="d-flex">
                                                    <Box className="d-flex harvest-show-hide">
                                                        <span>{StakingValue}</span>
                                                        <span>~26.91 USD</span>
                                                    </Box>
                                                    <Box className="d-flex">
                                                        <img className="plus-minus-icon" src="./assets/images/minus.svg" alt="" />
                                                        <img className="plus-minus-icon" src="./assets/images/plus.svg" alt="" />
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <p className="line"></p>
                                            <Box className="hide-show" data-bs-toggle="collapse" href={`#col${item.id}`} style={{ paddingBottom: "15px" }} role="button" aria-expanded="false" aria-controls="collapseExample1">
                                                <span>Hide</span>
                                                <span>Details</span>
                                                <img src="./assets/images/dropup.svg" alt="" />
                                                <img src="./assets/images/drop_hover.svg" alt="" />
                                            </Box>
                                            <Box className="collapse hide" id={`col${item.id}`}>
                                                <Box className="inner-card">
                                                    <Box className="d-flex justify-content-between align-content-center">
                                                        <span>Total liquidity</span>
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
                                                    </Box>
                                                    <a href={item.getlink} target="_blank" rel="noreferrer">
                                                        <Box className="d-flex cursor-pointer">
                                                            <p className="links first">Get SPINTOP-BNB LP</p>
                                                            <img src={item.linkimg} alt="" className="link-open first" />
                                                        </Box>
                                                    </a>
                                                    <a href={item.contractlink} target="_blank" rel="noreferrer">
                                                        <Box className="d-flex cursor-pointer">
                                                            <p className="links first">View Contract</p>
                                                            <img src={item.linkimg} alt="" className="link-open first" />
                                                        </Box>
                                                    </a>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>

                    <Cwallet isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
                    <Box className="modal fade" id="calmodal" tabIndex="-1" aria-labelledby="calmodalLabel" aria-hidden="true">
                        <Box className="modal-dialog modal-dialog-centered">
                            <Box className="modal-content">
                                <Box className="modal-header">
                                    <span>ROI Calculator</span>
                                    <img src="./assets/images/close-icon.png" alt="" data-bs-dismiss="modal" aria-label="Close" />
                                </Box>
                                <Box className="modal-body">
                                    <p className="spin-earned">SPINTOP STAKED</p>
                                    <Box className="inner-cust-card active">
                                        <Box className="card-two-head">
                                            <span style={{ display: "inline-block" }}><input type="number" style={{ border: "none", background: "#240e48", color: "white" }} value={CalUsdValue} onChange={(e) => calStake(e.target.value)} /> USD</span>
                                            <span style={{ marginTop: "10px" }}>{CalSpinValue} SPINTOP</span>
                                        </Box>
                                        <Box className="card-content">
                                            <img src="./assets/images/sort-alt.svg" alt="" />
                                        </Box>
                                    </Box>

                                    <Box className="d-flex dollar-btns">
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
                                    </Box>
                                    <p className="spin-earned mt-4">STAKED FOR</p>
                                    <Box className="year-contain">
                                        <button className="datebutton active" id="1" onClick={() => selectD("1")}>1D</button>
                                        <button className="datebutton" id="7" onClick={() => selectD("7")}>7D</button>
                                        <button className="datebutton" id="30" onClick={() => selectD("30")}>30D</button>
                                        <button className="datebutton" id="365" onClick={() => selectD("365")}>1Y</button>
                                        <button className="datebutton" id="1825" onClick={() => selectD("1825")}>5Y</button>
                                    </Box>
                                    <Box className="down-arrow">
                                        <img src="./assets/images/down2.svg" alt="" />
                                    </Box>
                                    <Box className="inner-cust-card active">
                                        <Box className="card-two-head">
                                            <p>ROI AT CURRENT RATES</p>
                                            <span>{TotalValue}</span>
                                            <span>~ 0 SPINTOP (0.00%)</span>
                                        </Box>
                                        <Box className="card-content">
                                            <img src="./assets/images/pen.svg" alt="" />
                                        </Box>
                                    </Box>

                                    <p className="line"></p>
                                    <Box className="hide-show-parent">
                                        <Box className="hide-show" data-bs-toggle="collapse" href="#collapseExample1"
                                            role="button" aria-expanded="false" aria-controls="collapseExample1">
                                            <span>Hide</span>
                                            <span>Details</span>
                                            <img src="./assets/images/dropup.svg" alt="" />
                                            <img src="./assets/images/drop_hover.svg" alt="" />
                                        </Box>
                                    </Box>
                                    <Box className="collapse show" id="collapseExample1">
                                        <Box className="inner-card">
                                            <Box className="d-flex justify-content-between align-content-center mb-2">
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
                                            </Box>
                                            <Box className="d-flex justify-content-between align-content-center mt-1">
                                                <span>APY (5000x daily compound)</span>
                                                <span>93.85%</span>
                                            </Box>
                                            <ul>
                                                <ul>
                                                    <li>Calculated based on current rates.</li>
                                                    <li>All figures are estimates provided for your convenience only, and by no means represent guaranteed returns.</li>
                                                    <li>All estimated rates take into account this pool’s 2% performance fee</li>
                                                </ul>
                                            </ul>
                                            <a href="https://pancakeswap.finance/add/BNB/0xF9d52aeA6097c2064964F8A59EDD4F3AAA7CE895" target="_blank" rel="noreferrer">
                                                <Box className="links-contain">
                                                    <p className="links">Get SPINTOP</p>
                                                    <img src="./assets/images/link_open.svg" alt="" className="link-open" />
                                                </Box>
                                            </a>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <Box className="modal-dialog modal-dialog-centered">
                            <Box className="modal-content">
                                <Box className="modal-header">
                                    <span>Stake LP token</span>
                                    <img src="./assets/images/close-icon.png" alt="" data-bs-dismiss="modal" aria-label="Close" />
                                </Box>
                                <Box className="modal-body">
                                    <Box className="inner-cust-card">
                                        <Box className="card-heading">
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
                                        </Box>
                                        <Box className="card-content">
                                            <input type="number" style={{ border: "none", background: "#240e48", color: "white" }} value={StakingValue} onChange={(e) => setStakingValue(e.target.value)} />
                                            <button className="max-button" onClick={() => setStakingValue(LpToken)}>Max</button>
                                            <span style={{ color: "rgba(184, 197, 236, 0.65)" }}>SPINTOP - BNB LP</span>
                                        </Box>
                                    </Box>
                                    {/* <img src="./assets/images/alert-octagon-16px.svg" alt="" /> */}
                                    {/* <span className="alert-span">No token to stake. Get BUSD-BNB LP</span> */}
                                    <Box className="btn-contain">
                                        <button className="cancel" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                        <button className="confirm" onClick={() => confirm()}>Confirm</button>
                                    </Box>
                                    <Box className="links-contain">
                                        <p className="links">Swap 10 BUSD for 0.025 BNB</p>
                                        <img src="./assets/images/link_open.svg" alt="" className="link-open" />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="modal fade" id="exampleModal22" tabIndex="-1" aria-labelledby="exampleModal22Label" aria-hidden="true">
                        <Box className="modal-dialog modal-dialog-centered">
                            <Box className="modal-content">
                                <Box className="modal-header">
                                    <span>Unstake LP token</span>
                                    <img src="./assets/images/close-icon.png" alt="" data-bs-dismiss="modal" aria-label="Close" />
                                </Box>
                                <Box className="modal-body">
                                    <Box className="inner-cust-card">
                                        <Box className="card-heading">
                                            <span>Stake</span>
                                            <span>Blanace 0.598</span>
                                        </Box>
                                        <Box className="card-content">
                                            <span>0.5241654651</span>
                                            <span>MAX</span>
                                            <span>BUSD -BNB LP</span>
                                        </Box>
                                    </Box>
                                    <img src="./assets/images/alert-octagon-16px.svg" alt="" />
                                    <span className="alert-span">No token to stake. Get BUSD-BNB LP</span>
                                    <Box className="btn-contain">
                                        <button className="cancel">Cancel</button>
                                        <button className="confirm">Confirm</button>
                                    </Box>
                                    <Box className="links-contain">
                                        <p className="links">Swap 10 BUSD for 0.025 BNB</p>
                                        <img src="./assets/images/link_open.svg" alt="" className="link-open" />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Farms