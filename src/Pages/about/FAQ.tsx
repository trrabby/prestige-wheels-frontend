import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

const faqs = [
  {
    question: "What is Prestige Wheels?",
    answer:
      "Prestige Wheels is a premium automotive company specializing in the sale of luxury and performance vehicles, as well as top-notch car servicing and maintenance. With over 20 years of experience, we are committed to delivering excellence and trust to our customers.",
  },
  {
    question: "Where is Prestige Wheels located?",
    answer:
      "We are headquartered in Banasree, Dhaka, with over 10 locations nationwide. Visit our Locations Page to find a Prestige Wheels branch near you.",
  },
  {
    question: "What types of vehicles do you sell?",
    answer:
      "We offer a wide range of vehicles, including luxury sedans, SUVs, sports cars, and electric vehicles. All our cars are rigorously inspected and certified to meet our high standards.",
  },
  {
    question: "Do you offer financing options?",
    answer:
      "Yes, we provide flexible financing options to help you purchase your dream car. Our team will work with you to find a plan that suits your budget.",
  },
  {
    question: "What services do you offer for car maintenance?",
    answer:
      "We offer a comprehensive range of services, including general maintenance, engine repair, wheel alignment, and safety inspections. Our certified technicians ensure your car stays in top condition.",
  },
  {
    question: "How can I schedule a car service?",
    answer:
      "You can schedule a car service by visiting our website, calling our customer service team, or visiting one of our locations. We offer convenient online booking for your ease.",
  },
  {
    question: "Do you sell used cars?",
    answer:
      "Yes, we have a selection of high-quality, pre-owned vehicles that undergo rigorous inspections to ensure they meet our standards of excellence.",
  },
  {
    question:
      "What makes Prestige Wheels different from other car dealerships?",
    answer:
      "At Prestige Wheels, we combine decades of expertise with a commitment to customer satisfaction. From our premium vehicles to our state-of-the-art servicing, we prioritize quality, trust, and innovation.",
  },
];

const FAQsSection: React.FC = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <Collapse accordion>
          {faqs.map((faq, index) => (
            <Panel header={faq.question} key={index}>
              <p className="text-gray-600">{faq.answer}</p>
            </Panel>
          ))}
        </Collapse>
      </div>
    </section>
  );
};

export default FAQsSection;
