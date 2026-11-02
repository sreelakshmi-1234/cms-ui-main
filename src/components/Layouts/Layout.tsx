import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer'

interface breadcrumbTypes {
  title : string,
  to : string,
  color : string
}
const Layout:React.FC<{children : React.JSX.Element, breadcrumbs? : breadcrumbTypes[], enableSideNavigation? : boolean}> = ({children, breadcrumbs, enableSideNavigation}) => {

  useEffect(() => {
    // Scroll to the top of the page whenever the content (children) changes
    window.scrollTo(0, 0);
  }, [children]);
  return (
    <>
        <Navbar breadcrumbs={breadcrumbs || null} enableSideNavigation={enableSideNavigation}>
            <main>{children}</main>
        </Navbar>
        {/* <Footer /> */}
    </>
  )
}

export default Layout