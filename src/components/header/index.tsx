import {
  header,
  headerLogo,
  headerUl,
  headerList,
  headerButton,
  headerContainer,
  headerBtns,
  langButton,
  dropdownMenu,
  dropdownButton,
  signInBtp,
} from '@/utils/cva';
import dark from '@/assets/svg/dark.svg';
import light from '@/assets/svg/light.svg';
import search from '@/assets/svg/search.svg';

import language from '@/assets/svg/language.svg';
import languagelight from '@/assets/svg/languagelight.svg';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import i18n from '@/i18n';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation('layout');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  if (!mounted) return null;
  const handleLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsDropdownOpen(false);
  };
  return (
    <header className={header()}>
      <div className={headerContainer()}>
        <div className={headerLogo()}>BitBlogs</div>
        <ul className={headerUl()}>
          <li className={headerList()}>
            <Link to="/" className={headerList({ child: 'a' })}>
              {t('home')}
            </Link>
          </li>
          <li className={headerList()}>
            <a href="" className={headerList({ child: 'a' })}>
              {t('write')}
            </a>
          </li>
          <li className={headerList()}>
            <a href="" className={headerList({ child: 'a' })}>
              {t('about')}
            </a>
          </li>
        </ul>
        <div className={headerBtns()}>
          <button>
            <img src={search} alt="search icon" />
          </button>
          <Link to="login" className={signInBtp()}>
            Sign in
          </Link>
          <div className="relative">
            <button
              className={langButton()}
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              <img
                src={theme === 'dark' ? languagelight : language}
                alt="language icon"
              />
            </button>

            {isDropdownOpen && (
              <div className={dropdownMenu()}>
                <button
                  onClick={() => handleLanguage('en')}
                  className={dropdownButton()}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguage('ka')}
                  className={dropdownButton()}
                >
                  Georgian
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={headerButton()}
          >
            {theme === 'dark' ? (
              <img src={light} alt="Light mode" />
            ) : (
              <img src={dark} alt="Dark mode" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
