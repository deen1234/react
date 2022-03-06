import { APP_EK } from 'configs';
import moment from 'moment';
import * as CryptoJS from './crypto';

export const SKey = APP_EK || 'abc';
type GenericObject = { [key: string]: any };

/**
 * @description Save data into browser localStorage
 * @param {String} key
 * @param {GenericObject} data
 * @param {boolean} isJson
 * @param {boolean} isEncrypted
 * @define key: Key name for localStorage
 * @define data: any kind of data to store in localStorage
 * @define isJson: if data is Json then it should if true else false
 * @define isEncrypted: if data needs to be encrypted then mark as true
 * @return {void}
 */
export const saveToLocal = (
  key: string,
  data: GenericObject | string,
  isJson = true,
  isEncrypted = false,
): void => {
  let saveData: any = data;
  if (data && isJson) {
    saveData = JSON.stringify(data);
  }
  if (saveData && isEncrypted) {
    saveData = CryptoJS.AES.encrypt(saveData, SKey).toString();
  }
  global.localStorage.setItem(key, saveData);
};

/**
 * @description Get data from browser localStorage
 * @param {String} key
 * @param {boolean} isJson
 * @param {boolean} isEncrypted
 * @define key: Key name for localStorage
 * @define isJson: if data is Json then it should if true else false
 * @define isEncrypted: if data is encrypted then mark as true
 * @return {any}
 */
export const getFromLocal = (key: string, isJson = true, isEncrypted = false): string | null => {
  let data = global.localStorage.getItem(key);
  if (data && isEncrypted) {
    const bytes = CryptoJS.AES.decrypt(data.toString(), SKey);
    data = bytes.toString(CryptoJS.encUTF8);
  }
  if (data && isJson) {
    data = JSON.parse(data);
  }
  return data;
};

/**
 * @description Remove data from browser localStorage
 * @param {String} key
 * @define key: Key name for localStorage
 * @return {void}
 */
export const removeFromLocal = (key: string): void => {
  global.localStorage.removeItem(key);
};

/**
 * @description check data exists in browser localStorage
 * @param {String} key
 * @define key: Key name for localStorage
 * @return {boolean}
 */
export const existInLocal = (key: string): boolean => global.localStorage.getItem(key) != null;

/**
 * @description Save data into localStorage with Expiry
 * @param {String} key
 * @param {any} data
 * @param {Date} expiry
 * @define key: Key name for localStorage
 * @define data: any kind of data to store in localStorage
 * @define expiry: Date time to set the expiry
 * @return {void}
 */
export const saveInLocalWithExpiry = (key: string, data: GenericObject, expiry: Date): void => {
  const dataToSave: any = {
    data,
    expiresAt: expiry,
  };
  saveToLocal(key, dataToSave);
};

/**
 * @description get data from localStorage with Expiry boolean
 * @param {String} key
 * @define key: Key name for localStorage
 * @return {object}
 */
export const getFromLocalWithExpiry = (key: string): any => {
  const savedData: any = getFromLocal(key);
  let response: any = null;

  if (savedData) {
    const { expiresAt } = savedData;

    // if current time is after the saved expiry
    const isExpired = moment().isAfter(expiresAt);

    response = {
      isExpired,
      data: savedData.data,
    };
  }

  return response;
};
