import { useState, useEffect } from 'react';
import axios from "axios";
import '../top.css';
import { AuthContext } from '../App'
import { useContext } from 'react'
import { Button } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const days = Array.from(new Array(365)).map((v, i) => i+1)

export const Top = () => {
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

  const submitAmount = async(newAmount, value) => {
    await axios.post(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/amounts`, {
        save_amount: value,
        total_amount: newAmount,
        user_id: currentUser.id
    });
  }

  // データベースからデータを読み取る
  const fetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/amounts`, {
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

  const resetButton = async() => {
    await axios.delete(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/amounts/${currentUser.id}`, {
      params: {
        user_id: currentUser.id
      }
    })
    setChecked(Array(365).fill(false));
    setAmount(0)
  }

  useEffect(() => {
    fetch().then(res => setAmount(res));
  }, []);


  return (
    <>
    <div className="wrapper">
      <div className="top-heading">
        <h1 className="total-amount">Total Amount: ¥{amount}</h1>
        <Button variant="outlined" color="error" onClick={ () => resetButton()}><RotateLeftIcon />reset</Button>
      </div>  
      <div className="num-lists">
        {days.map((item, i) => (
          <Button key={i}
              value={item}
              className="num-list"
              style={{backgroundColor: checked[i+1]? 'lightgray': 'transparent'}}
              onClick= { () => handleClick(item)}
              variant="outlined"
          >
          {item}
          </Button>
        ))}
      </div>
    </div>
    </>
  )
} 