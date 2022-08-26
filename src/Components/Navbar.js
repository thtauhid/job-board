import React, { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { Link } from "react-router-dom"
import { auth } from "../firebase"
function Navbar() {
	const [user, setUser] = useState(null)

	useEffect(() => {
		onAuthStateChanged(
			auth,
			(user) => {
				setUser(user)
			},
			(err) => {
				console.log(err)
			}
		)
	}, [])
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					<span className='h2'>TJB</span>
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarColor01'
					aria-controls='navbarColor01'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarColor01'>
					<ul className='navbar-nav me-auto'>
						<li className='nav-item'>
							<Link className='nav-link active' to='/'>
								Home
							</Link>
						</li>
						{user && (
							<>
								<li className='nav-item'>
									<Link className='nav-link' to='/my-profile'>
										My Profile
									</Link>
								</li>
								<li className='nav-item'>
									<Link
										className='nav-link'
										to='/job-posting'
									>
										Job Posting
									</Link>
								</li>
							</>
						)}
					</ul>
					<div className='d-flex'>
						{/* Login and logout */}
						{user ? (
							<button
								className='btn btn-outline-secondary m-2 my-sm-0'
								onClick={() => {
									signOut(auth)
								}}
							>
								Logout
							</button>
						) : (
							<Link to='/login'>
								<button className='btn btn-outline-secondary m-2 my-sm-0'>
									Login
								</button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
