import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import JobPostings from "../Components/JobPostings"
import { auth } from "../firebase"

function MyPostings() {
	const [user, setUser] = useState()

	const navigate = useNavigate()

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
		<>
			{user ? (
				<div className='container my-5'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='d-flex justify-content-between'>
								<h1>My Postings</h1>
							</div>
							<JobPostings />
						</div>
					</div>
				</div>
			) : (
				"Loading..."
			)}
		</>
	)
}

export default MyPostings
