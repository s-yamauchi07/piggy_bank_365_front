import '../home.css';
import topImage from "../images/piggy_bank_365.png"

export const Home = () => {
  return(
    <>
    <div className="first-view">
      <img src={topImage} className="top-img"/>
      <div className="top-text-contents">
        <h1>Piggy Bank 356</h1>
        <p>
          Piggy Bank 356は毎日の貯金履歴を管理できるアプリです。<br />
          カレンダーで履歴を確認できるので、継続も簡単！
        </p>
      </div>
    </div>
    </>
  )
}