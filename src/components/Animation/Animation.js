import React, { useEffect } from 'react'

export const Animation = () => {
     let image = null
     let offsetReal = null
     let offsetPre = null
     let offsetBlock = null
     let pageH = null

     window.onscroll = function () {
          scrollRotate()
     }

     const WindowChange = () => {
          pageH = window.outerHeight
     }

     window.addEventListener('resize', WindowChange)
     useEffect(() => {
          WindowChange()
     })

     const scrollRotate = () => {
          //IMAGE ANIMATION
          let offsetRealMinus = 200
          let offsetPresMinus = 400
          let offsetBlockMinus = 450
          if (window.innerWidth < 700) {
               offsetRealMinus = 100
               offsetPresMinus = 150
               offsetBlockMinus = 150
          }
          offsetReal = document.getElementsByClassName('realEstate')
          image = document.getElementsByClassName('realEstateRightSVG')
          let SectionStart = offsetReal[0].offsetTop - offsetRealMinus
          let SectionEnd = offsetReal[0].offsetTop + 470 - offsetRealMinus
          let WindowsPosition = window.pageYOffset
          let Move = WindowsPosition - SectionStart

          if (SectionStart <= WindowsPosition && SectionEnd >= WindowsPosition) {
               image[0].style.transform = `translateY(${Move / 5}px)`
               image[2].style.transform = `translateY(${Move / 5}px)`
          }
          offsetPre = document.getElementsByClassName('presentaion')
          let SectionStartPre = offsetPre[0].offsetTop - offsetPresMinus
          let SectionEndPre = offsetPre[0].offsetTop + 470 - offsetPresMinus
          let WindowsPositionPre = window.pageYOffset
          let MovePre = WindowsPosition - SectionStartPre
          if (SectionStartPre <= WindowsPositionPre && SectionEndPre >= WindowsPositionPre) {
               image[3].style.transform = `translateY(${MovePre / 5}px)`
               image[5].style.transform = `translateY(${MovePre / 5}px)`
          }

          offsetBlock = document.getElementsByClassName('blockchain')
          let SectionStartBlock = offsetBlock[0].offsetTop - offsetBlockMinus
          let SectionEndBlock = offsetBlock[0].offsetTop + 470 - offsetBlockMinus
          let WindowsPositionBlock = window.pageYOffset
          let MoveBlock = WindowsPosition - SectionStartBlock
          if (SectionStartBlock <= WindowsPositionBlock && SectionEndBlock >= WindowsPositionBlock) {
               image[6].style.transform = `translateY(${MoveBlock / 5}px)`
               image[8].style.transform = `translateY(${MoveBlock / 5}px)`
          }

          //OPACITY CHANGE

          let dataScience = document.getElementsByClassName('dataScience')
          let presentation = document.getElementsByClassName('presentaion')
          let partners = document.getElementsByClassName('partners')
          let blockchain = document.getElementsByClassName('blockchain')
          let properties = document.getElementsByClassName('properties')
          let company = document.getElementsByClassName('company')
          let project = document.getElementsByClassName('project')
          let pieChart = document.getElementsByClassName('pieChart')
          let team = document.getElementsByClassName('team')
          let roadmap = document.getElementsByClassName('roadmap')
          let windowPositon = WindowsPosition + pageH - pageH / 5

          //DATA SCIENCE
          let dataPosition = windowPositon - dataScience[0].offsetTop
          dataPosition = dataPosition / 400

          if (dataScience[0].offsetTop < windowPositon) {
               if (dataPosition < 1) {
                    dataScience[0].style.opacity = dataPosition
               } else {
                    dataScience[0].style.opacity = 1
               }
          } else {
               dataScience[0].style.opacity = 0
          }

          //PRESENTATION
          let PresentationPosition = windowPositon - presentation[0].offsetTop
          PresentationPosition = PresentationPosition / 400

          if (presentation[0].offsetTop < windowPositon) {
               if (PresentationPosition < 1) {
                    presentation[0].style.opacity = PresentationPosition
               } else {
                    presentation[0].style.opacity = 1
               }
          } else {
               presentation[0].style.opacity = 0
          }

          //PARTNERS
          let partnersPosition = windowPositon - partners[0].offsetTop
          partnersPosition = partnersPosition / 400

          if (presentation[0].offsetTop < windowPositon) {
               if (partnersPosition < 1) {
                    partners[0].style.opacity = partnersPosition
               } else {
                    partners[0].style.opacity = 1
               }
          } else {
               partners[0].style.opacity = 0
          }

          //BLOCKCHAIN
          let blockchainPosition = windowPositon - blockchain[0].offsetTop
          blockchainPosition = blockchainPosition / 300

          if (presentation[0].offsetTop < windowPositon) {
               if (blockchainPosition < 1) {
                    blockchain[0].style.opacity = blockchainPosition
               } else {
                    blockchain[0].style.opacity = 1
               }
          } else {
               blockchain[0].style.opacity = 0
          }

          //PROPERTIES
          let propertiesPosition = windowPositon - properties[0].offsetTop
          propertiesPosition = propertiesPosition / 300

          if (presentation[0].offsetTop < windowPositon) {
               if (propertiesPosition < 1) {
                    properties[0].style.opacity = propertiesPosition
               } else {
                    properties[0].style.opacity = 1
               }
          } else {
               properties[0].style.opacity = 0
          }

          //COMPANY
          let companyPosition = windowPositon - company[0].offsetTop
          companyPosition = companyPosition / 300

          if (presentation[0].offsetTop < windowPositon) {
               if (companyPosition < 1) {
                    company[0].style.opacity = companyPosition
               } else {
                    company[0].style.opacity = 1
               }
          } else {
               company[0].style.opacity = 0
          }

          //PROJECT
          let projectPosition = windowPositon - project[0].offsetTop
          projectPosition = projectPosition / 300

          if (presentation[0].offsetTop < windowPositon) {
               if (projectPosition < 1) {
                    project[0].style.opacity = projectPosition
               } else {
                    project[0].style.opacity = 1
               }
          } else {
               project[0].style.opacity = 0
          }

          //PIE CHART
          let pieChartPosition = windowPositon - pieChart[0].offsetTop
          pieChartPosition = pieChartPosition / 300

          if (presentation[0].offsetTop < windowPositon) {
               if (pieChartPosition < 1) {
                    pieChart[0].style.opacity = pieChartPosition
               } else {
                    pieChart[0].style.opacity = 1
               }
          } else {
               pieChart[0].style.opacity = 0
          }

          //TEAM
          let teamPosition = windowPositon - team[0].offsetTop
          teamPosition = teamPosition / 300

          if (presentation[0].offsetTop < windowPositon) {
               if (teamPosition < 1) {
                    team[0].style.opacity = teamPosition
               } else {
                    team[0].style.opacity = 1
               }
          } else {
               team[0].style.opacity = 0
          }
          //ROADMAP
          let roadmapPosition = windowPositon - roadmap[0].offsetTop
          roadmapPosition = roadmapPosition / 300

          if (presentation[0].offsetTop < windowPositon) {
               if (roadmapPosition < 1) {
                    roadmap[0].style.opacity = roadmapPosition
               } else {
                    roadmap[0].style.opacity = 1
               }
          } else {
               roadmap[0].style.opacity = 0
          }
     }
     return <></>
}
