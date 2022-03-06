/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import i18next from 'i18next';

export const getTranslated = (listName: string, obj: any): string => {
  const newItem = i18next.language !== 'en' ? `${i18next.language}_${listName}` : listName;
  return obj?.[newItem];
};

export const tarnsformArray = (item: any, lang: string) => {
  if (!item) {
    return { value: null, label: '' };
  }
  const label = lang !== 'en' ? item[`${lang}_name`] : item?.name;
  return { value: item?.id.toString(), label };
};
