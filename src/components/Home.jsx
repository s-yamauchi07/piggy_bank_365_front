import { useState, useEffect } from 'react';
import axios from "axios";
import '../Home.css';
import { AuthContext } from '../App'
import { useContext} from 'react'


export const Home = () => {
  const [amount, setAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [checked, setChecked] = useState(Array(365).fill(false));
  const { currentUser } = useContext(AuthContext)

  let days = [];
  for (let i=1; i <= 365; i++) {
    days.push(i)
  }
  
  const handleClick = (value) => {
    console.log(totalAmount)
    const newChecked = [...checked];
    newChecked[value] = !newChecked[value];
    setChecked(newChecked);

    const newAmount = newChecked[value] ? totalAmount + value : totalAmount - value;
    console.log(newAmount)

    setAmount(newAmount)
    submitAmount(newAmount, value, newChecked)
  }

  const submitAmount = async(newAmount, value,newChecked) => {
    await axios.post("http://localhost:3001/amounts", {
      save_amount: value,
      checked: newChecked[value],
      total_amount: newAmount,
      user_id: currentUser.id
    });
  }

  // データベースからデータを読み取る
  const fetch = async () => {
    const res = await axios.get("http://localhost:3001/amounts")
    return res.data.total_amount
    // setTotalAmount(res.data.total_amount)
  };

  useEffect(() => {
    fetch().then(res => setTotalAmount(res));
  }, [amount]);


  return (
    <>
    <div className="top-content">
      <p>Total Amount: ¥{amount}</p>
      <ul className="num-lists">
        {days.map((item, i) => (
          <li key={i}
              value={item}
              className="num-list"
              style={{backgroundColor: checked[i+1]? 'red': 'transparent'}}
              onClick= { () => handleClick(item)}
          >
          {item}
          </li>
        ))}
      </ul>
    </div>
    </>
  )
} 