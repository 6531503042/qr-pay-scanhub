import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  cardholderName: z.string().min(2, "Name is required"),
  cardNumber: z.string().regex(/^[0-9]{16}$/, "Invalid card number"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cvv: z.string().regex(/^[0-9]{3,4}$/, "Invalid CVV"),
  promoCode: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CreditCardForm() {
  const [cardPreview, setCardPreview] = useState({
    number: "•••• •••• •••• ••••",
    name: "YOUR NAME",
    expiry: "MM/YY",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      promoCode: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle payment submission
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ") || "";
  };

  return (
    <div className="w-full space-y-8">
      {/* Card Preview */}
      <div className="relative h-48 w-full bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl p-6 text-white shadow-lg">
        <div className="absolute top-4 right-4">
          <svg className="w-12 h-12 opacity-80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 9H2M19 4H5C3.34315 4 2 5.34315 2 7V17C2 18.6569 3.34315 20 5 20H19C20.6569 20 22 18.6569 22 17V7C22 5.34315 20.6569 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="h-full flex flex-col justify-between">
          <p className="font-mono text-xl tracking-wider">{cardPreview.number}</p>
          <div className="space-y-2">
            <p className="text-sm opacity-80">Card Holder</p>
            <p className="font-medium tracking-wide">{cardPreview.name}</p>
            <p className="text-sm">{cardPreview.expiry}</p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="cardholderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cardholder Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setCardPreview(prev => ({ ...prev, name: e.target.value || "YOUR NAME" }));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    {...field}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value);
                      field.onChange(e.target.value.replace(/\s/g, ""));
                      setCardPreview(prev => ({ ...prev, number: formatted || "•••• •••• •••• ••••" }));
                    }}
                    maxLength={19}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="MM/YY"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setCardPreview(prev => ({ ...prev, expiry: e.target.value || "MM/YY" }));
                      }}
                      maxLength={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="123"
                      {...field}
                      maxLength={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="promoCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Promo Code (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter promo code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-12 text-lg font-medium">
            <Lock className="mr-2 h-5 w-5" /> Secure Checkout
          </Button>
        </form>
      </Form>
    </div>
  );
}