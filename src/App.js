import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import RealCard from "./RealCard";
import Spinner from "./spinner";
<style>
@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
</style>

function App() {
  const [datas, setDatas] = useState([]);
  const [finalResult, setFinalResult] = useState([]);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState([]);
  const [isloading, setIsloading] = useState(true);
  

  const url = "https://www.hatchways.io/api/assessment/students";

  const getData = async () => {
    await axios
      .get(url)
      .then((res) => {
        let tempStudents = res.data.students;
        tempStudents.map((data) => {
          data.tagsList = [];
        });
        setDatas(tempStudents);
        setFinalResult(tempStudents);
      })
      .catch(err=>console.log("Something went wrong--",err));
  };

  const inputSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const inputTagChange = (e) => {
    setTag(e.target.value);
  };

  const test = () => {
    const filtered = datas.filter((data) =>
      data.tagsList.some((i) => {
        if (i === tag) return true;
      })
    );
    setFinalResult(filtered);
  };

  useEffect(() => {
    test();
  }, [tag]);

  useEffect(() => {
    const result = datas.filter(
      (i) =>
        i.firstName.toUpperCase().includes(search.toUpperCase()) ||
        i.lastName.toUpperCase().includes(search.toUpperCase())
    );
    setFinalResult(result);
  }, [search]);

  useEffect(() => {
    getData();
  }, []);
  
  if(datas.length==0 ){

    return (
      
    <Spinner/>
    );
  }


  return (
    <div className="App">
      <input
        value={search}
        onChange={inputSearchChange}
        placeholder="Search by Name"
      />
      <input
        value={tag}
        onChange={inputTagChange}
        placeholder="Search by Tag"
      />
    


     
      {tag.length === 0 && search.length === 0
        ? datas.map((data) => {
            return <RealCard search={search} tag={tag} data={data} />;
          })
        : finalResult.map((data) => {
            return <RealCard search={search} tag={tag} data={data} />;
          })}
    </div>
  );
}

export default App;
