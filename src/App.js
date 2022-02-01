import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Content from "./components/pages/content";
import Popular from "./components/pages/popular";
import Taiping from "./components/pages/taiping";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/taiping/:name" element={<Taiping />} />
        <Route path="/content/:category/:id" element={<Content />} />
      </Routes>
    </Router>
  );
}

export default App;
