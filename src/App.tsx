import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import FreeDownloadPage from "./pages/FreeDownloadPage";
import ThankYouPage from "./pages/ThankYouPage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";

type Page =
  | "landing"
  | "free-download"
  | "thank-you"
  | "shop"
  | "login"
  | "dashboard"
  | "admin";

interface PageData {
  email?: string;
  name?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [pageData, setPageData] = useState<PageData>({});

  const handleNavigate = (page: string, data?: PageData) => {
    setCurrentPage(page as Page);
    if (data) {
      setPageData(data);
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

        {currentPage === "landing" && (
          <LandingPage onNavigate={handleNavigate} />
        )}
        {currentPage === "free-download" && (
          <FreeDownloadPage
            onNavigate={handleNavigate}
            email={pageData.email}
            name={pageData.name}
          />
        )}
        {currentPage === "thank-you" && (
          <ThankYouPage onNavigate={handleNavigate} />
        )}
        {currentPage === "shop" && <ShopPage onNavigate={handleNavigate} />}
        {currentPage === "login" && <LoginPage onNavigate={handleNavigate} />}
        {currentPage === "dashboard" && (
          <DashboardPage onNavigate={handleNavigate} />
        )}
        {currentPage === "admin" && <AdminPage onNavigate={handleNavigate} />}

        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">RH</h3>
                <p className="text-gray-400 text-sm">
                  Votre partenaire pour une gestion RH simplifiée et conforme
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Documents</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <button
                      onClick={() => handleNavigate("shop")}
                      className="hover:text-white"
                    >
                      Contrats de travail
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate("shop")}
                      className="hover:text-white"
                    >
                      Fiches de paie
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate("shop")}
                      className="hover:text-white"
                    >
                      Documents formation
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Entreprise</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      À propos
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Légal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Mentions légales
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      CGV
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Politique de confidentialité
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} RH. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
