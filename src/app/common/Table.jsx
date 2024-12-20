import React from 'react';

const Table = ({ data, columns }) => {
    const formatDate = (dateValue) => {
        if (dateValue) {
            return new Date(dateValue).toLocaleString();
        }
        return '';
    };

    return (
        <table style={{border: '1px solid black', width: '100%', borderCollapse: 'collapse'}}>
            <thead>
            <tr>
                {columns.map((column, index) => (
                    <th
                        key={index}
                        style={{
                            borderBottom: '1px solid black',
                            padding: '10px',
                            textAlign: 'left',
                        }}
                    >
                        {column.Header}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.length > 0 ? (
                data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td
                                key={colIndex}
                                style={{
                                    padding: '10px',
                                    borderBottom: '1px solid black',
                                    textAlign: 'left',
                                }}
                            >
                                {column.accessor === 'created_at' || column.accessor === 'updated_at'
                                    ? formatDate(row[column.accessor])
                                    : row[column.accessor]}
                            </td>
                        ))}
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={columns.length} style={{textAlign: 'center', padding: '10px'}}>
                        No data available
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default Table;
