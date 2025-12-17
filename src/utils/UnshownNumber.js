export const UnshownNumber = (number) => {
  if (!number) return "****";

  const str = String(number);

  if (str.length < 4) return "****";
  return "****";
};