import { useState, useEffect } from 'react';
import axios from "axios";
import '../Home.css';
import { AuthContext } from '../App'
import { useContext } from 'react'

const days = Array.from(new Array(365)).map((v, i) => i+1)

export const Home = () => {
  const [amount, setAmount] = useState(0)
  const [checked, setChecked] = useState(Array(365).fill(false));
  const { currentUser } = useContext(AuthContext)

  const handleClick = (value) => {
    const newChecked = [...checked];
    newChecked[value] = !newChecked[value];
    setChecked(newChecked);

    const newAmount = newChecked[value] ? amount + value : amount - value;

    setAmount(newAmount)
    submitAmount(newAmount, value, newChecked)
  }

  const submitAmount = async(newAmount, value,newChecked) => {
    await axios.post("http://localhost:3001/amounts", {
        save_amount: value,
        // checked: newChecked[value],
        total_amount: newAmount,
        user_id: currentUser.id
    });
  }

  // データベースからデータを読み取る
  const fetch = async () => {
    const res = await axios.get("http://localhost:3001/amounts", {
      params: {
        user_id: currentUser.id
      }
    });
    const savingAmount = res.data.is_checked
    const fetchChecked = checked
    savingAmount.forEach(num => fetchChecked[num.save_amount] = true);
    setChecked(fetchChecked)
    return res.data.amount.total_amount
  };

  useEffect(() => {
    fetch().then(res => setAmount(res));
  }, []);


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