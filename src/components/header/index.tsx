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
} from '@/utils/cva';
import dark from '@/assets/svg/dark.svg';
import light from '@/assets/svg/light.svg';
import search from '@/assets/svg/search.svg';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import language from '@/assets/svg/language.svg';
import languagelight from '@/assets/svg/languagelight.svg';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import i18n from '@/i18n';
import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import { useAuthContext } from '@/context/auth/hooks/useAuthContext';
import { useMutation } from 'react-query';
import { logout } from '@/context/auth/';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation('layout');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  const { user, handleSetUser } = useAuthContext();

  const { mutate: handleLogout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await logout();
      handleSetUser(null);
    },
  });

  useEffect(() => {
    setMounted(true);

    if (user) {
      const avatar = createAvatar(avataaars, {
        seed: user.id || 'default-seed',
        backgroundColor: ['F5F5F5'],
        radius: 50,
      });

      const avatarSVG = avatar.toString();
      const base64Avatar = `data:image/svg+xml;base64,${btoa(
        unescape(encodeURIComponent(avatarSVG))
      )}`;
      setAvatarSrc(base64Avatar);
    }
  }, [user]);

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
            <Link to="/about" className={headerList({ child: 'a' })}>
              {t('about')}
            </Link>
          </li>
        </ul>
        <div className={headerBtns()}>
          <button>
            <img src={search} alt="search icon" />
          </button>
          {user ? (
            <button
              className={buttonVariants({ variant: 'default' })}
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          ) : (
            <Link to="login" className={buttonVariants({ variant: 'default' })}>
              Sign in
            </Link>
          )}

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
          {user ? (
            <div className="user-avatar">
              <Link to="/profile">
                <Avatar>
                  <AvatarImage src={avatarSrc || ''} alt="user avatar" />
                </Avatar>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
