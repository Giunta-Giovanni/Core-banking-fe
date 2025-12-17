// import Context
import GlobalContext from "./GlobalContext.jsx";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import axios from "axios";

export default function GlobalContextProvider({ children }) {
    const [cards, setCards] = useState([]);
    const [accountNumber, setAccountNumber] = useState(null);
    const [message, setMessage] = useState(null);
    const [account, setAccount] = useState([]);
    const [movements, setMovements] = useState([])

    useEffect(() => {
    const acc = Cookies.get("accountNumber");
    if (acc) {
        setAccountNumber(acc);
    }
    }, [setAccountNumber]);


    const endpoint = import.meta.env.VITE_BE_URL;  
    // fetch products data
    const fetchCards = () => {
        if (!accountNumber) return;
        axios
        .get(`${endpoint}/cards/by-account/${accountNumber}`)
        .then(res => setCards(res.data))
        .catch(err => console.error(err));
    };

    const fetchAccount = () => {
    if (!accountNumber) return;

    axios
        .get(`${endpoint}/api/accounts/find/${accountNumber}`)
        .then(res => {
        setAccount(res.data);

        // usa res.data.idAccount, non account.idAccount
        return axios.get(`${endpoint}/ledger/${res.data.idAccount}/movements`);
        })
        .then(res2 => {
        setMovements(res2.data);
        })
        .catch(err => console.error(err));
    };


    // upload data after Pageload
    useEffect(() => {
        fetchAccount();
        fetchCards();
    }, [accountNumber]);


    return(
          <GlobalContext.Provider value={{
                endpoint,
                cards,
                setCards,
                setAccountNumber,
                fetchCards,
                message, 
                setMessage,
                account,
                setAccount,
                movements,
                setMovements
          }}>
            {children}
          </GlobalContext.Provider>
    )

}