import { onAuthStateChanged } from "firebase/auth"
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref } from "firebase/storage"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { db, storage, auth } from "../firebase"

function ViewJobPosting() {
	const { id } = useParams()
	const [jobPosting, setJobPosting] = useState(null)
	const [user, setUser] = useState(null)
	const [saveSuccess, setSaveSuccess] = useState(false)

	useEffect(() => {
		// Get user
		onAuthStateChanged(
			auth,
			(user) => {
				if (user) {
					setUser(user)
				}
			},
			(err) => {
				console.log(err)
			}
		)

		// Get the job posting from the database
		getDoc(doc(db, "jobs", id))
			.then((res) => {
				getDownloadURL(ref(storage, res.data().company_logo))
					.then((url) => {
						setJobPosting({ ...res.data(), company_logo: url })
					})
					.catch((err) => {
						console.log(err)
					})
			})
			.catch((err) => console.log(err))
	}, [])

	const saveJob = () => {
		setDoc(
			doc(db, "users", user.uid),
			{
				saved_jobs: arrayUnion(id)
			},
			{ merge: true }
		)
			.then(() => {
				setSaveSuccess(true)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<div className='container my-4'>
			<div className='row'>
				{jobPosting === null ? "Loading..." : null}
				{jobPosting && (
					<div className='col-md-12'>
						<div className='d-flex align-items-center mb-5'>
							{jobPosting.company_logo && (
								<img
									src={jobPosting.company_logo}
									alt={jobPosting?.job_title}
									width={150}
									className='img-fluid rounded-circle'
								/>
							)}

							<div className='mx-5'>
								<span className='h4'>
									{jobPosting?.company_name}
								</span>
								<h1 className=''>{jobPosting?.job_title}</h1>
							</div>
						</div>
						<div className='d-flex flex-wrap my-3 view-job-posting'>
							{jobPosting.checkbox_fulltime && (
								<Link
									className='tag-link mb-2'
									to='/search/fulltime'
								>
									<div className='bg-info text-white mx-1 p-2'>
										Full Time
									</div>
								</Link>
							)}
							{jobPosting.checkbox_parttime && (
								<Link
									className='tag-link mb-2'
									to='/search/parttime'
								>
									<div className='bg-info text-white mx-1 p-2'>
										Part Time
									</div>
								</Link>
							)}
							{jobPosting.checkbox_freelance && (
								<Link
									className='tag-link mb-2'
									to='/search/freelance'
								>
									<div className='bg-info text-white mx-1 p-2'>
										Freelance
									</div>
								</Link>
							)}
							{jobPosting.checkbox_contractual && (
								<Link
									className='tag-link mb-2'
									to='/search/contractual'
								>
									<div className='bg-info text-white mx-1 p-2'>
										Contractual
									</div>
								</Link>
							)}
							{jobPosting.checkbox_internship && (
								<Link
									className='tag-link mb-2'
									to='/search/internship'
								>
									<div className='bg-info text-white mx-1 p-2'>
										Internship
									</div>
								</Link>
							)}
							{jobPosting.checkbox_onsite && (
								<Link
									className='tag-link mb-2'
									to='/search/onsite'
								>
									<div className='bg-info text-white mx-1 p-2'>
										On Site
									</div>
								</Link>
							)}
							{jobPosting.checkbox_remote && (
								<Link
									className='tag-link mb-2'
									to='/search/remote'
								>
									<div className='bg-info text-white mx-1 p-2'>
										Remote
									</div>
								</Link>
							)}
							{jobPosting.checkbox_hybrid && (
								<Link
									className='tag-link mb-2'
									to='/search/hybrid'
								>
									<div className='bg-info text-white mx-1 p-2'>
										Hybrid
									</div>
								</Link>
							)}
						</div>
						{jobPosting.location && (
							<div className='my-3 h6'>
								Location: {jobPosting.location}
							</div>
						)}
						{jobPosting.compensation && (
							<div className='my-3 h6'>
								Compensetion: {jobPosting.compensation}
							</div>
						)}
						{jobPosting.job_description && (
							<div className='my-3 job-posting-text'>
								{jobPosting.job_description}
							</div>
						)}

						<div>
							<a
								href={jobPosting.application_link}
								target='_blank'
								rel='noreferrer'
							>
								<button className='btn btn-primary mx-1'>
									Apply
								</button>
							</a>
							{user && (
								<button
									className='btn btn-success mx-1'
									onClick={saveJob}
								>
									Save
								</button>
							)}

							{/* <Link to='report'>
								<button className='btn btn-danger mx-1'>
									Report
								</button>
							</Link> */}
						</div>
						{saveSuccess && (
							<div className='alert alert-success mt-2 mx-1'>
								<strong>Successfully Saved!</strong>
							</div>
						)}

						<hr />
						<p className='text-secondary'>
							You can report the job posting by emailing at:
							report@example.com
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default ViewJobPosting
