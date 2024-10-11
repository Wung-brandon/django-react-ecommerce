import React, { useState, ChangeEvent } from 'react';
import { InputBase, Box, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

// Define the props interface
interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState<string>(''); // Typing state as string

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '5px',
        padding: '5px 10px',
        width: { xs: '100%', sm: 'auto' },
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      }}
    >
      <InputBase
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        sx={{ width: '100%', flex: 1 }}
      />
      <IconButton onClick={handleSearch} sx={{ p: '10px' }}>
        <Search />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
