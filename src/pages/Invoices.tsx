import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { FileText, Search, Download, Eye } from "lucide-react";
import { toast } from "sonner";

const mockInvoices = [
  {
    id: "INV-2025-001",
    txnId: "TXN001",
    description: "Premium Subscription",
    amount: 1072,
    date: "2025-10-28",
    status: "paid",
  },
  {
    id: "INV-2025-002",
    txnId: "TXN002",
    description: "Service Payment",
    amount: 525,
    date: "2025-10-25",
    status: "paid",
  },
  {
    id: "INV-2025-003",
    txnId: "TXN003",
    description: "Product Purchase",
    amount: 850,
    date: "2025-10-22",
    status: "paid",
  },
  {
    id: "INV-2025-004",
    txnId: "TXN006",
    description: "Payment Received",
    amount: 1500,
    date: "2025-10-20",
    status: "paid",
  },
];

const Invoices = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = mockInvoices.filter((invoice) =>
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (invoiceId: string) => {
    toast.success(`Invoice ${invoiceId} downloaded successfully!`);
  };

  const handleView = (txnId: string) => {
    navigate(`/transaction/${txnId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Invoices</h1>
          <p className="text-muted-foreground">Manage and download your invoices</p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by invoice ID or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {filteredInvoices.map((invoice) => (
            <Card key={invoice.id} className="p-6 shadow-soft hover:shadow-medium transition-all">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{invoice.id}</h3>
                      <Badge variant="outline" className="text-xs">{invoice.txnId}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{invoice.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{invoice.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right mr-2">
                    <p className="font-bold text-lg">₹{invoice.amount.toFixed(2)}</p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(invoice.txnId)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(invoice.id)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <Card className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No invoices found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Invoices;
