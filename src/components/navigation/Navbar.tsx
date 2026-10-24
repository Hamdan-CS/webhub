import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { NavItem } from './NavItem';
import { CartIcon } from './CartIcon';
import { ContactButton } from './ContactButton';
import { MobileMenu } from './MobileMenu';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Navbar() {
  const [activeItem, setActiveItem] = useState('About');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(13, 11, 31, 0)', 'rgba(13, 11, 31, 0.8)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'About', hasDropdown: false },
    { label: 'Features', hasDropdown: false },
    { 
      label: 'Usecases',
      hasDropdown: true,
      dropdownItems: ['Enterprise', 'Startup', 'Agency']
    },
    {
      label: 'Integrations',
      hasDropdown: true,
      dropdownItems: ['API', 'Plugins', 'Extensions']
    },
    { label: 'Pricing', hasDropdown: false },
    { label: 'Blog', hasDropdown: false }
  ];

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'shadow-lg shadow-[#00FFFF]/5' : ''
      }`}
      style={{ backgroundColor }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {menuItems.map((item) => (
              <NavItem
                key={item.label}
                label={item.label}
                isActive={activeItem === item.label}
                hasDropdown={item.hasDropdown}
              >
                {item.hasDropdown && (
                  <div className="py-1">
                    {item.dropdownItems.map((dropdownItem) => (
                      <a
                        key={dropdownItem}
                        href="#"
                        className="block px-4 py-2 text-sm text-white hover:bg-[#00FFFF]/10 hover:text-[#00FFFF]"
                      >
                        {dropdownItem}
                      </a>
                    ))}
                  </div>
                )}
              </NavItem>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <CartIcon count={0} />
            <ContactButton />
          </div>

          {/* Mobile Menu */}
          <MobileMenu>
            <div className="py-2">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className="block px-4 py-2 text-white hover:bg-[#00FFFF]/10"
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 py-4 border-t border-[#00FFFF]/10">
                <ContactButton />
              </div>
            </div>
          </MobileMenu>
        </div>
      </div>
    </motion.nav>
  );
}