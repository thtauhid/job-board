import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase"

function SingleJobPosting({ data }) {
	const [image, setImage] = useState(null)

	useEffect(() => {
		getDownloadURL(ref(storage, data.company_logo))
			.then((url) => {
				setImage(url)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return (
		<>
			<div className='single-job-posting-card border border-primary'>
				{image ? (
					<>
						<div className='single-job-posting-card-image-area'>
							<img
								src={image}
								width={150}
								height={150}
								alt='job posting'
								className='rounded-circle'
							/>
						</div>
						{/* Text */}
						<div className='single-job-posting-card-text-area'>
							<h4>{data.company_name}</h4>
							<Link to={"/jobs/" + data.id}>
								<h3>{data.job_title}</h3>
							</Link>
							<div className='d-flex flex-wrap'>
								{data.checkbox_fulltime && (
									<Link
										className='tag-link mb-2'
										to='/search/fulltime'
									>
										<div className='bg-info text-white mx-1 p-2'>
											Full Time
										</div>
									</Link>
								)}
								{data.checkbox_parttime && (
									<Link
										className='tag-link mb-2'
										to='/search/parttime'
									>
										<div className='bg-info text-white mx-1 p-2'>
											Part Time
										</div>
									</Link>
								)}
								{data.checkbox_freelance && (
									<Link
										className='tag-link mb-2'
										to='/search/freelance'
									>
										<div className='bg-info text-white mx-1 p-2'>
											Freelance
										</div>
									</Link>
								)}
								{data.checkbox_contractual && (
									<Link
										className='tag-link mb-2'
										to='/search/contractual'
									>
										<div className='bg-info text-white mx-1 p-2'>
											Contractual
										</div>
									</Link>
								)}
								{data.checkbox_internship && (
									<Link
										className='tag-link mb-2'
										to='/search/internsip'
									>
										<div className='bg-info text-white mx-1 p-2'>
											Internship
										</div>
									</Link>
								)}
								{data.checkbox_onsite && (
									<Link
										className='tag-link mb-2'
										to='/search/onsite'
									>
										<div className='bg-info text-white mx-1 p-2'>
											On Site
										</div>
									</Link>
								)}
								{data.checkbox_remote && (
									<Link
										className='tag-link mb-2'
										to='/search/remote'
									>
										<div className='bg-info text-white mx-1 p-2'>
											Remote
										</div>
									</Link>
								)}
								{data.checkbox_hybrid && (
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
						</div>
					</>
				) : (
					"Loading..."
				)}
			</div>
		</>
	)
}

export default SingleJobPosting
