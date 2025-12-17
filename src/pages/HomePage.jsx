import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import Cookies from "js-cookie";

export default function HomePage() {
  const navigate = useNavigate();

  const emptyForm = {
    accountNumber: "",
  };

  const [formDataObj, setFormDataObj] = useState(emptyForm);


  function setFieldValue(e) {
    const { value, name } = e.target;
    setFormDataObj((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) => {
    Cookies.remove("accountNumber");
    e.preventDefault();
    Cookies.set("accountNumber", formDataObj.accountNumber, {
        expires: 1,
        path: "/"
    });
    navigate("/account");
  };

  return (
    <section className="max-w-md mx-auto mt-8 p-6 bg-green-50 rounded-xl shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="accountNumber"
            className="block text-sm font-semibold text-green-900 mb-1"
          >
            Account Number
          </label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formDataObj.accountNumber}
            onChange={setFieldValue}
            className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your account number"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
