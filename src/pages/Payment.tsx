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
  Download,
} from "lucide-react";

const Payment = () => {
  const [timeLeft, setTimeLeft] = useState(600);
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
  };

  const handleCreditCardPayment = () => {
    toast({
      title: "Switching Payment Method",
      description: "Redirecting to credit card payment...",
      duration: 3000,
    });
  };

  const handleSaveQRCode = () => {
    toast({
      title: "Downloading QR Code",
      description: "Your QR code is being downloaded...",
      duration: 3000,
    });
    // Here you would implement actual QR code download logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6 bg-white shadow-lg rounded-xl">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">QR Payment</h1>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-700">Tennis Court A</h2>
            <p className="text-3xl font-bold text-primary">$25.00</p>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
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
            onClick={handleSaveQRCode}
            variant="outline"
            className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200 flex items-center justify-center gap-2 h-12"
          >
            <Download className="w-5 h-5" />
            Save QR Code
          </Button>

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