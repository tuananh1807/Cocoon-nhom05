import React from 'react';
import { Table } from 'antd';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], columns = [] } = props;

    // Cấu hình chọn dòng cho phép chọn nhiều dòng
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User', // Vô hiệu hóa checkbox cho một số dòng
            name: record.name,
        }),
    };

    return (
        <div>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </div>
    );
};

export default TableComponent;
