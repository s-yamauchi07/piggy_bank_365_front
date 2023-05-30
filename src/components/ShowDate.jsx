import { useEffect, useContext,useState } from 'react';
import { AuthContext } from '../App';
import { Calendar } from 'react-calendar';
import { format } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import SavingsIcon from '@mui/icons-material/Savings';
import axios from 'axios';
import '../Home.css';

export const ShowDate = () => {
  const { currentUser }  = useContext(AuthContext)
  const [savingDate, setSavingDate] = useState([])

  const fetch = async () => {
    const res = await axios.get("http://localhost:3001/calendars", {
      params: {
        user_id: currentUser.id
      }
    })
    const onlyDateArray = res.data.map((saving) => ({
      savingDay : saving['updated_at'].split('T')[0],
      savingAmount :saving['save_amount']
    }))
    // console.log(onlyDateArray)
    setSavingDate(onlyDateArray)
  }

  useEffect(() => {
    fetch();
  }, []);



  function getTileContent({date, view}) {
    if (view !== 'month') return;

    // savingDateの変換
    const tileDateString = date.toISOString().split('T')[0]

    const highlight = savingDate.find(d => d.savingDay === tileDateString) 

  // if this date is in our array, highlight it!
    if (highlight) {
      return <div style={{backgroundColor: 'lightblue',height: '36px',borderRadius: '50%'}}><SavingsIcon /></div>
    } else {
      return <div style={{height: '36px'}}>×</div>
    }
  }
  


  return(
    <>
    <p>カレンダー表示</p>
    <Calendar 
    local="ja-JP"
    // calendarType="US"
    defaultValue={new Date()}
    defaultView="month"
    tileContent={getTileContent}
    formatDay={(locale, date) => format(date, 'd')}
    />

    <p>累計推移</p>
    </>
  )
}