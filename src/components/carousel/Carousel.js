import React from 'react'
import { Carousel } from 'react-bootstrap';
import '../carousel/carousel.css';

const Carousell = () => {
    return (
        <div>
            <Carousel className='carousel'>

                <Carousel.Item>
                    <div className='sliding-img'>
                        <img
                            className="d-block w-80 "
                            src={require('./library.jpg')}
                            alt="First slide"
                        />
                    </div>
                    <Carousel.Caption>
                        <h1 className='caption'>S.R.RANGANATHAN</h1>
                        <p>Father of Indian Library Science</p>
                        <p>His birthday is observed as <span style={{ color: 'red', backgroundColor: 'black' }}>NATIONAL LIBRARY DAY</span></p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <div className='sliding-img'>
                        <img
                            className="d-block w-100 sliding-img"
                            src={require('./books.jpg')}
                            alt="Second slide"
                        />
                    </div>
                    <Carousel.Caption>
                        <h1 className='caption'>GEORGE R.R MARTIN</h1>
                        <p>A reader lives a thousand lives before he dies.The man who never reads lives only one</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <div className='sliding-img' >
                        <img
                            className="d-block w-100 sliding-img"
                            src={require('./man.jpeg')}
                            alt="Third slide"
                        />
                    </div>
                    <Carousel.Caption>
                        <h1 className='caption'>ABHRAHAM LINCOLN</h1>
                        <p>Books serve to show a man that those original thoughts of his aren't very new after all</p>
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>
        </div>
    )
}

export default Carousell