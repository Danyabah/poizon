import { Route, Routes } from "react-router-dom";
import "./css/style.css";
import Authorization from "./pages/Authorization";
import Client from "./pages/Client";
import AuthorizationWork from "./pages/AuthorizationWork";
import AfterPay from "./pages/AfterPay";
import Curs from "./pages/Curs";
import Depot from "./pages/Depot";
import InfoClient from "./pages/InfoClient";
import ManagerPersonalAccount from "./pages/ManagerPersonalAccount";
import OrderCard from "./pages/OrderCard";
import OrderList from "./pages/OrderList";
import OrderPageInProgress from "./pages/OrderPageInProgress";
import OrderPage from "./pages/OrderPage";
import Order from "./pages/Order";
import Pay from "./pages/Pay";
import PaymentMethod from "./pages/PaymentMethod";
import PersonalAreaCheckPay from "./pages/PersonalAreaCheckPay";
import PersonalAreaNew from "./pages/PersonalAreaNew";
import PersonalAreaOrder from "./pages/PersonalAreaOrder";
import PersonalAreaPay from "./pages/PersonalAreaPay";
import PersonalAreaPurchase from "./pages/PersonalAreaPurchase";
import Promocode from "./pages/Promocode";
import RequestCard from "./pages/RequestCard";
import RequestList from "./pages/RequestList";
import Scanning from "./pages/Scanning";
import StatisticApplication from "./pages/StatisticApplication";
import StatisticBrand from "./pages/StatisticBrand";
import StatisticCategories from "./pages/StatisticCategories";
import StatisticNumber from "./pages/StatisticNumber";
import Statistics from "./pages/Statistics";
import Admin from "./components/Admin";
import PersonalArea from "./pages/PersonalArea";

function App() {
  return (
    <div className="main-wrapper">
      <Routes>
        <Route path="/" index element={<Authorization />} />
        <Route path="/client" element={<Client />} />
        <Route path="/work" element={<AuthorizationWork />} />
        <Route path="/afterpay" element={<AfterPay />} />
        <Route
          path="/curs"
          element={
            <Admin>
              <Curs />
            </Admin>
          }
        />
        <Route path="/depot" element={<Depot />} />
        <Route path="/infoclient" element={<InfoClient />} />
        <Route
          path="/managerpersonalaccount"
          element={<ManagerPersonalAccount />}
        />
        <Route path="/ordercard" element={<OrderCard />} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/orderpageinprogress" element={<OrderPageInProgress />} />
        <Route path="/orderpage/:id" element={<OrderPage />} />
        <Route path="/order" element={<Order />} />
        <Route path="/pay" element={<Pay />} />
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
        <Route path="/personalareapay" element={<PersonalAreaPay />} />
        <Route
          path="/personalareapurchase"
          element={<PersonalAreaPurchase />}
        />
        <Route
          path="/promocode"
          element={
            <Admin>
              <Promocode />
            </Admin>
          }
        />
        <Route path="/requestcard" element={<RequestCard />} />
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
        <Route path="/personalarea" element={<PersonalArea />} />
      </Routes>
    </div>
  );
}

export default App;
