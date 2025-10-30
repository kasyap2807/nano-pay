import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { ArrowRight, Tag } from "lucide-react";

const PaymentCheckout = () => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  
  const baseAmount = 1000;
  const transactionFeePercent = 2;
  const transactionFeeFixed = 2;
  const handlingFeePercent = 5;
  const discount = appliedCoupon ? 50 : 0;
  
  const transactionFee = (baseAmount * transactionFeePercent) / 100 + transactionFeeFixed;
  const handlingFee = (baseAmount * handlingFeePercent) / 100;
  const subtotal = baseAmount + transactionFee + handlingFee;
  const totalAmount = subtotal - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "SAVE50") {
      setAppliedCoupon(true);
    }
  };

  const handleCheckout = () => {
    navigate("/payment-success");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Complete Payment</h1>
          <p className="text-muted-foreground">Review your order and proceed to checkout</p>
        </div>

        <Card className="p-6 shadow-medium">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Payment Description</h2>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Service Payment</p>
              <p className="font-medium">Premium Subscription - Annual Plan</p>
              <Badge variant="secondary" className="mt-2">Active</Badge>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Apply Coupon Code</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={appliedCoupon}
                  className="pl-10"
                />
              </div>
              <Button 
                onClick={handleApplyCoupon}
                variant="outline"
                disabled={appliedCoupon}
              >
                {appliedCoupon ? "Applied" : "Apply"}
              </Button>
            </div>
            {appliedCoupon && (
              <p className="text-sm text-success mt-2">✓ Coupon applied successfully!</p>
            )}
          </div>

          <Separator className="my-6" />

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Amount</span>
              <span className="font-medium">₹{baseAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Transaction Fee (2% + ₹2)</span>
              <span>₹{transactionFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Handling Fee (5%)</span>
              <span>₹{handlingFee.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-sm text-success">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-primary">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <Button 
            onClick={handleCheckout}
            className="w-full h-12 text-base shadow-medium hover:shadow-large transition-all"
            size="lg"
          >
            Proceed to Checkout
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          By proceeding, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default PaymentCheckout;
