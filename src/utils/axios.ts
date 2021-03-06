/* eslint-disable no-debugger */
import axios from 'axios';

// Remove this function and import function getting token from local storage.
const getToken = async () => {
  return localStorage.getItem('token');
};

/**
 * @description Get authorization token
 * @return {String}
 */
export const onGetToken = async (): Promise<string | boolean> => {
  // Call function to get token
  const token = await getToken();
  if (token) {
    return token; // Second fallback from local storage state
  }
  return false;
};

/**
 * @description Get {Object} header based on the variant
 * @param {String} type
 * @define type: possible values 'authorization' || 'public'
 * @return {Object}
 */
export const onGetHeaders = async (type: string): Promise<any> => {
  //
  const ALL_TYPES = ['authorization', 'public'];
  if (!type) {
    throw new Error('request func internal onGetHeaders arg @param type is missing');
  }
  if (!ALL_TYPES.includes(type)) {
    throw new Error(`
      request func internal onGetHeaders arg @param type can only be
      ${ALL_TYPES.join(',')}
    `);
  }
  if (type === 'authorization') {
    const authorizationToken = await onGetToken();
    return {
      authorization: `Bearer ${authorizationToken}`,
    };
  }
  if (type === 'public') {
    return {
      // origin: 'https:localhost:3000',
      'Content-Type': 'application/json',
    };
  }
  return {};
};

/**
 * @description Call an asynchronous XHR request
 * @param {String} url* required
 * @param {String} method* required
 * @param {Object} data optional
 * @param {Signal} cancelToken optional
 * @param {Object} customHeader optional
 * @param {String} headerVariant* required, by default 'authorization'
 * @param {boolean} autoHeaderVariant optional
 * @return {Object} XHR response
 */
const request = async ({
  url,
  method,
  data,
  params,
  cancelToken,
  customHeaders,
  headerVariant = 'public',
  autoHeaderVariant,
  ...rest
}: any) => {
  if (!url) {
    throw new Error('request func arg @param url is missing');
  }
  if (!method) {
    throw new Error(
      'request func arg @param method is missing. Valid options "GET"|"POST"|"PUT" etc',
    );
  }

  // Overrides headers object based on variant if "customHeaders" object provided
  const authHeaders = await onGetHeaders(headerVariant);

  const headers = autoHeaderVariant ? undefined : { ...customHeaders, ...authHeaders };

  // eslint-disable-next-line no-useless-catch
  try {
    const result = await axios(url, {
      method,
      headers,
      ...(data && { data }),
      ...(params && { params }),
      ...(cancelToken && { cancelToken }),
      ...rest,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const setupInterceptors = ({ debug = false }) => {
  /**
   * @description echo() prints a message if allowed, of a certain type of console variant
   * @param {*} show {Boolean}
   * @param {*} type {String} Can be log, warn, debug
   * @param {*} message {String}
   */
  const echo = ({ show }: any) => {
    if (!show) {
      /* eslint-disable no-console */
      console.log('');
    }
    /* eslint-disable no-console */
    // console.group('???????? @@@AXIOS INTERCEPTOR@@@ ????????');
    // console[type](message);
    // console.groupEnd('@@@AXIOS INTERCEPTOR@@@');
    /* eslint-enable */
  };

  axios.interceptors.response.use(
    (response) => {
      echo({ show: debug, type: 'dir', message: response });
      return response;
    },
    (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status } = error.response;
        if (status === 401) {
          // 401 status means unauthorized
          // Add code to handle unauthorized request
        }
        if (status === 404) {
          // 404 status means not found
          // Add code to handle a request whin API is not available
        }
        if (status === 500) {
          // 500 status means server error
          // Add code to handle when error happens on tne server
        }
      } else if (error.request) {
        // Request made, but no response was received
        echo({ show: debug, type: 'dir', message: error.request });
      } else {
        echo({
          show: debug,
          type: 'warn',
          message: `Something occurred setting the request that set off an error ${error.message}`,
        });
      }
      return Promise.reject(error);
    },
  );
};

axios.create();
export default request;

// export const cacheApiCalls = async (cacheKey, url, method, data) => {
//   if (inProgressAPI[cacheKey]) {
//     return inProgressAPI[cacheKey];
//   }
//   inProgressAPI[cacheKey] = new Promise((resolve, reject) => {
//     executeAPICall(url, method, data)
//       .then((res) => resolve(res))
//       .catch((err) => reject(err))
//       .finally(() => {
//         setTimeout(() => {
//           delete inProgressAPI[cacheKey];
//         }, 500);
//       });
//   });
//   return inProgressAPI[cacheKey];
// };
