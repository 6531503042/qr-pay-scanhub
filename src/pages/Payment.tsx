import { Card } from "@/components/ui/card";
import { CreditCardForm } from "@/components/CreditCardForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Payment = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-lg p-6 md:p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Secure Payment</h1>
            <p className="text-gray-500 mt-1">Enter your card details below</p>
          </div>
          <div className="text-sm font-medium text-blue-600">
            <span className="mr-1">$</span>
            <span className="text-xl">99.00</span>
          </div>
        </div>

        <CreditCardForm />

        <div className="pt-4 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Payment;