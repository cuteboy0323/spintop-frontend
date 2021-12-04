import React, { useEffect, useState } from 'react'
import { Box, Tooltip, Typography, Skeleton } from '@mui/material'
import $ from "jquery"

const Calculator = ({ APR }) => {
    const [CalSpinValue, setCalSpinValue] = useState(0.00)
    const [TotalValue, setTotalValue] = useState(0)
    const [CalUsdValue, setCalUsdValue] = useState(0.00)
    const [selDate, setselDate] = useState(1)
    const [flag, setflag] = useState(true)
    const selectD = (id) => {
        $('.datebutton').removeClass('active')
        $(`#${id}`).addClass('active')
        setselDate(id)
    }
    const calStake = (val) => {
        if (flag) {
            setCalUsdValue(val)
            setCalSpinValue(val * 100)
            setTotalValue(val * 10 * selDate)
        } else {
            setCalUsdValue(val / 100)
            setCalSpinValue(val)
            setTotalValue(val / 100 * selDate)
        }
    }

    const switchUnit = () => {
        // setflag()
        if (flag) {
            setflag(false)
        } else {
            setflag(true)
        }
    }

    useEffect(() => {
        calStake(CalUsdValue)
    }, [selDate])

    return (
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
                                <span style={{ display: "inline-block" }}><input type="number" style={{ border: "none", background: "#240e48", color: "white" }} value={flag ? CalUsdValue : CalSpinValue} onChange={(e) => calStake(e.target.value)} />
                                    {flag ? "USD" : "SPIN"}
                                </span>
                                <span style={{ marginTop: "10px" }}>{flag ? `${CalSpinValue} SPIN` : `${CalUsdValue} USD`}</span>
                            </Box>
                            <Box className="card-content">
                                <img src="./assets/images/sort-alt.svg" alt="" onClick={() => switchUnit()} />
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

    )
}

export default Calculator