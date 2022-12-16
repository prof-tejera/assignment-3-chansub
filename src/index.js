import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {ErrorBoundary} from 'react-error-boundary';

//https://www.npmjs.com/package/react-error-boundaryn
function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ErrorBoundary 
        FallbackComponent={ErrorFallback} 
        onError={()=>{
          console.log("An error occurred.")
        }}
      >
     <App />

    </ErrorBoundary>
  </React.StrictMode>
);
