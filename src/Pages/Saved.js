import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import JobPostings from "../Components/JobPostings"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"

function Saved() {
	const [user, setUser] = useState(null)

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
			(err) => console.log(err)
		)
	}, [])

	return (
		<>
			{user ? (
				<div className='container my-5'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='d-flex justify-content-between'>
								<h1>Saved</h1>
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

export default Saved
