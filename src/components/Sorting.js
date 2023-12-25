import {
    sortingEl, 
    sortingBtnRecentEl, 
    sortingBtnRelevantEl, 
    state, 
} from '../common.js'
import renderJobList  from './JobList.js'
import renderPaginationButtons from './Pagination.js'

const clickHandler = e => {
    const clickedButtonEl = e.target.closest('.sorting__button')

    if(!clickedButtonEl) return

    //update state
    state.currentPage = 1

   const recent = clickedButtonEl.className.includes('--recent')? true:false

   if (recent) {
    sortingBtnRecentEl.classList.add('sorting__button--active')
    sortingBtnRelevantEl.classList.remove('sorting__button--active')
   } else {
    sortingBtnRecentEl.classList.remove('sorting__button--active')
    sortingBtnRelevantEl.classList.add('sorting__button--active')
   }

   if(recent) {
    state.searchJobItems.sort((a, b) => {
        return a.daysAgo - b.daysAgo
    })
   } else {
    state.searchJobItems.sort((a, b) => {
        return a.relevanceScore - b.relevanceScore
    })
   }

   //reset pagination
   renderPaginationButtons()
   
   renderJobList()
}

sortingEl.addEventListener('click', clickHandler)