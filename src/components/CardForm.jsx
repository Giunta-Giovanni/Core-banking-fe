import { CardType } from "../utils/CardType";
import { useNavigate } from "react-router-dom";
export default function CardForm({ cardType, cardFormData, setCardFormData, setFieldValue, selectedCardType, setSelectedCardType, handleCardSwitch, cardFormSubmit }) {
  const navigate = useNavigate();
  
    return (
    <form onSubmit={cardFormSubmit} 
    className="max-w-xl mx-auto p-6 bg-green-50 rounded-xl shadow-lg space-y-6">

        {/* Switch Card Type */}
      <h2 className="text-2xl text-center font-bold text-green-900 mb-4">Select Card Type</h2>
      <div className="flex justify-center gap-4 mb-6">
        {CardType.map((type) => (
          <button
            key={type.id}
            className={`
              text-center px-4 py-2 border-2 rounded-xl min-w-30 cursor-pointer
              ${selectedCardType === type.type
                ? "bg-gray-300 cursor-not-allowed text-gray-600"
                : "bg-gray-500 hover:bg-gray-600 text-white transition-colors"}
            `}
            disabled={selectedCardType === type.type}
            onClick={() => handleCardSwitch(type)}
          >
            {type.type}
          </button>
        ))}
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-green-900 mb-1">First Name</label>
          <input
            type="text"
            name="holderFirstName"
            className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={cardFormData.holderFirstName}
            onChange={setFieldValue}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-green-900 mb-1">Last Name</label>
          <input
            type="text"
            name="holderLastName"
            className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={cardFormData.holderLastName}
            onChange={setFieldValue}
          />
        </div>
      </div>

      {/* Limits */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-green-900 mb-1">Daily Limit</label>
          <input
            type="number"
            name="dailyLimit"
            className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={cardFormData.dailyLimit}
            onChange={setFieldValue}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-green-900 mb-1">Monthly Limit</label>
          <input
            type="number"
            name="monthlyLimit"
            className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={cardFormData.monthlyLimit}
            onChange={setFieldValue}
          />
        </div>
      </div>


      {/* Prepaid or Credit extra fields */}
      {cardType === "PREPAID" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-green-900 mb-1">Available Balance</label>
            <input
              type="number"
              name="availableBalance"
              className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={cardFormData.availableBalance}
              onChange={setFieldValue}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-green-900 mb-1">Ledger Balance</label>
            <input
              type="number"
              name="ledgerBalance"
              className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={cardFormData.ledgerBalance}
              onChange={setFieldValue}
            />
          </div>
        </div>
      )}

      {cardType === "CREDIT" && (
        <div>
          <label className="block text-sm font-semibold text-green-900 mb-1">Plafond</label>
          <input
            type="number"
            name="plafond"
            className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={cardFormData.plafond}
            onChange={setFieldValue}
          />
        </div>
      )}
      
      {/* Blocked Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="blocked"
          checked={cardFormData.blocked}
          onChange={setFieldValue}
          className="w-4 h-4 text-green-600 border-green-300 rounded focus:ring-green-400"
        />
        <label className="text-sm font-semibold text-green-900">Blocked</label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={() => navigate(-1)}
        className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition cursor-pointer active:bg-green-800"
      >
        Save Card
      </button>
    </form>
  );
}
