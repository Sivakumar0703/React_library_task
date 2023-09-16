import React from 'react'
import { useNavigate } from 'react-router-dom';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const Errorpage = () => {

    const navigate = useNavigate()

    function gotoHome() {
        navigate('/')
    }

    return (
        <div className='container'>

            <div className='frown-image' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '50px' }}>
                <div style={{ textAlign: 'center' }}>
                    <SentimentDissatisfiedIcon
                        style={{ fontSize: '150px', color: 'gray' }}
                    />
                </div>

                <p style={{ fontSize: '100px', color: 'gray', display: 'flex', justifyContent: 'center' }}>404</p>

                <p style={{ fontSize: '50px', color: 'gray', display: 'flex', justifyContent: 'center' }}>PAGE NOT FOUND</p>

                <div style={{ textAlign: 'center' }}>
                    <button onClick={gotoHome} className='btn btn-primary' style={{ width: '150px' }}>Go Back</button>

                </div>



            </div>

        </div>
    )
}

export default Errorpage