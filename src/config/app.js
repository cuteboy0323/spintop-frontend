import abi from "./abi";

export default {
    netId: 97,
    updateTime: 35000,
    swapFee: 0.0025,
    RealSpin: "0x6AA217312960A21aDbde1478DC8cBCf828110A67",
    spin: {
        price: 0.01,
        address: "0xab537adc71f1a2a535b39b8847d4e9ca93af7958",
        abi: abi.token,
        symbol: "SPIN",
        img: "https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-MbaC5cDQY6glrXLXj4B%2Favatar-1633197511393.png?generation=1633197512121772&alt=media"
    },
    farms: {
        address: "0xA05a24D08C19bd9bE65F9AC7A2D6236FE10a347e",
        abi: abi.farms,
    },
    stakinglp: {
        address: "0x46014677b3d87931b685106da50652765bf5ac50",
        abi: abi.stakinglp,
    },
    staking: {
        address: "0x202F811C007e60A616Bd141d23b3C128A625E012",
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
            getlink: "https://pancake.kiemtienonline360.com/#/add/BNB/0xaB537Adc71f1a2A535b39b8847d4E9cA93AF7958",
            earn: "SpinTop",
            contractlink: "https://testnet.bscscan.com/address/0xA05a24D08C19bd9bE65F9AC7A2D6236FE10a347e#writeContract",
            linkimg: "./assets/images/link_open.svg",
        }
    ],
    pools: [
        {
            id: "manual-spintop",
            name: "Manual Spintop",
            title: "",
            icon: "./assets/images/logos-three.svg",
            earntitle: "SPIN EARNED",
            profit: false,
            spinearn: "STAKE SPINTOP",
            fee: "2%",
            contractlink: "https://testnet.bscscan.com/address/0x46014677b3d87931b685106da50652765bf5ac50#writeContract",
            viewprojectsite: "https://pancakeswap.finance/",
            tokeninfo: "https://testnet.bscscan.com/token/0xab537adc71f1a2a535b39b8847d4e9ca93af7958",
            method: "manual",
        }
    ]
}
