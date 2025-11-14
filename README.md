# Product Explorer

A modern e-commerce product catalog built with Next.js 14 and TypeScript. Browse products, search in real-time, and manage your shopping cart - all with a smooth, responsive interface.

**Live Demo**: [https://neufin-seven.vercel.app](https://neufin-seven.vercel.app)

## What it does

This is a full-featured product browsing experience with:
- Browse through 80+ products with pagination
- Search products as you type (with smart debouncing)
- View detailed product pages with images and specs
- Add items to cart (persists even after refresh)
- Switch between dark and light themes
- Works great on phones, tablets, and desktops

## Built with

- **Next.js 14** - React framework with app router
- **TypeScript** - For type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **Zod** - Runtime type validation
- **Tanstack Query** - Smart data fetching and caching
- **Zustand** - Lightweight state management
- **Jest & Testing Library** - Unit tests

## Quick Start

```bash
# Clone the repo
git clone https://github.com/TayalAditya/Neufin.git
cd Neufin

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're good to go!

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Lint check
npm run test     # Run unit tests
```

## How it works

The app uses Next.js API routes to serve product data. All responses go through Zod validation to ensure type safety:

```typescript
// Define what a product should look like
const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  imageUrl: z.string().url(),
  // ...
});

// Validate before using the data
const result = productSchema.safeParse(apiResponse);
if (!result.success) {
  // Handle error gracefully
  throw new ApiError("Invalid data format");
}
```

This catches any unexpected data issues before they break the UI.

## Project Structure

```
app/
  ├── api/products/        # Next.js API routes
  ├── products/[id]/       # Dynamic product pages
  └── page.tsx             # Homepage with product grid

components/
  ├── ui/                  # Base UI components (buttons, cards, etc)
  ├── products/            # Product-specific components
  ├── cart/                # Shopping cart UI
  └── providers/           # React context providers

lib/
  ├── api/client.ts        # API client with validation
  ├── data/                # Product data (80 mock products)
  ├── store/               # Zustand state (cart management)
  └── validations/         # Zod schemas

__tests__/                 # Jest unit tests
```