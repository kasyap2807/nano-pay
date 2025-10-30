import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { ArrowUpRight, ArrowDownLeft, Calendar } from "lucide-react";

const mockTransactions = {
  sent: [
    { id: "TXN001", description: "Premium Subscription", amount: 1072, date: "2025-10-28", status: "completed" },
    { id: "TXN002", description: "Service Payment", amount: 525, date: "2025-10-25", status: "completed" },
    { id: "TXN003", description: "Product Purchase", amount: 850, date: "2025-10-22", status: "completed" },
  ],
  received: [
    { id: "TXN004", description: "Refund - Order #1234", amount: 200, date: "2025-10-27", status: "completed" },
    { id: "TXN005", description: "Cashback Reward", amount: 50, date: "2025-10-24", status: "completed" },
    { id: "TXN006", description: "Payment Received", amount: 1500, date: "2025-10-20", status: "completed" },
  ],
};

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("sent");

  const handleTransactionClick = (txnId: string) => {
    navigate(`/transaction/${txnId}`);
  };

  const TransactionList = ({ transactions, type }: { transactions: typeof mockTransactions.sent, type: string }) => (
    <div className="space-y-3">
      {transactions.map((txn) => (
        <Card
          key={txn.id}
          className="p-4 cursor-pointer hover:shadow-medium transition-all"
          onClick={() => handleTransactionClick(txn.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                type === "sent" ? "bg-destructive/10" : "bg-success/10"
              }`}>
                {type === "sent" ? (
                  <ArrowUpRight className="h-5 w-5 text-destructive" />
                ) : (
                  <ArrowDownLeft className="h-5 w-5 text-success" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{txn.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{txn.date}</p>
                  <Badge variant="secondary" className="text-xs">{txn.id}</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${type === "sent" ? "text-destructive" : "text-success"}`}>
                {type === "sent" ? "-" : "+"}₹{txn.amount.toFixed(2)}
              </p>
              <Badge variant="outline" className="mt-1 text-xs">
                {txn.status}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Payment History</h1>
          <p className="text-muted-foreground">Track all your transactions</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="received">Received</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sent">
            <TransactionList transactions={mockTransactions.sent} type="sent" />
          </TabsContent>
          
          <TabsContent value="received">
            <TransactionList transactions={mockTransactions.received} type="received" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentHistory;
