import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
export default function Collegeimg() {
    return (
        <div>
            <Carousel
             showArrows={true} 
            //  onChange={onChange} 
            //  onClickItem={onClickItem} 
            //  onClickThumb={onClickThumb}
             >
                <div>
                    <img src="https://chaitanyadegreevzm.com/images/college-images/DSC_0066.JPG" alt="img1" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://chaitanyadegreevzm.com/images/college-images/DSC_0066.JPG" alt="img1"/>
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="https://chaitanyadegreevzm.com/images/college-images/DSC_0066.JPG" alt="img1"/>
                    <p className="legend">Legend 3</p>
                </div>
                
            </Carousel>

        </div>
    )
}
