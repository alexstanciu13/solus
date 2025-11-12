import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Default to Romanian
  const locale = 'ro';

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default
  };
});
