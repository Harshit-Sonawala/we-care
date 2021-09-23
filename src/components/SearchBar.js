import { useState } from 'react'
import { Search } from '@material-ui/icons'

const SearchBar = () => {
    const [searchQuery, setQuery] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if (!searchQuery) {
            alert('Please enter the search query.')
            return
        }

        // Clear form after entry
        setQuery('')
    }

    return (
        <form className='searchbar-form' onSubmit={onSubmit}>
            <input type='text'
                placeholder='Search for services...'
                value={searchQuery}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button><Search /></button>
        </form>
    )
}

export default SearchBar
