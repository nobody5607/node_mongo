/**
 *
 * @param {*} message
 * @param {*} data
 * @returns object {status:'ok', data:[]}
 */
export const responseSuccess = (message, data = []) => {
  return { status: "ok", message: message, data: data };
};
/**
 *
 * @param {*} message
 * @returns object {status:'nok', data:[]}
 */
export const responseError = (message, error) => {
  return { status: "nok", message: message, error };
};

export const logMessage = (message) => {
  console.log(`+++${message}+++`);
  return true;
};
export default {
  responseSuccess,
  responseError,
  logMessage
};
