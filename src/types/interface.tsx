export interface DataType{
    postId?:number,
    id?:number,
    name?:string,
    email?:string,
    body?:string,
  }
  
  export interface TableProp<T>{
      data:T[],
      column:TablePropColumn[],
    }
    
  interface TablePropColumn{
      id?:number,
      header:number | string,
      field:string,
      type: string;
      extraField?: string;
      searchMode?:boolean,
      sorter?:string,
      extraStyle?: string;
      click?(value?: any): any;
      image?: string;
      style?: string;
      actions?: GeneralTableActionsModel[] | any;
      render?:(text:string) => JSX.Element
    }

    export interface GeneralTableActionsModel{
      text?: string;
      icon?: string;
      style?: string;
      disabled?: boolean;
      click?(value: any): any;
    }
  
  // TABLE HEAD 
  export interface TableHead<T>{
      dataList:T[],
      item:TablePropColumn,
      column?:TablePropColumn,
      sortFunc:(sorting:boolean)=>void,
      searchFunc:(word:string)=>void
    }
  
  //TABLE ROW
  export interface TableRowProp<T>{
      item:T,
      column?:TablePropColumn[],
    }
  
  //SORTING
  export interface SortFuncProps{
      sortFunc:(args:boolean)=>void
  }
  
  //SEARCHING
  export interface SearchFuncProps{
      searchFunc:(args:string)=>void
  }
  
  //PAGINATION
  export interface PaginationProps{
      totalSearch:number,
      paginate:(args:number)=>void,
      currentPage:number,
  }

  export enum GeneralTableColsType {
  text = 'text',
  boldText = 'boldText',
  textWithAvatar = 'textWithAvatar',
  actions = 'actions',
  svgActions = 'svgActions',
  html = 'html',
  badgeHtml = 'badgeHtml',
  arrayWithBadge = 'arrayWithBadge',
  doubleDate = 'doubleDate',
  link = 'link',
  longText = 'longText',
  badgeDropdown = 'badgeDropdown',
  multiLine = 'multiLine',
  date = 'date',
  imageWithText = 'imageWithText',
  onlyAvatar = 'onlyAvatar',
  buttonWithTextIcon = 'buttonWithTextIcon',
  customButton = 'customButton',
  image = 'image',
  icon = "icon",
  dateOrText = "dateOrText",
  squareMeters = "squareMeters",
  clickableText = "clickableText",
  fistCharUpperCaseText = "fistCharUpperCaseText"
}
