import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

import { CitiesProvider } from "./contexts/CitiesContext";
import { UserAuthenticationProvider } from "./contexts/FakeUserAuthentication";

import ProtectedRoute from "./pages/ProtectedRoute";

import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { Suspense } from "react";

// import HomePage from "./pages/HomePage";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const SpinnerFullPage = lazy(() => import("./components/SpinnerFullPage"));

function App() {
  return (
    <UserAuthenticationProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />{" "}
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />{" "}
                <Route path="form" element={<Form />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="cities" element={<CityList />} />
                <Route path="countries" element={<CountryList />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </UserAuthenticationProvider>
  );
}

export default App;
