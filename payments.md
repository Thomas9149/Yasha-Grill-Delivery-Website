# Payment Gateway

- Diagrams for payment gateway processing

### Database schema
Goal: By storing this information in the database, businesses can track and manage payment transactions, customer orders, and payment gateway integrations effectively.

1. Transaction Data
2. Customer Information
3. Order Details
4. Payment Gateway Configuration
5. Error and Log Data

**Note:** Storing credit card numbers or any sensitive payment information directly in your database is not recommended due to security and compliance concerns, namely, PCI DSS (Payment Card Industry Data Security Standard) regulations.
### Scenarios

- [ ] **Consider a scenario where a customer cancels an order shortly after purchase:**
  - If a customer cancels an order shortly after purchase, the payment process typically involves two main stages: authorization and settlement. 
  - If the order is cancelled before the settlement stage, the authorization hold on the customer's funds is released, and the transaction does not proceed to settlement. 
  - However, if the cancellation occurs after settlement, the funds have already been transferred to the merchant's account, and the customer may need to request a refund from the merchant.

- [ ] **What happens if a customer collects the order (e.g: burger), goes home, eats the burger, and then calls their bank to cancel the payment?:**
  - If a customer collects the order, consumes the product, and then disputes the payment with their bank, it may result in a chargeback.
  - A chargeback occurs when a customer disputes a charge with their bank, claiming that they did not receive the product or service as described.
  - Merchants may be liable for chargeback fees and may need to provide evidence to dispute the chargeback.

- [ ] **If a payment is cancelled, what happens with the database? Chargebacks?:**
  - When a payment is cancelled or refunded, the database may need to be updated to reflect the change in transaction status.
  - For cancelled payments, the transaction record may be updated to indicate the cancellation status and any associated details.
  - In the case of chargebacks, the database may need to store information related to the chargeback, such as the reason code, dispute resolution details, and any evidence provided by the merchant.

### Strategies to Handle Concurrent Orders

1. Use database transactions to ensure atomicity. This means that either all operations within the transaction are completed successfully, or none of them are. This can help maintain consistency in inventory levels and order status.
```javascript
async function placeOrder(customerId, productId, quantity) {
  const session = await mongoose.startSession();
  session.startTransaction();

const product = await Product.findById(productId).session(session);

    if (product.stock < quantity) {
      throw new Error('Not enough stock');
    }
}
```

### Asynchronous Payment Processing

- Asynchronous payment processing is useful for handling payments without blocking the main application flow.
- This can be especially important in web applications where you want to ensure that users have a smooth experience without long wait times.

#### Overview
1. Client Request: The client sends a request to initiate a payment.
2. Payment Request Received: The server receives the request and immediately acknowledges it.
3. Queue Payment Task: The server queues the payment processing task in a message queue.
4. Process Payment Task: A worker service listens to the message queue and processes the payment.
5. Notify Client: Once the payment is processed, the worker service updates the payment status in the database and optionally notifies the client.

### Stress testing and Stripe

- Stress testing payment systems is crucial to ensure that your payment infrastructure can handle high volumes of transactions without failing.
- Stripe offers a comprehensive testing environment where you can simulate different payment scenarios.

### Session timeouts
- When dealing with payment processing, timeouts can occur for various reasons, such as network issues, server overload, or delays in third-party payment gateways. 

### Customer notification

- Notify customers about the status of their orders and payments through email or SMS.
- If an order is receive/cancelled, send an immediate confirmation of the received order or cancellation.

--- 
## Software as a Service (SaaS) Pricing Model

In this scenario, the business model revolves around providing software as a service (SaaS) to multiple companies (referred to as "Empresas" in Portuguese). The software facilitates order management, and the pricing structure involves charging a fee based on the number of products sold by each company.

### Key Components:

1. **Startup Empresa Master Database:**
   - Each company (Empresa) has its own dedicated database within the master database managed by the startup.
   - This setup ensures data isolation and security, with each company having its own set of tables and records.

2. **Various Products for Each Empresa:**
   - Each company can offer a range of products, such as burgers, pizzas, or any other items relevant to their business.
   - These products are stored in the respective company's database and can be managed using the software provided by the startup.

3. **Pricing Model:**
   - The pricing model involves charging a fee for the use of the software, calculated as a percentage of the sales revenue generated by each company.
   - Specifically, the startup charges 1% of the revenue generated from the sale of each product by a company.

### Implementation Details:

- **Free Software Package:**
  - The startup provides the core software package to companies free of charge.
  - This package includes essential features for order management, inventory tracking, reporting, etc.

- **Revenue Sharing Agreement:**
  - Upon signing up for the software service, each company agrees to a revenue sharing agreement.
  - As part of this agreement, the company agrees to pay the startup 1% of the revenue generated from the sale of each product facilitated by the software.

- **Database Structure:**
  - Each Empresa has its own set of tables within the master database.
  - These tables store information related to products, orders, customers, etc., specific to each company.

### Benefits:

- **Scalable Revenue Model:**
  - The startup can generate revenue that scales with the success of its clients.
  - As companies grow and sell more products, the startup's revenue increases proportionally.

- **Low Barrier to Entry:**
  - Offering the software for free makes it attractive to potential clients.
  - Companies can start using the software without significant upfront costs, encouraging adoption.

- **Aligned Incentives:**
  - The revenue-sharing model aligns the interests of the startup and its clients.
  - Both parties benefit from increased sales and efficiency facilitated by the software.
