import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { CheckCircle2, Home } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 max-w-lg">
        <Card className="p-8 shadow-large text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
          <p className="text-muted-foreground mb-2">Transaction ID: #TXN{Date.now().toString().slice(-8)}</p>
          <p className="text-sm text-muted-foreground mb-8">
            Your payment has been processed successfully
          </p>

          <div className="bg-secondary/50 rounded-lg p-6 mb-8">
            <div className="flex justify-between mb-3">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-bold text-xl text-success">₹1,072.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Date</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => navigate("/history")}
              variant="outline"
              className="flex-1"
            >
              View History
            </Button>
            <Button 
              onClick={() => navigate("/")}
              className="flex-1"
            >
              <Home className="mr-2 h-4 w-4" />
              Done
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
