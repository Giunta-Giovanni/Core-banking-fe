
import axios from "axios";
import CardForm from "../components/CardForm";
import { useState, useEffect } from "react";

export default function CreateCardPage() {
  const endpoint = import.meta.env.VITE_BE_URL;
  const [selectedCardType, setSelectedCardType] = useState("DEBIT");

  // Inizializza i valori del form in base al tipo di carta
  const getEmptyFormData = (type) => ({
    cardType: type,
    holderFirstName: "",
    holderLastName: "",
    dailyLimit: 0,
    monthlyLimit: 0,
    blocked: true,
    ...(type === "PREPAID" && { availableBalance: 0, ledgerBalance: 0 }),
    ...(type === "CREDIT" && { plafond: 0 }),
  });

  const [cardFormData, setCardFormData] = useState(getEmptyFormData(selectedCardType));

  // Aggiorna il form quando cambio tipo di carta
  const handleCardSwitch = (card) => {
    setSelectedCardType(card.type);
    setCardFormData(getEmptyFormData(card.type));
  };

  // Gestione dei campi del form
  const setFieldValue = (e) => {
    const { value, name, type, checked } = e.target;
    setCardFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const cardFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting card form data:", cardFormData);
    // Qui puoi aggiungere la logica per inviare i dati al backend
    axios.post(`${endpoint}/cards/890210398092/${selectedCardType.toLowerCase()}`, cardFormData);
  }
  useEffect(() => {
    console.log("Card form data updated:", cardFormData);
  }, [cardFormData]);

  return (
    <section className="min-h-125 p-6">
      <h1 className="text-center m-4 uppercase font-bold text-xl">Crea una carta</h1>

      {/* Card Form */}
      <CardForm
        cardType={selectedCardType}
        cardFormData={cardFormData}
        setCardFormData={setCardFormData}
        setFieldValue={setFieldValue}
        selectedCardType={selectedCardType}
        setSelectedCardType={setSelectedCardType}
        handleCardSwitch={handleCardSwitch}
        cardFormSubmit={cardFormSubmit}
      />
    </section>
  );
}
