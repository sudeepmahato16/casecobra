import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@casecobra/ui";
import { formatPrice } from "@/utils/helper";

const OrderTable = () => {
  const orders: any[] = [
    {
      id: "669e35de899bc7f92c197bcf",
      configurationId: "669e35be899bc7f92c197bce",
      user: {
        email: "sanji@gmail.com",
      },
      amount: 22,
      isPaid: true,
      status: "awaiting_shipment",
      createdAt: new Date("2024-07-22T10:35:10.318Z"),
      updatedAt: new Date("2024-07-22T10:35:56.655Z"),
      shippingAddress: {
        name: "sanji",
      },
    },
  ];

  return (
    <div>
      <h1 className="text-2xl text-gray-800 font-bold tracking-tight mb-6">
        Incoming orders
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="hidden sm:table-cell">
              Purchase date
            </TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="bg-accent">
              <TableCell>
                <div className="font-medium">{order.shippingAddress?.name}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {order.user.email}
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {/* <StatusDropdown id={order.id} orderStatus={order.status} /> */}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {order.createdAt.toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                {formatPrice(order.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
