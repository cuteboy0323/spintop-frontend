import React, { useCallback, useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import SiderBar from "./siderbar"
import config from "./../config/app";
import { Button, Skeleton, Typography } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import Cwallet from "../components/Cwallet";
import ABI from "../config/abi"
import Token from "../config/app"
const Home = () => {
  // eslint-disable-next-line
  const { activate, active, account, deactivate, connector, error, setError, library, chainId } = useWeb3React();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [harvestSpintop, setHarvestSpintop] = useState(false);
  const [walletBalance, setWalletBalance] = useState(false);
  const [marketCap, setMarketCap] = useState(false);
  const [totalMinted, setTotalMinted] = useState(false);
  const [totalBurned, setTotalBurned] = useState(false);
  const [TVL, setTVL] = useState(false);

  const fromWei = useCallback((web3, val) => {
    if (val) {
      val = val.toString();
      return web3.utils.fromWei(val);
    } else {
      return "0"
    }
  }, []);

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
      try {
        const web3 = new Web3(library.provider);
        const spinT = new web3.eth.Contract(
          ABI.token,
          Token.spin.address
        );
        const spinC = new web3.eth.Contract(
          ABI.spin,
          Token.spin.address
        );
        const walletB = await spinT.methods.balanceOf(account).call();
        const totalMint = await spinT.methods.CirculatingSupply().call();
        // const HarvestB = await spinC.methods.pendingSpintop(Pid, account).call();
        setWalletBalance(fromWei(web3, walletB))
        setTotalMinted(fromWei(web3, totalMint))
        // setHarvestSpintop(HarvestB)
        await axios.get('https://api.pancakeswap.info/api/v2/tokens/0x4691F60c894d3f16047824004420542E4674E621').then(res => {
          const val = 1000000000
          // const CurrentP = res.data.data.price * val
          const CurrentP = 0.010012 * val
          const marketcap = Math.floor(CurrentP) * fromWei(web3, totalMint);
          setMarketCap(marketcap / val)
        })

      } catch (err) {
        console.log(err)
      }
    } else {
      setWalletBalance(false)
      setHarvestSpintop(false)
      setTotalMinted(false)
      setMarketCap(false)
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
                  if (harvestSpintop != false) {
                    return (
                      <Typography className="value big" color="primary">
                        <span className="money">${harvestSpintop}</span>
                      </Typography>
                    )
                  } else {
                    return <Typography><Skeleton animation="wave" className="skelton" /></Typography>
                  }
                })()}
                <div className="spin-text">SPINTOP in wallet</div>
                {(() => {
                  if (walletBalance != false) {
                    return (
                      <Typography className="value big" color="primary">
                        <span className="money">{walletBalance}&nbsp;SPIN</span>
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
            <Col md={6}>
              <div className="cust-card main_card small-card">
                <p className="small-p">Market Cap</p>
                {(() => {
                  if (marketCap != false) {
                    return (
                      <Typography className="value big" color="primary">
                        <span className="money">$&nbsp;{marketCap}</span>
                      </Typography>
                    )
                  } else {
                    return <Typography><Skeleton animation="wave" className="skelton" /></Typography>
                  }
                })()}
              </div>
            </Col>
            <Col md={6}>
              <div className="cust-card main_card small-card">
                <p className="small-p">Total Minted</p>
                {(() => {
                  if (totalMinted != false) {
                    return (
                      <Typography className="value big" color="primary">
                        <span className="money">$&nbsp;{totalMinted}</span>
                      </Typography>
                    )
                  } else {
                    return <Typography><Skeleton animation="wave" className="skelton" /></Typography>
                  }
                })()}
              </div>
            </Col>
            <Col md={6}>
              <div className="cust-card main_card small-card">
                <p className="small-p">Total Burned</p>
                {/* <p className="sub-txt">22,608,221</p> */}
                {(() => {
                  if (totalBurned != false) {
                    return (
                      <Typography className="value big" color="primary">
                        <span className="money">{totalBurned}&nbsp;</span>
                      </Typography>
                    )
                  } else {
                    return <Typography><Skeleton animation="wave" className="skelton" /></Typography>
                  }
                })()}
              </div>
            </Col>
            <Col md={6}>
              <div className="cust-card main_card small-card">
                <p className="small-p">TVL</p>
                {/* <p className="sub-txt">46,582,901</p> */}
                {(() => {
                  if (TVL != false) {
                    return (
                      <Typography className="value big" color="primary">
                        <span className="money">{TVL}&nbsp;</span>
                      </Typography>
                    )
                  } else {
                    return <Typography><Skeleton animation="wave" className="skelton" /></Typography>
                  }
                })()}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div >
  )
}

export default Home
