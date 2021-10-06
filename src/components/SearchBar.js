import { useState } from 'react'
import { Search } from '@material-ui/icons'

const SearchBar = () => {
    const [searchQuery, setQuery] = useState('')

    const onSearchSubmit = (e) => {
        e.preventDefault()
        if (!searchQuery) {
            alert('Please enter the search query.')
            return
        } else {
            console.log(`Search Query: ${searchQuery}`)
        }
        // Clear form after entry
        setQuery('')
    }

    return (
        <form className='searchbar-form' onSubmit={onSearchSubmit}>
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
