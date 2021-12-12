import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Button } from 'react-bootstrap';
import AwardCard from './AwardCard.js'
import CreateAward from './CreateAward.js'
import { getAwards, setAwardPage } from '../../actions/awardActions.js';
import Loading from '../Loading'

function AwardSection({edit}) {
    const [showCreateAward, setShowCreateAward] = useState(false);

    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const platform = useSelector((state) => state.platforms.platform)
    const { isGetAwardsLoading, awards, awardTotalCount } = useSelector((state) => state.awards);
    const pages = useSelector((state) => state.awards.awardPages)
    const [page, setPage] = useState(1)

    useEffect(() => {
        console.log("CALLING API")
        dispatch(getAwards(
            {
                platformId: platform._id,
                offset: 0,
                limit: 4 * page
            }
        ))
    }, [page, platform, dispatch]);
    
    const showMoreAwards = () => {
        if (page < pages)
            setPage(page + 1)
    }
    if (isGetAwardsLoading && !awards) {
        return (
            <Loading />
        )
    }

    return (
        <Container>
            <h4 style={{ marginBottom: "20px" }}>Platform Awards</h4>
            <Row xs={1} md={4} className="g-4">
                {edit && <Col style={{ minHeight: "220px" }} align="center">
                    <div className="position-relative top-50 start-50 translate-middle" >
                        <i className="bi bi-plus-circle" style={{ fontSize: "2.0rem", cursor: "pointer" }} onClick={() => { setShowCreateAward(true) }}></i>
                    </div>
                </Col>}
                {awards.map((award, idx) => (
                    <Col align="center">
                        <AwardCard award={award} edit={edit}></AwardCard>
                    </Col>
                ))}
            </Row>
            <Row >
                {awards.length < awardTotalCount && <Button variant="outline-light" onClick={showMoreAwards} style={{ color: "black", marginTop: "10px" }}>View More</Button>}
            </Row>
            {edit && <CreateAward show={showCreateAward} handleClose={() => { setShowCreateAward(false) }}></CreateAward>}
        </Container >

    )
}
export default AwardSection;
