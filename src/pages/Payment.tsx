import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  QrCode,
  Timer,
  CreditCard,
  CheckCircle,
  XCircle,
} from "lucide-react";

const Payment = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [progress, setProgress] = useState(100);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });

      setProgress((prev) => {
        const newProgress = (timeLeft / 600) * 100;
        return newProgress > 0 ? newProgress : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handlePaymentConfirmation = () => {
    toast({
      title: "Payment Verification",
      description: "Verifying your payment. Please wait...",
      duration: 3000,
    });
    // Here you would typically make an API call to verify the payment
  };

  const handleCreditCardPayment = () => {
    toast({
      title: "Switching Payment Method",
      description: "Redirecting to credit card payment...",
      duration: 3000,
    });
    // Redirect to credit card payment page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6 bg-white shadow-lg rounded-xl">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">QR Payment</h1>
          <p className="text-gray-500">Scan to pay for your booking</p>
        </div>

        <div className="relative">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <QrCode className="w-48 h-48 text-gray-800" />
          </div>
          
          <div className="absolute -top-2 -right-2">
            <div className="bg-primary text-white text-sm px-3 py-1 rounded-full flex items-center gap-2">
              <Timer className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Time remaining</span>
            <span>{formatTime(timeLeft)}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-3">
          <Button
            onClick={handlePaymentConfirmation}
            className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 h-12"
          >
            <CheckCircle className="w-5 h-5" />
            I've Already Paid
          </Button>

          <Button
            onClick={handleCreditCardPayment}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 h-12"
          >
            <CreditCard className="w-5 h-5" />
            Pay with Credit Card Instead
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Having trouble? Contact support</p>
        </div>
      </Card>
    </div>
  );
};

export default Payment;