import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import prepaidCardImage from "/prepaid-card.png";
import debitCardImage from "/debit-card.png";
import creditCardImage from "/credit-card.png";
import { CardType } from "../utils/CardType";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { FaEyeSlash, FaLock, FaUnlock } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

export default function CardsDetails() {
	// Hooks
	const param = useParams();
	const navigate = useNavigate();

	// State
	const { endpoint, setMessage } = useContext(GlobalContext);
	const [card, setCard] = useState(null);
	const [description, setDescription] = useState("");
	const [descriptionOn, setDescriptionOn] = useState(false);
	const [show, setShow] = useState({
		cvv: false,
		cardNumber: false,
	});
	const [showAccordion, setShowAccordion] = useState(false);

	const fetchCardDetails = () => {
		if (!param.cardNumber) return;
		axios
			.get(`${endpoint}/cards/by-card/${param.cardNumber}`)
			.then((res) => setCard(res.data))
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		fetchCardDetails();
	}, [param.cardNumber]);

	useEffect(() => {
		console.log("card updated", card);
	}, [card]);

	if (!card) {
		return <p>No card selected.</p>;
	}

	const {
		cardType,
		cardNumber,
		cvv,
		creationDate,
		expirationDate,
		holderFirstName,
		holderLastName,
		dailyLimit,
		dailyUsed,
		monthlyLimit,
		monthlyUsed,
		blocked,
	} = card;

	console.log("card Type", cardType, CardType);
	const getCardImage = () => {
		for (let type of CardType) {
			if (type.type === cardType) {
				if (type.type === "PREPAID") return prepaidCardImage;
				if (type.type === "DEBIT") return debitCardImage;
				if (type.type === "CREDIT") return creditCardImage;
			}
		}
		return null;
	};

	const unshownNumber = (number) => {
		if (!number || number.length < 4) return "****";
		return "**** **** **** " + number.slice(-4);
	};

	const toggleField = (field) => {
		setShow((prev) => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	const toggleAccordion = () => setShowAccordion((prev) => !prev);
	const handleChange = (e, setType) => {
		setType(e.target.value);
	};

	const handleSubmit = () => {
		if (blocked) handleCardUnlock();
		else handleCardLock();
		setShowAccordion(false);
		setShowInputTextArea(true);
		setDescription("");
	};

	const handleCardLock = () => {
		axios
			.put(
				`${endpoint}/cards/${param.cardNumber}/lock`,
				{ description },
				{
					headers: { "Content-Type": "application/json" },
				}
			)
			.then(() => fetchCardDetails())
			.catch((err) => console.error(err));
	};

	const handleCardUnlock = () => {
		axios
			.put(
				`${endpoint}/cards/${param.cardNumber}/unlock`,
				{ description },
				{
					headers: { "Content-Type": "application/json" },
				}
			)
			.then(() => fetchCardDetails())
			.catch((err) => console.error(err));
	};

	const handleDelete = () => {
		axios
			.delete(`${endpoint}/cards/by-card/${param.cardNumber}`)
			.then(() => {
				setMessage("carta eliminata con successo");

				navigate(-1);
			})
			.catch((err) => console.error(err));
	};

	return (
		<>
			<div
				className={`relative max-w-4xl mx-auto p-6 bg-green-50 rounded-xl shadow-lg ${
					showAccordion ? "blur-md z-1" : ""
				}`}
			>
				<h2 className="text-2xl font-bold mb-4">
					{holderFirstName} {holderLastName} Card
				</h2>

				<div className="flex flex-col md:flex-row items-center md:items-start mb-6">
					{getCardImage() ? (
						<img
							className="h-48 w-auto rounded-lg shadow-md mb-4 md:mb-0 md:mr-6"
							src={getCardImage()}
							alt={`${cardType} card`}
						/>
					) : (
						<p>No card image found</p>
					)}

					<div className="grid grid-cols-2 gap-4 text-sm md:text-base w-full">
						<div className="font-semibold">Card Type:</div>
						<div>{cardType}</div>

						<div className="font-semibold">Card Number:</div>
						<div className="flex justify-between">
							<div>
								{show.cardNumber ? cardNumber : unshownNumber(cardNumber)}
							</div>
							{show.cardNumber ? (
								<FaEyeSlash
									className="cursor-pointer"
									onClick={() => toggleField("cardNumber")}
								/>
							) : (
								<IoEyeSharp
									className="cursor-pointer"
									onClick={() => toggleField("cardNumber")}
								/>
							)}
						</div>

						<div className="font-semibold">CVV:</div>
						<div className="flex justify-between">
							<div>{show.cvv ? cvv : unshownNumber(cvv)}</div>
							{show.cvv ? (
								<FaEyeSlash
									className="cursor-pointer"
									onClick={() => toggleField("cvv")}
								/>
							) : (
								<IoEyeSharp
									className="cursor-pointer"
									onClick={() => toggleField("cvv")}
								/>
							)}
						</div>

						<div className="font-semibold">Creation Date:</div>
						<div>{creationDate}</div>

						<div className="font-semibold">Expiration Date:</div>
						<div>{expirationDate}</div>

						<div className="font-semibold">Daily Limit:</div>
						<div className="flex justify-between">
							<p>{dailyLimit}</p>
						</div>

						<div className="font-semibold">Daily Used:</div>
						<div>{dailyUsed}</div>

						<div className="font-semibold">Monthly Limit:</div>
						<div>{monthlyLimit}</div>

						<div className="font-semibold">Monthly Used:</div>
						<div>{monthlyUsed}</div>

						<div className="font-semibold">Status:</div>
						<div className={`flex flex-col gap-2`}>
							<div className="flex justify-between items-center">
								<div
									className={
										blocked
											? "text-red-600 font-bold"
											: "text-green-700 font-bold"
									}
								>
									{blocked ? "Blocked" : "Active"}
								</div>
								<div className="cursor-pointer" onClick={toggleAccordion}>
									{blocked ? <FaUnlock /> : <FaLock />}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex justify-between gap-6 ">
					<button
						onClick={() => navigate(-1)}
						className=" cursor-pointer mt-4 py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
					>
						Back to Cards
					</button>
					<button
						onClick={handleDelete}
						className="cursor-pointer mt-4 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
					>
						Delete
					</button>
				</div>
			</div>

			{showAccordion && (
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen z-2 flex justify-center items-center">
					<div className="min-w-200 mt-2 p-2 border border-gray-300 rounded-lg bg-gray-100 flex flex-col gap-2">
						<textarea
							className="w-full h-100 border border-gray-300 rounded px-2 py-1"
							placeholder="Inserisci una descrizione..."
							value={description}
							onChange={(e) => handleChange(e, setDescription)}
						/>
						<button
							onClick={handleSubmit}
							className="self-end px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
						>
							Save
						</button>
					</div>
				</div>
			)}
		</>
	);
}
