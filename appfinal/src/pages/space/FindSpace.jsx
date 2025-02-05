import React from "react";
import Display from "../../components/FilterBar/Display";
import PackageDisplay from "../../components/package/PackageDisplay";
import ListCard from "../../components/listcomponents/ListCard";



const FindSpace = () => {
  const navi=()=>{
    console.log("hello");
    
  }

  return(<> 

  <h1>FIND SPACE</h1>
  <Display></Display>
  
    <ListCard></ListCard>
    <br></br>
    <PackageDisplay img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwcf09BODgX7VbhRf07dq9mBKXiQwQxzG-Q&s"}
   title={"낮 패키지"} standard={"6"} max={"12"} price={"120000"} navigatorHandler={navi} ></PackageDisplay>
   <PackageDisplay img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPVr3w8Pov0BQ0sJlrmKaS-P8Nz8ONNF-VUQ&s"}
   title={"밤 패키지"} standard={"4"} max={"8"} price={"150000"} navigatorHandler={navi} ></PackageDisplay>
  </>);
};

export default FindSpace;
