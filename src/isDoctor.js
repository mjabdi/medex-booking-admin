export const getIsDoctor = () => {
  return sessionStorage.getItem('medexadmin-isDoctor')
}

export const setIsDoctor = (isDoctor) => {
  return sessionStorage.setItem("medexadmin-isDoctor", isDoctor);
};

export const clearIsDoctor = () => {
  return sessionStorage.removeItem("medexadmin-isDoctor");
}