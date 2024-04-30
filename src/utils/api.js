export const mapResponseApiData = (data) => {
  return Object.entries(data).map(([key, value]) => ({
    ...value,
    id: key,
  }));
};
