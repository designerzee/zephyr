# Zephyr Backend

## How to Start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with:
   ```plaintext
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-app-password
   ```
3. Run server:
   ```bash
   npm start
   ```

## API Endpoints
- `POST /contact` — Send a message (email, subject, message)
- `POST /order` — Place an order (name, email, phone, product, price, paymentMethod)