import { useDebounce } from '../../hooks/useDebounce'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const SearchInput = ()=>  {
    const [searchParams, setSearchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState('');
    const debouncedSearchTerm = useDebounce(inputValue, 500); // Delay of 500ms

    useEffect(() => {
        if (debouncedSearchTerm) {
            setSearchParams({ query: debouncedSearchTerm });
        }
    }, [debouncedSearchTerm, setSearchParams]);

    return (
        <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Search...'
        />
    );
}