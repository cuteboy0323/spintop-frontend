import abi from "./abi";

export default {
    netId: 97,
    updateTime: 35000,
    swapFee: 0.0025,
    RealSpin:"0x6AA217312960A21aDbde1478DC8cBCf828110A67",
    spin: {
        price: 0.01,
        address: "0xaB537Adc71f1a2A535b39b8847d4E9cA93AF7958",
        abi: abi.token,
        symbol: "SPIN",
        img: "https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-MbaC5cDQY6glrXLXj4B%2Favatar-1633197511393.png?generation=1633197512121772&alt=media"
    },
    farms: {
        address: "0x68ad4067b8c9e98C8c63bE5B34c84c1627EE1164",
        abi: abi.farms,
    },
    staking: {
        address: "0x59899E0765E48942caC9DcBdb3d22577CfB53eeC",
        abi: abi.staking
    },
    Lp: {
        CakeL: {
            address: "0xa25512Ae68d21CC104Ed3481eCF6706f1bD918fC",
            abi: abi.CakeL,
        }
    },
    Contracts: [
        {
            id: "spintop-bnb",
            name: "Spintop-BNB",
            icon: "./assets/images/two-logos.svg",
            getlink: "https://pancakeswap.finance/add/BNB/0xF9d52aeA6097c2064964F8A59EDD4F3AAA7CE895",
            earn: "SpinTop",
            contractlink: "https://testnet.bscscan.com/address/0x68ad4067b8c9e98C8c63bE5B34c84c1627EE1164#writeContract",
            linkimg: "./assets/images/link_open.svg",
        }
    ],
    pools: [
        // {
        //     id: "auto-spintop",
        //     name: "Auto SpinTop",
        //     title: "Automatic restaking",
        //     icon: "./assets/images/pools-two-logos.svg",
        //     earntitle: "Recent SPINTOP profit",
        //     profit: true,
        //     spinearn: "STAKE SPINTOP",
        //     fee: "2%",
        //     contractlink: "https://testnet.bscscan.com/address/0x68ad4067b8c9e98C8c63bE5B34c84c1627EE1164#writeContract",
        //     viewprojectsite: "https://pancakeswap.finance/",
        //     tokeninfo: "https://testnet.bscscan.com/token/0x68ad4067b8c9e98C8c63bE5B34c84c1627EE1164",
        //     method: "auto",
        // },
        {
            id: "manual-spintop",
            name: "Manual Spintop",
            title: "Automatic restaking",
            icon: "./assets/images/logos-three.svg",
            earntitle: "SPIN EARNED",
            profit: false,
            spinearn: "STAKE SPINTOP",
            fee: "2%",
            contractlink: "https://testnet.bscscan.com/address/0x68ad4067b8c9e98C8c63bE5B34c84c1627EE1164#writeContract",
            viewprojectsite: "https://pancakeswap.finance/",
            tokeninfo: "https://testnet.bscscan.com/token/0x68ad4067b8c9e98C8c63bE5B34c84c1627EE1164",
            method: "manual",
        }
    ]
}
