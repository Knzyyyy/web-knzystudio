# Product Requirements Document: Knzy Studio — Interactive Digital Web Gift Catalog & Custom Order System

## Problem Statement
Young couples and students (age 15-22) are looking for unique and interactive digital gifts for special occasions like anniversaries and birthdays. They prefer a quick, mobile-first experience with live demos, easy customization options, and seamless payment through popular platforms like WhatsApp. Current solutions are either too generic or lack the interactive and aesthetic appeal that this demographic desires.

## Goals & Success Metrics
### Goals
1. **User Engagement:** Increase user engagement through interactive features and live demos.
2. **Conversion Rate:** Achieve a high conversion rate from website visitors to paying customers.
3. **User Satisfaction:** Ensure a positive user experience with a mobile-first design and seamless checkout process.
4. **Admin Flexibility:** Provide an easy-to-manage configuration system for the admin/developer to update prices, links, and features.

### Success Metrics
1. **User Engagement:** Track time spent on the site, number of live demos accessed, and number of interactive elements used.
2. **Conversion Rate:** Monitor the percentage of visitors who complete a purchase.
3. **User Satisfaction:** Collect feedback via surveys and user reviews.
4. **Admin Flexibility:** Measure the frequency and ease of updates made by the admin.

## User Stories
### User Stories for the Hero Section & Quick Navigation
1. **As a user, I want to see an emotional headline and badge, so I can quickly understand the value of the site.**
   - **Acceptance Criteria:** The headline is visible above the fold, and the badge is interactive.
2. **As a user, I want clear CTA buttons to navigate to the catalog and WhatsApp, so I can easily explore options and contact support.**
   - **Acceptance Criteria:** CTA buttons are prominent and lead to the respective sections or open WhatsApp.

### User Stories for the 3-Tier Product Catalog Cards
1. **As a user, I want to see detailed product cards for anniversary, birthday, and custom templates, so I can choose the best option for my needs.**
   - **Acceptance Criteria:** Each card includes a title, price, live demo link, and list of features.
2. **As a user, I want to access live demos for each template, so I can see the product in action.**
   - **Acceptance Criteria:** Live demo links are functional and open in a new tab.
3. **As a user, I want a one-click copy PIN badge feature for the anniversary template, so I can quickly unlock the demo.**
   - **Acceptance Criteria:** The copy PIN badge button works and displays a toast notification upon successful copy.
4. **As a user, I want detailed lists of features for each template, so I can understand what I am purchasing.**
   - **Acceptance Criteria:** Feature lists are clear and consistent across all templates.

### User Stories for the Interactive Custom Add-On Calculator
1. **As a user, I want a real-time interactive add-on calculator, so I can customize my order and see the total cost.**
   - **Acceptance Criteria:** The calculator updates the total cost in real-time as features are selected.
2. **As a user, I want to add custom notes or references, so I can provide additional details for my order.**
   - **Acceptance Criteria:** An optional text input field is available for custom notes and references.
3. **As a user, I want to see a summary of my selected add-ons and the total cost, so I can review my order before checkout.**
   - **Acceptance Criteria:** The summary is displayed clearly and includes all selected add-ons and the total cost.

### User Stories for the Automated WhatsApp Checkout Generator
1. **As a user, I want an automated WhatsApp checkout generator, so I can place my order directly from the website.**
   - **Acceptance Criteria:** Clicking the checkout button generates a WhatsApp message with the order details.
2. **As a user, I want to be able to send a payment request directly from WhatsApp, so I can complete the transaction quickly.**
   - **Acceptance Criteria:** The WhatsApp message includes a payment request link or QR code.

## Functional Requirements
1. **Hero Section & Quick Navigation:**
   - Display an emotional headline and interactive badge.
   - Include prominent CTA buttons for the catalog and WhatsApp.
2. **3-Tier Product Catalog Cards:**
   - **Romantic Anniversary Template (Rp 45.000):**
     - Live demo link: `https://knzyyyy.github.io/Happy-Anniversary/`
     - One-click copy PIN badge feature with toast notification.
     - Features: Gate PIN Keypad, Segel Lilin, Story Slides, Live Counter, Timeline, Galeri Foto & Video, Kartu Alasan 3D Flip, Surat Cinta Typewriter, Musik.
   - **Sweet Birthday Template (Rp 40.000):**
     - Live demo link: `https://knzyyyy.github.io/Web-HappyBirthday/`
     - Features: Animasi pembuka, kejutan interaktif, galeri kenangan, ucapan personal, musik latar.
   - **Custom / Request Desain Sendiri (Base Price Rp 75.000):**
     - Features: Bebas request warna/tema, kirim referensi video TikTok/IG, 2x revisi, DP 50%.
3. **Interactive Custom Add-On Calculator:**
   - Real-time calculation of total cost based on selected add-ons.
   - Optional text input for custom notes or references.
   - Summary of selected add-ons and total cost.
4. **Automated WhatsApp Checkout Generator:**
   - Generate a WhatsApp message with order details.
   - Include a payment request link or QR code.

## Non-Functional Requirements
1. **Performance:**
   - The website should load within 3 seconds on a 4G mobile connection.
2. **Usability:**
   - The website should be mobile-first and optimized for small screens.
   - All interactive elements should be intuitive and easy to use.
3. **Security:**
   - The website should be secure and protect user data.
   - Use HTTPS for all web pages.
4. **Maintainability:**
   - The admin/developer should be able to update prices, links, and features easily using a centralized configuration file (`CATALOG_CONFIG` in JavaScript).
5. **Accessibility:**
   - The website should be accessible to users with disabilities, following WCAG 2.1 guidelines.

## Open Questions
1. **Payment Integration:**
   - What specific payment methods (e.g., QRIS, e-Wallets) should be supported in the WhatsApp checkout?
2. **Localization:**
   - Should the website support multiple languages, or will it be in Indonesian only?
3. **Analytics:**
   - What analytics tools will be used to track user engagement and conversion rates?
4. **SEO:**
   - What SEO strategies will be implemented to improve the website's visibility?