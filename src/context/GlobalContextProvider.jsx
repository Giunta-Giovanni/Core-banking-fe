// import Context
import GlobalContext from "./GlobalContext.jsx";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import axios from "axios";

export default function GlobalContextProvider({ children }) {
    const [cards, setCards] = useState([]);
    const [accountNumber, setAccountNumber] = useState(null);
    const [message, setMessage] = useState(null);

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

    // upload data after Pageload
    useEffect(() => {
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
                setMessage
          }}>
            {children}
          </GlobalContext.Provider>
    )

}