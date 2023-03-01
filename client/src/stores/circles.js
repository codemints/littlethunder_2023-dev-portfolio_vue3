import { defineStore } from 'pinia'
import { useDarkModeStore} from '@store/darkmode.js'
import siteColors from '@lib/site-colors'

const { clr600, clr400, clr200, clr100, clrBlue, clrOrange } = siteColors

class Circle {
  constructor(x, y, r, c, velocity, ctx, canvas) {
    this.x = x
    this.y = y
    this.r = r
    this.c = c
    this.dx = (Math.random() * velocity) + 1
    this.dx *= Math.floor(Math.random() * 2) === 1 ? 0.4 : -0.4
    this.dy = (Math.random() * velocity) + 1
    this.dy *= Math.floor(Math.random() * 2) === 1 ? 0.4 : -0.4
    this.ctx = ctx
    this.canvas = canvas
  }

  drawCircle() {
    this.ctx.beginPath()
    this.ctx.fillStyle = this.c
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
    this.ctx.fill()
    this.ctx.shadowOffsetX = 2
    this.ctx.shadowOffsetY = 2
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.075)'
    this.ctx.shadowBlur = 5
  }

  animateCircle() {
    this.x += this.dx
    this.y += this.dy

    if ( this.x + this.r > this.canvas.width || this.x - this.r < 0 ) {
      this.dx = -this.dx
    }
    if ( this.y + this.r > this.canvas.height || this.y - this.r < 0 ) {
      this.dy = -this.dy
    }

    this.drawCircle()
  }
}


