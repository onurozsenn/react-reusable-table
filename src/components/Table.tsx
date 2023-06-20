import React, { useEffect, useState } from 'react';
import '../assets/table.css'
import Search from './Search';
import Sorter from './Sorter';
import Pagination from './Pagination'
import {TableProp , TableHead , TableRowProp} from '../types/interface'
import { ReactComponent as Logo } from './../assets/images/avatar.svg';

const Table = <T extends {}>({ data, column }:TableProp<T>) => {

    const [dataList,setDataList] = useState(data);
    const [isDESC,setDESC] = useState<boolean>(false)
    const [searchWord,setWord] = useState<string>('')
    const [sortingColumn,setsortingColumn] = useState<string>('')
    const [searchingColumn,setSearchgColumn] = useState<string>('')
   
    const [currentPage,setCurrentPage] = useState<number>(1)
    const indexOfLastPost = currentPage * 6
    const indexOfFirstPost = indexOfLastPost - 6
    const paginate = (pageNumber:number) => setCurrentPage(pageNumber)

    const sortTable = (sorting:boolean)=>{
       setDESC(sorting)
    }
    const searchedWord = (word:string)=>{
      setWord(word)
    }
    const sortColumn:string[] = []
    const searchColumn:string[] = []

    useEffect(()=>{
      setsortingColumn(sortColumn[0])
      const sortedData = dataList.sort(isDESC === true ? (a, b) => a[sortingColumn as keyof {}] > b[sortingColumn as keyof {}] ? 1 : -1 : (a, b) => a[sortingColumn as keyof {}] > b[sortingColumn as keyof {}] ? -1 : 1)
      setDataList(sortedData)
    },[isDESC,dataList])

    useEffect(()=>{
      setSearchgColumn(searchColumn[0])
      setDataList(data.filter((data)=>String(data[searchingColumn as keyof {}]).toLowerCase().includes(searchWord)).sort(isDESC === true ? (a, b) => a[sortingColumn as keyof {}] > b[sortingColumn as keyof {}] ? 1 : -1 : (a, b) => a[sortingColumn as keyof {}] > b[sortingColumn as keyof {}] ? -1 : 1))
    },[data,searchWord])

    useEffect(()=>{
      
    },[searchWord])
    return (
      <>
      <div className='table-container'>
      <table>
        <thead>
          <tr>
            {column.map((item, index) => {
              if(item.sorter === 'desc'){
                sortColumn.push(item.field)
               }
              if(item.searchMode === true){
                searchColumn.push(item.field)
              } 
              
              return <TableHeadItem item={item} dataList={dataList} sortFunc={sortTable} searchFunc={searchedWord}/>
            })}
          </tr>
          
        </thead>
        <tbody>
          {dataList.slice(indexOfFirstPost,indexOfLastPost).map((item, index) => {
              return <TableRow item={item} column={column} />
          })}
        </tbody>
      </table>
      </div>
       <div style={{display:'flex',justifyContent:'center'}}>
       <Pagination paginate={paginate} totalSearch={data.length} currentPage={currentPage}/>
     </div>
     </>
    )
  
  }
  
  const TableHeadItem = <T extends {}>({ item, dataList,sortFunc,searchFunc }:TableHead<T>) => {
    const [Data,setData] = useState(dataList);
       useEffect(()=>{
        setData(dataList)
      },[dataList])
        
        if(item.searchMode===true){
            return <th key={item.id}>{item.header} {<Search searchFunc={searchFunc}/> }</th>
        }
        if(item.sorter === 'desc'){
            return <th key={item.id}>{item.header} <Sorter sortFunc={sortFunc} /></th>
        }
        if(item.sorter !== null){
          return <th key={item.id}>{item.header}</th>
      }
        else{
            return <th key={item.id}>{item.header} </th>
        }
      
  }

  const TableRow = <T extends {}>({ item, column}:TableRowProp<T>) => (
  <tr>
    {column?.map((columnItem, index) => {
      
      if(columnItem.render !== undefined){
        return <td key={index}>{columnItem.render(item[`${columnItem.field}` as keyof {}])}</td>
      }
      
      switch(columnItem.type) {
        case 'text':
          return <td><span className={columnItem.style}>{item[`${columnItem.field}` as keyof {}]}</span></td>
        case 'imageWithText':
          return <td>
           <div className='grid'>
            <div>
             <Logo><img src="./../assets/images/avatar.svg"/></Logo>
            </div>
              <div className='long-text'>
                 <span>{item[`${columnItem.field}` as keyof {}]}</span>
              </div>
           </div>
          </td>
          case 'svgActions':
            return <td>
              <div>
                <div className='grid'>
                {
                  columnItem.actions.map((action:any, index:any) => {
                    return (
                      <div key={index}>
                        <div >
                        {(() => {
                          switch (action.icon) {
                            case 'add-plus':
                              return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="24" height="24" rx="12" fill="#E3FCEF"/>
                              <path d="M12 19.5C10.5166 19.5 9.06659 19.0601 7.83322 18.236C6.59985 17.4119 5.63856 16.2406 5.0709 14.8701C4.50325 13.4997 4.35472 11.9917 4.64411 10.5368C4.9335 9.08197 5.6478 7.7456 6.6967 6.6967C7.74559 5.64781 9.08197 4.9335 10.5368 4.64411C11.9917 4.35472 13.4997 4.50325 14.8701 5.07091C16.2406 5.63856 17.4119 6.59986 18.236 7.83323C19.0601 9.0666 19.5 10.5166 19.5 12C19.5 13.9891 18.7098 15.8968 17.3033 17.3033C15.8968 18.7098 13.9891 19.5 12 19.5ZM12 5.75C10.7639 5.75 9.55549 6.11656 8.52769 6.80332C7.49988 7.49008 6.6988 8.46619 6.22575 9.60823C5.7527 10.7503 5.62893 12.0069 5.87009 13.2193C6.11125 14.4317 6.7065 15.5453 7.58058 16.4194C8.45466 17.2935 9.5683 17.8888 10.7807 18.1299C11.9931 18.3711 13.2497 18.2473 14.3918 17.7743C15.5338 17.3012 16.5099 16.5001 17.1967 15.4723C17.8834 14.4445 18.25 13.2361 18.25 12C18.25 10.3424 17.5915 8.75269 16.4194 7.58059C15.2473 6.40848 13.6576 5.75 12 5.75Z" fill="#006644"/>
                              <path d="M12 15.9587C11.8349 15.9565 11.6772 15.89 11.5604 15.7732C11.4437 15.6565 11.3772 15.4987 11.375 15.3337V8.66699C11.375 8.50123 11.4408 8.34226 11.5581 8.22505C11.6753 8.10784 11.8342 8.04199 12 8.04199C12.1658 8.04199 12.3247 8.10784 12.4419 8.22505C12.5592 8.34226 12.625 8.50123 12.625 8.66699V15.3337C12.6228 15.4987 12.5563 15.6565 12.4396 15.7732C12.3228 15.89 12.1651 15.9565 12 15.9587Z" fill="#006644"/>
                              <path d="M15.3333 12.625H8.66666C8.5009 12.625 8.34193 12.5592 8.22472 12.4419C8.10751 12.3247 8.04166 12.1658 8.04166 12C8.04166 11.8342 8.10751 11.6753 8.22472 11.5581C8.34193 11.4408 8.5009 11.375 8.66666 11.375H15.3333C15.4991 11.375 15.6581 11.4408 15.7753 11.5581C15.8925 11.6753 15.9583 11.8342 15.9583 12C15.9583 12.1658 15.8925 12.3247 15.7753 12.4419C15.6581 12.5592 15.4991 12.625 15.3333 12.625Z" fill="#006644"/>
                            </svg>
                              
                            case 'add-user':
                              return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="24" height="24" rx="12" fill="#F4F5F7"/>
                              <path d="M12 12.625C11.3819 12.625 10.7777 12.4417 10.2638 12.0983C9.74993 11.755 9.34939 11.2669 9.11287 10.6959C8.87635 10.1249 8.81446 9.49653 8.93504 8.89034C9.05562 8.28415 9.35325 7.72733 9.79029 7.29029C10.2273 6.85325 10.7841 6.55563 11.3903 6.43505C11.9965 6.31447 12.6249 6.37635 13.1959 6.61288C13.7669 6.8494 14.255 7.24994 14.5983 7.76384C14.9417 8.27775 15.125 8.88193 15.125 9.5C15.125 10.3288 14.7958 11.1237 14.2097 11.7097C13.6237 12.2958 12.8288 12.625 12 12.625ZM12 7.625C11.6292 7.625 11.2666 7.73497 10.9583 7.941C10.65 8.14702 10.4096 8.43986 10.2677 8.78247C10.1258 9.12508 10.0887 9.50208 10.161 9.8658C10.2334 10.2295 10.4119 10.5636 10.6742 10.8258C10.9364 11.088 11.2705 11.2666 11.6342 11.339C11.9979 11.4113 12.3749 11.3742 12.7175 11.2323C13.0601 11.0904 13.353 10.85 13.559 10.5417C13.765 10.2334 13.875 9.87084 13.875 9.5C13.875 9.00272 13.6774 8.52581 13.3258 8.17418C12.9742 7.82255 12.4973 7.625 12 7.625Z" fill="#42526E"/>
                              <path d="M17.8333 18.4583C17.6682 18.4562 17.5105 18.3896 17.3938 18.2729C17.277 18.1561 17.2105 17.9984 17.2083 17.8333C17.2083 16.2083 16.325 15.125 12 15.125C7.675 15.125 6.79166 16.2083 6.79166 17.8333C6.79166 17.9991 6.72582 18.1581 6.60861 18.2753C6.4914 18.3925 6.33242 18.4583 6.16666 18.4583C6.0009 18.4583 5.84193 18.3925 5.72472 18.2753C5.60751 18.1581 5.54166 17.9991 5.54166 17.8333C5.54166 13.875 10.0667 13.875 12 13.875C13.9333 13.875 18.4583 13.875 18.4583 17.8333C18.4562 17.9984 18.3896 18.1561 18.2729 18.2729C18.1561 18.3896 17.9984 18.4562 17.8333 18.4583Z" fill="#42526E"/>
                              <path d="M17.8333 14.0837C17.6682 14.0815 17.5105 14.015 17.3938 13.8982C17.277 13.7815 17.2105 13.6237 17.2083 13.4587V10.542C17.2083 10.3762 17.2742 10.2173 17.3914 10.1001C17.5086 9.98284 17.6676 9.91699 17.8333 9.91699C17.9991 9.91699 18.1581 9.98284 18.2753 10.1001C18.3925 10.2173 18.4583 10.3762 18.4583 10.542V13.4587C18.4562 13.6237 18.3896 13.7815 18.2729 13.8982C18.1561 14.015 17.9984 14.0815 17.8333 14.0837Z" fill="#42526E"/>
                              <path d="M19.2917 12.625H16.375C16.2092 12.625 16.0503 12.5592 15.9331 12.4419C15.8158 12.3247 15.75 12.1658 15.75 12C15.75 11.8342 15.8158 11.6753 15.9331 11.5581C16.0503 11.4408 16.2092 11.375 16.375 11.375H19.2917C19.4574 11.375 19.6164 11.4408 19.7336 11.5581C19.8508 11.6753 19.9167 11.8342 19.9167 12C19.9167 12.1658 19.8508 12.3247 19.7336 12.4419C19.6164 12.5592 19.4574 12.625 19.2917 12.625Z" fill="#42526E"/>
                              </svg>

                              case 'delete':
                              return <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect y="0.553711" width="24" height="24" rx="12" fill="#FFEBE6"/>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.07343 7.68052C7.48666 7.65202 7.84475 7.96391 7.87325 8.37714L8.52692 17.8553C8.55404 18.2486 8.88096 18.5537 9.27515 18.5537H14.7249C15.1191 18.5537 15.446 18.2486 15.4731 17.8553L16.1268 8.37714C16.1553 7.96391 16.5134 7.65202 16.9266 7.68052C17.3399 7.70902 17.6518 8.06711 17.6233 8.48034L16.9696 17.9585C16.8882 19.1383 15.9075 20.0537 14.7249 20.0537H9.27515C8.09258 20.0537 7.11184 19.1383 7.03048 17.9585L6.37681 8.48034C6.34831 8.06711 6.6602 7.70902 7.07343 7.68052Z" fill="#BF2600"/>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 8.05371C5.25 7.6395 5.58579 7.30371 6 7.30371H18C18.4142 7.30371 18.75 7.6395 18.75 8.05371C18.75 8.46792 18.4142 8.80371 18 8.80371H6C5.58579 8.80371 5.25 8.46792 5.25 8.05371Z" fill="#BF2600"/>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.55371C11.1716 6.55371 10.5 7.22528 10.5 8.05371C10.5 8.46792 10.1642 8.80371 9.75 8.80371C9.33579 8.80371 9 8.46792 9 8.05371C9 6.39686 10.3431 5.05371 12 5.05371C13.6569 5.05371 15 6.39686 15 8.05371C15 8.46792 14.6642 8.80371 14.25 8.80371C13.8358 8.80371 13.5 8.46792 13.5 8.05371C13.5 7.22528 12.8284 6.55371 12 6.55371Z" fill="#BF2600"/>
                              </svg>

                              case 'detail':
                              return <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 1C11.6246 1 13.5806 2.38831 14.93 3.88054C15.918 4.97315 16.5454 6.08422 16.8313 6.64601C16.5133 6.0282 15.7216 4.64676 14.4513 3.40702C13.1713 2.15774 11.3487 1 9 1ZM9 1C6.3754 1 4.41941 2.38831 3.07004 3.88054C2.08327 4.97176 1.45624 6.08141 1.16978 6.64387C1.48848 6.02502 2.27987 4.64534 3.54865 3.40702C4.82866 2.15774 6.65132 1 9 1ZM9 13C11.3487 13 13.1713 11.8423 14.4513 10.593C15.7216 9.35324 16.5133 7.9718 16.8313 7.35399C16.5454 7.91578 15.918 9.02685 14.93 10.1195C13.5806 11.6117 11.6246 13 9 13ZM9 13C6.65132 13 4.82866 11.8423 3.54865 10.593C2.27987 9.35466 1.48848 7.97498 1.16978 7.35613C1.45624 7.91859 2.08327 9.02824 3.07004 10.1195C4.41941 11.6117 6.3754 13 9 13Z" stroke="#B3BAC5" stroke-width="1.5"/>
                                <path d="M9.00425 4.5V4.50001C9.66501 4.50376 10.2976 4.7679 10.7649 5.23514C11.2321 5.70237 11.4962 6.335 11.5 6.99575L11.5 6.9977L12.25 7M9.00425 4.5C9.32955 4.50056 9.65325 4.5646 9.95671 4.6903C10.4135 4.87952 10.804 5.19995 11.0787 5.61108C11.3532 6.02187 11.4998 6.50477 11.5 6.99881C11.5 6.99921 11.5 6.9996 11.5 7M9.00425 4.5V4.5H9.00257M9.00425 4.5C9.00369 4.5 9.00313 4.5 9.00257 4.5M12.25 7H11.5M12.25 7C12.2474 7.86114 11.9041 8.68626 11.2952 9.29518C10.6863 9.90411 9.86114 10.2474 9 10.25M12.25 7L9 10.25M11.5 7C11.498 7.49752 11.3484 7.97932 11.0755 8.38679C10.9851 8.52167 10.8813 8.6484 10.7649 8.76485C10.5308 8.9989 10.2553 9.18196 9.95554 9.30688C9.65517 9.43206 9.33047 9.49884 8.99881 9.5C8.99871 9.5 8.99861 9.5 8.99851 9.5C8.99824 9.5 8.99797 9.5 8.9977 9.5L9 10.25M11.5 7C11.5 7.49446 11.3534 7.9778 11.0787 8.38893C10.9873 8.52575 10.883 8.65253 10.7678 8.76777C10.5367 8.9988 10.2615 9.18345 9.95671 9.3097C9.65193 9.43595 9.32673 9.5 9 9.5V10.25M9.00257 4.5H9C8.99005 4.5 8.98011 4.50006 8.97017 4.50018L9.00257 4.5ZM6.93805 5.58637C7.02461 5.46011 7.12298 5.34149 7.23224 5.23224C7.27313 5.19134 7.31534 5.15196 7.35878 5.11416C7.3152 5.15209 7.27299 5.19147 7.23223 5.23223C7.12348 5.34099 7.025 5.45955 6.93805 5.58637ZM6.55403 7.51695C6.55198 7.50722 6.54998 7.49748 6.54804 7.48773C6.54804 7.48773 6.54804 7.48773 6.54804 7.48773C6.54998 7.49748 6.55198 7.50723 6.55403 7.51695ZM7.47485 5.01911C7.52697 4.97898 7.5806 4.94097 7.63558 4.90516C7.62739 4.9105 7.61922 4.91589 7.61108 4.92133C7.56448 4.95246 7.51905 4.98508 7.47485 5.01911Z" stroke="#B3BAC5" stroke-width="1.5"/>
                              </svg>

                              case 'email':
                              return <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect y="0.5" width="24" height="24" rx="12" fill="#EBECF0"/>
                              <path d="M17.8333 6.04199H6.16659C5.78049 6.04418 5.41082 6.19853 5.13781 6.47155C4.86479 6.74456 4.71044 7.11423 4.70825 7.50033V17.5003C4.71044 17.8864 4.86479 18.2561 5.13781 18.5291C5.41082 18.8021 5.78049 18.9565 6.16659 18.9587H17.8333C18.2194 18.9565 18.589 18.8021 18.862 18.5291C19.1351 18.2561 19.2894 17.8864 19.2916 17.5003V7.50033C19.2894 7.11423 19.1351 6.74456 18.862 6.47155C18.589 6.19853 18.2194 6.04418 17.8333 6.04199ZM6.16659 7.29199H17.8333C17.8885 7.29199 17.9415 7.31394 17.9806 7.35301C18.0196 7.39208 18.0416 7.44507 18.0416 7.50033V8.78366L11.9999 11.8003L5.95825 8.78366V7.50033C5.95825 7.44507 5.9802 7.39208 6.01927 7.35301C6.05834 7.31394 6.11133 7.29199 6.16659 7.29199ZM17.8333 17.7087H6.16659C6.11133 17.7087 6.05834 17.6867 6.01927 17.6476C5.9802 17.6086 5.95825 17.5556 5.95825 17.5003V10.1753L11.7166 13.0587C11.8046 13.1027 11.9016 13.1256 11.9999 13.1256C12.0983 13.1256 12.1953 13.1027 12.2833 13.0587L18.0416 10.1753V17.5003C18.0416 17.5556 18.0196 17.6086 17.9806 17.6476C17.9415 17.6867 17.8885 17.7087 17.8333 17.7087Z" fill="#42526E"/>
                              </svg>
                            
                            default:
                              return null
                          }
                        })()}
                        </div>
                      </div>
                    );
                  })
                }
                </div>
              </div>
            </td>
        default:
          return <td key={index}>{item[`${columnItem.field}` as keyof {}]}</td>
      }

    })}
  </tr>

)

export default Table