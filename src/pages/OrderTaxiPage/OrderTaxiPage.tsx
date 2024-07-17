import { OrderForm, OrderHeader } from "./components";
const OrderTaxiPage = () => {
  return (
    <div className="container flex flex-col gap-8 max-h-[100vh] h-[100vh] pb-4 pt-4">
      <OrderHeader />
      <OrderForm />
    </div>
  );
};

export default OrderTaxiPage;
