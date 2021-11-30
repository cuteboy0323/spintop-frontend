import React, { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import SiderBar from "./siderbar"
import config from "./../config/app";
import { Button, Skeleton, Typography } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AddIcon from '@mui/icons-material/Add';

import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import Cwallet from "../components/Cwallet";
import ABI from "../config/abi"
import Token from "../config/app"
const Home = () => {
  // eslint-disable-next-line
  const { activate, active, account, deactivate, connector, error, setError, library, chainId } = useWeb3React();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  // eslint-disable-next-line
  const [harvestSpintop, setHarvestSpintop] = useState("No");
  const [walletBalance, setWalletBalance] = useState("No");

  const onConnectWallet = async () => {
    setIsOpenDialog(true);
  }

  const fn = (val, decimal = 4) => {
    if (!isNaN(Number(val))) {
      const trimVal = Number(Number(val).toFixed(decimal));
      const decimalVal = trimVal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      return decimalVal;
    } else {
      return Number(0);
    }
  }

  const addToken = () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: config.spin.address, // The address that the token is at.
              symbol: config.spin.symbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: 18,
              image: config.spin.img
            },
          },
        });
    }
  }

  const load = async () => {
    if (active) {
      const web3 = new Web3(library.provider);
      const spinC = new web3.eth.Contract(
        ABI.token,
        Token.spin.address
      );
      const walletB = await spinC.methods.balanceOf(account).call();
      console.log(walletB)
      setWalletBalance(walletB)
    } else {
      setWalletBalance("No")
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line
  }, [active])
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
                  <Button variant="outlined" startIcon={<AddIcon />} className="metamask" onClick={() => addToken()}>Add to metaMask </Button>
                </div>
                <div className="spin-text">SPINTOP to harvest</div>
                {(() => {
                  if (harvestSpintop != "No") {
                    return (
                      <Typography className="value big" color="primary">
                        <p className="money">${harvestSpintop}</p>
                      </Typography>
                    )
                  } else {
                    return <Typography><Skeleton animation="wave" className="skelton" /></Typography>
                  }
                })()}
                <div className="spin-text">SPINTOP in wallet</div>
                {(() => {
                  if (walletBalance != "No") {
                    return (
                      <Typography className="value big" color="primary">
                        <p className="money">${walletBalance}</p>
                      </Typography>
                    )
                  } else {
                    return <Typography><Skeleton animation="wave" className="skelton" /></Typography>
                  }
                })()}
                {
                  active ?
                    <Button
                      variant="contained"
                      className="contract-btn2"
                      startIcon={<LockOpenIcon />}
                      color="secondary"
                      onClick={onConnectWallet}
                      style={{ background: "#630BF1", width: "100%", marginTop: "20px" }}
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
                      style={{ background: "#630BF1", width: "100%", marginTop: "20px" }}
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
