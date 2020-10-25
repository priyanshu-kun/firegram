import React, { useState } from 'react';
import ProgressBar from './ProgressBar';


const UploadForm = () => {
  // set file and error states
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  // accpetable file types
  const types = ['image/png', 'image/jpeg'];

  // grab file from use and set file state to that file
  const handleChange = (e) => {
    let selected = e.target.files[0];

    // if selected does contain file or it's contain valid file type
    if (selected && types.includes(selected.type)) {
      // then set file and error empty string
      setFile(selected);
      setError('');
    } else {
      // else set file is equal to null
      setFile(null);
      // init error message
      setError('Please select an image file (png or jpg)');
    }
  };

  return (
    <form>
      <label>
        <input type="file" onChange={handleChange} />
        <span>+</span>
      </label>
      <div className="output">
        {/* show error message */}
        {error && <div className="error">{error}</div>}
        {/* if every thing is going right then show file name */}
        {file && <div>{file.name}</div>}
        {/* set progress bar */}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
}

export default UploadForm;