import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { IoMdClose } from "react-icons/io";

export default function CardsPage() {
    
    const { cards,fetchCards, message, setMessage } = useContext(GlobalContext);
    const location = useLocation();
    useEffect(() => {
        fetchCards();
    }, []);

    const cleanMessage=()=>{    
        setMessage(null)
    }

  if (!cards.length) return <p>No cards found for this account.</p>;

  return (
    <>
    <div className="border border-green-300 rounded-xl overflow-hidden m-4">
      <div className="grid grid-cols-7 bg-green-700 text-white font-semibold text-sm">
        <div className="p-3">Type</div>
        <div className="p-3">Status</div>
        <div className="p-3">First Name</div>
        <div className="p-3">Last Name</div>
        <div className="p-3">Expiration</div>
        <div className="p-3">Card Number</div>
        <div className="p-3">CVV</div>
      </div>

      {cards.map(card => (
        <Link
          to={`/cards/${card.cardNumber}`}
          key={card.id}
          className="grid grid-cols-7 border-t border-green-200 text-sm hover:bg-green-50 transition"
        >
          <div className="p-3">{card.cardType}</div>
          <div className={`p-3 font-medium ${card.blocked ? "text-red-600" : "text-green-700"}`}>
            {card.blocked ? "Blocked" : "Active"}
          </div>
          <div className="p-3">{card.holderFirstName}</div>
          <div className="p-3">{card.holderLastName}</div>
          <div className="p-3">{card.expirationDate}</div>
          <div className="p-3 font-mono">{card.cardNumber}</div>
          <div className="p-3">{card.cvv}</div>
        </Link>
      ))}

    </div>
    
    {
        message != null &&
        <div className="fixed bottom-4 right-4 z-50 p-4 bg-green-600 text-white rounded-lg shadow-lg w-64">
            <div className="flex justify-between items-start">
            <p className="mr-2">{message}</p>
            <button onClick={cleanMessage} className="text-white cursor-pointer">
                <IoMdClose />
            </button>
            </div>
        </div>
    }

    </>
  );
}
