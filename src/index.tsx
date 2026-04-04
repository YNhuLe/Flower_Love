import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style.css";
import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{ redirect_uri: "http://localhost:5173/"}}
        onRedirectCallback={(appState) => {
    window.location.replace(appState?.returnTo || "/users/me");}}
      //  onRedirectCallback={onRedirectCallback}
    >    <App /></Auth0Provider>

  </React.StrictMode>
);
