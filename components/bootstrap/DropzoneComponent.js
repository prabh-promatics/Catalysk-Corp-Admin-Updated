// components/DropzoneComponent.js
import { useDropzone } from 'react-dropzone';

const DropzoneComponent = ({ onDrop, acceptedFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFiles,
    multiple: true, // Allow multiple files if needed
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })} style={dropzoneStyles}>
      <input {...getInputProps()} />
      <p>Drag & drop some files here, or click to select files</p>
      <em>(Only {acceptedFiles} files are accepted)</em>
    </div>
  );
};

// Custom styling for the dropzone
const dropzoneStyles = {
  border: '2px dashed #007bff',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default DropzoneComponent;
