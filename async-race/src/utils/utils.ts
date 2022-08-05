import { IDriveRequest } from '../types/interfaces';

/* eslint-disable no-param-reassign */
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

export const startAnimation = (
  element: HTMLElement | SVGSVGElement,
  duration: number,
  carId: string,
  requestId: IDriveRequest,
  easing: (progress: number) => number,
) => {
  let start: null | number = null;
  const { right } = element.getBoundingClientRect();
  const distance = document.documentElement.clientWidth - (right + 40);
  requestId[carId] = requestAnimationFrame(function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / duration;
    element.style.transform = `translateX(${easing(progress) * distance}px)`;
    if (progress < 1) {
      requestId[carId] = requestAnimationFrame(animate);
    }
  });
};
