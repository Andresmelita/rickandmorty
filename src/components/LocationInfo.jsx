import React from 'react'
import './styles/locationInfo.scss'

const LocationInfo  = ({location}) => {
    return (
        <article className='informationWorld'>
            <h2 className='nameLocation'>{location?.name}</h2>
            <ul className='detailsLocation'>
                <li><span className='infLoc'>Type:  </span> {location?.type}</li>
                <li><span className='infLoc'>Dimension:  </span> {location?.dimension}</li>
                <li><span className='infLoc'>Population:  </span> {location?.residents.length}</li>
            </ul>
        </article> 
    )
}

export default LocationInfo