export const useCirclesStore = defineStore('circles', {
  state: () => {
    const storedColorScheme = localStorage.getItem('colorScheme')
    return {
      circleColors: {
        darkColors: [clr600, clr400],
        lightColors: [clr200, clr100],
        seedColors: storedColorScheme === 'dark'
          ? [clr600, clr400]
          : [clr200, clr100],
        clickColors: [clrBlue, clrOrange],  
      },
      circleData: {
        canvas: null,
        ctx: null,
        minCircleSize: null,
        maxCircleSize: null,
        minCirclePopulation: null,
        maxCirclePopulation: null,
        initialVelocity: null,
        currentVelocity: null,
        animationFrame: -1,
        offset: null,
        circleArray: [],
        isStopped: false,
        isCleared: false,
      }
    }
  },
  actions: {
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    setRandomPostion(lengthOrWidth, r) {
      return Math.random() * (this.circleData.canvas[lengthOrWidth] - r * 2) + r
    },
    getRandomColor(colorArray) {
      return colorArray[Math.floor(Math.random() * colorArray.length)]
    },
    setCircleData(config) {
      this.circleData.canvas = config.canvas
      this.circleData.ctx = config.canvas.getContext('2d')
      this.circleData.minCircleSize = config.minCircleSize
      this.circleData.maxCircleSize = config.maxCircleSize
      this.circleData.minCirclePopulation = config.minCirclePopulation
      this.circleData.maxCirclePopulation = config.maxCirclePopulation
      this.circleData.initialVelocity = config.initialVelocity
      this.circleData.currentVelocity = config.initialVelocity
      this.circleData.offset = config.offset
      this.circleData.circleArray = this.populateCirclesArray(
        this.circleData.minCirclePopulation,
        this.circleData.maxCirclePopulation,
        this.circleData.minCircleSize,
        this.circleData.maxCircleSize
        )
    },
    populateCirclesArray(minQuantity, maxQuantity, minSize, maxSize) {
      const population = this.getRandomNumber(minQuantity, maxQuantity)

      return Array.from({ length: population }).reduce((circles) => {
        const rad = this.getRandomNumber(minSize, maxSize)
        const x = this.setRandomPostion('width', rad)
        const y = this.setRandomPostion('height', rad)
        const color = this.getRandomColor(this.circleColors.seedColors)
        circles.push(new Circle(
          x, y, rad, color,
          this.circleData.currentVelocity,
          this.circleData.ctx,
          this.circleData.canvas
          ))
        return circles
      }, [])
    },
    drawToCanvas() {
      this.circleData.ctx.clearRect(0, 0, this.circleData.canvas.width, this.circleData.canvas.height)
      this.circleData.circleArray.forEach((circle) => {
        circle.animateCircle()
      })
      this.circleData.animationFrame = requestAnimationFrame(this.drawToCanvas)
    },
    spawnNewCircle(e) {
      if ( this.circleData.isStopped || this.circleData.isCleared ) return
      const x = e.offsetX
      const y = (e.offsetY - this.circleData.offset) + window.scrollY
      const rad = this.getRandomNumber(this.circleData.minCircleSize, this.circleData.maxCircleSize)
      const color = this.getRandomColor(this.circleColors.clickColors)
      this.circleData.circleArray.push(new Circle(
        x, y, rad, color,
        this.circleData.currentVelocity,
        this.circleData.ctx,
        this.circleData.canvas
        ))
    },
    changeVelocity(e) {
      if ( this.circleData.isStopped || this.circleData.isCleared ) return
      e.target.dataset.function === 'increase'
      ? this.circleData.currentVelocity += 0.375
      : this.circleData.currentVelocity -= 0.375

      this.circleData.circleArray.forEach(circle => {
        if (e.target.dataset.function === 'increase') {
          circle.dx *= 1.25
          circle.dy *= 1.25
        } else if (e.target.dataset.function === 'decrease') {
          circle.dx *= 0.75
          circle.dy *= 0.75
        }
      })
    },
    scatterCanvas() {
      if ( this.circleData.isStopped || this.circleData.isCleared ) return
      this.circleData.circleArray.forEach((circle, index, array) => {
        circle.dx *= 0.25
        circle.dy *= 0.25
        const direction = this.getRandomNumber(-25,25)
        const dxOperator = Math.random() < 0.5 ? -1 : 1
        const dyOperator = Math.random() < 0.5 ? -1 : 1

        dxOperator > 0
          ? circle.dx += direction
          : circle.dx -= direction
        dyOperator < 0
          ? circle.dy -= direction
          : circle.dy += direction
      })

    },
    clearCanvas() {
      if ( this.circleData.isCleared ) return false

      cancelAnimationFrame(this.circleData.animationFrame)
      
      this.circleData.ctx.clearRect(0, 0, this.circleData.canvas.width, this.circleData.canvas.height)
      
      this.circleData.currentVelocity = this.circleData.initialVelocity
      
      this.circleData.circleArray = this.populateCirclesArray(
        this.circleData.minCirclePopulation,
        this.circleData.maxCirclePopulation,
        this.circleData.minCircleSize,
        this.circleData.maxCircleSize
      )
        
      this.circleData.isStopped = false
      this.circleData.isCleared = true

      return true
    },

    stopCanvas(state) {
      if ( this.circleData.isCleared ) return true

      if ( state ) {
        requestAnimationFrame(this.drawToCanvas)
        this.circleData.isStopped = false
      } else {
        cancelAnimationFrame(this.circleData.animationFrame)
        this.circleData.isStopped = true
      }
    },

    redrawCanvas() {
      console.log(this.circleData.isCleared)
      if ( !this.circleData.isCleared ) return false

      this.circleData.circleArray = this.populateCirclesArray(
        this.circleData.minCirclePopulation,
        this.circleData.maxCirclePopulation,
        this.circleData.minCircleSize,
        this.circleData.maxCircleSize
      )

      this.updateCircleColor()
      this.updateCircleVelocity()

      this.circleData.animationFrame = requestAnimationFrame(this.drawToCanvas)

      this.circleData.isStopped = false
      this.circleData.isCleared = false

      return true
    },

    updateCircleVelocity() {
      this.circleData.circleArray.forEach((circle) => {
        circle.dx *= 0.5
        circle.dy *= 0.5
      })
    },

    updateCircleColor() {
      const darkModeStore = useDarkModeStore()

      this.circleData.circleArray.forEach((circle) => {
        const newCircleColor =
        darkModeStore.isDark
          ? this.circleColors.darkColors[this.circleColors.lightColors.indexOf(circle.c)]
          : this.circleColors.lightColors[this.circleColors.darkColors.indexOf(circle.c)]
        if ( !newCircleColor ) return false
        else circle.c = newCircleColor
      })
    }
  }
})