import React from "react";

const EmptyRows = ({ count, colSpan }) => {
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push(
      <tr key={i}>
        <td colSpan={colSpan}>&nbsp;</td>
      </tr>
    );
  }
  return rows;
};

export default EmptyRows;

