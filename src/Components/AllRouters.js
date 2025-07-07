import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useAppContext } from "./ContextAPI"
import Header from "./Header"
import NavBar from "./NavBar"
import Footer from "./Footer"
import Home from "../Pages/Home"
import About from "../Pages/About"
import Service from "../Pages/Service"
import Contact from "../Pages/Contact"
import SingleUser from "../Pages/SingleUser"
import Loading from "./Loading"
import Error from "./Error"
import GoToTop from "./GoToTop"

const AllRouters = () => {
  const { loading, error } = useAppContext()

  if (loading) return <Loading />
  if (error) return <Error message={error} />

  return (
    <Router>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<SingleUser />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <GoToTop />
    </Router>
  )
}

export default AllRouters
