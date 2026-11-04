GearShare 📸

Photography Equipment Rental Platform

GearShare is a modern, responsive photography equipment rental platform that makes it easy for photographers and creators to discover, compare, and rent professional photography equipment.

🌐 Live Website: https://gearshare-azure.vercel.app

---

✨ Features

- Modern Landing Page – Clean, responsive design with dark navy and orange branding.
- Equipment Categories – Browse photography equipment by category.
- Equipment Listings – Explore products such as Sony A7 IV, Canon RF 70-200mm, Studio Lighting Kits, and DJI Camera Gimbals.
- Category Filtering – Easily find equipment based on your requirements.
- Rental Price Calculator – Calculate rental costs based on equipment and rental duration.
- Enquiry System – Submit rental enquiries through an integrated contact form.
- Database Integration – Store customer enquiries using Supabase.
- Admin Dashboard – Manage enquiries through a protected dashboard with approve and reject functionality.
- Responsive Design – Optimized for desktop, tablet, and mobile devices.

🛠️ Technologies Used

Technology| Purpose
Next.js| React framework
React.js| User interface
TypeScript| Type safety
Tailwind CSS| Styling and responsive design
Supabase| PostgreSQL database and backend services
Next.js API Routes| Backend functionality
Vercel| Deployment and hosting
Git & GitHub| Version control

🚀 Getting Started

Follow these instructions to run the project locally.

1. Clone the Repository

[git clone YOUR_GITHUB_REPOSITORY_URL](https://github.com/maavia-create/gearshare.git)

2. Navigate to the Project

cd gearshare

3. Install Dependencies

npm install

4. Configure Environment Variables

Create a ".env.local" file in the root directory.

Add your Supabase credentials:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

Replace the placeholder values with your actual Supabase project credentials.

Never commit private credentials or service-role keys to GitHub.

5. Run the Development Server

npm run dev

Open "http://localhost:3000" (http://localhost:3000) in your browser.

📂 Project Structure

gearshare/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── api/
│
├── components/
│
├── public/
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── .env.local
└── README.md

Note: The structure above is illustrative. Adjust it to match the actual repository.

🗄️ Database

GearShare uses Supabase with PostgreSQL for storing rental enquiry information.

The database integration supports:

- Customer enquiry submissions.
- Enquiry data management.
- Admin-side enquiry status updates.
- Approval and rejection workflows.

🌍 Deployment

The application is deployed using Vercel.

Live Project: https://gearshare-azure.vercel.app

To deploy your own version:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the application.

🤖 AI Usage Disclosure

AI tools were used as development assistants during this project.

Tools used:

- ChatGPT – Assistance with development, documentation.
- Codex - problem solving , debuuging
- Claude - for code suggestions

AI-generated suggestions were reviewed and adapted during implementation.

