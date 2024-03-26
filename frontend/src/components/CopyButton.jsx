import React, { useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { MdOutlineContentCopy } from "react-icons/md";

const CopyButton = ({ textToCopy }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1500); // Reset copy success message after 1.5 seconds
  };

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="copy-tooltip">{copySuccess ? 'Copied!' : 'Copy to Clipboard'}</Tooltip>}
      >
        <Button variant="light" className='icons btn-sm' onClick={copyToClipboard}>
          <MdOutlineContentCopy />
        </Button>
      </OverlayTrigger>
    </>
  );
};

export default CopyButton;
