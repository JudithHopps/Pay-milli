import React, { useState } from 'react';
import './AddCardForm.css';

interface AddCardFormProps {
  onSubmit: (name: string, imageUrl: string) => void;
  onCancel: () => void;
}

const AddCardForm: React.FC<AddCardFormProps> = ({ onSubmit, onCancel }) => {
  const [cardType, setCardType] = useState('체크카드');
  const [cardNumber, setCardNumber] = useState(['', '', '', '']);
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [password, setPassword] = useState('');

  const handleCardNumberChange = (index: number, value: string) => {
    const newCardNumber = [...cardNumber];
    newCardNumber[index] = value;
    setCardNumber(newCardNumber);
  };

  const handleSubmit = () => {
    onSubmit('새로운 카드', '/images/new_card.png');
  };

  return (
    <div className="add-card-form">
      <h2>카드 정보를 입력해 주세요.</h2>
      <div className="card-type">
        <label>
          <input
            type="radio"
            value="체크카드"
            checked={cardType === '체크카드'}
            onChange={(e) => setCardType(e.target.value)}
          />
          체크카드
        </label>
        <label>
          <input
            type="radio"
            value="신용카드"
            checked={cardType === '신용카드'}
            onChange={(e) => setCardType(e.target.value)}
          />
          신용카드
        </label>
      </div>

      <div className="card-number">
        <label>카드 번호</label>
        <div>
          {cardNumber.map((num, index) => (
            <input
              key={index}
              type="text"
              maxLength={4}
              value={num}
              onChange={(e) => handleCardNumberChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>

      <div className="expiry-date">
        <label>유효기간</label>
        <input
          type="text"
          placeholder="MM/YY"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
      </div>

      <div className="cvc">
        <label>CVC</label>
        <input
          type="text"
          maxLength={3}
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
        />
      </div>

      <div className="password">
        <label>카드 비밀번호</label>
        <input
          type="password"
          maxLength={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="submit-section">
        <button onClick={handleSubmit}>등록</button>
        <button onClick={onCancel}>취소</button>
      </div>
    </div>
  );
};

export default AddCardForm;
