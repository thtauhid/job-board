import React, { useEffect, useState } from "react"
import SingleJobPosting from "./SingleJobPosting"
import {
	collection,
	doc,
	documentId,
	getDoc,
	getDocs,
	orderBy,
	query,
	where
} from "firebase/firestore"
import { db, auth } from "../firebase"
import { useLocation } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

function JobPostings({ searchTerm }) {
	const location = useLocation()

	const [jobPostings, setJobPostings] = useState(null)

	useEffect(() => {
		let q
		onAuthStateChanged(
			auth,
			(user) => {
				if (user) {
					// Page: My Posting. Show all job postings by the current user
					if (location.pathname === "/my-postings") {
						q = query(
							collection(db, "jobs"),
							where("created_by", "==", user.uid)
						)
						getJobPostings(q).then((res) => setJobPostings(res))

						// Page: Saved. Show all job postings saved by the current user
					} else if (location.pathname === "/saved") {
						getSavedJobsById(user.uid)
							.then((res) => {
								if (res.length > 0) {
									q = query(
										collection(db, "jobs"),
										where(documentId(), "in", res)
									)
									getJobPostings(q).then((res) =>
										setJobPostings(res)
									)
								} else {
									setJobPostings([])
								}
							})
							.catch((err) => console.log(err))
					}
				}
				// Page: Search. Show all job postings that match the search keyword
				if (searchTerm) {
					searchTerm = searchTerm.toUpperCase()
					q = query(
						collection(db, "jobs"),
						where("keywords", "array-contains", searchTerm)
					)
					getJobPostings(q).then((res) => setJobPostings(res))

					// Page: Home / Job Postings. Show all job postings
				} else if (
					location.pathname === "/" ||
					location.pathname === "/job-posting"
				) {
					q = query(
						collection(db, "jobs"),
						orderBy("created_at", "desc")
					)
					getJobPostings(q)
						.then((res) => setJobPostings(res))
						.catch((err) => console.log(err))
				}
			},
			(err) => {
				console.log(err)
			}
		)
	}, [searchTerm])

	const getSavedJobsById = (id) => {
		return new Promise((resolve, reject) => {
			getDoc(doc(db, "users", id))
				.then((res) => {
					if (res.data()) {
						if (res.data().saved_jobs) {
							resolve(res.data().saved_jobs)
						} else {
							resolve([])
						}
					} else {
						resolve([])
					}
				})
				.catch((error) => {
					reject(error)
				})
		})
	}

	const getJobPostings = (query) => {
		return new Promise((resolve, reject) => {
			getDocs(query)
				.then((res) => {
					let data = res.docs.map((doc) => ({
						...doc.data(),
						id: doc.id
					}))
					resolve(data)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}

	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col-md-12'>
						{jobPostings
							? jobPostings.map((jobPosting) => {
									return (
										<SingleJobPosting
											key={jobPosting.id}
											data={jobPosting}
										/>
									)
							  })
							: "Loading..."}
					</div>
				</div>
			</div>
		</>
	)
}

export default JobPostings
