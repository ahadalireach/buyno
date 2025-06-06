import {
  care,
  stationery,
  accessories,
  electronics,
  clothes,
  fitness,
  groceries,
  furniture,
  others,
  toys,
} from "../assets";

export const categoriesData = [
  {
    id: 1,
    title: "Clothing & Fashion",
    subTitle: "",
    image_Url: clothes,
  },
  {
    id: 2,
    title: "Mobiles & Electronics",
    subTitle: "",
    image_Url: electronics,
  },
  {
    id: 3,
    title: "Home & Kitchen",
    subTitle: "",
    image_Url: furniture,
  },
  {
    id: 4,
    title: "Beauty & Personal Care",
    subTitle: "",
    image_Url: care,
  },
  {
    id: 5,
    title: "Grocery & Food",
    subTitle: "",
    image_Url: groceries,
  },
  {
    id: 6,
    title: "Health & Fitness",
    subTitle: "",
    image_Url: fitness,
  },
  {
    id: 7,
    title: "Toys & Baby Items",
    subTitle: "",
    image_Url: toys,
  },
  {
    id: 8,
    title: "Books & Stationery",
    subTitle: "",
    image_Url: stationery,
  },
  {
    id: 9,
    title: "Car & Bike Accessories",
    subTitle: "",
    image_Url: accessories,
  },
  {
    id: 10,
    title: "Others",
    subTitle: "",
    image_Url: others,
  },
];

export const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Best Selling",
    url: "/best-selling",
  },
  {
    title: "Products",
    url: "/products",
  },
  {
    title: "Events",
    url: "/events",
  },
  {
    title: "FAQ",
    url: "/faq",
  },
];

export const footerInformationLinks = [
  {
    name: "About us",
    link: "/about",
  },
  {
    name: "Contact us",
    link: "/contact",
  },
  {
    name: "FAQ",
    link: "/faq",
  },
  {
    name: "Events",
    link: "/events",
  },
];

export const footerAccountLinks = [
  {
    name: "Login",
    link: "/login",
  },
  {
    name: "My Cart",
    link: "/cart",
  },
  {
    name: "Wishlist",
    link: "/wishlist",
  },
  {
    name: "My Account",
    link: "/profile",
  },
];

export const FaqData = [
  {
    question: "What is your return policy?",
    answer:
      "If you're not satisfied with your purchase, we accept returns within 30 days of delivery. To initiate a return, please email us at support@myecommercestore.com with your order number and a brief explanation of why you're returning the item.",
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order by clicking the tracking link in your shipping confirmation email, or by logging into your account on our website and viewing the order details.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can contact our customer support team by emailing us at support@myecommercestore.com, or by calling us at (555) 123-4567 between the hours of 9am and 5pm EST, Monday through Friday.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Unfortunately, once an order has been placed, we are not able to make changes or cancellations. If you no longer want the items you've ordered, you can return them for a refund within 30 days of delivery.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we only offer shipping within the United States.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, PayPal payment method also we have cash on delivery system.",
  },
];
