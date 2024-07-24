import { Outlet} from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Layout = () => {
  return (
    <div className="sm:px-4 sm:md:px-8 md:px-20" >
      <Navbar/>
        <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout