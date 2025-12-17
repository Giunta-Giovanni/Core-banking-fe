import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { UnshownNumber } from "../utils/unshownNumber";
import { ToggleField } from "../utils/ToggleField";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

export default function AccountPage() {
	const { account, movements } = useContext(GlobalContext);
	const [visible, setVisible] = useState({
		availableBalance: false,
	});

	useEffect(() => {
		console.log(account);
		console.log(movements);
	}, []);

	return (
		<>
			{/* Hero section home */}
			<section
				className="p-4 h-52 text-white font-semibold 
                   bg-linear-to-r from-green-600 via-green-700 to-green-900"
			>
				<h2 className="text-4xl">
					Ciao{" "}
					{account.firstNameCustomer ? account.firstNameCustomer : "Persona"}
				</h2>
				<p className="py-4">Conto {account.currentAccoutNumber}</p>

				<div className="flex justify-between items-center">
					<p className="text-4xl font-bold">
						{visible.availableBalance
							? `${account.availableBalance} €`
							: `${UnshownNumber(account.availableBalance)} €`}
					</p>

					<div>
						<div
							onClick={() => ToggleField(setVisible, "availableBalance")}
							className="text-4xl cursor-pointer flex justify-center"
						>
							{visible.availableBalance ? <IoEyeSharp /> : <FaEyeSlash />}
						</div>
						<div className="text-sm">nascondi</div>
					</div>
				</div>
				<div className="my-4  bg-white h-0.5" />
			</section>

			<section className="p-4">
                <div className="flex justify-between items-end">
				    <h2 className="text-4xl font-medium">Movimenti</h2>
                    <Link className="text-green-800" to={"/account/movements"}> Visualizza Tutti {'>'} </Link>
                </div>

				<div className="my-4 bg-black h-0.5" />
				<div>
					{movements.slice(0,5).map((movement) => {
						const timestamp = movement.bookingDate;
						const dateOnly = new Date(timestamp).toLocaleDateString("it-IT");
						const isDebit = movement.direction === "DEBIT";
						return (
							<>
								<div
									key={movement.externalReference}
									className="min-h-20 flex justify-between items-center"
								>
									<div className="flex gap-2 items-center min-w-0">
										<div className="text-4xl border-2 rounded-full p-2 bg-green-200">
											{isDebit ? <GiPayMoney /> : <GiReceiveMoney />}
										</div>
										<div className="pr-4 min-w-0">
											<div>{dateOnly}</div>
											<p className="truncate">{movement.description}</p>
										</div>
									</div>

									<div className="font-bold whitespace-nowrap">
										{isDebit ? "-" : "+"} {movement.amount} €
									</div>
								</div>
							</>
						);
					})}
				</div>
			</section>
		</>
	);
}
