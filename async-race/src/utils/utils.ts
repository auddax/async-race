export const generateRandomColor = ():string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRandomCarName = (carBrand: string[], carModel: string[]): string => {
  const indexBrand = Math.floor(Math.random() * carBrand.length);
  const indexModel = Math.floor(Math.random() * carModel.length);
  const carName = `${carBrand[indexBrand]} ${carModel[indexModel]}`;
  return carName;
};
