import { Box, Typography, IconButton } from "@mui/material";
import { useState, useEffect } from "react";

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("1");

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    let newPage = parseInt(inputValue);
    
    if (isNaN(newPage) || newPage < 1) {
      newPage = 1;
    } else if (newPage > totalPages) {
      newPage = totalPages;
    }
    
    setCurrentPage(newPage);
    setInputValue(newPage.toString());
    onPageChange?.(newPage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
      }}
    >
      <IconButton 
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        sx={{ 
          color: '#fff',
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          },
          '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.3)',
          }
        }}
      >
        <i className="fas fa-chevron-left" style={{ fontSize: '14px' }} />
      </IconButton>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        color: '#fff'
      }}>
        <Typography>Page</Typography>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={handleKeyPress}
          style={{
            width: '40px',
            height: '32px',
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            color: '#fff',
            textAlign: 'center',
            fontSize: '14px',
            padding: '4px'
          }}
        />
        <Typography>of {totalPages}</Typography>
      </Box>

      <IconButton 
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        sx={{ 
          color: '#fff',
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          },
          '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.3)',
          }
        }}
      >
        <i className="fas fa-chevron-right" style={{ fontSize: '14px' }} />
      </IconButton>
    </Box>
  );
};

export default Pagination;