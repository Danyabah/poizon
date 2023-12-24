import { Route, Routes } from "react-router-dom";
import "./css/style.css";
import Authorization from "./pages/Authorization";
import Client from "./pages/Client";
import AuthorizationWork from "./pages/AuthorizationWork";
import AfterPay from "./pages/AfterPay";
import Curs from "./pages/Curs";
import Depot from "./pages/Depot";

import ManagerPersonalAccount from "./pages/ManagerPersonalAccount";

import OrderPageInProgress from "./pages/OrderPageInProgress";
import OrderPage from "./pages/OrderPage";
import Order from "./pages/Order";
import Pay from "./pages/Pay";
import PaymentMethod from "./pages/PaymentMethod";
import PersonalAreaCheckPay from "./pages/PersonalAreaCheckPay";
import PersonalAreaNew from "./pages/PersonalAreaNew";
import PersonalAreaOrder from "./pages/PersonalAreaOrder";
import PersonalAreaPay from "./pages/PersonalAreaPay";

import Promocode from "./pages/Promocode";

import RequestList from "./pages/RequestList";
import Scanning from "./pages/Scanning";
import StatisticApplication from "./pages/StatisticApplication";
import StatisticBrand from "./pages/StatisticBrand";
import StatisticCategories from "./pages/StatisticCategories";
import StatisticNumber from "./pages/StatisticNumber";
import Statistics from "./pages/Statistics";
import Admin from "./components/Admin";
import PersonalArea from "./pages/PersonalArea";
import Address from "./pages/Address";
import PrivateManager from "./components/PrivateManager";
import Crrcdek from "./components/Crrcdek";
import Pvz from "./components/Pvz";
import CompletePage from "./pages/CompletePage";

import Gift from "./pages/Gift";
import GitftChoose from "./pages/GitftChoose";
import CalcPrice from "./pages/CalcPrice";

function App() {
  return (
    <div className="main-wrapper">
      <Routes>
        <Route path="/" index element={<Authorization />} />
        <Route path="/client" element={<Client />} />
        <Route path="/work" element={<AuthorizationWork />} />
        <Route path="/afterpay/:id" element={<AfterPay />} />
        <Route
          path="/curs"
          element={
            <Admin>
              <Curs />
            </Admin>
          }
        />
        <Route
          path="/address"
          element={
            <Admin>
              <Address />
            </Admin>
          }
        />
        <Route path="/pvz/:id" element={<Pvz />} />

        <Route path="/depot" element={<Depot />} />

        <Route
          path="/managerpersonalaccount"
          element={
            <PrivateManager>
              <ManagerPersonalAccount />
            </PrivateManager>
          }
        />

        <Route
          path="/orderpageinprogress/:id"
          element={<OrderPageInProgress />}
        />
        <Route path="/orderpage/:id" element={<OrderPage />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/pay/:id" element={<Pay />} />
        <Route path="/crrcdek/:id" element={<Crrcdek />} />

        <Route
          path="/paymentmethod"
          element={
            <Admin>
              <PaymentMethod />
            </Admin>
          }
        />
        <Route
          path="/personalareacheckpay"
          element={<PersonalAreaCheckPay />}
        />
        <Route path="/personalareanew" element={<PersonalAreaNew />} />
        <Route path="/personalareaorder" element={<PersonalAreaOrder />} />
        <Route
          path="/personalareaorder/:id"
          element={
            <Admin>
              <PersonalAreaOrder />
            </Admin>
          }
        />
        <Route path="/personalareapay/:id" element={<PersonalAreaPay />} />

        <Route
          path="/promocode"
          element={
            <Admin>
              <Promocode />
            </Admin>
          }
        />

        <Route path="/requestlist" element={<RequestList />} />
        <Route path="/scanning" element={<Scanning />} />
        <Route
          path="/statisticapplication"
          element={
            <Admin>
              <StatisticApplication />
            </Admin>
          }
        />
        <Route
          path="/statisticbrand"
          element={
            <Admin>
              <StatisticBrand />
            </Admin>
          }
        />
        <Route
          path="/statisticcategories"
          element={
            <Admin>
              <StatisticCategories />
            </Admin>
          }
        />
        <Route
          path="/statisticnumber"
          element={
            <Admin>
              <StatisticNumber />
            </Admin>
          }
        />
        <Route
          path="/statistics"
          element={
            <Admin>
              <Statistics />
            </Admin>
          }
        />
        <Route
          path="/completed"
          element={
            <Admin>
              <CompletePage />
            </Admin>
          }
        />
        <Route
          path="/gift"
          element={
            <Admin>
              <Gift />
            </Admin>
          }
        />
        <Route path="/giftchoose/:id" element={<GitftChoose />} />
        <Route path="/personalarea" element={<PersonalArea />} />
        <Route path="/calcprice" element={<CalcPrice />} />
      </Routes>
    </div>
  );
}

export default App;
