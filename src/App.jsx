import { BrowserRouter } from 'react-router-dom';
import { Navbar } from "./components/shared/Navbar";
import Footer from './components/shared/Footer';
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;