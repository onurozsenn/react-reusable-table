import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import { DataList } from './dataList';
import {DataType, GeneralTableColsType} from './types/interface'


function App() {
  const [dataTable, setDataTable] = useState<DataType[]>([]);

  useEffect(() => {
    setDataTable(DataList)

  }, []);
 
 const column = [
  // { header: 'Name', field: 'name', sorter: 'desc', type: GeneralTableColsType.imageWithText},
  // { header: 'Email', field: 'email', searchMode:true, type: "text", style: "email-badge"},
  { header: 'İsim', field: 'name', type: GeneralTableColsType.imageWithText},
  { header: 'Email', field: 'email', type: "text", style: "email-badge"},
  { header: 'İçerik', field: 'body', type: "text"},
  {
    header: 'İşlemler', field: '', type: GeneralTableColsType.svgActions, actions: [
      { icon: 'add-plus'},
      { icon: 'add-user' }
    ]
  }
]

  return (
    <div className="App">
      <Table data={dataTable} column={column} />
    </div>
  );
}

export default App;