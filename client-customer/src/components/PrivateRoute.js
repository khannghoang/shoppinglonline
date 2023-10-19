import Footer from "./FooterComponent"
function PrivateRoute({children}) {
    return (
      <div>
        {children}
        <Footer />
      </div>
    )
  }
export default PrivateRoute