import { gsap } from 'gsap';

export const handleCharAnimation = (payload, animationClassNames) => {
  payload.item.classList.add(...animationClassNames)
  payload.item.addEventListener('animationend', () => {
    payload.item.classList.remove(...animationClassNames)
  })
}

export const handleIntroAnimation = () => {

}