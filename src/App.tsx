/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import { ProductProvider } from './context/ProductContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { About } from './pages/About';
import { Delivery } from './pages/Delivery';
import { Contact } from './pages/Contact';
import { OrderRequest } from './pages/OrderRequest';
import { LegalPage } from './pages/LegalPage';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <OrderProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="about" element={<About />} />
              <Route path="delivery" element={<Delivery />} />
              <Route path="contact" element={<Contact />} />
              <Route path="order-request" element={<OrderRequest />} />
              <Route path="admin" element={<Admin />} />
            
            <Route path="privacy-policy" element={
              <LegalPage title="Privacy Policy">
                <p><strong>Effective Date:</strong> August 2026</p>
                <p>Heritage Fingers Pan-African Stores Ltd. ("we", "our", "us") respects your privacy and is committed to protecting your personal data in accordance with the UK GDPR and the Data Protection Act 2018.</p>
                
                <h3>Information We Collect</h3>
                <p>Name, billing and delivery address, email, phone number, payment details (processed securely via payment gateways), and browsing activity.</p>
                
                <h3>How We Use Your Data</h3>
                <p>To process orders, manage delivery/collection, send order tracking updates, respond to inquiries, and improve our services.</p>
                
                <h3>Data Sharing</h3>
                <p>We share essential data strictly with trusted third parties (such as courier delivery partners and payment processors). We never sell your personal information.</p>
                
                <h3>Your Rights</h3>
                <p>Under UK data protection laws, you have the right to request access to, correction of, or deletion of your personal data. Contact us at <a href="mailto:info@heritagefingers.com">info@heritagefingers.com</a> for privacy requests.</p>
              </LegalPage>
            } />
            <Route path="terms-and-conditions" element={
              <LegalPage title="Terms & Conditions">
                <ol className="list-decimal pl-5 space-y-4">
                  <li><strong>Store Information:</strong> Operated by Heritage Fingers Pan-African Stores Ltd., Registered Address: 10 Robert Road, Handsworth, Birmingham, B20 3RT, UK.</li>
                  <li><strong>Order Acceptance:</strong> All orders placed online are subject to stock availability and confirmation. We reserve the right to cancel or adjust orders in the event of pricing errors or inventory shortages.</li>
                  <li><strong>Pricing & Payment:</strong> All prices are displayed in GBP (£). Full payment is required at checkout before order processing and dispatch.</li>
                  <li><strong>Food Safety & Allergen Disclaimer:</strong> Our products (groceries, baked goods, snacks, and catering) may contain or come into contact with common allergens including nuts, sesame, fish, gluten, and milk. Customers are responsible for reviewing ingredient lists and contact us directly for specific dietary inquiries before placing an order.</li>
                  <li><strong>Limitation of Liability:</strong> We are not liable for indirect or consequential damages resulting from product misuse or delayed delivery caused by third-party couriers.</li>
                </ol>
              </LegalPage>
            } />
            <Route path="delivery-collection" element={
              <LegalPage title="Delivery & Collection Policy">
                <h3>Delivery Coverage</h3>
                <p>We deliver authentic African groceries, snacks, beverages, and ingredients across the UK mainland.</p>
                
                <h3>Perishable & Frozen Goods</h3>
                <p>Perishable, fresh, and frozen items are shipped using specialized thermal packaging. Customers are responsible for ensuring someone is available to receive delivery on the scheduled date.</p>
                
                <h3>Dispatch & Delivery Times</h3>
                <p>Orders are processed within 1–2 business days. Estimated standard courier transit time is 24–48 hours once dispatched.</p>
                
                <h3>Local Collection</h3>
                <p>Free store pickup is available at 10 Robert Road, Handsworth, Birmingham, B20 3RT. You will receive a WhatsApp/email notification when your order is packed and ready for collection.</p>
              </LegalPage>
            } />
            <Route path="returns-policy" element={
              <LegalPage title="Returns & Refund Policy">
                <p>Under the UK Consumer Rights Act, your right to return items varies based on product category:</p>
                
                <h3>Perishable & Frozen Foods</h3>
                <p>Due to health, hygiene, and food safety regulations, perishable groceries, fresh bakery items, frozen items, and cooked food cannot be returned or refunded once dispatched unless damaged or defective upon arrival.</p>
                
                <h3>Non-Perishable Goods</h3>
                <p>Sealed, non-perishable ambient items may be returned within 14 days of delivery in their original, unopened condition. Return postage is paid by the customer.</p>
                
                <h3>Damaged or Incorrect Items</h3>
                <p>If an item arrives damaged, missing, or incorrect, you must contact us within 24 hours of delivery at <a href="mailto:info@heritagefingers.com">info@heritagefingers.com</a> or WhatsApp +44 7464 053335 with photos of the damaged product and outer packaging for a prompt replacement or refund.</p>
              </LegalPage>
            } />
            <Route path="cookie-policy" element={
              <LegalPage title="Cookie Policy">
                <p>This website uses cookies to provide essential ecommerce functionalities and enhance your shopping experience.</p>
                
                <h3>Essential Cookies</h3>
                <p>Necessary for account login, basket management, and secure checkout processing.</p>
                
                <h3>Analytics Cookies</h3>
                <p>Help us understand site traffic and popular products so we can improve store layout and navigation.</p>
                
                <h3>Managing Cookies</h3>
                <p>You can adjust or disable cookie preferences directly through your browser settings, though disabling essential cookies may impact store checkout functionality.</p>
              </LegalPage>
            } />
          </Route>
        </Routes>
        </OrderProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

