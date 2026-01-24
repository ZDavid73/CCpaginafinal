# **App Name**: Capsule Corp TCG

## Core Features:

- Secure Authentication: Implements secure user authentication with server-side validation via Supabase RLS, restricted to owners only. Includes JWT token handling.
- Dynamic Product Catalog: Fetches and displays a dynamic catalog of TCG products from the Supabase database, categorized by type (One Piece, MTG, etc.).
- Real-time Shopping Cart: Enables users to add, remove, and update items in a shopping cart with real-time updates using Supabase. Utilizes local storage for persistence and a modal/drawer for display.
- Product Search: Integrates a search functionality within the navbar to filter products by name, providing instant search results.
- Checkout Process: Provides a structured checkout process with basic integration for order placement.
- Order Placement via WhatsApp: Facilitates direct order placement by redirecting users to WhatsApp with pre-filled order details.

## Style Guidelines:

- Primary color: Deep purple (#6A2CB8) to evoke a sense of magic and exclusivity, inspired by the rare cards in TCG games. 
- Background color: Dark gray (#222222), a desaturated near-tone of the primary color. It will provide a sleek backdrop that allows product cards to pop. 
- Accent color: Gold (#FFD700) for highlights, accents and important buttons, to convey prestige and quality.
- Body text: 'Inter' (sans-serif) for body text and headlines, for clear, contemporary readability
- Utilize minimalist icons for categories and cart actions, ensuring they are easily recognizable and consistent with the theme.
- Employ a responsive, mobile-first layout with a clear visual hierarchy. Use card-based design for products to maximize information density.
- Subtle transition effects and loading animations to enhance user experience. A smooth cart drawer animation can also provide user feedback.