import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { NotFoundPage } from "./routes/Routes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
