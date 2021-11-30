import React, { useState } from 'react'
import { Row, Col } from 'reactstrap'
import SiderBar from "./siderbar"
import config from "./../config/app";
import { Button } from "@mui/material"
import { useWeb3React } from "@web3-react/core";
import Cwallet from "../components/Cwallet";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AddIcon from '@mui/icons-material/Add';

const Home = () => {

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  // eslint-disable-next-line
  const { activate, active, account, deactivate, connector, error, setError } = useWeb3React();

  const onConnectWallet = async () => {
    setIsOpenDialog(true);
  }

  const addToken = () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: config.aumi.address, // The address that the token is at.
              symbol: config.aumi.symbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: 18,
              image: config.aumi.img
            },
          },
        });
    }
  }

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
                <div className="meta-mask" style={{ justifyContent: "space-between" }}>
                  <img src="./assets/images/Spintoken.svg" alt="" className="spintoken" />
                  <Button variant="outlined" startIcon={<AddIcon />} className="metamask" style={{ color: "white", borderColor: "#630BF1" }} onClick={() => addToken()}>Add to metaMask </Button>
                </div>
                <div className="spin-text">SPINTOP to harvest</div>
                <p className="locked">Locked</p>
                <p className="money">~$0.00</p>
                <div className="spin-text">SPINTOP in wallet</div>
                <p className="locked">Locked</p>
                <p className="money">~$0.00</p>

                {
                  active ?
                    <Button
                      variant="contained"
                      className="contract-btn2"
                      startIcon={<LockOpenIcon />}
                      color="secondary"
                      onClick={onConnectWallet}
                      style={{ background: "#630BF1", width: "100%" }}
                    >
                      {account.substring(0, 10)} ... {account.substring(account.length - 5)}
                    </Button>
                    :
                    <Button
                      variant="contained"
                      className="contract-btn2"
                      startIcon={<LockIcon />}
                      color="secondary"
                      onClick={onConnectWallet}
                      style={{ background: "#630BF1", width: "100%" }}
                    >
                      Unlock wallet
                    </Button>
                }
                <Cwallet isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
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
    </div >
  )
}

export default Home
