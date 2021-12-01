import React from 'react'
import SiderBar from "./siderbar"
import $ from "jquery"
import { Col, Row } from 'reactstrap'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'

const Farms = () => {

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

    const enableContract = () => {
        $('.contract-btn').addClass('loading')
        $('.contract-btn').html('<img src="./assets/images/Progress indicator.svg" class="loading rotating"> Enable Contract')
        setTimeout(function () {
            $('.contract-btn.one').fadeOut()
            $('.spin-earned.one').fadeOut()
        }, 2000)
        setTimeout(function () {
            $('.harvest button.one').hide()

            $('.harvest button.one.active').html('')
            $('.harvest button.one.active').html('Stake LP')
            $('.harvest button.one.active').show()
            $('.harvest button.one.active.stake-lp.act').hide()
        }, 2500)
    }

    const confirm = () => {
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
    const myNotification = window.createNotification({
    })

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

    // const cancel = () => {

    // }

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
                                <select name="" id="">
                                    <option value="">Hot ones</option>
                                    <option value="">Hot ones</option>
                                </select>

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
                                        <span className="x-40">40X</span>
                                    </div>
                                </div>
                                <div className="d-flex content-one first">
                                    <span>APR</span>
                                    <span>54.85%</span>
                                    <img src="./assets/images/calculator-alt.svg" alt="" />
                                </div>
                                <div className="d-flex content-one">
                                    <span>Earn</span>
                                    <span>Spintop</span>
                                </div>
                                <p className="spin-earned">Spin Earned</p>
                                <div className="d-flex harvest">
                                    <span>0.0</span>
                                    <button className="one" onClick={() => harvest()} disabled>Harvest</button>
                                    <button className="one active stake-lp" data-bs-toggle="modal" data-bs-target="#exampleModal">Stake LP</button>
                                    <button className="one active stake-lp act" onClick={() => harvested()}>Harvested</button>
                                </div>
                                <p className="spin-earned one">SPIN-BNB LP STAKED</p>
                                <button className="contract-btn one" onClick={() => enableContract()}>Enable Contract</button>
                                <div className="last-show-hide">
                                    <p className="spin-earned harvest-show-hide">SPIN-BNB LP STAKED</p>
                                    <div className="d-flex">
                                        <div className="d-flex harvest-show-hide">
                                            <span>0.597</span>
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
                                            <span>$793,761,779</span>
                                        </div>
                                        <div className="d-flex cursor-pointer">
                                            <p className="links first">Get SPINTOP-BNB LP</p>
                                            <img src="./assets/images/link_open.svg" alt="" className="link-open first" />
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
                                                <span>Blanace 0.598</span>
                                            </div>
                                            <div className="card-content">
                                                <span>0.5241654651</span>
                                                <span>MAX</span>
                                                <span style={{ color: "rgba(184, 197, 236, 0.65)" }}>BUSD -BNB LP</span>
                                            </div>
                                        </div>
                                        <img src="./assets/images/alert-octagon-16px.svg" alt="" />
                                        <span className="alert-span">No token to stake. Get BUSD-BNB LP</span>
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