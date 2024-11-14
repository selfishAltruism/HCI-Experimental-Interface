import { Suspense, lazy } from "react";
import { BrowserRouter as RootRouter, Routes, Route } from "react-router-dom";

import AppStyles from "./AppStyles";

import { PAGE_URL } from "@/configs/path";
import { Loading } from "@/entities";

const Start = lazy(() => import("@/pages/StartPage"));
const Main = lazy(() => import("@/pages/MainPage"));
const Control = lazy(() => import("@/pages/ControlPage"));

const PageRouter = () => (
  <Suspense fallback={<Loading />}>
    <RootRouter>
      <AppStyles />
      <Routes>
        <Route path={PAGE_URL.Main} element={<Main />} />
        <Route path={PAGE_URL.Control} element={<Control />} />
        <Route path="*" element={<Start />} />
      </Routes>
    </RootRouter>
  </Suspense>
);

export default PageRouter;
