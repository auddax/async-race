import { IDriveRequest, IWinners } from '../types/interfaces';

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
  elementId: string,
  requestId: IDriveRequest,
  easing: (progress: number) => number,
): void => {
  let start: null | number = null;
  const { right } = element.getBoundingClientRect();
  // TODO: remove magic number (40)
  const distance = document.documentElement.clientWidth - (right + 40);
  requestId[elementId] = requestAnimationFrame(function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / duration;
    element.style.transform = `translateX(${easing(progress) * distance}px)`;
    if (progress < 1) {
      requestId[elementId] = requestAnimationFrame(animate);
    }
  });
};

export const closePopup = () => {
  const popup = document.querySelector('.popup') as HTMLElement;
  popup.remove();
};

export const showPopup = (winnerCar: IWinners): void => {
  const [carName, duration] = Object.entries(winnerCar).flat();
  const messageElement = `
    <div class="popup">
      <div class="popup__body">
        <div class="popup__content">
          ${carName} wins the race with a time of ${(Number(duration) / 1000).toFixed(2)}s !
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', messageElement);
  const popup = document.querySelector('.popup') as HTMLElement;
  popup?.addEventListener('click', closePopup);
};
