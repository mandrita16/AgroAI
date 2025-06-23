# AgroAI

# 🌱 AgroAI — Soil Health & Fertility Analysis (Frontend)

 AgroAI is a modern web application that helps users **detect soil nutrient levels** and **determine fertility** based on their location. It visualizes the data and provides insights into which crops are most suitable for the selected region.

This is the **frontend application**, developed using **Next.js** and **Tailwind CSS**, with built-in support for **Google Maps API** to select a location interactively.

---

## 🚀 Features

- 📍 Select location using Google Maps
- 🌾 Detect nutrient levels (N, P, K, pH, etc.)
- ✅ Check if the soil is fertile
- 🌿 Recommend suitable crops based on soil data
- 💡 Responsive and clean UI
- ⚙️ Easy integration with a backend or API

---

## 🧱 Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Mapping**: Google Maps JavaScript API + Geocoding API
- **Package Manager**: `pnpm`

---

## 🔑 Google Cloud Setup (Required)

To enable location-based soil analysis, this project uses:

- [x] **Google Maps JavaScript API**
- [x] **Geocoding API**

### Steps to Set Up Google Cloud:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project.
3. Enable the following APIs:
   - Google Maps JavaScript API
   - Geocoding API
4. Navigate to **APIs & Services → Credentials**.
5. Click **Create Credentials → API key**.
6. Copy your API key.
7. Restrict the key to your domain or usage for security.

### 🔒 Add the API Key to Environment

Create a `.env.local` file in the root of your project and add:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

📦 Installation & Development

```env

# 1. Clone the repository
git clone https://github.com/your-username/AgroAI.git
cd AgroAI

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm run dev
Visit http://localhost:3000 to view the app in your browser.

```

🧩 Project Structure

app/
├── layout.tsx         # Root layout with metadata
├── page.tsx           # Main UI with map + input
├── globals.css        # Tailwind CSS config
components/
├── Map.tsx            # Google Map integration
public/
├── favicon.ico        # Custom icon
.env.local             # Environment variables


📤 Deployment
You can deploy this app on any static hosting platform like:

Vercel

Netlify

🌾 Example Use Case
User selects their farm location on Google Maps.

The app fetches soil data for that region (via backend or local DB).

Based on nutrients and thresholds, it displays:

Soil fertility status (e.g., "Moderately Fertile")

Best crops for the region (e.g., "Wheat, Mustard, Potato")


