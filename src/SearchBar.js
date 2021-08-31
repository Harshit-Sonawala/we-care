import { useState } from 'react'
import { Search } from '@material-ui/icons'

const SearchBar = () => {
    const [searchQuery, setQuery] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if(!searchQuery) {
            alert('Please enter the search query.')
            return
        }

        // Clear form after entry
        setQuery('')
    }

    return (
        <div className='eightyperc-container'>
            <form className='searchbar-form' onSubmit={onSubmit}>
                    <input type='text' 
                        placeholder='Search...'
                        value={searchQuery}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button><Search /></button>
            </form>
        </div>
        
    )
}

export default SearchBar
