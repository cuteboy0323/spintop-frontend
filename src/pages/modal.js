import React from 'react'
const Modal = () => {
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
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
                                <span>0.00 USD</span>
                                <span>0.00 SPINTOP</span>
                            </div>
                            <div className="card-content">
                                <img src="./assets/images/sort-alt.svg" alt="" />
                            </div>
                        </div>

                        <div className="d-flex dollar-btns">
                            <button className="dollar">
                                $100
                            </button>
                            <button className="dollar">
                                $1000
                            </button>
                            <input type="text" name="" id="" placeholder="My Balance" className="my-bal" />
                            <img src="./assets/images/question-24px.png" className="question-p" alt="" />
                        </div>
                        <p className="spin-earned mt-4">STAKED FOR</p>
                        <div className="year-contain">
                            <button className="active">1D</button>
                            <button>7D</button>
                            <button>30D</button>
                            <button>1Y</button>
                            <button>5Y</button>
                        </div>
                        <div className="down-arrow">
                            <img src="./assets/images/down2.svg" alt="" />
                        </div>
                        <div className="inner-cust-card active">
                            <div className="card-two-head">
                                <p>ROI AT CURRENT RATES</p>
                                <span>$0.00</span>
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
                                    <span>67.17%</span>
                                </div>
                                <div className="d-flex justify-content-between align-content-center mt-1">
                                    <span>APY (5000x daily compound)</span>
                                    <span>93.85%</span>
                                </div>
                                <ul>
                                    <ul>Calculated based on current rates.
                                        <li>All figures are estimates provided for your convenience only, and by no
                                            means represent guaranteed returns.</li>
                                        <li>All estimated rates take into account this pool’s 2% performance fee
                                        </li>
                                    </ul>
                                </ul>
                                <div className="links-contain">
                                    <p className="links">Get SPINTOP</p>
                                    <img src="./assets/images/link_open.svg" alt="" className="link-open" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal