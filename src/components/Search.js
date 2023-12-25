import {
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_API_URL, 
    getData, 
    state, 
    sortingBtnRecentEl, 
    sortingBtnRelevantEl
} from '../common.js'
import renderError from './Error.js'
import renderSpinner from './Spinner.js'
import renderJobList from './JobList.js'
import renderPaginationButtons from './Pagination.js'

const submitToServer = async e => {
    e.preventDefault()
    const searchText = searchInputEl.value
    // regular expression
    const forbiddenPattern = /[0-9]/
    const resultPattern = forbiddenPattern.test(searchText)
    if (resultPattern) {
        renderError("Your input may not contain number ")
        return
    }
    searchInputEl.blur()

    jobListSearchEl.innerHTML = ''

    // reset sorting button
    sortingBtnRecentEl.classList.remove('sorting__button--active')
    sortingBtnRelevantEl.classList.add('sorting__button--active')

    renderSpinner('search')

    try {
        const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`)

        const { jobItems } = data

        state.searchJobItems = jobItems

        state.currentPage = 1

        renderSpinner('search')

        numberEl.textContent = jobItems.length

        renderPaginationButtons()

        renderJobList()


    } catch (err) {
        renderError(err.message)
            renderSpinner('search')
    }

}
searchFormEl.addEventListener('submit', submitToServer)