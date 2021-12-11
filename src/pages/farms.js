//import material and react
import React, { useCallback, useEffect, useState } from 'react'
import { FormControlLabel, FormGroup, Skeleton, Switch, Typography, Box, Slider, Modal } from '@mui/material'
import { Col, Row } from 'reactstrap'
import SiderBar from "./siderbar"
import { styled } from '@mui/material/styles';
//web3 and jquery
import $ from "jquery"
import axios from "axios"
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
    const [APR, setAPR] = useState(-1)
    const [SelId, setSelId] = useState("")
    const [open, setOpen] = useState(false);
    const [Earned, setEarned] = useState(-1)
    const [LpToken, setLpToken] = useState(-1)
    const [SpinPrice, setSpinPrice] = useState()
    const [Liquidity, setLiquidity] = useState(-1)
    const [Multiplier, setMultiplier] = useState(-1)
    const [StakingValue, setStakingValue] = useState(0)
    const [earndisable, setearndisable] = useState(true)
    const [Unstakeable, setUnstakeable] = useState(false)
    const [OpenUnstake, setOpenUnstake] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [UnStakingValue, setUnStakingValue] = useState(0)
    const [UserStakedToken, setUserStakedToken] = useState(-1)
    const myNotification = window.createNotification({})

    const toWei = useCallback((web3, val) => {
        if (val) {
            val = val.toString();
            return web3.utils.toWei(val);
        } else {
            return "0"
        }
    }, []);

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

    const harvest = async (id) => {
        if ($(`.harvest.${id}`).text() == "Harvest") {
            if (Earned != 0) {
                try {
                    $(`.harvest.${id}`).addClass('loading')
                    $(`.harvest.${id}`).html('<img src="./assets/images/Progress indicator.svg" class="loading rotating">Harvesting')
                    const web3 = new Web3(library.provider);
                    const ContractS = new web3.eth.Contract(
                        Config.farms.abi,
                        Config.farms.address
                    )
                    await ContractS.methods.getReward().send({ from: account })
                    setEarned("0")
                    $(`.harvest.${id}`).removeClass('loading')
                    $(`.harvest.${id}`).html('Harvest')
                    myNotification({
                        title: 'Harvested',
                        message: 'Your SPINTOP earning is sent to your wallet.',
                        showDuration: 3500
                    })
                    return;
                } catch (err) {
                    $(`.harvest.${id}`).removeClass('loading')
                    $(`.harvest.${id}`).html('Harvest')
                    myNotification({
                        title: 'Fail',
                        message: 'User canceled Harvest.',
                        showDuration: 3500
                    })
                    return;
                }
            } else {
                myNotification({
                    title: 'Harvested',
                    message: 'Your earning is 0.',
                    showDuration: 3500
                })
                return;
            }
        } else {
            return;
        }
    }

    const enableContract = async (id) => {
        if (active) {
            try {
                $(`.contract-btn.one.${id}`).addClass('loading')
                $(`.contract-btn.one.${id}`).html('<img src="./assets/images/Progress indicator.svg" class="loading rotating"> Enable Contract')
                const web3 = new Web3(library.provider);
                const msg = web3.utils.sha3(web3.utils.toHex("Eanble Contract") + Config.staking.address, { encoding: "hex" })
                const signature = await web3.eth.personal.sign(msg, account);
                if (signature) {
                    setTimeout(() => {
                        $(`.contract-btn.one.${id}`).fadeOut()
                        $(`.spin-earned.one.${id}`).fadeOut()
                        $(`.harvest button.${id}`).hide()
                        $(`.harvest button.${id}.active`).html('')
                        $(`.harvest button.${id}.active`).html('Stake LP')
                        $(`.harvest button.${id}.active`).show()
                        $(`.harvest button.${id}.active.stake-lp.act`).hide()
                        myNotification({
                            title: 'Contract enabled',
                            message: "You can stake now in the pool.",
                            showDuration: 3500
                        })
                    }, 1000);
                    return;
                } else {
                    $(`.contract-btn.one.${id}`).fadeOut()
                    myNotification({
                        title: 'Fail',
                        message: "You can't enable contract.",
                        showDuration: 3500
                    })
                    return;
                }
            } catch (err) {
                $(`.contract-btn.one.${id}`).removeClass('loading')
                $(`.contract-btn.one.${id}`).html('Enable Contract')
                myNotification({
                    title: 'Fail',
                    message: "User canceled enable.",
                    showDuration: 3500
                })
                return;
            }
        } else {
            $(`.contract-btn.one.${id}`).removeClass('loading')
            $(`.contract-btn.one.${id}`).html('Enable Contract')
            myNotification({
                title: 'Fail',
                message: "Please connect Metamask wallet.",
                showDuration: 3500
            })
            return;
        }
    }

    const unstakeable = async () => {
        const web3 = new Web3(library.provider);
        const ContractS = new web3.eth.Contract(
            Config.farms.abi,
            Config.farms.address
        )
        const unstakeable = await ContractS.methods.unstakable(account).call()
        if (unstakeable) {
            setOpenUnstake(true)
            setUnstakeable(true)
            return;
        } else {
            setOpenUnstake(true)
            setUnstakeable(true)
            myNotification({
                title: 'Unstake',
                message: 'Please wait one day from latest staking date.Then You can unstake.',
                showDuration: 3500
            })
            return;
        }
    }

    const confirm = async () => {
        if ($(".confirm.stake").text() == "Confirm") {
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
                try {
                    $('.confirm').addClass('loading')
                    $('.cancel').attr('disabled', true);
                    $('.confirm').html('<img src="./assets/images/Progress indicator.svg" class="loading rotating">Confirming')
                    const web3 = new Web3(library.provider);
                    const ContractT = new web3.eth.Contract(
                        Config.stakinglp.abi,
                        Config.stakinglp.address
                    );
                    const ContractF = new web3.eth.Contract(
                        Config.farms.abi,
                        Config.farms.address
                    )
                    const balance = toWei(web3, StakingValue)
                    const apr = await ContractT.methods.approve(Config.farms.address, balance).send({ from: account })
                    if (apr) {
                        const staked = await ContractF.methods.stake(balance).send({ from: account })
                        if (staked) {
                            setOpen(false)
                            $('.cancel').attr('disabled', false);
                            $('.confirm.stake').removeClass('loading')
                            $('.confirm.stake').html('Confirm')
                            $(`.last-show-hide.${SelId}`).show()
                            $(`.spin-earned.${SelId}`).hide()
                            $(`.contract-btn.one.pools-enable.${SelId}`).hide()
                            setearndisable(false)
                            myNotification({
                                title: 'Staked',
                                message: 'Your Spintop-BNB funds have been staked in the farms.',
                                showDuration: 3500
                            })
                            load()
                        }
                    }
                    setTimeout(function () {
                        setOpen(false)
                        setStakingValue(0)
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
                } catch (err) {
                    $('.confirm').removeClass('loading')
                    $('.cancel').attr('disabled', false);
                    $('.confirm').html('Confirm')
                    myNotification({
                        title: 'Fail',
                        message: 'User canceled staking.',
                        showDuration: 3500
                    })
                    return;
                }
            }
        } else {
            return;
        }
    }

    const unstake = async () => {
        if ($('.confirm.unstake').text() == "Confirm") {
            if (Number(UnStakingValue) <= 0) {
                myNotification({
                    title: 'Fail',
                    message: 'Please enter value correctly.',
                    showDuration: 3500
                })
                return;
            }
            if (Number(UnStakingValue) > Number(UserStakedToken)) {
                myNotification({
                    title: 'Fail',
                    message: 'Your SpinTop token is not enough.',
                    showDuration: 3500
                })
                return;
            } else {
                try {
                    if (Unstakeable) {
                        $('.confirm.unstake').addClass('loading')
                        $('.confirm.unstake').html('<img src="./assets/images/Progress indicator.svg" class="loading rotating">Confirming')
                        const web3 = new Web3(library.provider);
                        const ContractS = new web3.eth.Contract(
                            Config.farms.abi,
                            Config.farms.address
                        )

                        const balance = toWei(web3, UnStakingValue)
                        const apr = await ContractS.methods.unstake(balance).send({ from: account })
                        if (apr) {
                            setOpenUnstake(false)
                            $('.confirm.unstake').removeClass('loading')
                            $('.confirm.unstake').html('Confirm')
                            $(`.contract-btn.one.pools-enable.${SelId}`).hide()
                            $('.harvest-button').prop("disabled", false);
                            myNotification({
                                title: 'UnStaked',
                                message: 'Your Spintop funds have been unstaked in the pool.',
                                showDuration: 3500
                            })
                            load()
                        }
                    } else {
                        myNotification({
                            title: 'Unstake',
                            message: 'Please wait one day from latest staking date.Then You can unstake.',
                            showDuration: 3500
                        })
                    }
                } catch (e) {
                    $('.confirm.unstake').removeClass('loading')
                    $('.confirm.unstake').html('Confirm')
                    myNotification({
                        title: 'UnStaked',
                        message: 'User canceled Unstaking.',
                        showDuration: 3500
                    })
                    return;
                }
            }
        } else {
            return;
        }
    }

    const stakeLp = (id) => {
        setOpen(true)
        setSelId(id)
    }

    const floor = useCallback((val) => {
        if (val) {
            let data = Math.floor(val * 100000000)
            const res = data / 100000000
            return res
        } else {
            return 0
        }
    })

    const load = async () => {
        try {
            const web3 = new Web3(library.provider);
            const spinF = new web3.eth.Contract(
                Config.farms.abi,
                Config.farms.address
            );
            const spinL = new web3.eth.Contract(
                Config.stakinglp.abi,
                Config.stakinglp.address
            );
            const lptokenB = await spinL.methods.balanceOf(account).call()
            const liquidity = await spinL.methods.getReserves().call()
            const earnValue = await spinF.methods.earned(account).call()
            const totalstaked = await spinF.methods.totalStaked().call()
            const current_pool = await spinF.methods.lastTimeRewardApplicable().call()
            const stakedB = await spinF.methods.balanceOf(account).call()
            const apr = (fromWei(web3, totalstaked) / current_pool) * (100 / 30)
            setUserStakedToken(floor(fromWei(web3, stakedB)))
            setEarned(earnValue)
            setAPR(floor(apr))
            setMultiplier(10)
            setLpToken(fromWei(web3, lptokenB))
            if (stakedB > 0) {
                $(`.last-show-hide`).show()
                setearndisable(false)
            }
            await axios.get('https://api.coingecko.com/api/v3/coins/spintop').then(res => {
                const CurrentP = res.data.market_data.current_price.usd
                if (CurrentP) {
                    localStorage.tokenprice = CurrentP
                    setSpinPrice(CurrentP)
                    setLiquidity(floor(fromWei(web3, liquidity[0]) * 2 * CurrentP))
                } else {
                    setLiquidity(floor(fromWei(web3, liquidity[0]) * 2 * localStorage.tokenprice))
                    setSpinPrice(localStorage.tokenprice)
                }
            }).catch(() => {
                setLiquidity(floor(fromWei(web3, liquidity[0]) * 2 * localStorage.tokenprice))
                setSpinPrice(localStorage.tokenprice)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const clear = () => {
        setAPR(-1)
        setEarned(-1)
        setLpToken(-1)
        setLiquidity(-1)
        setMultiplier(-1)
        setUserStakedToken(-1)
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
            <Box className="main-container" style={{ minHeight: "100vh" }}>
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
                                                                    <span className="x-40">{`${Multiplier}x`}</span>
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
                                                <button className={`harvest ${item.id}`} id={item.id} onClick={() => harvest(item.id)} disabled={earndisable}>Harvest</button>
                                                <button className={`${item.id} active stake-lp`} onClick={() => stakeLp(item.id)}>Stake LP</button>
                                            </Box>
                                            {
                                                UserStakedToken ?
                                                    <Box className={`last-show-hide ${item.id}`}>
                                                        <p className="spin-earned harvest-show-hide">SPIN-BNB STAKED</p>
                                                        <Box className="d-flex">
                                                            <Box className="d-flex harvest-show-hide">
                                                                <span>{UserStakedToken}</span>
                                                                <span>~{floor(UserStakedToken * SpinPrice)} USD</span>
                                                            </Box>
                                                            <Box className="d-flex">
                                                                <a onClick={() => unstakeable()}><img className="plus-minus-icon" src="./assets/images/minus.svg" alt="" /></a>
                                                                <a onClick={() => setOpen(true)}><img className="plus-minus-icon" src="./assets/images/plus.svg" alt="" /></a>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    :
                                                    <>
                                                        <p className={`spin-earned one ${item.id}`}>SPIN-BNB LP STAKED</p>
                                                        <button className={`contract-btn one ${item.id}`} onClick={() => enableContract(item.id)}>Enable Contract</button>
                                                    </>
                                            }
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
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box className="stakingmodal" >
                            <Box className="modal-header">
                                <span className="modal-span">Stake in Farms</span>
                                {/* <img src="./assets/images/close-icon.png" alt="" onClick={() => setOpen(false)} /> */}
                            </Box>
                            <Box className="modal_content">
                                <Box className="stakebox-header">
                                    <span className="stake-span" style={{ fontSize: "20px" }}>Stake</span>
                                    <img src="../assets/images/logo.png" style={{ height: "25px" }} alt="" />
                                </Box>

                                <Box className="modal_box">
                                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span className="stake-span">Stake</span>
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

                    <Modal
                        keepMounted
                        open={OpenUnstake}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box className="stakingmodal" >
                            <Box className="modal-header">
                                <span className="modal-span">UnStake in Farms</span>
                                {/* <img src="./assets/images/close-icon.png" alt="" onClick={() => setOpenUnstake(false)} /> */}
                            </Box>
                            <Box className="modal_content">
                                <Box className="stakebox-header">
                                    <span className="stake-span" style={{ fontSize: "20px" }}>UnStake</span>
                                    <img src="../assets/images/logo.png" style={{ height: "25px" }} alt="" />
                                </Box>
                                <Box className="modal_box">
                                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span className="stake-span">UnStake</span>
                                        {(() => {
                                            if (UserStakedToken != -1) {
                                                return (
                                                    <Typography className="value big" color="primary">
                                                        <span className="stake-span">Blanace  &nbsp;${UserStakedToken}</span>
                                                    </Typography>
                                                )
                                            } else {
                                                return <Typography><Skeleton animation="wave" className="smallskelton" style={{ minWidth: "100px" }} /></Typography>
                                            }
                                        })()}
                                    </Box>
                                    <Box className="modal_box_cal">
                                        <input type="number" style={{ border: "none", background: "#240e48", color: "white", width: "50%" }} value={UnStakingValue} onChange={(e) => setUnStakingValue(e.target.value)} />
                                        <button className="max-button" onClick={() => setUnStakingValue(UserStakedToken)}>Max</button>
                                    </Box>
                                    <Box sx={{ m: 3 }} />
                                    <PrettoSlider
                                        valueLabelDisplay="auto"
                                        aria-label="pretto slider"
                                        defaultValue={0}
                                        value={UnStakingValue}
                                        max={UserStakedToken}
                                        onChange={(e) => setUnStakingValue(e.target.value)}
                                    />
                                </Box>
                                <Box style={{ marginTop: "30px", display: "flex" }}>
                                    <button className="cancel" onClick={() => setOpenUnstake(false)}>Cancel</button>
                                    <button className="confirm unstake" onClick={() => unstake()}>Confirm</button>
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