import { useState } from "react";
import { LogIn, User, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const { user, profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo à gauche */}
          <div
            className="flex items-center cursor-pointer flex-shrink-0"
            onClick={() => handleNavigate("landing")}
          >
            <h3 className="logo text-purple-600 font-semiblod">Logo</h3>
          </div>

          {/* Liens centre — visibles uniquement desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigate("landing")}
              className={`${currentPage === "landing" ? "text-purple-600 font-semibold" : "text-gray-700"} hover:text-purple-600 transition-colors`}
            >
              Accueil
            </button>
            <button
              onClick={() => handleNavigate("shop")}
              className={`${currentPage === "shop" ? "text-purple-600 font-semibold" : "text-gray-700"} hover:text-purple-600 transition-colors`}
            >
              Boutique
            </button>
          </div>

          {/* Boutons droite — visibles uniquement desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => handleNavigate("dashboard")}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
                >
                  <User size={18} />
                  <span>{profile?.full_name || "Mon espace"}</span>
                </button>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigate("login")}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                <LogIn size={18} />
                <span>Connexion</span>
              </button>
            )}
          </div>

          {/* Burger — visible uniquement mobile */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            <button
              onClick={() => handleNavigate("landing")}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                currentPage === "landing"
                  ? "bg-purple-50 text-purple-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Accueil
            </button>

            <button
              onClick={() => handleNavigate("shop")}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                currentPage === "shop"
                  ? "bg-purple-50 text-purple-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Boutique
            </button>

            <div className="border-t border-gray-100 pt-2 mt-2">
              {user ? (
                <>
                  <button
                    onClick={() => handleNavigate("dashboard")}
                    className="w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors font-medium"
                  >
                    <User size={18} />
                    <span>{profile?.full_name || "Mon espace"}</span>
                  </button>
                  <button
                    onClick={() => {
                      signOut();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    <LogOut size={18} />
                    <span>Déconnexion</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleNavigate("login")}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-semibold"
                >
                  <LogIn size={18} />
                  <span>Connexion</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
