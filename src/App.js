import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"

import Home from "./Pages/Home"
import Login from "./Pages/Login"
import MyProfile from "./Pages/MyProfile"
import JobPosting from "./Pages/JobPosting"
import PostJob from "./Pages/PostJob"
import MyPostings from "./Pages/MyPostings"
import Saved from "./Pages/Saved"
import ViewJobPosting from "./Pages/ViewJobPosting"
import SearchResult from "./Pages/SearchResult"

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/my-profile' element={<MyProfile />} />
				<Route path='/job-posting' element={<JobPosting />} />
				<Route path='/saved' element={<Saved />} />
				<Route path='/my-postings' element={<MyPostings />} />
				<Route path='/post-job' element={<PostJob />} />
				<Route path='/jobs/:id' element={<ViewJobPosting />} />
				{/* <Route path='/jobs/:id/report' element={<ReportJob />} /> */}
				<Route path='/search/:search_term' element={<SearchResult />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	)
}

export default App
