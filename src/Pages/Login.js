import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup
} from "firebase/auth"
import { doc, setDoc, Timestamp } from "firebase/firestore"
import { useLocation, useNavigate } from "react-router-dom"
import { auth, db } from "../firebase"
import { useEffect, useState } from "react"

function Login() {
	const location = useLocation()
	const navigate = useNavigate()

	const [user, setUser] = useState()

	useEffect(() => {
		onAuthStateChanged(
			auth,
			(user) => {
				if (user) {
					navigate("/")
				}
			},
			(err) => {
				console.log(err)
			}
		)
	}, [])

	const loginWithGoogle = () => {
		const provider = new GoogleAuthProvider()

		signInWithPopup(auth, provider)
			.then((res) => {
				//console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<div className='container my-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3 text-center'>
					<h1>Login</h1>
					<button
						className='login-button btn btn-lg btn-danger my-5'
						onClick={loginWithGoogle}
					>
						Login with Google
					</button>
				</div>
			</div>
		</div>
	)
}

export default Login
