import { SearchOutlined } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchInput, setSearchInput } from '../redux/reducers/appSlice'
import './Search.css'

function Search() {

  const input = useSelector(selectSearchInput)

  const dispatch = useDispatch()

  return (
    <>
        <div className="search">
          <div className='search-wrpr'>
            <input type='text' placeholder='Search' value={input} autoFocus onChange={(e)=> dispatch(setSearchInput(e.target.value))}/>
          </div>
          {input ? <h1>Search results for "{input}"</h1> 
          : 
          <div className="search-empty">
            <SearchOutlined fontSize='large'/>
            <h1>Seacrh PMTC</h1>
            <span>Find tournaments, leagues, spaces, users, teams and marketplace listings.</span>
          </div>}
        </div>
    </>
  )
}

export default Search
