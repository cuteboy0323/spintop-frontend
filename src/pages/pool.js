import React, { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import SiderBar from "./siderbar"
import $ from "jquery"
import { FormControlLabel, FormGroup, Switch, Box, Tooltip, Typography, Skeleton, Slider } from '@mui/material'

// import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
// import Cwallet from "../components/Cwallet";
import Config from "../config/app"
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';

const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: 'rgb(241, 0, 136)',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: 'rgb(241, 0, 136)',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});

const Pool = () => {
    // eslint-disable-next-line
    const { activate, active, account, deactivate, connector, error, setError, library, chainId } = useWeb3React();
    const [CalUsdValue, setCalUsdValue] = useState(0.00)
    const [CalSpinValue, setCalSpinValue] = useState(0.00)
    const [TotalValue, setTotalValue] = useState(0)
    const [selDate, setselDate] = useState(1)
    const [APR, setAPR] = useState(false)
    const [Token, setToken] = useState(0)
    const [StakingValue, setStakingValue] = useState(0)
    const myNotification = window.createNotification({})
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const finish = () => {
        $('#live').removeClass('active')
        $('#finished').addClass('active')
    }

    const live = () => {
        $('#live').addClass('active')
        $('#finished').removeClass('active')
    }

    const enable = async (id) => {
        if ($(`.contract-btn.one.pools-enable.${id}`).text() == "Stake") {
            setStakingValue(0)
            handleOpen()
        } else {
            $(`.contract-btn.one.pools-enable.${id}`).addClass('loading')
            $(`.contract-btn.one.pools-enable.${id}`).html('<img src="./assets/images/Progress indicator.svg" class="loading rotating"> Enabling')
            // const web3 = new Web3(library.provider);
            // const spinC = new web3.eth.Contract(
            //     Config.Lp.CakeL.abi,
            //     Config.Lp.CakeL.address
            // );
            // const appr = await spinC.methods.approve(account, 0).call();
            setTimeout(() => {
                $(`.contract-btn.one.pools-enable.${id}`).removeClass('loading')
                $(`.contract-btn.one.pools-enable.${id}`).html("Stake")
            }, 1000);
        }
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

    const confirm = () => {
        if (Number(StakingValue) <= 0) {
            myNotification({
                title: 'Fail',
                message: 'Please enter value correctly.',
                showDuration: 3500
            })
            return;
        }
        if (Number(StakingValue) > Number(Token)) {
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
                setOpen(false)
                $('.confirm').removeClass('loading')
                $('.confirm').html('Confirm')
            }, 2500)
        }
    }

    useEffect(() => {
        setAPR("12")
        setToken(3)
        calStake(CalUsdValue)
    }, [selDate])

    return (
        <Box>
            <Box className="main-container">
                <SiderBar Params="pools" />
                <Box className="right-side">
                    <Row>
                        <Col md={12}>
                            <Box className="big-announc pools-main-card">
                                <p>Spintop Pools</p>
                                <p style={{ color: "white" }}>Just stake some tokens to earn.</p>
                                <p>High APR, low risk.</p>
                                <button className="blue-btn">Become a partner</button>
                                <button className="blue-btn active">Need Help?</button>
                                <Box className="right-top-head">
                                    <p className="first">Auto SPIN Bounty <img src="./assets/images/Form.png" alt="" /></p>
                                    <Box className="d-flex align-items-center justify-content-between">
                                        <span>0.00 USD</span>
                                        <button className="blue-btn small">Claim</button>
                                    </Box>
                                    <p className="first">~ 0.13 USD</p>
                                </Box>
                            </Box>
                        </Col>
                    </Row>

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

                    <Box className="cust-card steak-only mobile" style={{ marginTop: "375px" }}>
                        <input type="text" placeholder="Search" />
                        <span className="magnify"></span>
                        <img src="./assets/images/filter.svg" alt="" className="filter" />
                    </Box>

                    <Row className="parent-pool">
                        {
                            Config.pools.map((item, key) => {
                                return (
                                    <Col md={4} key={key}>
                                        <Box className="cust-card contract pools">
                                            <Box className="blue-contain"></Box>
                                            <Box className="d-flex main-two-logos">
                                                <Box className="d-flex flex-column align-items-start">
                                                    <span className="bnb">{item.name}</span>
                                                    <span className="auto-matic">{item.title}</span>
                                                </Box>
                                                <img src={item.icon} alt="" className="two-logos" />
                                            </Box>
                                            <Box className="d-flex content-one first">
                                                <img src="./assets/images/Form.png" alt="" className="me-2 form-p" />
                                                <span>APR</span>
                                                {(() => {
                                                    if (APR != false || typeof (APR) == "string") {
                                                        return (
                                                            <>
                                                                <Typography className="value big" color="primary">
                                                                    <span className="">${APR}</span>
                                                                </Typography>
                                                                &nbsp;<img src="./assets/images/calculator-alt.svg" alt="" data-bs-toggle="modal" data-bs-target="#calmodal" />
                                                            </>
                                                        )
                                                    } else {
                                                        return <Typography><Skeleton animation="wave" className="smallskelton" style={{ minWidth: "100px" }} /></Typography>
                                                    }
                                                })()}
                                            </Box>
                                            <p className="spin-earned active">{item.earntitle}</p>
                                            {
                                                item.profit ?
                                                    <Box className="small-box">
                                                        <img src="./assets/images/Form.png" alt="" className=" form-p" />
                                                        <span className="auto-matic">0.1% ustaking fee if withdrawn within 72h</span>
                                                    </Box>
                                                    :
                                                    <Box className="d-flex">
                                                        <Box className="d-flex harvest-show-hide">
                                                            {(() => {
                                                                if (APR != false || typeof (APR) == "string") {
                                                                    return (
                                                                        <>
                                                                            <Typography className="value big" color="primary">
                                                                                <span className="">$&nbsp;{APR}</span>
                                                                            </Typography>
                                                                            <span className="" style={{ fontSize: "18px" }}>$&nbsp;0.087</span>
                                                                        </>
                                                                    )
                                                                } else {
                                                                    return <Typography><Skeleton animation="wave" className="smallskelton" style={{ minWidth: "100px" }} /></Typography>
                                                                }
                                                            })()}
                                                        </Box>
                                                        <button className="harvest-button" disabled>Harvest</button>
                                                    </Box>
                                            }
                                            <p className={`spin-earned ${item.id}`}>{item.spinearn}</p>
                                            <button className={`contract-btn one pools-enable ${item.id}`} onClick={() => enable(item.id)}>Enable</button>
                                            <p className="line"></p>
                                            <Box className="hide-show-parent">
                                                {
                                                    item.method == "auto" ?
                                                        <>
                                                            <button className="refresh">
                                                                <img src="./assets/images/refresh_white.svg" alt="" />
                                                                &nbsp;Auto
                                                            </button>
                                                            <Tooltip title="Any funds you stake in this pool will be automagically harvested and restaked (compounded) for you.">
                                                                <img src="./assets/images/question-24px.png" className="question-p" alt="" />
                                                            </Tooltip>
                                                        </>
                                                        :
                                                        <>
                                                            <button className="refresh active">
                                                                <img src="./assets/images/manual.svg" alt="" />
                                                                &nbsp;Manual
                                                            </button>
                                                            <Tooltip title="You must harvest and compound your earnings from this pool manually.">
                                                                <img src="./assets/images/question-24px.png" className="question-p" alt="" />
                                                            </Tooltip>
                                                        </>
                                                }
                                                <Box className="hide-show" data-bs-toggle="collapse" href={`#${item.id}`} role="button"
                                                    aria-expanded="false" aria-controls="collapseExample1">
                                                    <span>Hide</span>
                                                    <span>Details</span>
                                                    <img src="./assets/images/dropup.svg" alt="" />
                                                    <img src="./assets/images/drop_hover.svg" alt="" />
                                                </Box>
                                            </Box>
                                            <Box className="collapse hide" id={`${item.id}`}>
                                                <Box className="inner-card">
                                                    <Box className="d-flex justify-content-between align-content-center mb-2">
                                                        <span>Total staked</span>
                                                        {(() => {
                                                            if (APR != false || typeof (APR) == "string") {
                                                                return (
                                                                    <>
                                                                        <Typography className="value big" color="primary">
                                                                            <span className="">$&nbsp;{APR}&nbsp;<img src="./assets/images/Form.png" alt="" className=" form-p" /></span>
                                                                        </Typography>
                                                                    </>
                                                                )
                                                            } else {
                                                                return <Typography><Skeleton animation="wave" className="smallskelton" style={{ minWidth: "100px" }} /></Typography>
                                                            }
                                                        })()}
                                                    </Box>
                                                    <Box className="d-flex justify-content-between align-content-center mt-1">
                                                        <span>Performance fee <img src="./assets/images/Form.png" className=" form-p" alt="" /></span>
                                                        <span>{item.fee}</span>
                                                    </Box>
                                                    <a href={item.tokeninfo} target="_blank" rel="noreferrer">
                                                        <Box className="d-flex cursor-pointer">
                                                            <p className="links first">See Token Info</p>
                                                            <img src="./assets/images/link_open.svg" alt="" className="link-open first" />
                                                        </Box>
                                                    </a>
                                                    <a href={item.viewprojectsite} target="_blank" rel="noreferrer">
                                                        <Box className="d-flex cursor-pointer">
                                                            <p className="links first">View Project Site</p>
                                                            <img src="./assets/images/link_open.svg" alt="" className="link-open first" />
                                                        </Box>
                                                    </a>
                                                    <a href={item.contractlink} target="_blank" rel="noreferrer">
                                                        <Box className="d-flex cursor-pointer">
                                                            <p className="links first">View Contract</p>
                                                            <img src="./assets/images/link_open.svg" alt="" className="link-open first" />
                                                        </Box>
                                                    </a>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Box>

                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box className="stakingmodal" >
                        <Box className="modal-header">
                            <span className="modal-span">Stake in Pool</span>
                            <img src="./assets/images/close-icon.png" alt="" onClick={() => setOpen(false)} />
                        </Box>
                        <Box className="modal_content">
                            <Box className="modal_box">
                                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span className="stake-span">Stake</span>
                                    {/* <Typography>Blanace </Typography> */}
                                    {(() => {
                                        if (Token != false || typeof (Token) == "string") {
                                            return (
                                                <Typography className="value big" color="primary">
                                                    <span className="stake-span">Blanace  &nbsp;${Token}</span>
                                                </Typography>
                                            )
                                        } else {
                                            return <Typography><Skeleton animation="wave" className="smallskelton" style={{ minWidth: "100px" }} /></Typography>
                                        }
                                    })()}
                                </Box>
                                <Box className="modal_box_cal">
                                    <input type="number" style={{ border: "none", background: "#240e48", color: "white", width: "50%" }} value={StakingValue} onChange={(e) => setStakingValue(e.target.value)} />
                                    <button className="max-button" onClick={() => setStakingValue(Token)}>Max</button>
                                    <span style={{ color: "rgba(184, 197, 236, 0.65)" }}>SPINTOP - BNBLP</span>
                                </Box>
                                <Box sx={{ m: 3 }} />
                                <PrettoSlider
                                    valueLabelDisplay="auto"
                                    aria-label="pretto slider"
                                    defaultValue={0}
                                    value={StakingValue}
                                    max={Token}
                                    onChange={(e) => setStakingValue(e.target.value)}
                                />
                            </Box>
                            <Box style={{ marginTop: "30px", display: "flex" }}>
                                <button className="cancel" onClick={() => setOpen(false)}>Cancel</button>
                                <button className="confirm" onClick={() => confirm()}>Confirm</button>
                            </Box>
                            <Box className="links-contain">
                                <p className="links">Swap 10 BUSD for 0.025 BNB</p>
                                <img src="./assets/images/link_open.svg" alt="" className="link-open" />
                            </Box>
                        </Box>
                    </Box>
                </Modal>

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

                <Box className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModal2Label"
                    aria-hidden="true">
                    <Box className="modal-dialog modal-dialog-centered">
                        <Box className="modal-content">
                            <Box className="modal-header">
                                <span>SPINTOP required</span>
                                <img src="./assets/images/close-icon.png" alt="" data-bs-dismiss="modal"
                                    aria-label="Close" />
                            </Box>
                            <Box className="modal-body">
                                <img src="./assets/images/alert-24px.svg" alt="" srcSet="" className="img-fluid" />
                                <Box className="text-center mb-5">
                                    <p className="alert-h">Insuffient SPINTOP balance</p>
                                    <p>You will need SPINTOP to stake in this pool</p>
                                    <p>Buy some SPINTOP, or make sure you SPINTOP is not in another pool or LP
                                    </p>
                                </Box>
                                <Box className="d-flex flex-column">
                                    <button className="contract-btn pools-confirm">Confirm</button>
                                    <button className="dollar">Get SPINTOP</button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box className="modal fade" id="stakemodal" tabIndex="-1" aria-labelledby="stakemodalLabel" aria-hidden="true">
                    <Box className="modal-dialog modal-dialog-centered">
                        <Box className="modal-content">
                            <Box className="modal-header">
                                <span>Stake in Pool</span>
                                <img src="./assets/images/close-icon.png" alt="" data-bs-dismiss="modal" aria-label="Close" />
                            </Box>
                            <Box className="modal-body">
                                <Box className="inner-cust-card">
                                    <Box className="card-heading">
                                        <span>Stake</span>
                                        {(() => {
                                            if (Token != false || typeof (Token) == "string") {
                                                return (
                                                    <Typography className="value big" color="primary">
                                                        <span>Blanace  &nbsp;${Token}</span>
                                                    </Typography>
                                                )
                                            } else {
                                                return <Typography><Skeleton animation="wave" className="smallskelton" style={{ minWidth: "100px" }} /></Typography>
                                            }
                                        })()}
                                    </Box>
                                    <Box className="card-content">
                                        <input type="number" style={{ border: "none", background: "#240e48", color: "white" }} value={StakingValue} onChange={(e) => setStakingValue(e.target.value)} />
                                        <button className="max-button" onClick={() => setStakingValue(Token)}>Max</button>
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
            </Box >
        </Box >

    )
}

export default Pool