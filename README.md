<div align="center">
    <a href="https://lambent-rolypoly-f5880c.netlify.app"><h1 align="center">Yasha Grill Pizza & Burgers 🍔 </h1></a>

A commercial website, built with [Next.js](https://nextjs.org/), [Boostrap CSS](https://getbootstrap.com/) and deployed to [Vercel](https://vercel.com/hyperfounders-projects/yasha-grill).
</div>

<br/>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/hyperfounders-projects/yasha-grill)
- A template from [Full Stack food ordering website](https://github.com/eminkmru/Full-Stack-food-ordering-Project-with-NextJS)

## Installation instructions

1. Clone the project: `git clone git@github.com:hyperFounder/yasha-grill.git`
2. Install the necessary dependencies: `pnpm install` or ```yarn install```
3. Start the project: `pnpm run dev` or ```yarn dev```

### Project Content and Features

- Developed with the concept of Single Page Application.
- Created the Front-End infrastructure using React and Next.js technologies.
- Implemented responsive transitions with Tailwind CSS.
- Optimized state management using Redux-Toolkit.
- Simplified user authentication using Next-Auth.
- Handled form controls and data validation with Formik and Yup.
- Utilized MongoDB for database operations.

## Docs

1. Accessing the ```\admin``` page:
    - username: admin
    - password: 1VGp1aGiaslGZAf
2. Vercel Environment Variables for Deployment : https://vercel.com/hyperfounders-projects/yasha-grill/settings/environment-variables
#### Mongodb URIs
1. mongodb+srv://emin:emin1234@cluster0.1pok2h5.mongodb.net/food-ordering?retryWrites=true&w=majority
2. mongodb+srv://thomas0:aGzjBcfOvWmqI4bl@yasha-grill.2jrxt46.mongodb.net
3. mongodb+srv://ryanribeiro:DzlM4SSvGX0yhF6W@cluster0.aodtmqh.mongodb.net

#### User orders & MongoDB Database
- The status field of orders in the **orders** table is defined as follows:
```javascript
const getStatusText = (status) => {
  switch(status) {
    case 0: 
      return "Preparing";
    case 1:
      return "Ready for Pickup";
    case 2:
      return "Out for Delivery";
    case 3:
      return "Completed";
    default:
      return "Unknown";
  }
};
```
- The delivery of orders in the **orders** table is defined as follows:
```javascript
const getDeliveryStatus = (delivery) => {
    switch(delivery) {
      case 0:
        return "No";
      case 1:
        return "Delivery";
      default:
        return "Unknown";
    }
};
```
- The status of **payAtCollect** in the **orders** table is defined as follows:
```javascript
const getPayAtCollectStatus = (payAtCollect) => {
    switch(payAtCollect) {
      case 0:
        return "No";
      case 1:
        return "Pay At Collection";
      default:
        return "Unknown";
    }
};
```
- Add new attribute to database and update all columns. E.g: Add a new delivery attribute with a default value of 0 to all documents in the orders collection.
```mongodb-json
db.orders.updateMany(
   {},
   { $set: { delivery: 0 } }
)
```
#### Accessing Pages

- 1. To access login page: ```/auth/login```
- 2. To access the shopping car: ```/cart```

#### Vercel CLI
- The vercel dev command is used to replicate the Vercel deployment environment locally, allowing you to test your Serverless Functions, Edge Functions, and Edge Middleware without requiring you to deploy each time a change is made.
1. ```npm install -g vercel```
2. ```vercel dev```

#### Stripe
- Payments are processed using Stripe.
- Please view the API keys in the .env file.
- Here is the link to test for demo payments - https://docs.stripe.com/testing?locale=en-GB


### Meeting with client

- [ ] **Freshness of Food**:
  - Emphasize the freshness of ingredients, particularly the dough for pizzas and pasta.
- [ ] **Focus on Homemade Items**: 
  - Prioritize homemade burgers, pizzas, and pasta.
  - Highlight the use of fresh, handmade pizza dough and pasta.
- [ ] **Unique Recipes**:
  - Showcase unique recipes, especially the specially crafted meat for the grill.
- [ ] **Diverse Offerings**:
  - Display a menu with 5 options each for pasta, wraps, special burgers, and pizza.
  - Feature around 7 grill items prominently.

### Marketing Campaigns
- [ ] **Too Good To Go**:
  - Offer a 50% promotion discount during the last hour to clear out food and minimize waste.

- [ ] **Two-for-One Pizza Day**:
  - Introduce a "Two-for-One Pizza" offer on less busy days, targeting students.



