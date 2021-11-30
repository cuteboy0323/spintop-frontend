import abi from "./abi";

export default {
    netId: 97,
    updateTime: 35000,
    swapFee: 0.0025,
    base: {
        mint: {
            rate: "0.3"
        },
        reward: {
            address: {
                "SPIN": "0x2688Dffeb7EFE3C30D26acbac86419748a1D5f0A",
            },
            abi: {
                reward: {
                    aumi: abi.spin,
                }
            }
        },
        origin: {
            quick: "0.2408",
            aumi_lock: 200
        },
    },
    aumi: {
        price: 70,
        address: "0x2688Dffeb7EFE3C30D26acbac86419748a1D5f0A",
        abi: abi.spin,
        symbol: "SPIN",
        img: "https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-MbaC5cDQY6glrXLXj4B%2Favatar-1633197511393.png?generation=1633197512121772&alt=media"
    },
    tokens: [
        "binance-testnet",
        "spin-network",
        "quick",
        "wrapped-bitcoin",
        "weth"
    ],
    contracts: [
        // {
        //     id: "aumi-stake",
        //     name: "AUMI VAULT",
        //     sub_title: "AutoMatic",
        //     vault_token: {
        //         name: "AUMI",
        //         address: "0x3eB177A6693eC81d1E170136f8AD02fffBE172a7",
        //         abi: abi.spin
        //     },
        //     ap: {
        //         title: "APR",
        //         key: ""
        //     },
        //     tags: [
        //         "AUMI",
        //         "STAKE",
        //         "AUMI-STAKE"
        //     ],
        //     description: "Redistribution Fees",
        //     fee_description: "Early withdrawals before 3 months are charged a 50% penalty fee.",
        //     icons: [
        //         // require("../assets/img/tokens/mati.jpg").default
        //     ],
        //     rewards: [
        //         "WMATIC",
        //         "AUMI"
        //     ],
        //     status: {
        //         active: false,
        //         status: "Retired"
        //     },
        //     mint: {
        //         rate: 0.3
        //     },
        //     base_token: {
        //         id: "automatic-network",
        //         name: "AUMI",
        //         address: "0x3eB177A6693eC81d1E170136f8AD02fffBE172a7",
        //         abi: abi.erc20
        //     },
        //     vault: {
        //         address: "0x82AeCa6D5fDAC30DEAE7D278aab2E70a7AC05193",
        //         abi: abi.aumi.stake.vault
        //     },
        //     rewarder: {
        //         address: "0x13F697b4cfae360C56a6695e7F06Ae1260f5b5Ba",
        //         abi: abi.aumi.stake.rewarder
        //     },
        //     aumi: {
        //         address: "0x3eB177A6693eC81d1E170136f8AD02fffBE172a7",
        //         abi: abi.aumi.stake.self
        //     },
        //     buy: "",
        //     buy_tooltip: "Acquire LP tokens on QuickSwap",
        //     filter: "aumi-vaults"
        // }
    ]
}
