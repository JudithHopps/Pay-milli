import React from "react";
import "./PaymentDetails.css";

interface Payment {
  date: string;
  description: string;
  amount: number;
  balance: number;
}

interface PaymentDetailsProps {
  payments: Payment[];
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ payments }) => {
  return (
    <div className="payment-details">
      {payments.map((payment, index) => (
        <div key={index} className="payment-detail">
          <span>{payment.date}</span>
          <span>{payment.description}</span>
          <span>{payment.amount.toLocaleString()}원</span>
          <span>잔액 {payment.balance.toLocaleString()}원</span>
        </div>
      ))}
    </div>
  );
};

export default PaymentDetails;
