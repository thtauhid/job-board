import React, { useState } from "react"
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa"
import { subscribeToNewsletter } from "../functions"

function Footer() {
	const [email, setEmail] = useState("")
	const [success, setSuccess] = useState()

	const subscribe = (e) => {
		e.preventDefault()
		subscribeToNewsletter(email)
			.then((res) => {
				res && setSuccess(true)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	return (
		<>
			<footer className='bg-primary text-center text-white'>
				<div className='container p-4 my-4'>
					<section className='mb-4'>
						<a
							className='btn btn-light btn-floating m-1'
							href='#!'
							role='button'
						>
							<FaFacebook />
						</a>

						<a
							className='btn btn-light btn-floating m-1'
							href='#!'
							role='button'
						>
							<FaTwitter />
						</a>

						<a
							className='btn btn-light btn-floating m-1'
							href='#!'
							role='button'
						>
							<FaInstagram />
						</a>

						<a
							className='btn btn-light btn-floating m-1'
							href='#!'
							role='button'
						>
							<FaGithub />
						</a>
					</section>

					<section className=''>
						<form action='' onSubmit={subscribe}>
							<div className='row d-flex justify-content-center'>
								<div className='col-auto'>
									<p className='pt-2'>
										<strong>
											Sign up for our newsletter
										</strong>
									</p>
								</div>

								<div className='col-md-5 col-12'>
									<div className='form-outline form-white mb-4'>
										<input
											type='email'
											className='form-control'
											placeholder='john@example.com'
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
											required
										/>
										{success && (
											<div className='alert alert-success'>
												<strong>
													We have added you to our
													awesome newsletter!
												</strong>
											</div>
										)}
									</div>
								</div>

								<div className='col-auto'>
									<button
										type='submit'
										className='btn btn-outline-light mb-4'
										onClick={subscribe}
									>
										Subscribe
									</button>
								</div>
							</div>
						</form>
					</section>

					<section className='mb-4'>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Sunt distinctio earum repellat quaerat
							voluptatibus placeat nam, commodi optio pariatur est
							quia magnam eum harum corrupti dicta, aliquam sequi
							voluptate quas.
						</p>
					</section>
				</div>

				<div className='text-center p-3'>
					Copyright © 2022 • The Job Board
				</div>
			</footer>
		</>
	)
}

export default Footer
