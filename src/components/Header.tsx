
import { useState } from 'react';
import { User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg">
              <span className="font-bold text-xl">AN</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
              AngularNews
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Início
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Favoritos
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Configurações
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100">
              <User size={20} />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                Início
              </a>
              <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                Favoritos
              </a>
              <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                Configurações
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
