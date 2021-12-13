import React, { useState, useEffect } from 'react'
import Banner from '../components/Platform/Banner.js'
import Settings from '../components/EditPlatform/Settings.js'
import AwardSection from '../components/EditPlatform/AwardSection.js'

import NotFound from '../components/NotFound.js'
import { getPlatform } from '../actions/platformActions'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'

function EditPlatform() {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state.auth.user)
    const platform = useSelector((state) => state.platforms.platform)
  
    const isGetLoading = useSelector((state) => state.platforms.isGetLoading);

    let { id } = useParams();  // get the platform ID from the url

    // dispatch the GET_PLATFORM request on initial render
    useEffect(() => {
        dispatch(getPlatform({
            id: id
        }))
    }, [id, dispatch]);


    if (isGetLoading || !platform) {
        return (
            <Loading />
        )
    }

    if (user == null || user.id !== platform.owner) 
        return <NotFound/>

    return (
        <div className="justify-content-between">
            {Object.keys(platform).length !== 0 ? <Banner platform={platform} ></Banner> : <div></div>}

            <div style={{ height: "50px" }}></div>

            <div >
                <h2 className='text-center m-3'>Platform Edit page</h2>
                <hr/>
                <AwardSection edit={true}></AwardSection>
                <hr/>
                <Settings platform={platform}></Settings>
            </div>
        </div >
    )
}
export default EditPlatform;
