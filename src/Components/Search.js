import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function Search() {
	const navigate = useNavigate()
	const [searchTerm, setSearchTerm] = useState("")

	const submitHandler = (e) => {
		e.preventDefault()

		navigate("/search/" + searchTerm)
	}

	return (
		<>
			<div className='container my-4'>
				<div className='row'>
					<div className='col-md-12'>
						<form onSubmit={submitHandler}>
							<div className='input-group search-bar'>
								<input
									type='text'
									className='form-control'
									placeholder='Search jobs...'
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
								/>
								<button
									className='btn btn-primary'
									onClick={submitHandler}
								>
									Search
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default Search
