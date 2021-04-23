import React, { useState } from "react";
import "./RealCard.css";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const RealCard = ({ data }) => {
  const [newTag, setNewTag] = useState("");
  const [click, setClick] = useState(false);

  const average = () => {
    let avg = 0;
    let len = data.grades.length;
    data.grades.forEach((i) => {
      avg = avg + parseInt(i);
    });
    let ans = avg / len;
    return ans;
  };

  const submit = (e) => {
    e.preventDefault();
    data.tagsList.push(newTag);
    setNewTag("");
  };

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <div className="detail">
      <div className="img">
        <img src={data.pic} />
      </div>
      <div className="text">
        <div className="btn">
          <h1>
            {data.firstName.toUpperCase()} {data.lastName.toUpperCase()}
          </h1>
          {/* <button onClick={handleClick}> */}
          <div className='sign' onClick={handleClick}>

            {click ? <RemoveIcon/> : <AddIcon/>}
          </div>
          {/* </button> */}
        </div>
        <p>Email: {data.email}</p>
        <p>Company: {data.company}</p>
        <p>Skill: {data.skill}</p>
        <p>Average: {average()}%</p>
        <div className={click ? "" : "dropdown"}>
          {data.grades &&
            data.grades.map((i, j) => (
              <p>
                Test {j + 1}: {i}
              </p>
            ))}
          {data.tagsList.map((i) => <p className="tag-style">{i}</p>)}

          <form onSubmit={submit}>
            <input
              className="input-tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RealCard;
