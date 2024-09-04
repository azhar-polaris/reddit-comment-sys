import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
const Test = lazy(() => import('@/pages/test'));

function Navigation() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Test />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default Navigation;
