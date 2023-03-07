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
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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