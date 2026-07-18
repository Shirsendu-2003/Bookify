import { Suspense } from "react";

import AppRoutes from "./routes";

import Loader from "../components/common/Loader";

import ErrorBoundary from "../components/common/ErrorBoundary";
import SessionTimeout from "../services/SessionTimeout";

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div
            className="

min-h-screen

flex
items-center
justify-center

bg-slate-50

"
          >
            <Loader
              size="lg"
              text="
Loading Application..."
            />
          </div>
        }
      >
         <SessionTimeout />
        <AppRoutes />
      </Suspense>
    </ErrorBoundary>
  );
}
