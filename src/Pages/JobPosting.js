import React, { useState, useEffect } from "react"
import JobPostings from "../Components/JobPostings"
import Search from "../Components/Search"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"

function JobPosting() {
	const navigate = useNavigate()

	const [user, setUser] = useState()

	useEffect(() => {
		onAuthStateChanged(
			auth,
			(user) => {
				if (user) {
					setUser(user)
				} else {
					navigate("/")
				}
			},
			(err) => {
				console.log(err)
			}
		)
	}, [])

	return (
		<div className='container my-5'>
			<div className='row'>
				<div className='col-md-12'>
					<div className='d-flex justify-content-between'>
						<h1>Job Posting</h1>
						<div>
							<Link to='/saved'>
								<button className='btn btn-success btn-sm mx-2'>
									Saved
								</button>
							</Link>
							<Link to='/my-postings'>
								<button className='btn btn-warning btn-sm mx-2'>
									My Postings
								</button>
							</Link>
							<Link to='/post-job'>
								<button className='btn btn-primary btn-sm mx-2'>
									Post Job
								</button>
							</Link>
						</div>
					</div>

					<Search />
					<JobPostings />
				</div>
			</div>
		</div>
	)
}

export default JobPosting
