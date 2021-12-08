//import material and react
import React, { useCallback, useEffect, useState } from 'react'
import { FormControlLabel, FormGroup, Skeleton, Switch, Typography, Box, Slider, Modal } from '@mui/material'
import { Col, Row } from 'reactstrap'
import SiderBar from "./siderbar"
import { styled } from '@mui/material/styles';
//web3 and jquery
import $ from "jquery"
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
//import class
import Config from "../config/app"
import Calculator from "./Calculator"
import Cwallet from "../components/Cwallet";

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

const Farms = () => {
    // eslint-disable-next-line
    const { activate, active, account, deactivate, connector, error, setError, library, chainId } = useWeb3React();
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [Multiplier, setMultiplier] = useState(0)
    const [APR, setAPR] = useState(0)
    const [Liquidity, setLiquidity] = useState(0)
    const [Earned, setEarned] = useState(0)
    const [LpToken, setLpToken] = useState(0)
    const [StakingValue, setStakingValue] = useState(0)
    const myNotification = window.createNotification({})
    const [open, setOpen] = useState(false);
    const [SelId, setSelId] = useState()
    const TotalTokens = 3250000

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
        $(`.contract-btn.one.${id}`).addClass('loading')
        $(`.contract-btn.one.${id}`).html('<img src="./assets/images/Progress indicator.svg" class="loading rotating"> Enable Contract')
        const web3 = new Web3(library.provider);
        const spinC = new web3.eth.Contract(
            Config.Lp.CakeL.abi,
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
                setOpen(false)
                setStakingValue(0)
                // $('#exampleModal').hide()
                $('.one.active').html('Harvest')
                $(`.last-show-hide.${SelId}`).show()
                $('.modal-backdrop').hide()
                $('.harvest button.one.active').hide()
                $('.harvest button.one.stake-lp.act').show()
                $('.confirm').removeClass('loading')
                $('.confirm').html('Confirm')
                $(`.${SelId}.active.stake-lp`).hide()
                $(`#${SelId}`).show()
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

    const stakeLp = (id) => {
        setOpen(true)
        setSelId(id)
    }

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
        setEarned(-1)
        setAPR(-1)
        setLiquidity(-1)
        setLpToken(-1)
        setMultiplier(-1)
    }

    useEffect(() => {
        let interval = null;
        if (active) {
            load();
            interval = setInterval(async () => {
                load();
                console.clear();
            }, Config.updateTime);
        } else {
            clear();
            return () => clearInterval(interval);
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

                    <Box className="row">
                        {
                            Config.Contracts.map((item, key) => {
                                return (
                                    <Box item className="col-sm-6 col-md-6 col-lg-4 col-xl-4" key={key}>
                                        <Box className="cust-card contract">
                                            <Box className="blue-contain"><img className="animation-spin" src="https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-MbaC5cDQY6glrXLXj4B%2Favatar-1633197511393.png?generation=1633197512121772&alt=media" alt="SPIN" /></Box>
                                            <Box className="d-flex main-two-logos">
                                                <img src={item.icon} alt="" className="two-logos" />
                                                <Box className="d-flex flex-column align-items-end">
                                                    <span className="bnb">{item.name}</span>
                                                    {(() => {
                                                        if (Multiplier != -1) {
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
                                                    if (APR != -1) {
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
                                                <span>{item.earn}</span>
                                            </Box>
                                            <p className="spin-earned">Spin Earned</p>
                                            <Box className="d-flex harvest">
                                                {(() => {
                                                    if (Earned != -1) {
                                                        return (
                                                            <Typography className="value big" color="primary">
                                                                <span>$&nbsp;{Earned}</span>
                                                            </Typography>
                                                        )
                                                    } else {
                                                        return <Typography><Skeleton animation="wave" className="smallskelton" style={{ minWidth: "100px" }} /></Typography>
                                                    }
                                                })()}
                                                <button className={item.id} id={item.id} onClick={() => harvest(item.id)} disabled>Harvest</button>
                                                <button className={`${item.id} active stake-lp`} onClick={() => stakeLp(item.id)}>Stake LP</button>
                                                <button className={`${item.id} active stake-lp act`} onClick={() => harvested(item.id)}>Harvested</button>
                                            </Box>
                                            <p className={`spin-earned one ${item.id}`}>SPIN-BNB LP STAKED</p>
                                            {
                                                active ? <button className={`contract-btn one ${item.id}`} onClick={() => enableContract(item.id)}>Enable Contract</button>
                                                    :
                                                    <button className={`contract-btn one ${item.id}`} onClick={() => onConnectWallet(item.id)}>Connect Wallet</button>
                                            }
                                            <Box className={`last-show-hide ${item.id}`}>
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
                                                            if (Liquidity != -1) {
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
                                    </Box>
                                )
                            })
                        }
                    </Box>

                    <Modal
                        keepMounted
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box className="stakingmodal" >
                            <Box className="modal-header">
                                <span className="modal-span">Stake in Pool</span>
                                <img src="./assets/images/close-icon.png" alt="" onClick={() => setOpen(false)} />
                            </Box>
                            <Box className="modal_content">
                                <Box className="stakebox-header">
                                    <span className="stake-span" style={{ fontSize: "20px" }}>Stake</span>
                                    <img src="../assets/images/logo.png" style={{ height: "25px" }} alt="" />
                                </Box>

                                <Box className="modal_box">
                                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span className="stake-span">Stake</span>
                                        {/* <Typography>Blanace </Typography> */}
                                        {(() => {
                                            if (LpToken != -1) {
                                                return (
                                                    <Typography className="value big" color="primary">
                                                        <span className="stake-span">Blanace  &nbsp;${LpToken}</span>
                                                    </Typography>
                                                )
                                            } else {
                                                return <Typography><Skeleton animation="wave" className="smallskelton" style={{ minWidth: "100px" }} /></Typography>
                                            }
                                        })()}
                                    </Box>
                                    <Box className="modal_box_cal">
                                        <input type="number" style={{ border: "none", background: "#240e48", color: "white", width: "50%" }} value={StakingValue} onChange={(e) => setStakingValue(e.target.value)} />
                                        <button className="max-button" onClick={() => setStakingValue(LpToken)}>Max</button>
                                    </Box>
                                    <Box sx={{ m: 3 }} />
                                    <PrettoSlider
                                        valueLabelDisplay="auto"
                                        aria-label="pretto slider"
                                        defaultValue={0}
                                        value={StakingValue}
                                        max={LpToken}
                                        onChange={(e) => setStakingValue(e.target.value)}
                                    />
                                </Box>
                                <Box style={{ marginTop: "30px", display: "flex" }}>
                                    <button className="cancel" onClick={() => setOpen(false)}>Cancel</button>
                                    <button className="confirm stake" onClick={() => confirm()}>Confirm</button>
                                </Box>
                            </Box>
                        </Box>
                    </Modal>

                    <Cwallet isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
                    <Calculator APR={APR} />
                </Box>
            </Box>
        </Box>
    )
}

export default Farms