import React from 'react'
import Preloader from '../Components/Preloader'
import Navbar from '../Components/Navbar'
import Announce1 from '../Components/Announce1'
import Announce0 from '../Components/Announce0'
import Footer from '../Components/Footer'

function Announcement() {
    return (
        <>
            <Preloader />
            <Navbar />
            <Announce0 />
            <Announce1 />
            <Footer />

        </>
    )
}

export default Announcement