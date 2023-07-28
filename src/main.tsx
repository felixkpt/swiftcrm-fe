import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { RouterProvider } from "react-router-dom";
import router from "@/utils/router.js";
import "@/styles/layout.scss";
import ErrorBoundary from "./components/Notifications/ErrorBoundary";
import './scss/customized-boostrap.scss';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary fallback="There was an error.">
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ErrorBoundary>
);