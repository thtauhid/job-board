import Jumbotron from "../Components/Jumbotron"
import Search from "../Components/Search"
import JobPostings from "../Components/JobPostings"
import { useParams } from "react-router-dom"

function Home() {
	const { search_term } = useParams()
	return (
		<>
			<Jumbotron />
			<Search />
			<JobPostings searchTerm={search_term} />
		</>
	)
}

export default Home
