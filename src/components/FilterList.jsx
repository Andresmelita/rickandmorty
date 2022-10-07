import React from 'react'
import Select from 'react'

const FilterList = ({suggestedList, setSearchInput}) => {
    const handleClick = id => setSearchInput(id)

    return (
        <ul className='dropdown'>
            {
                suggestedList?.map(location => (
                    <li onClick={()=> handleClick(location.id)} key={location.id}>[{location.id}] {location.name}</li>
                ))
            }
        </ul>
    )
}

export default FilterList