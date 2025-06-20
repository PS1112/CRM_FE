import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";

const ResizableTable = ({ 
  columns, 
  data, 
  headerStyle = {}, 
  cellStyle = {},
  emptyMessage = "No data found",
  useTestData = false,
  testDataCount = 10
}) => {
  const [columnWidths, setColumnWidths] = useState({});
  const [resizing, setResizing] = useState(null);
  const [startX, setStartX] = useState(null);
  const tableRef = useRef(null);
  const [tableData, setTableData] = useState([]);
  
  // Initialize column widths on first render
  useEffect(() => {
    const initialWidths = {};
    columns.forEach(col => {
      initialWidths[col.id] = col.initialWidth || 150; // Default width of 150px
    });
    setColumnWidths(initialWidths);
  }, [columns]);

  // Generate test data if useTestData is true
  useEffect(() => {
    if (useTestData) {
      setTableData(generateTestData(columns, testDataCount));
    } else {
      setTableData(data);
    }
  }, [data, columns, useTestData, testDataCount]);

  // Handle mouse down on resize handle
  const handleMouseDown = (e, columnId) => {
    e.preventDefault();
    setResizing(columnId);
    setStartX(e.clientX);
  };

  // Handle mouse move during resize operation
  const handleMouseMove = (e) => {
    if (resizing && startX !== null) {
      const deltaX = e.clientX - startX;
      setColumnWidths(prev => ({
        ...prev,
        [resizing]: Math.max(50, prev[resizing] + deltaX) // Min width of 50px
      }));
      setStartX(e.clientX);
    }
  };

  // Handle mouse up to end resize operation
  const handleMouseUp = () => {
    setResizing(null);
    setStartX(null);
  };

  // Add and remove event listeners for mouse move and up
  useEffect(() => {
    if (resizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [resizing, startX]);

  // Generate test data based on columns
  const generateTestData = (columns, count) => {
    // Helper function to generate random data based on column id
    const generateValueForColumn = (columnId) => {
      switch (columnId) {
        case 'website':
          const domains = ['example.com', 'testsite.org', 'demo.edu', 'sample.net', 'mysite.co'];
          return domains[Math.floor(Math.random() * domains.length)];
        
        case 'name':
          const institutes = ['TechInstitute', 'Global Academy', 'Future School', 'Learning Center', 'Education Hub'];
          const suffixes = ['Inc.', 'LLC', 'International', 'Global', 'Group'];
          return `${institutes[Math.floor(Math.random() * institutes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
        
        case 'email':
          const emailPrefix = ['info', 'contact', 'support', 'admin', 'help'];
          const emailDomain = ['gmail.com', 'outlook.com', 'yahoo.com', 'example.org', 'school.edu'];
          return `${emailPrefix[Math.floor(Math.random() * emailPrefix.length)]}@${emailDomain[Math.floor(Math.random() * emailDomain.length)]}`;
        
        case 'mobile':
          return `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
        
        case 'remarks':
          const remarkTypes = ['Testing', 'Core', 'Academic', 'Premium', 'Basic'];
          return remarkTypes[Math.floor(Math.random() * remarkTypes.length)];
        
        case 'submitDate':
          // Generate random date within past year
          const today = new Date();
          const pastDate = new Date(today);
          pastDate.setDate(pastDate.getDate() - Math.floor(Math.random() * 365));
          return formatDate(pastDate);
        
        case 'action':
          return (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#25D366",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white"
              }}>
                WA
              </div>
            </div>
          );
        
        case 'exist':
          return (
            <span style={{
              display: "inline-block",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
              lineHeight: "24px",
              border: "1px solid #dee2e6"
            }}>
              {Math.random() > 0.5 ? '1' : '0'}
            </span>
          );
        
        case 'delete':
          return (
            <span style={{
              display: "inline-block",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
              lineHeight: "24px",
              border: "1px solid #dee2e6"
            }}>
              {Math.random() > 0.7 ? '1' : '0'}
            </span>
          );
        
        case 'preferredTime':
          const timeSlots = ['9 AM to 11 AM', '11 AM to 1 PM', '1 PM to 3 PM', '3 PM to 5 PM', '5 PM to 7 PM'];
          return timeSlots[Math.floor(Math.random() * timeSlots.length)];
        
        default:
          return `Test ${columnId}`;
      }
    };
    
    // Format date function
    const formatDate = (date) => {
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    };

    // Generate array of test data
    return Array.from({ length: count }, (_, index) => {
      const rowData = {};
      columns.forEach(column => {
        rowData[column.id] = generateValueForColumn(column.id);
      });
      return rowData;
    });
  };

  // Render resize handle for header cells
  const renderResizeHandle = (columnId) => {
    return (
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          width: "5px",
          cursor: "col-resize",
          background: resizing === columnId ? "#2196f3" : "transparent",
          zIndex: 1
        }}
        onMouseDown={(e) => handleMouseDown(e, columnId)}
      />
    );
  };

  // Render a single table header cell
  const renderHeaderCell = (column) => {
    return (
      <th 
        key={column.id}
        style={{
          ...headerStyle,
          width: columnWidths[column.id] ? `${columnWidths[column.id]}px` : "auto",
          position: "relative",
          userSelect: "none",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: column.align || "left"
        }}
      >
        {column.label}
        {renderResizeHandle(column.id)}
      </th>
    );
  };

  // Render a single table data cell
  const renderDataCell = (rowIndex, column, rowData) => {
    return (
      <td 
        key={`${rowIndex}-${column.id}`}
        style={{
          ...cellStyle,
          width: columnWidths[column.id] ? `${columnWidths[column.id]}px` : "auto",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: column.align || "left"
        }}
      >
        {rowData[column.id]}
      </td>
    );
  };

  // Render empty state when no data is available
  const renderEmptyState = () => {
    return (
      <tr>
        <td colSpan={columns.length} style={{ textAlign: "center", padding: "20px" }}>
          <h4>{emptyMessage}</h4>
        </td>
      </tr>
    );
  };

  return (
    <Box
      ref={tableRef}
      sx={{ 
        width: "100%", 
        overflowX: "auto", 
        cursor: resizing ? "col-resize" : "default"
      }}
    >
      <table className="table text-dark" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
            {columns.map(column => renderHeaderCell(column))}
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((row, rowIndex) => (
              <tr key={rowIndex} style={{ borderBottom: "1px solid #dee2e6" }}>
                {columns.map(column => renderDataCell(rowIndex, column, row))}
              </tr>
            ))
          ) : (
            renderEmptyState()
          )}
        </tbody>
      </table>
    </Box>
  );
};

export default ResizableTable;