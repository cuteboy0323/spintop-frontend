import abi from "./abi";

export default {
    netId: 97,
    updateTime: 35000,
    swapFee: 0.0025,
    spin: {
        price: 70,
        address: "0xF9d52aeA6097c2064964F8A59EDD4F3AAA7CE895",
        abi: abi.spin,
        symbol: "SPIN",
        img: "https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-MbaC5cDQY6glrXLXj4B%2Favatar-1633197511393.png?generation=1633197512121772&alt=media"
    },
    farms: {
        lp: {
            address: "0xa25512Ae68d21CC104Ed3481eCF6706f1bD918fC",
            abi: abi.lp,
        },
    },
    tokens: [
        "binance-testnet",
        "spin-network",
        "quick",
        "wrapped-bitcoin",
        "weth"
    ],
    staking:{
        address:"0x6969b346Ee8b378dc0fF02f929cf5473760dA866"
    }
}
