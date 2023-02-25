import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

export const useAnimateChars = (payload, animationClassNames) => {
  payload.item.classList.add(...animationClassNames)

  payload.item.addEventListener('animationend', () => {
    payload.item.classList.remove(...animationClassNames)
  })
}

export const useAnimateIntro = (elements, animateClassNames) => {
  const [ title, heading, subtitle, button ] = elements
  const tl = gsap.timeline()
  console.log(tl.data)

  tl.from(title, {
    y: -500,
    opacity: 0,
    duration: 1.5,
    ease: 'bounce.out',
  })
  
  tl.from(heading , {
    opacity: 0,
    duration: 0.15,
    ease: 'linear',
    stagger: {
      each: 0.05,
      onStart() {
        this._targets[0].classList.add(...animateClassNames)
      },
      onComplete() {
        const targ = this._targets[0]
        const filteredClasses = animateClassNames.filter(className => className.includes('text-'))
        if ( !targ.classList.contains('char-special') ) {
          targ.classList.remove(...filteredClasses)
        }
      },
    },
    onComplete() {
      this._targets.forEach(targ => {
        targ.addEventListener('animationend', () => {
          if ( !targ.classList.contains('char-special') ) {
            targ.classList.remove(...animateClassNames)
          }
        })
      })
    }
  })

  tl.from(subtitle, {
    y: 500,
    opacity: 0,
    duration: 1.5,
    ease: 'bounce.out',
  }, '-=0.5')

  tl.from(button, {
    delay: 0.5,
    duration: 0.5,
    ease: "bounce.out",
    transformOrigin: '0% 0%',
    y: 50,
    rotation: 30,
    opacity: 0,
  })
}
