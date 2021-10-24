import React from 'react'
import { Container } from 'react-bootstrap';
import Banner from '../components/Platform/Banner.js'

function Platform({ platformId }) {
    return (
        <div className="justify-content-between">
            <Banner></Banner>
            <h2 className='text-center m-3 '>main content here</h2>
        </div >
    )
}
export default Platform;
