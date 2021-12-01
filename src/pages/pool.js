import React from 'react'
import { Row, Col } from 'reactstrap'
import SiderBar from "./siderbar"
import $ from "jquery"
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import Modal from "./modal"

const Pool = () => {
    const finish = () => {
        $('#live').removeClass('active')
        $('#finished').addClass('active')
    }

    const live = () => {
        $('#live').addClass('active')
        $('#finished').removeClass('active')
    }

    const enable = () => {
        $('.pools-enable').addClass('loading')
        $('.pools-enable').html('<img src="./assets/images/Progress indicator.svg" class="loading rotating"> Enabling')
    }

    return (
        <div>
            <div className="main-container">
                <SiderBar Params="pools" />
                <div className="right-side">
                    <Row>
                        <Col md={12}>
                            <div className="big-announc pools-main-card">
                                <p>Spintop Pools</p>
                                <p>Just stake some tokens to earn.</p>
                                <p>High APR, low risk.</p>
                                <button className="blue-btn">Become a partner</button>
                                <button className="blue-btn active">Need Help?</button>
                                <div className="right-top-head">
                                    <p className="first">Auto SPIN Bounty <img src="./assets/images/Form.png" alt="" /></p>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <span>0.00 USD</span>
                                        <button className="blue-btn small">Claim</button>
                                    </div>
                                    <p className="first">~ 0.13 USD</p>
                                </div>
                            </div>
                        </Col>
                    </Row>

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
                                {/* <select name="" id="">
                                    <option value="">Hot ones</option>
                                    <option value="">Hot ones</option>
                                </select> */}

                                <input type="text" placeholder="Search" />
                                <span className="magnify"></span>
                            </div>
                        </Col>
                    </Row>
                    <div className="cust-card steak-only mobile" style={{ marginTop: "375px" }}>
                        <input type="text" placeholder="Search" />
                        <span className="magnify"></span>
                        <img src="./assets/images/filter.svg" alt="" className="filter" />
                    </div>
                    <Row className="parent-pool">
                        <Col md={4}>
                            <div className="cust-card contract pools">
                                <div className="blue-contain"></div>
                                <div className="d-flex main-two-logos">
                                    <div className="d-flex flex-column align-items-start">
                                        <span className="bnb">Auto Spintop</span>
                                        <span className="auto-matic">Automatic restaking</span>
                                    </div>
                                    <img src="./assets/images/pools-two-logos.svg" alt="" className="two-logos" />
                                </div>
                                <div className="d-flex content-one first">
                                    <img src="./assets/images/Form.png" alt="" className="me-2 form-p" />
                                    <span>APR</span>
                                    <span>54.85%</span>
                                    <img src="./assets/images/calculator-alt.svg" alt="" data-bs-toggle="modal" data-bs-target="#exampleModal" />
                                </div>
                                <p className="spin-earned active">Recent SPINTOP profit</p>
                                <div className="small-box">
                                    <img src="./assets/images/Form.png" alt="" className=" form-p" />
                                    <span className="auto-matic">0.1% ustaking fee if withdrawn within 72h</span>
                                </div>
                                <p className="spin-earned">STAKE SPINTOP</p>
                                <button className="contract-btn one pools-enable" onClick={() => enable()}>Enable</button>

                                <p className="line"></p>
                                <div className="hide-show-parent">
                                    <button className="refresh">
                                        <img src="./assets/images/refresh_white.svg" alt="" />
                                        Auto
                                    </button>
                                    <img src="./assets/images/question-24px.png" className="question-p" alt="" />
                                    <div className="hide-show" data-bs-toggle="collapse" href="#collapseExampl1" role="button"
                                        aria-expanded="false" aria-controls="collapseExample1">
                                        <span>Hide</span>
                                        <span>Details</span>
                                        <img src="./assets/images/dropup.svg" alt="" />
                                        <img src="./assets/images/drop_hover.svg" alt="" />
                                    </div>
                                </div>
                                <div className="collapse show" id="collapseExampl1">
                                    <div className="inner-card">
                                        <div className="d-flex justify-content-between align-content-center mb-2">
                                            <span>Total staked</span>
                                            <span>96,7552.295 <img src="./assets/images/Form.png" alt="" className=" form-p" /></span>
                                        </div>
                                        <div className="d-flex justify-content-between align-content-center mt-1">
                                            <span>Performance fee <img src="./assets/images/Form.png" className=" form-p" alt="" /></span>
                                            <span>2%</span>
                                        </div>
                                        <div className="d-flex cursor-pointer">
                                            <p className="links first">Get SPINTOP</p>
                                            <img src="./assets/images/link_open.svg" alt="" className="link-open first" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Modal />
                        <Col md={4}>
                            <div className="cust-card contract pools">
                                <div className="blue-contain"></div>
                                <div className="d-flex main-two-logos">
                                    <div className="d-flex flex-column align-items-start">
                                        <span className="bnb">Manual Spintop</span>
                                        <span className="auto-matic">Automatic restaking</span>
                                    </div>
                                    <img src="./assets/images/logos-three.svg" alt="" className="two-logos" />
                                </div>
                                <div className="d-flex content-one first">
                                    <img src="./assets/images/Form.png" alt="" className="me-2 form-p" />
                                    <span>APR</span>
                                    <span>54.85%</span>
                                    <img src="./assets/images/calculator-alt.svg" alt="" data-bs-toggle="modal" data-bs-target="#exampleModal" />
                                </div>
                                <p className="spin-earned harvest-show-hide">SPIN-BNB LP STAKED</p>
                                <div className="d-flex">
                                    <div className="d-flex harvest-show-hide">
                                        <span className="">0.0</span>
                                        <span className="">~0.0</span>
                                    </div>
                                    <div className="d-flex pe-3">
                                        <img src="./assets/images/Field.svg" alt="" srcSet="" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal2" />
                                    </div>
                                </div>
                                <p className="spin-earned">STAKE SPINTOP</p>
                                <button className="contract-btn one pools-enable">Enable</button>
                                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModal2Label"
                                    aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <span>SPINTOP required</span>
                                                <img src="./assets/images/close-icon.png" alt="" data-bs-dismiss="modal"
                                                    aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                                <img src="./assets/images/alert-24px.svg" alt="" srcSet="" className="img-fluid" />
                                                <div className="text-center mb-5">
                                                    <p className="alert-h">Insuffient SPINTOP balance</p>
                                                    <p>You will need SPINTOP to stake in this pool</p>
                                                    <p>Buy some SPINTOP, or make sure you SPINTOP is not in another pool or LP
                                                    </p>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <button className="contract-btn pools-confirm">Confirm</button>
                                                    <button className="dollar">Get SPINTOP</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="line"></p>
                                <div className="hide-show-parent">
                                    <button className="refresh active">
                                        <img src="./assets/images/manual.svg" alt="" />
                                        Manual
                                    </button>
                                    <img src="./assets/images/question-24px.png" className="question-p" alt="" />
                                    <div className="hide-show" data-bs-toggle="collapse" href="#collapseExample12" role="button"
                                        aria-expanded="false" aria-controls="collapseExample12">
                                        <span>Hide</span>
                                        <span>Details</span>
                                        <img src="./assets/images/dropup.svg" alt="" />
                                        <img src="./assets/images/drop_hover.svg" alt="" />
                                    </div>
                                </div>
                                <div className="collapse" id="collapseExample12">
                                    <div className="inner-card">
                                        <div className="d-flex justify-content-between align-content-center mb-2">
                                            <span>Total staked</span>
                                            <span>96,7552.295 <img src="./assets/images/Form.png" className=" form-p" alt="" /></span>
                                        </div>
                                        <div className="d-flex justify-content-between align-content-center mt-1">
                                            <span>Performance fee <img src="./assets/images/Form.png" className=" form-p" alt="" /></span>
                                            <span>2%</span>
                                        </div>
                                        <div className="d-flex align-items-end cursor-pointer">
                                            <span className="auto-matic plus">End in</span>
                                            <p className="links first">Get SPINTOP</p>
                                            <img src="./assets/images/link_open.svg" alt="" className="link-open first" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div >

    )
}

export default Pool