import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Download, ArrowLeft, Calendar, Hash } from "lucide-react";
import { toast } from "sonner";

const TransactionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock transaction data
  const transaction = {
    id: id || "TXN001",
    description: "Premium Subscription",
    amount: 1000,
    transactionFee: 22,
    handlingFee: 50,
    total: 1072,
    date: "2025-10-28",
    time: "14:35 PM",
    status: "completed",
    paymentMethod: "UPI",
    recipient: "PayFlow Services",
  };

  const handleDownload = () => {
    toast.success("Invoice downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/history")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to History
        </Button>

        <Card className="p-6 shadow-large">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Transaction Details</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4" />
                <span>{transaction.id}</span>
              </div>
            </div>
            <Badge variant="outline" className="text-success border-success">
              {transaction.status}
            </Badge>
          </div>

          <div className="bg-secondary/50 rounded-lg p-6 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
            <p className="text-4xl font-bold text-primary">₹{transaction.total.toFixed(2)}</p>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Description</span>
              <span className="font-medium">{transaction.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Recipient</span>
              <span className="font-medium">{transaction.recipient}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium">{transaction.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-medium">{transaction.date} at {transaction.time}</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-3 mb-6">
            <h3 className="font-semibold">Breakdown</h3>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Amount</span>
              <span>₹{transaction.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Transaction Fee</span>
              <span>₹{transaction.transactionFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Handling Fee</span>
              <span>₹{transaction.handlingFee.toFixed(2)}</span>
            </div>
          </div>

          <Button onClick={handleDownload} className="w-full shadow-medium">
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default TransactionDetail;
