import React, { useState, useRef, useEffect, useCallback } from "react";
import { Box, Tooltip, Checkbox } from "@mui/material";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TruncatedText from "../TruncatedText/TruncatedText";


const ResizableTable = ({
  columns = [],
  data = [],
  headerStyle = {},
  cellStyle = {},
  emptyMessage = "No data found",
  useTestData = false,
  testDataCount = 10,
  onCallClick,
  onDeleteClick,
  onWhatsAppClick,
  onRowSelect,
  selectedRows = new Set()
}) => {
  const [columnWidths, setColumnWidths] = useState({});
  const [resizing, setResizing] = useState(null);
  const [startX, setStartX] = useState(null);
  const tableRef = useRef(null);
  const [tableData, setTableData] = useState([]);

  // Initialize column widths on first render
  useEffect(() => {
    if (!columns.length) return;

    const initialWidths = {};
    columns.forEach(col => {
      initialWidths[col.id] = col.initialWidth || 150;
    });
    setColumnWidths(initialWidths);
  }, [columns]);

  // Use real data or generate test data
  useEffect(() => {
    if (useTestData) {
      setTableData(generateTestData(columns, testDataCount));
    } else {
      setTableData(Array.isArray(data) ? data : []);
    }
  }, [data, columns, useTestData, testDataCount]);

  // Memoized mouse move handler
  const handleMouseMove = useCallback((e) => {
    if (resizing && startX !== null) {
      const deltaX = e.clientX - startX;
      setColumnWidths(prev => ({
        ...prev,
        [resizing]: Math.max(50, prev[resizing] + deltaX)
      }));
      setStartX(e.clientX);
    }
  }, [resizing, startX]);

  // Memoized mouse up handler
  const handleMouseUp = useCallback(() => {
    setResizing(null);
    setStartX(null);
  }, []);

  // Handle mouse down on resize handle
  const handleMouseDown = useCallback((e, columnId) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(columnId);
    setStartX(e.clientX);
  }, []);

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
  }, [resizing, handleMouseMove, handleMouseUp]);

  // Generate test data function
  const generateTestData = (columns, count) => {
    if (!columns.length || count <= 0) return [];

    const generateValueForColumn = (columnId, index) => {
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
          const today = new Date();
          const pastDate = new Date(today);
          pastDate.setDate(pastDate.getDate() - Math.floor(Math.random() * 365));
          return formatDate(pastDate);

        case 'preferredTime':
          const timeSlots = ['9 AM to 11 AM', '11 AM to 1 PM', '1 PM to 3 PM', '3 PM to 5 PM', '5 PM to 7 PM'];
          return timeSlots[Math.floor(Math.random() * timeSlots.length)];

        case 'serialNo':
          return index + 1;

        default:
          return `Test ${columnId}`;
      }
    };

    const formatDate = (date) => {
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    };

    return Array.from({ length: count }, (_, index) => {
      const rowData = { id: `test-${index}` };
      columns.forEach(column => {
        if (column.id === 'serialNo') {
          rowData[column.id] = index + 1;
        } else {
          rowData[column.id] = generateValueForColumn(column.id, index);
        }
      });
      rowData.found_count = Math.floor(Math.random() * 3);
      rowData.isSelected = selectedRows.has(rowData.id);
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
          zIndex: 1,
          userSelect: "none"
        }}
        onMouseDown={(e) => handleMouseDown(e, columnId)}
        onMouseEnter={(e) => {
          if (e.target && e.target.style) {
            e.target.style.background = "#ddd";
          }
        }}
        onMouseLeave={(e) => {
          if (e.target && e.target.style && resizing !== columnId) {
            e.target.style.background = "transparent";
          }
        }}
      />
    );
  };

  // Render a single table header cell
  const renderHeaderCell = (column) => {
    if (!column || !column.id) return null;

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
          textAlign: column.align || "left",
          minWidth: "50px"
        }}
      >
        {column.label || ''}
        {column.id !== 'checkbox' && renderResizeHandle(column.id)}
      </th>
    );
  };

  // Render checkbox for row selection
  const renderCheckbox = (row) => {
    if (!row || !row.id) return null;

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Checkbox
          checked={selectedRows.has(row.id)}
          onChange={() => onRowSelect && onRowSelect(row.id)}
          sx={{
            padding: 0,
            color: '#000000',
            '&.Mui-checked': {
              color: '#000000',
            }
          }}
        />
      </div>
    );
  };

  // Render serial number
  const renderSerialNumber = (row) => {
    return (
      <div style={{ textAlign: "center", fontWeight: "500" }}>
        {row?.serialNo || '-'}
      </div>
    );
  };

  // Render the call action button
  const renderCallButton = (row,rowIndex) => {
    if (!row) return null;

    return (
      <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
        <Tooltip title={`Call ${row.name || row.mobile || 'Unknown'}`}>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "#4CAF50",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}
            onClick={() => onCallClick && onCallClick(row,rowIndex)}
          // onMouseEnter={(e) => handleMouseEnter(e, "#45a049")}
          // onMouseLeave={(e) => handleMouseLeave(e, "#4CAF50")}
          >
            <AddIcCallIcon fontSize="small" />
          </div>
        </Tooltip>

        {onWhatsAppClick && (
          <Tooltip title={`WhatsApp ${row.name || row.mobile || 'Unknown'}`}>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#25D366",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onClick={() => onWhatsAppClick(row)}
            // onMouseEnter={(e) => handleMouseEnter(e, "#128C7E")}
            // onMouseLeave={(e) => handleMouseLeave(e, "#25D366")}
            >
              <WhatsAppIcon fontSize="small" />
            </div>
          </Tooltip>
        )}
      </div>
    );
  };

  // Render the delete button with safe event handling
  const renderDeleteButton = (row) => {
    if (!row) return null;

    return (
      <Tooltip title="Delete entry">
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #dee2e6",
            cursor: "pointer",
            margin: "0 auto",
            transition: "all 0.2s"
          }}
          onClick={() => onDeleteClick && onDeleteClick(row)}
        // onMouseEnter={(e) => {
        //   if (e.target && e.target.style) {
        //     e.target.style.backgroundColor = "#dc3545";
        //     const svg = e.target.querySelector('svg');
        //     if (svg && svg.style) {
        //       svg.style.color = "white";
        //     }
        //   }
        // }}
        // onMouseLeave={(e) => {
        //   if (e.target && e.target.style) {
        //     e.target.style.backgroundColor = "#f8f9fa";
        //     const svg = e.target.querySelector('svg');
        //     if (svg && svg.style) {
        //       svg.style.color = "#dc3545";
        //     }
        //   }
        // }}
        >
          <DeleteIcon fontSize="small" style={{ color: "#dc3545", transition: "color 0.2s" }} />
        </div>
      </Tooltip>
    );
  };

  // Render exist badge for the "Exist" column
  const renderExistBadge = (row) => {
    if (!row || !row.found_count || row.found_count <= 0) return "-";

    return (
      <Tooltip title="Number of times this contact appears in the database">
        <div
          style={{
            backgroundColor: "#ff9800",
            color: "white",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            margin: "0 auto"
          }}
        >
          {row.found_count}
        </div>
      </Tooltip>
    );
  };

  // Render a single table data cell with support for custom renderers
  const renderDataCell = (rowIndex, column, rowData) => {
    if (!column || !rowData) return null;

    let cellContent;

    try {
      // Use specialized renderers for specific columns
      switch (column.id) {
        case 'checkbox':
          cellContent = renderCheckbox(rowData);
          break;
        case 'serialNo':
          cellContent = renderSerialNumber(rowData);
          break;
        case 'action':
          cellContent = renderCallButton(rowData,rowIndex);
          break;
        case 'exist':
          cellContent = renderExistBadge(rowData);
          break;
        case 'delete':
          cellContent = renderDeleteButton(rowData);
          break;
        default:
          if (column.render && typeof column.render === 'function') {
            cellContent = column.render(rowData);
          } else {
            cellContent = rowData[column.id] !== undefined
              ? <TruncatedText text={rowData[column.id]} />
              : "-";
          }
      }
    } catch (error) {
      console.error(`Error rendering cell for column ${column.id}:`, error);
      cellContent = "-";
    }

    const isSelected = selectedRows.has(rowData.id);
    const rowBgColor = isSelected ? "#e3f2fd" : "transparent";

    return (
      <td
        key={`${rowIndex}-${column.id}`}
        style={{
          ...cellStyle,
          width: columnWidths[column.id] ? `${columnWidths[column.id]}px` : "auto",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: column.align || "left",
          backgroundColor: rowBgColor,
          transition: "background-color 0.2s",
          minWidth: "50px"
        }}
      >
        {cellContent}
      </td>
    );
  };

  // Render empty state when no data is available
  const renderEmptyState = () => {
    return (
      <tr>
        <td colSpan={columns.length} style={{ textAlign: "center", padding: "20px" }}>
          <h4 style={{ color: "#666", margin: 0 }}>{emptyMessage}</h4>
        </td>
      </tr>
    );
  };

  // Early return if no columns provided
  if (!columns.length) {
    return (
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <h4 style={{ color: "#666" }}>No table configuration provided</h4>
      </Box>
    );
  }

  return (
    <Box
      ref={tableRef}
      sx={{
        width: "100%",
        overflowX: "auto", // Enable horizontal scroll for the whole table
        cursor: resizing ? "col-resize" : "default",
        border: "1px solid #dee2e6",
        borderRadius: "4px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxHeight: "473px",
          overflowX: "auto", // Horizontal scroll for both header and body together
          overflowY: "auto",
        }}
      >
        <table
          className="table text-dark"
          style={{
            width: "max-content",
            borderCollapse: "separate",
            borderSpacing: "0 0.5rem", // Uniform horizontal gap
            margin: 0,
          }}
        >
          <thead>
            <tr
              style={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                backgroundColor: "#9c9fa6",
                borderBottom: "2px solid #dee2e6",
              }}
            >
              {columns.map(column => renderHeaderCell(column))}
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row, rowIndex) => {
                if (!row || !row.id) return null;

                const isSelected = selectedRows.has(row.id);
                return (
                  <tr
                    key={rowIndex}
                    style={{
                      borderBottom: "1px solid #dee2e6",
                      backgroundColor: isSelected ? "#e3f2fd" : "transparent",
                      transition: "background-color 0.2s"
                    }}
                  >
                    {columns.map(column => renderDataCell(rowIndex, column, row))}
                  </tr>
                );
              })
            ) : (
              renderEmptyState()
            )}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default ResizableTable;