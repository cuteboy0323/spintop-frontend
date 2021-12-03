import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 12000;
const RPC_URL = "https://dataseed1.binance.org/";
export const injected = new InjectedConnector({
    supportedChainIds: [56],
});

export const walletconnect = new WalletConnectConnector({
    rpc: { 1: RPC_URL },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
});
