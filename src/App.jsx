import { BrowserRouter,Routes, Route} from "react-router-dom"

import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import AccountPage from "./pages/AccountPage.jsx"
import CardsPage from "./pages/CardsPage"
import CardDetails from "./pages/CardDetails"
import CreateCardPage from "./pages/CreateCardPage"
import GlobalContextProvider from "./context/GlobalContextProvider.jsx"


export default function App() {
  return (
    <>
      <BrowserRouter>
          <GlobalContextProvider> 
            <Routes>
              <Route path="/" element={<HomePage />} />
  
                <Route path="/cards/" element={<DefaultLayout />}>
                  <Route index element={<CardsPage />} />
                  <Route path=":cardNumber" element={<CardDetails />} />
                  <Route path="create-card" element={<CreateCardPage />} />
                </Route>
                <Route path="/account" element={<DefaultLayout />}>
                  <Route index element={<AccountPage />} />
                </Route>
            </Routes>
          </GlobalContextProvider>
        </BrowserRouter>
    </>
  )
}

