import {SortFuncProps } from '../types/interface'

function Sorter({sortFunc}:SortFuncProps) {


  return (
    <div>
      <button style={{backgroundColor:'#fff',padding:'2px',border:'1px solid #000',height:'20px'}} onClick={()=>sortFunc(false)}>Δ</button>
      <button style={{backgroundColor:'#fff',padding:'2px',border:'1px solid #000',marginLeft:'5px',height:'20px'}} onClick={()=>sortFunc(true)}>∇</button>

    </div>
  );
}

export default Sorter;