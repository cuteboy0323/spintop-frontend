import React, { useCallback, useEffect, useState } from 'react'
import Fab from '@mui/material/Fab';
import { Row, Col } from 'reactstrap'
import { Button, Skeleton, Typography, Box } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
//web3
import Web3 from "web3";
import axios from "axios"
import { useWeb3React } from "@web3-react/core";
//file
import SiderBar from "./siderbar"
import Config from "../config/app"
import Cwallet from "../components/Cwallet";
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
  const [SpinPrice, setSpinPrice] = useState()

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
              address: Config.spin.address, // The address that the token is at.
              symbol: Config.spin.symbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: 18,
              image: Config.spin.img
            },
          },
        });
    }
  }

  const swn = () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${Config.netId.toString(16)}`,
              chainName: "BNB TEST Network",
              rpcUrls: [
                "https://data-seed-prebsc-1-s1.binance.org:8545"
              ],
              nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18,
              },
              blockExplorerUrls: [
                "https://testnet.bscscan.com"
              ],
            },
          ],
        })
        .then(() => {
          alert(
            "You have successfully changed to Spin Test Network.",
            "info"
          );
        })
        .catch((error) => {
          alert(error.toString(), "error");
        });
    }
  };

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

        const walletB = await spinT.methods.balanceOf(account).call();
        const totalMint = await spinT.methods.totalSupply().call();
        const totalstaked = await spinC.methods.totalStaked().call();
        const totalburned = await spinT.methods.totalSupply().call();
        const harvestedstaking = await spinC.methods.earned(account).call();

        setWalletBalance(fromWei(web3, walletB).toString())
        setTotalMinted(fromWei(web3, totalMint))
        setTotalBurned(fromWei(web3, totalburned))
        setHarvestSpintop(fromWei(web3, harvestedstaking))
        setTVL(Math.floor(fromWei(web3, totalstaked)))

        await axios.get('https://api.coingecko.com/api/v3/coins/spintop').then(res => {
          const CurrentP = res.data.market_data.current_price.usd
          const marketcap = CurrentP * res.data.market_data.total_supply;
          if (CurrentP) {
            localStorage.tokenprice = CurrentP
            localStorage.marketcap = marketcap
            setSpinPrice(CurrentP)
            setMarketCap(marketcap)
          } else {
            setSpinPrice(localStorage.tokenprice)
            setMarketCap(localStorage.marketcap)
          }
        }).catch(() => {
          setSpinPrice(localStorage.tokenprice)
          setMarketCap(localStorage.marketcap)
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
        <SiderBar Params="home" />
        <Box className="right-side">
          <Row>
            <Col>
              <Box className="big-announc">
                <Typography>Spindex</Typography>
                <Typography>Gaming exclusive AMM, Staking & Farming pools and the Spindex Wallet.</Typography>
              </Box>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Box className="cust-card main_card">
                <Typography className="main-heading">Farms & Staking</Typography>
                <Box className="meta-mask">
                  <Box>
                    <img src="./assets/images/Spintoken.svg" alt="" className="spintoken" />
                    <Fab variant="extended" size="small" color="primary" aria-label="add" title="Add Token" onClick={() => addToken()} style={{ background: "rgb(33 15 60)" }}>
                      <img src="./assets/images/logo.png" style={{ height: "20px", margin: "0px" }} />&nbsp;&nbsp;&nbsp;
                      <KeyboardDoubleArrowRightIcon sx={{ mr: 1 }} />
                      <img width={22} src="./assets/images/meta-mask.svg" style={{ margin: "0px" }} alt="connected" />
                    </Fab>
                  </Box>
                  <Fab variant="extended" size="small" color="primary" aria-label="add" title="Add NetWork" onClick={() => swn()} style={{ background: "rgb(33 15 60)" }}>
                    <LanguageIcon sx={{ mr: 1 }} />
                    <KeyboardDoubleArrowRightIcon sx={{ mr: 1 }} />
                    <img width={22} src="./assets/images/meta-mask.svg" style={{ margin: "0px" }} alt="connected" />
                  </Fab>
                </Box>
                <Box className="spin-text">SPIN to harvest</Box>
                {(() => {
                  if (harvestSpintop != false || typeof (harvestSpintop) == "string") {
                    return (
                      <Typography className="value big" color="primary">
                        <span className="sub-txt">{harvestSpintop}</span><br />
                        <span className="money">~${harvestSpintop * SpinPrice}</span>
                      </Typography>
                    )
                  } else {
                    return <Typography><Skeleton animation="wave" className="skelton" /></Typography>
                  }
                })()}
                <Box className="spin-text">SPIN in wallet</Box>
                {(() => {
                  if (walletBalance != false || typeof (walletBalance) == "string") {
                    return (
                      <Typography className="value big" color="primary">
                        <span className="sub-txt">{walletBalance}</span><br />
                        <span className="money">~${walletBalance * SpinPrice}</span>
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
                      className="contract-btn2 contract-res"
                      startIcon={<LockOpenIcon />}
                      color="secondary"
                      onClick={onConnectWallet}
                    >
                      {account.substring(0, 10)} ... {account.substring(account.length - 5)}
                    </Button>
                    :
                    <Button
                      variant="contained"
                      className="contract-btn2 contract-res"
                      startIcon={<LockIcon />}
                      color="secondary"
                      onClick={onConnectWallet}
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
		<a className="twitter-timeline" data-height="380" data-theme="dark" href="https://twitter.com/SpintopNetwork?ref_src=twsrc%5Etfw">Tweets by SpintopNetwork</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
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
                        <span className="sub-txt">$&nbsp;{marketCap}</span>
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
                        <span className="sub-txt">{totalMinted}</span>
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
                        <span className="sub-txt">{totalBurned}</span>
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
                <p className="small-p">TVL</p>
                {(() => {
                  if (TVL != false || typeof (TVL) == "string") {
                    return (
                      <Typography className="value big" color="primary">
                        <span className="sub-txt">{TVL}</span>
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
