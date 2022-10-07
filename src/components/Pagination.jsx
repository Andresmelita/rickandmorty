import React, { useState } from 'react'
import './styles/pagination.scss'

const Pagination = ({page, setPage, maxPages}) => {

    const [input, setInput] = useState(1)

    const nextPage = () => {
        setInput(parseInt(input) + 1);
        setPage(parseInt(page) + 1);
    }

    const previusPage = () => {
        setInput(parseInt(input) - 1);
        setPage(parseInt(page) - 1);
    }

    const onKeyDown = (e) => {
        if(e.keyCode == 13){
            setPage(parseInt(e.target.value));
            if(
                parseInt(e.target.value < 1) ||
                parseInt(e.target.value) > Math.ceil(maxPages) ||
                isNaN(parseInt(e.target.value))
            ){
                setPage(1);
                setInput(1)
            } else {
                setPage(parseInt(e.target.value));
            }
        }
    }

    const onChange = (e) => {
        setInput(e.target.value);
    }

    return (
        <div className='pagination'>
            <button disabled={page === 1 || page < 1}
                onClick={previusPage} 
                className='previusPage'>◀</button>
            <input 
                onKeyDown={e => onKeyDown(e)} 
                onChange={e => onChange(e)}
                name='page' 
                autoComplete='off' 
                value={input} 
                type='text' />
            <p> de {maxPages}</p>
            <button 
                disabled={page === maxPages || page > maxPages}
                onClick={nextPage} 
                className='nextPage'>▶</button>
        </div>
    )
}

export default Pagination