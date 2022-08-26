import Jumbotron from "../Components/Jumbotron"
import Search from "../Components/Search"
import JobPostings from "../Components/JobPostings"

function Home() {
	return (
		<>
			<Jumbotron />
			<Search />
			<JobPostings />
		</>
	)
}

export default Home
