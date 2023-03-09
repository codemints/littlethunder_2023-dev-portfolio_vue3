import { defineStore } from 'pinia'

export const useAccordionStore = defineStore('accordion', {
  state: () => {
    return {
      accordionHeight: null,
      activePanel: null,
      panelData: [
        {
          position: 'Developer & Designer',
          company: 'MadWire',
          date: '2019 to Present',
          location: 'Fort Collins, CO',
          description: 'Collaborate with a multi-disciplinary team to develope frontend solutions for a variety of clients, maintain existing codebase, and modernize legacy codebase to improve functionality and efficiency.',
          skills: [
            'JavaScript', 'PHP', 'HTML', 'CSS', 'WordPress', 'Shopify', 'Photoshop', 'Illustrator', 'InDesign', 'Figma',
          ],
          isOpen: true,
          panelHeight: null,
        },
        {
          position: 'Developer & Designer',
          company: 'Boomerang Marketing',
          date: '2018 to 2019',
          location: 'Aurora, CO',
          description: 'Manage print, digital, and web design projects for a diverse range of clients to solidify brand identity, improve brand awareness, and improve user experience.',
          skills: [
            'JavaScript', 'PHP', 'HTML', 'CSS', 'WordPress', 'Photoshop', 'Illustrator', 'InDesign'
          ],
          isOpen: null,
          panelHeight: null,
        },
        {
          position: 'Developer & Designer',
          company: 'Ludwig Photography',
          date: '2015 to 2018',
          location: 'Laramie, WY',
          description: 'Collaborate with a small photography studio team to create a brand voice across web, digital, and print medias.',
          skills: [
            'JavaScript', 'PHP', 'HTML', 'CSS', 'WordPress', 'Shopify', 'Photoshop', 'Illustrator', 'Lightroom'
          ],
          isOpen: null,
          panelHeight: null,
        },
      ]
    }
  },
  actions: {
    setPanelHeight(index, height) {
      this.panelData[index].panelHeight = height
    },
    toggleOpen(index) {
      this.panelData[index].isOpen = !this.panelData[index].isOpen
    },
    setAccordionHeight(height) {
      this.accordionHeight = height
    },
    setActivePanel(index) {
      this.activePanel = index
    }
  }
})