import React from "react"

function Jumbotron() {
	return (
		<div className='container'>
			<div className='jumbotron my-5'>
				<h1 className='jumbo-title text-center '>The Job Board</h1>
				<p className='lead text-center'>
					The Job Board is an open source solution for finding and
					posting jobs. Contributions are welcome! Find the project on{" "}
					<a
						target='_blank'
						href='https://github.com/thtauhid/job-board'
					>
						Github
					</a>
					.
				</p>
			</div>
		</div>
	)
}

export default Jumbotron
