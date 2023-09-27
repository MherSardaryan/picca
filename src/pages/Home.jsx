import React from 'react'
import { sortList } from '../components/Sort';
import qs from 'qs';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import axios from 'axios';
import PizzaBlock from "../components/PizzaBlock";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Sceleton from "../components/PizzaBlock/Skeleton";
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useSelector,useDispatch } from 'react-redux';
import { setCtegoryId ,setCurrentPage,setFilters} from '../components/redux/filterSlice';


export default function Home() {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const isSearch=React.useRef(false);
  const isMounted=React.useRef(false)

const{categoryId,sort,currentPage}=useSelector((state)=>state.filter)
const sortType=sort.sortProperty



  const {searchValue}=React.useContext(SearchContext)
    const [items,setItems]=useState([])
    const [isloading,setIsLoading]=useState(true)
   
    
   

    const onChangCategory=(id)=>{
     dispatch(setCtegoryId(id))
    };

    const onChangePage=(page)=>{
      dispatch(setCurrentPage(page))
    };

    const fetchPizzas=()=>{
      setIsLoading(true)
    }




    useEffect(()=>{
if(window.location.search){
  const params=qs.parse(window.location.search.substring(1))

const sort=sortList.find(obj=>obj.sortProperty===params.sortProperty)

dispatch(
  setFilters({
    ...params,
    sort,
  }),
);
isSearch.current=true;
}
    },[])
  
  useEffect(()=>{


if(isSearch.current){
  fetchPizzas();
}
isSearch.current=false

    
const sortBy=sortType.replace("-","")
const order=sortType.includes("-") ? 'asc' : 'desc'
const category=categoryId > 0?`category=${categoryId}`:''
const search=searchValue ?`&search=${searchValue}`:''


   

axios.get(`https://6436ed1e8205915d34007ad6.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
)
.then((res)=>{
  setItems(res.data)
    setIsLoading(false)
})



    window.scrollTo(0 ,0)
  },[categoryId,sortType,searchValue,currentPage])

useEffect(()=>{
if(isMounted.current){
  const QueryString=qs.stringify({
    sortProperty:sort.sortProperty,
    categoryId,
    currentPage,
  })
  
  navigate(`?${QueryString}`)
}
isMounted.current=true;

},[categoryId,sortType,searchValue,currentPage])
  
const pizzas=items
.map((obj)=> <PizzaBlock key={obj.id} {...obj}/>)
const skilitons=[...new Array(6)].map((_,index)=><Sceleton key={index}/>)
  return (
    <div className='container'>
    <div className="content__top">
    <Categories value={categoryId} onChangCategory={onChangCategory}/>
<Sort />
</div>
<h2 className="content__title">Все пиццы</h2>
<div className="content__items">
{
isloading
?skilitons
:pizzas
}
</div>
<Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  )
}
