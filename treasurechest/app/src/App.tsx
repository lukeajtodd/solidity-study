import './App.css'
import { useState } from 'react'
import { ethers } from 'ethers'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import Token from './artifacts/contracts/Token.sol/Token.json'

const greeterAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512'
const tokenAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

const App = () => {
  const [greeting, setGreetingValue] = useState('')
  const [userAccount, setUserAccount] = useState('')
  const [amount, setAmount] = useState('')

  const requestAccount = async () => {
    await (window as any).ethereum.request({ method: 'eth_requestAccounts' })
  }

  const fetchGreeting = async () => {
    if (typeof (window as any).ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum,
      )
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider,
      )

      try {
        const data = await contract.greet()
        console.log(`data: ${data}`)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  const getBalance = async () => {
    if (typeof (window as any).ethereum !== 'undefined') {
      const [account] = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      })
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum,
      )
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account)
      console.log('Balance: ', balance.toString())
    }
  }

  const setGreeting = async () => {
    if (!greeting) return

    if (typeof (window as any).ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum,
      )
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()
    }
  }

  const sendCoins = async () => {
    if (typeof (window as any).ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="Set greeting"
          type="text"
        />

        <br />

        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input placeholder="Account ID" onChange={e => setUserAccount(e.target.value)} type="text" />
        <input placeholder="Amount" onChange={e => setAmount(e.target.value)} type="text" />
      </header>
    </div>
  )
}

export default App
