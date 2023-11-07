import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { ReactComponent as Limited } from '../../Icons/ProjectLimited.svg'
import { ReactComponent as Public } from '../../Icons/ProjectPublic.svg'
import { ReactComponent as Locked } from '../../Icons/ProjectLocked.svg'
import { ReactComponent as Real } from '../../Icons/ProjectReal.svg'
import { ReactComponent as Audit } from '../../Icons/ProjectAudit.svg'
import { ReactComponent as Blockchain } from '../../Icons/ProjectBlockchain.svg'
import { Language } from '../../Context'

import './project.css'

const Project = () => {
     const { LanguageUse } = useContext(Language)
     const { t } = useTranslation()

     const handlerPublicTeam = () => {
          var myRef = document.getElementsByClassName('team')
          window.scroll({ behavior: 'smooth', top: myRef[0].offsetTop })
     }

     const handlerLocked = () => {
          window.open(
               'https://app.uncx.network/amm/pancake-v2/pair/0xfa44d799bfdf6537a54461859b388b99a75b8fbc'
          )
     }

     const handlerAudit = () => {
          window.open('https://imo-invest.com/docs/IMO%20Audit%20V2.pdf')
     }
     return (
          <div className='project'>
               <div className='projectComponent'>
                    <div className='projectTitle'>{t('Project')}</div>
                    <div className='projectList'>
                         <div className='projectItem'>
                              <div className='projectItemWrapper'>
                                   <div className='projectItemFront'>
                                        <div className='projectItemIcon'>
                                             <Limited />
                                        </div>
                                        <div className='projectItemText'>
                                             {t('ProjectTitleLIMITED').toUpperCase()}
                                        </div>
                                   </div>
                                   <div className='projectItemBack'>
                                        <div className='projectItemBackText'>{t('ProjectLimited')}</div>
                                   </div>
                              </div>
                         </div>
                         <div className='projectItem'>
                              <div className='projectItemWrapper'>
                                   <div className='projectItemFront'>
                                        <div className='projectItemIcon'>
                                             <Public />
                                        </div>
                                        <div className='projectItemText'>
                                             {t('ProjectTitlePUBLIC').toUpperCase()}
                                        </div>
                                   </div>
                                   <div className='projectItemBack' onClick={handlerPublicTeam}>
                                        <div
                                             className={`projectItemBackText  ${
                                                  LanguageUse === 'en' ? 'underLineEN' : 'underLineFR'
                                             }`}
                                        >
                                             {t('ProjectPublic')}
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className='projectItem'>
                              <div className='projectItemWrapper'>
                                   <div className='projectItemFront'>
                                        <div className='projectItemIcon'>
                                             <Locked />
                                        </div>
                                        <div className='projectItemText'>
                                             {t('ProjectTitleLOCKED').toUpperCase()}
                                        </div>
                                   </div>
                                   <div className='projectItemBack' onClick={handlerLocked}>
                                        <div
                                             className={`projectItemBackText  ${
                                                  LanguageUse === 'en' ? 'underLineEN' : 'underLineFR'
                                             }`}
                                        >
                                             {t('ProjectLocked')}
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className='projectItem'>
                              <div className='projectItemWrapper'>
                                   <div className='projectItemFront'>
                                        <div className='projectItemIcon'>
                                             <Real />
                                        </div>
                                        <div className='projectItemText not'>
                                             {t('ProjectTitleREAL').toUpperCase()}
                                        </div>
                                   </div>
                                   <div className='projectItemBack'>
                                        <div className='projectItemBackText'>{t('ProjectReal')}</div>
                                   </div>
                              </div>
                         </div>
                         <div className='projectItem'>
                              <div className='projectItemWrapper'>
                                   <div className='projectItemFront'>
                                        <div className='projectItemIcon'>
                                             <Audit />
                                        </div>
                                        <div className='projectItemText'>
                                             {t('ProjectTitleAUDIT').toUpperCase()}
                                        </div>
                                   </div>
                                   <div className='projectItemBack' onClick={handlerAudit}>
                                        <div
                                             className={`projectItemBackText  ${
                                                  LanguageUse === 'en' ? 'underLineEN' : 'underLineFR'
                                             }`}
                                        >
                                             {t('ProjectAudit')}
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className='projectItem'>
                              <div className='projectItemWrapper'>
                                   <div className='projectItemFront'>
                                        <div className='projectItemIcon'>
                                             <Blockchain />
                                        </div>
                                        <div className='projectItemText'>
                                             {t('ProjectTitleBLOCKCHAIN').toUpperCase()}
                                        </div>
                                   </div>
                                   <div className='projectItemBack'>
                                        <div className='projectItemBackText'>{t('ProjectBlockchain')}</div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Project
