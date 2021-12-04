import React, { useCallback, useEffect, useState } from 'react'
import { Button, Skeleton, Typography, Box } from "@mui/material"
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Row, Col } from 'reactstrap'
import SiderBar from "./siderbar"
import config from "./../config/app";
import LockIcon from '@mui/icons-material/Lock';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import Cwallet from "../components/Cwallet";
import Config from "../config/app"

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
          Config.spin.abi,
          Config.spin.address
        );
        const spinC = new web3.eth.Contract(
          Config.staking.abi,
          Config.staking.address
        );
        const spinF = new web3.eth.Contract(
          Config.farms.abi,
          Config.farms.address
        );
        const walletB = await spinT.methods.balanceOf(account).call();
        const totalMint = await spinT.methods.totalSupply().call();
        const totalstaked = await spinC.methods.totalStaked().call();
        const totalburned = await spinT.methods.totalBurned().call();
        const harvestedValue = await spinF.methods.pendingSpintop(account).call();
        setWalletBalance(fromWei(web3, walletB).toString())
        setTotalMinted(fromWei(web3, totalMint))
        setTotalBurned(fromWei(web3, totalburned))
        setHarvestSpintop(harvestedValue)
        setTVL(totalstaked)
        await axios.get('https://api.pancakeswap.info/api/v2/tokens/0x6AA217312960A21aDbde1478DC8cBCf828110A67').then(res => {
          const val = 10000000000
          const CurrentP = res.data.data.price * val
          const marketcap = Math.floor(CurrentP) * fromWei(web3, totalMint);
          setMarketCap(marketcap / val)
        })

      } catch (err) {
        console.log(err)
      }
    }
  }

  const clear = () => {
    setWalletBalance(false)
    setHarvestSpintop(false)
    setTotalMinted(false)
    setMarketCap(false)
    setTotalBurned(false)
    setTVL(false)
  }

  useEffect(() => {
    let interval = null;
    if (active) {
      load();
      interval = setInterval(async () => {
        console.clear();
      }, config.updateTime);
    } else {
      clear();
      return () => clearInterval(interval);
    }

  }, [active])

  return (
    <Box>
      <Box className="main-container">
        <SiderBar Params="home" />
        <Box className="right-side">
          <Row>
            <Col>
              <Box className="big-announc">
                <Typography>Big announcements</Typography>
                <Typography>Medium to long sized subtitle goes here.</Typography>
              </Box>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Box className="cust-card main_card">
                <Typography className="main-heading">Farms & Staking</Typography>
                <Box className="meta-mask">
                  <img src="./assets/images/Spintoken.svg" alt="" className="spintoken" />
                  <Button variant="outlined" startIcon={<AddIcon />} className="metamask" onClick={() => addToken()}>Add to metaMask </Button>
                </Box>
                <Box className="spin-text">SPINTOP to harvest</Box>
                {(() => {
                  if (harvestSpintop != false || typeof (harvestSpintop) == "string") {
                    return (
                      <Typography className="value big" color="primary">
                        <span className="money">$&nbsp;{harvestSpintop}</span>
                      </Typography>
                    )
                  } else {
                    return <Typography><Skeleton animation="wave" className="skelton" /></Typography>
                  }
                })()}
                <Box className="spin-text">SPINTOP in wallet</Box>
                {(() => {
                  if (walletBalance != false || typeof (walletBalance) == "string") {
                    return (
                      <Typography className="value big" color="primary">
                        <span className="money">$&nbsp;{walletBalance}</span>
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
                      style={{ background: "#630BF1", width: "100%", marginTop: "75px" }}
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
                      style={{ background: "#630BF1", width: "100%", marginTop: "75px" }}
                    >
                      Unlock wallet
                    </Button>
                }
                <Cwallet isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
              </Box>
            </Col>
            <Col md={6}>
              <Box className="cust-card main_card">
                <Box className="d-flex align-items-start">
                  <img src="./assets/images/Spintoken-big.svg" alt="" />
                  <Box className="d-flex flex-column">
                    <span className="hashtag">SPINTOP #BSC</span>
                    <span className="at-the">@Spintop</span>
                  </Box>
                  <img src="./assets/images/twitter-2.svg" alt="" className="twit" />
                </Box>
                <p className="det">Details about SPINTOP</p>
                <a href="https://docs.spintop.network/roadmap"><p className="link">https://docs.spintop.network/roadmap</p></a>
                <img src="./assets/images/Gallery.png" alt="" className="gallery" />
                <p className="content" style={{ marginLeft: "60px", marginTop: "16px", marginBottom: "12px" }}>Is the Automated Market Maker(AMM) and decentralized exchange(DEX) of the Spintop Network that allows any pair of tokens to be exchanged on the Binance Smart Chain.</p>
              </Box>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Box className="cust-card main_card small-card">
                <p className="small-p">Market Cap</p>
                {(() => {
                  if (marketCap != false || typeof (marketCap) == "string") {
                    return (
                      <Typography className="value big" color="primary">
                        <span className="money">$&nbsp;{marketCap}</span>
                      </Typography>
                    )
                  } else {
                    return <Typography><Skeleton animation="wave" className="skelton" /></Typography>
                  }
                })()}
              </Box>
            </Col>
            <Col md={6}>
              <Box className="cust-card main_card small-card">
                <p className="small-p">Total Minted</p>
                {(() => {
                  if (totalMinted != false || typeof (totalMinted) == "string") {
                    return (
                      <Typography className="value big" color="primary">
                        <span className="money">$&nbsp;{totalMinted}</span>
                      </Typography>
                    )
                  } else {
                    return <Typography><Skeleton animation="wave" className="skelton" /></Typography>
                  }
                })()}
              </Box>
            </Col>
            <Col md={6}>
              <Box className="cust-card main_card small-card">
                <p className="small-p">Total Burned</p>
                {(() => {
                  if (totalBurned != false || typeof (totalBurned) == "string") {
                    return (
                      <Typography className="value big" color="primary">
                        <span className="money">$&nbsp;{totalBurned}</span>
                      </Typography>
                    )
                  } else {
                    return <Typography><Skeleton animation="wave" className="skelton" /></Typography>
                  }
                })()}
              </Box>
            </Col>
            <Col md={6}>
              <Box className="cust-card main_card small-card">
                <p className="small-p">Total Locked Rewards</p>
                {(() => {
                  if (TVL != false || typeof (TVL) == "string") {
                    return (
                      <Typography className="value big" color="primary">
                        <span className="money">$&nbsp;{TVL}</span>
                      </Typography>
                    )
                  } else {
                    return <Typography><Skeleton animation="wave" className="skelton" /></Typography>
                  }
                })()}
              </Box>
            </Col>
          </Row>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
