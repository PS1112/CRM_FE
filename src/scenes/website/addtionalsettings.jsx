import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Chip
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  Download,
  InsertDriveFile,
  CheckCircle,
  Error
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const AdditionalSettings = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragActive, setDragActive] = useState(false);

  // Handle file selection
  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const newFiles = fileArray.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending', // pending, uploading, completed, error
      uploadedAt: null
    }));

    setFiles(prev => [...prev, ...newFiles]);
    
    // Start upload simulation for each file
    newFiles.forEach(fileObj => {
      simulateFileUpload(fileObj.id);
    });
  };

  // Simulate file upload with progress
  const simulateFileUpload = (fileId) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'uploading' } : f
    ));

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      setUploadProgress(prev => ({ ...prev, [fileId]: Math.min(progress, 100) }));

      if (progress >= 100) {
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, status: 'completed', uploadedAt: new Date() }
            : f
        ));
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
        toast.success(`File "${files.find(f => f.id === fileId)?.name}" uploaded successfully!`);
      }
    }, 200);
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files);
    }
  };

  // Remove file
  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
    toast.info('File removed');
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'uploading': return 'info';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#1F2A40', fontWeight: 600 }}>
        File Upload Settings
      </Typography>

      {/* Upload Area */}
      <Card sx={{ marginBottom: 3 }}>
          <Box
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            sx={{
              border: dragActive ? '2px dashed #1976d2' : '2px dashed #ccc',
              borderRadius: 2,
              padding: 4,
              textAlign: 'center',
              backgroundColor: dragActive ? '#f3f7ff' : '#fafafa',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                borderColor: '#1976d2'
              }
            }}
            onClick={() => document.getElementById('file-input').click()}
          >
            <CloudUpload sx={{ fontSize: 48, color: '#1976d2', marginBottom: 2 }} />
            <Typography variant="h6" gutterBottom color={'black'}>
              Drop files here or click to browse
            </Typography>
            <Typography variant="body2" color={'black'}>
              Support for multiple file types (PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, etc.)
            </Typography>
            <input
              id="file-input"
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.txt,.zip"
            />
          </Box>
      </Card>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <Card sx={{ marginBottom: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Upload Progress
            </Typography>
            {Object.entries(uploadProgress).map(([fileId, progress]) => {
              const file = files.find(f => f.id === parseInt(fileId));
              return (
                <Box key={fileId} sx={{ marginBottom: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    {file?.name} - {Math.round(progress)}%
                  </Typography>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* File List */}
      {files.length > 0 && (
        <Card sx={{backgroundColor:"aliceblue"}}>
          <CardContent>
            <Typography variant="h6" gutterBottom color={'black'}>
              Uploaded Files ({files.length})
            </Typography>
            <List>
              {files.map((file, index) => (
                <React.Fragment key={file.id}>
                  <ListItem>
                    <Box sx={{ marginRight: 2 , backgroundColor:"aliceblue"}}>
                      {file.status === 'completed' ? (
                        <CheckCircle color="success" />
                      ) : file.status === 'error' ? (
                        <Error color="error" />
                      ) : (
                        <InsertDriveFile color="action" />
                      )}
                    </Box>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1" color={'black'}>{file.name}</Typography>
                          <Chip 
                            size="small" 
                            label={file.status} 
                            color={getStatusColor(file.status)}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="black">
                            Size: {formatFileSize(file.size)} | Type: {file.type}
                          </Typography>
                          {file.uploadedAt && (
                            <Typography variant="body2" color="black">
                              Uploaded: {file.uploadedAt.toLocaleString()}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {file.status === 'completed' && (
                          <IconButton edge="end" color="primary">
                            <Download />
                          </IconButton>
                        )}
                        <IconButton 
                          edge="end" 
                          color="error"
                          onClick={() => removeFile(file.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < files.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Additional Settings */}
      {/* <Card sx={{ marginTop: 3, backgroundColor:"aliceblue" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color={'black'}>
            Upload Settings
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" size="small">
              Configure File Types
            </Button>
            <Button variant="outlined" size="small">
              Set Size Limits
            </Button>
            <Button variant="outlined" size="small">
              Bulk Actions
            </Button>
            <Button variant="outlined" size="small">
              Export File List
            </Button>
          </Box>
        </CardContent>
      </Card> */}
    </Box>
  );
};

export default AdditionalSettings;