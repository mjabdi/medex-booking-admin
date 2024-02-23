
export const getIsDoctor = () => {
  return sessionStorage.getItem("medexadmin-isdoctor") === 'true';
}
export const setIsDoctor = (isDoctor) => {
  return sessionStorage.setItem("medexadmin-isdoctor", String(isDoctor));
};

export const clearIsDoctor = () => {
  return sessionStorage.removeItem("medexadmin-isdoctor");
}