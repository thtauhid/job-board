import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"

function MyProfile() {
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
			{user ? (
				<div className='row'>
					<div className='col-md-12'>
						<h1>My Profile</h1>
						<div className='d-flex my-5 border p-3'>
							{/* <img
								src='https://via.placeholder.com/150'
								alt=''
								className='rounded-circle'
							/> */}
							<div className='px-5'>
								<p className='h4 py-2'>
									Name: {user.displayName}
								</p>
								<p className='h4 py-2'>Email: {user.email}</p>
							</div>
						</div>
					</div>
				</div>
			) : (
				"Loading..."
			)}
		</div>
	)
}

export default MyProfile
