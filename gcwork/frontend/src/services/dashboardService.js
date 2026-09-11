import api from "./api";

/*
 * Get dashboard data from existing backend APIs
 */
export const getDashboardData = async () => {
  const [
    labs,
    computers,
    energy,
    carbon,
  ] = await Promise.all([
    api.get("/labs/"),
    api.get("/computers/"),
    api.get("/energy/"),
    api.get("/carbon/"),
  ]);

  return {
    labs,
    computers,
    energy,
    carbon,
  };
};

/*
 * Get labs
 */
export const getLabs = async () => {
  return await api.get("/labs/");
};

/*
 * Get computers
 */
export const getComputers = async () => {
  return await api.get("/computers/");
};

/*
 * Get energy logs
 */
export const getEnergy = async () => {
  return await api.get("/energy/");
};

/*
 * Get carbon logs
 */
export const getCarbon = async () => {
  return await api.get("/carbon/");
};

export default {
  getDashboardData,
  getLabs,
  getComputers,
  getEnergy,
  getCarbon,
};