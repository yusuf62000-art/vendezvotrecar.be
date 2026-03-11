import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

const languageNames = {
  fr: 'Français',
  nl: 'Nederlands',
  en: 'English',
};

export const LanguageSwitcher = ({ compact = false }) => {
  const { language, changeLanguage, languages } = useLanguage();

  if (compact) {
    return (
      <div className="flex items-center justify-center gap-2 text-xs" data-testid="language-switcher-compact">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`px-2 py-1 rounded transition-colors ${
              language === lang
                ? 'bg-brand-primary text-white font-semibold'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            data-testid={`lang-compact-${lang}`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-sm" data-testid="language-switcher">
      <Globe className="h-4 w-4 text-gray-500 mr-1" />
      {languages.map((lang, index) => (
        <span key={lang} className="flex items-center">
          <button
            onClick={() => changeLanguage(lang)}
            className={`px-1 py-0.5 rounded transition-colors ${
              language === lang
                ? 'text-brand-primary font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            data-testid={`lang-${lang}`}
          >
            {languageNames[lang]}
          </button>
          {index < languages.length - 1 && (
            <span className="text-gray-300 mx-1">|</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
