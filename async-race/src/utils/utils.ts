/* eslint-disable no-param-reassign */
import { ICar, IDriveRequest } from '../types/interfaces';

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

export const resetAnimation = (element: HTMLElement | SVGSVGElement): void => {
  element.style.transform = 'none';
};

export const closePopup = (event: Event): void => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('popup__body')) return;
  const popup = document.querySelector('.popup') as HTMLElement;
  popup.remove();
};

export const showPopup = (winnerCar: ICar): void => {
  const messageElement = `
    <div class="popup">
      <div class="popup__body">
        <div class="popup__content">
          ${winnerCar.name} wins the race with a time of ${winnerCar.time}s !
        </div>
        <div class="popup__close">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
            <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', messageElement);
  const popup = document.querySelector('.popup') as HTMLElement;
  popup?.addEventListener('click', closePopup);
};

export const checkRadioButton = (event: Event): void => {
  const target = event.target as HTMLElement;
  if (!target.classList.contains('button-radio')) return;
  event.preventDefault();
  const carElement = target?.closest('.car') as HTMLInputElement;
  const radioInput = carElement.querySelector('.car__radio') as HTMLInputElement;
  if (radioInput) radioInput.checked = !radioInput.checked;
};
