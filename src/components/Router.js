// --ROUTER = the id(in URL) of the entire job list

import {
    jobDetailsContentEl,
    BASE_API_URL,
    state,
    getData,
} from '../common.js'
import renderSpinner from './Spinner.js'
import renderJobDetails from './JobDetails.js'
import renderError from './Error.js'
import renderJobList from './JobList.js'

const loadHashChangeHandler = async () => {
    // get id from url
    const id = window.location.hash.substring(1)

    if (id) {
            // remove the active class from previously active job items
    document.querySelectorAll('.job-item--active').forEach(jobItemWithActiveClass => jobItemWithActiveClass.classList.remove('job-item--active'));
        jobDetailsContentEl.innerHTML = ''

        renderSpinner('job-details')
        try {
            const data = await getData(`${BASE_API_URL}/jobs/${id}`)

            const { jobItem } = data

            state.activeJobItem = jobItem

            renderJobList()

            renderSpinner('job-details')

            renderJobDetails(jobItem)

        } catch (err) {
            renderError(err.message)
            renderSpinner('job-details')
        }
    }

}


window.addEventListener('DOMContentLoaded', loadHashChangeHandler)
window.addEventListener('hashchange', loadHashChangeHandler)