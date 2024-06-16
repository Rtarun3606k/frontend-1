export const get_sessionstorage = () => {
  const data = sessionStorage.getItem("token");
  setInterval(data, 10000);
  return data;
};
export const delete_sessionstorage = () => {
  sessionStorage.removeItem("username");
  return sessionStorage.removeItem("token");
};
