import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { onAuthStateChanged } from "firebase/auth"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { auth, db, storage } from "../firebase"
import { ref, uploadBytes } from "firebase/storage"
import { useNavigate } from "react-router-dom"
import { generateKeywords } from "../functions"

function PostJob() {
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

	const [success, setSuccess] = useState(null)
	const [companyLogo, setCompanyLogo] = useState(null)
	const [companyName, setCompanyName] = useState("")
	const [jobTitle, setJobTitle] = useState("")
	const [location, setLocation] = useState("")
	const [compensation, setCompensation] = useState("")
	const [jobDescription, setJobDescription] = useState("")
	const [applicationLink, setApplicationLink] = useState("")

	const [checkboxFulltime, setCheckboxFulltime] = useState(false)
	const [checkboxParttime, setCheckboxParttime] = useState(false)
	const [checkboxFreelance, setCheckboxFreelance] = useState(false)
	const [checkboxContractual, setCheckboxContractual] = useState(false)
	const [checkboxInternship, setCheckboxInternship] = useState(false)
	const [checkboxOnsite, setCheckboxOnsite] = useState(false)
	const [checkboxRemote, setCheckboxRemote] = useState(false)
	const [checkboxHybrid, setCheckboxHybrid] = useState(false)

	const submit = (e) => {
		e.preventDefault()

		const storageRef = ref(
			storage,
			"jobs/uploads/" + nanoid() + "-" + companyLogo.name
		)
		// Upload logo
		uploadBytes(storageRef, companyLogo)
			// Get logo download url
			.then((snapshot) => {
				// If logo upload is successful, upload job posting
				addDoc(collection(db, "jobs"), {
					company_logo: snapshot.ref.fullPath,
					company_name: companyName,
					job_title: jobTitle,
					location: location,
					checkbox_fulltime: checkboxFulltime,
					checkbox_parttime: checkboxParttime,
					checkbox_freelance: checkboxFreelance,
					checkbox_contractual: checkboxContractual,
					checkbox_internship: checkboxInternship,
					checkbox_onsite: checkboxOnsite,
					checkbox_remote: checkboxRemote,
					checkbox_hybrid: checkboxHybrid,
					compensation: compensation,
					job_description: jobDescription,
					application_link: applicationLink,
					keywords: generateKeywords(
						companyName +
							" " +
							jobTitle +
							" " +
							location +
							" " +
							(checkboxFulltime ? "FULLTIME " : "") +
							(checkboxParttime ? "PARTTIME " : "") +
							(checkboxFreelance ? "FREELANCE " : "") +
							(checkboxContractual ? "CONTRACTUAL " : "") +
							(checkboxInternship ? "INTERNSHIP " : "") +
							(checkboxOnsite ? "ONSITE " : "") +
							(checkboxRemote ? "REMOTE " : "") +
							(checkboxHybrid ? "HYBRID " : "") +
							jobDescription
					),
					created_at: Timestamp.now(),
					updated_at: Timestamp.now(),
					created_by: user.uid
				})
					.then((res) => {
						// console.log(res)
						setSuccess(true)

						// Clear the form
						setCompanyLogo(null)
						setCompanyName("")
						setJobTitle("")
						setLocation("")
						setCompensation("")
						setJobDescription("")
						setApplicationLink("")
						setCheckboxFulltime("")
						setCheckboxParttime("")
						setCheckboxFreelance("")
						setCheckboxContractual("")
						setCheckboxInternship("")
						setCheckboxOnsite("")
						setCheckboxRemote("")
						setCheckboxHybrid("")
					})
					.catch((err) => {
						console.log(err)
					})
			})
			.catch((err) => console.log(err))
	}
	return (
		<>
			{user ? (
				<div className='container my-5'>
					<div className='row'>
						<div className='col-md-12'>
							<div className=''>
								{/* <div className='alert alert-success'>
							<strong>Job Post Created!</strong>
						</div>
						<div className='alert alert-danger'>
							<strong>Unable to create job post</strong>
						</div> */}
								<h1>Post Job</h1>
							</div>
							<form onSubmit={submit}>
								<div className='form-group'>
									<label
										htmlFor='company_logo'
										className='form-label mt-4'
									>
										Company Logo
									</label>
									<input
										type='file'
										className='form-control'
										id='company_logo'
										onChange={(e) =>
											setCompanyLogo(e.target.files[0])
										}
										required
									/>
								</div>
								<div className='form-group'>
									<label
										htmlFor='company_name'
										className='form-label mt-4'
									>
										Company Name
									</label>
									<input
										type='text'
										className='form-control'
										id='company_name'
										placeholder='Example Inc.'
										value={companyName}
										onChange={(e) =>
											setCompanyName(e.target.value)
										}
										required
									/>
								</div>
								<div className='form-group'>
									<label
										htmlFor='job_title'
										className='form-label mt-4'
									>
										Job Title
									</label>
									<input
										type='text'
										className='form-control'
										id='job_title'
										placeholder='Sr. Web Developer'
										value={jobTitle}
										onChange={(e) =>
											setJobTitle(e.target.value)
										}
										required
									/>
								</div>
								<div className='form-group'>
									<label
										htmlFor='location'
										className='form-label mt-4'
									>
										Location
									</label>
									<input
										type='text'
										className='form-control'
										id='location'
										placeholder='London / Remote'
										value={location}
										onChange={(e) =>
											setLocation(e.target.value)
										}
										required
									/>
								</div>
								<div className='form-group'>
									<label
										htmlFor='job_type'
										className='form-label mt-4'
									>
										Job Type
									</label>
									<fieldset>
										<div className='form-check'>
											<input
												className='form-check-input'
												type='checkbox'
												// value=''
												id='checkbox_fulltime'
												checked={checkboxFulltime}
												onChange={() =>
													setCheckboxFulltime(
														!checkboxFulltime
													)
												}
											/>
											<label
												className='form-check-label'
												htmlFor='checkbox_fulltime'
											>
												Full Time
											</label>
										</div>
										<div className='form-check'>
											<input
												className='form-check-input'
												type='checkbox'
												// value=''
												id='checkbox_parttime'
												checked={checkboxParttime}
												onChange={() =>
													setCheckboxParttime(
														!checkboxParttime
													)
												}
											/>
											<label
												className='form-check-label'
												htmlFor='checkbox_parttime'
											>
												Part Time
											</label>
										</div>
										<div className='form-check'>
											<input
												className='form-check-input'
												type='checkbox'
												// value=''
												id='checkbox_freelance'
												checked={checkboxFreelance}
												onChange={() =>
													setCheckboxFreelance(
														!checkboxFreelance
													)
												}
											/>
											<label
												className='form-check-label'
												htmlFor='checkbox_freelance'
											>
												Freelance
											</label>
										</div>
										<div className='form-check'>
											<input
												className='form-check-input'
												type='checkbox'
												value=''
												id='checkbox_contractual'
												checked={checkboxContractual}
												onChange={() =>
													setCheckboxContractual(
														!checkboxContractual
													)
												}
											/>
											<label
												className='form-check-label'
												htmlFor='checkbox_contractual'
											>
												Contractual
											</label>
										</div>
										<div className='form-check'>
											<input
												className='form-check-input'
												type='checkbox'
												// value=''
												id='checkbox_internship'
												checked={checkboxInternship}
												onChange={() =>
													setCheckboxInternship(
														!checkboxInternship
													)
												}
											/>
											<label
												className='form-check-label'
												htmlFor='checkbox_internship'
											>
												Internship
											</label>
										</div>
									</fieldset>
								</div>
								<div className='form-group'>
									<label
										htmlFor='job_mode'
										className='form-label mt-4'
									>
										Job Mode
									</label>
									<fieldset>
										<div className='form-check'>
											<input
												className='form-check-input'
												type='checkbox'
												value=''
												id='checkbox_onsite'
												checked={checkboxOnsite}
												onChange={() =>
													setCheckboxOnsite(
														!checkboxOnsite
													)
												}
											/>
											<label
												className='form-check-label'
												htmlFor='checkbox_onsite'
											>
												On Site
											</label>
										</div>
										<div className='form-check'>
											<input
												className='form-check-input'
												type='checkbox'
												value=''
												id='checkbox_remote'
												checked={checkboxRemote}
												onChange={() =>
													setCheckboxRemote(
														!checkboxRemote
													)
												}
											/>
											<label
												className='form-check-label'
												htmlFor='checkbox_remote'
											>
												Remote
											</label>
										</div>
										<div className='form-check'>
											<input
												className='form-check-input'
												type='checkbox'
												value=''
												id='checkbox_hybrid'
												checked={checkboxHybrid}
												onChange={() =>
													setCheckboxHybrid(
														!checkboxHybrid
													)
												}
											/>
											<label
												className='form-check-label'
												htmlFor='checkbox_hybrid'
											>
												Hybrid
											</label>
										</div>
									</fieldset>
								</div>
								<div className='form-group'>
									<label
										htmlFor='compensation'
										className='form-label mt-4'
									>
										Compensation (Optional)
									</label>
									<input
										type='text'
										className='form-control'
										id='compensation'
										placeholder='Leave blank if not applicable'
										value={compensation}
										onChange={(e) =>
											setCompensation(e.target.value)
										}
									/>
								</div>
								<div className='form-group'>
									<label
										htmlFor='job_description'
										className='form-label mt-4'
									>
										Job Description
									</label>
									<textarea
										type='text'
										className='form-control'
										id='job_description'
										placeholder='Details'
										value={jobDescription}
										onChange={(e) =>
											setJobDescription(e.target.value)
										}
										required
									></textarea>
								</div>
								<div className='form-group'>
									<label
										htmlFor='application_link'
										className='form-label mt-4'
									>
										Application Link
									</label>
									<input
										type='text'
										className='form-control'
										id='application_link'
										placeholder='https://example.com/career-opportunity/frontend-developer'
										value={applicationLink}
										onChange={(e) =>
											setApplicationLink(e.target.value)
										}
										required
									/>
								</div>
								<div className='form-group'>
									<button
										className='form-control btn btn-primary mt-4'
										onCanPlay={submit}
									>
										Post Job
									</button>
								</div>
								{success && (
									<div className='form-group'>
										<div className='alert alert-success mt-4'>
											<strong>
												Job posted successfully.
											</strong>
										</div>
									</div>
								)}
							</form>
						</div>
					</div>
				</div>
			) : (
				"Loading..."
			)}
		</>
	)
}

export default PostJob
