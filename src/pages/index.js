import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import SiderBar from "./siderbar"

const Home = () => {
  return (
    <div>
      <div className="main-container">
        <SiderBar Params="home" />
        <div className="right-side">
          <Row>
            <Col>
              <div className="big-announc">
                <p>Big announcements</p>
                <p>Medium to long sized subtitle goes here.</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="cust-card main_card">
                <p className="main-heading">Farms & Staking</p>
                <div className="meta-mask">
                  <img src="./assets/images/Spintoken.svg" alt="" className="spintoken" />
                  <Button className="metamask">Add to metaMask <img src="./assets/images/plus_icon.svg" alt="" /></Button>
                </div>
                <div className="spin-text">SPINTOP to harvest</div>
                <p className="locked">Locked</p>
                <p className="money">~$0.00</p>
                <div className="spin-text">SPINTOP in wallet</div>
                <p className="locked">Locked</p>
                <p className="money">~$0.00</p>
                <Button className="unlock-btn">Unlock wallet</Button>
              </div>
            </Col>
            <Col md={6}>
              <div className="cust-card main_card">
                <div className="d-flex align-items-start">
                  <img src="./assets/images/Spintoken-big.svg" alt="" />
                  <div className="d-flex flex-column">
                    <span className="hashtag">SPINTOP #BSC</span>
                    <span className="at-the">@Spintop</span>
                  </div>
                  <img src="./assets/images/twitter-2.svg" alt="" className="twit" />
                </div>
                <p className="det">Details about SPINTOP</p>
                <a href="https://docs.spintop.network/roadmap"><p className="link">https://docs.spintop.network/roadmap</p></a>
                <img src="./assets/images/Gallery.png" alt="" className="gallery" />
                <p className="content" style={{ marginLeft: "60px", marginTop: "16px", marginBottom: "12px" }}>Is the Automated Market Maker(AMM) and decentralized exchange(DEX) of the Spintop Network that allows any pair of tokens to be exchanged on the Binance Smart Chain.</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <div className="cust-card main_card small-card">
                <p className="small-p">Market Cap</p>
                <p className="sub-txt">$4,613,089</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="cust-card main_card small-card">
                <p className="small-p">Total Minted</p>
                <p className="sub-txt">221,703,757</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="cust-card main_card small-card">
                <p className="small-p">Total Burned</p>
                <p className="sub-txt">22,608,221</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="cust-card main_card small-card">
                <p className="small-p">TVL</p>
                <p className="sub-txt">46,582,901</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Home
