# घे भरारी सेवा भावी संस्था - Frontend

React Vite frontend application for the women's empowerment website.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Setup environment variables:**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Update `.env` with your backend API URL:
   \`\`\`env
   VITE_API_BASE_URL=http://localhost:8787
   \`\`\`

3. **Start development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   
   The application will be available at `http://localhost:5173`

## 📁 Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   └── Navigation.jsx   # Main navigation component
├── pages/              # Page components
│   ├── HomePage.jsx    # Landing page
│   ├── RegisterPage.jsx # Member registration
│   ├── BusinessesPage.jsx # Business directory
│   ├── VerifyPage.jsx  # Member verification
│   ├── MembersPage.jsx # Members list
│   ├── HelplinePage.jsx # Helpline services
│   └── ContactPage.jsx # Contact information
├── lib/                # Utilities and helpers
│   └── utils.js        # API helpers and utilities
├── App.jsx             # Main app component
├── main.jsx           # Application entry point
└── index.css          # Global styles
\`\`\`

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Design System**: Custom design tokens
- **Typography**: Noto Sans Devanagari (Marathi support)
- **Colors**: Purple and teal gradients with neutral grays
- **Responsive**: Mobile-first approach

### Custom CSS Classes

\`\`\`css
.gradient-purple {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #ec4899 100%);
}

.gradient-teal {
  background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%);
}

.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
\`\`\`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The frontend communicates with the Cloudflare Workers backend through REST API calls.

### API Helper Functions

\`\`\`javascript
import { apiRequest } from './lib/utils'

// Example usage
const response = await apiRequest('/api/members/register', {
  method: 'POST',
  body: JSON.stringify(memberData),
})
\`\`\`

### Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL

## 📱 Pages Overview

### HomePage (/)
- Hero section with organization branding
- Feature highlights
- Success stories carousel
- Call-to-action buttons

### RegisterPage (/register)
- Multi-step registration form
- Real-time validation
- District and business type selection
- Success confirmation

### BusinessesPage (/businesses)
- Searchable business directory
- Filter by district and business type
- Pagination
- Business contact cards

### VerifyPage (/verify)
- Mobile number verification
- Member information display
- Verification status

### MembersPage (/members)
- Paginated member list
- District filtering
- Member statistics

### HelplinePage (/helpline)
- Emergency contact numbers
- Organization contacts
- Service hours

### ContactPage (/contact)
- Organization information
- Department contacts
- Social media links
- Quick action buttons

## 🎯 Features

### Form Validation
- Real-time input validation
- Marathi error messages
- Mobile number format validation
- Email format validation

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Accessible navigation

### Loading States
- Skeleton loading for data fetching
- Button loading states
- Error handling with user-friendly messages

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

## 🔄 State Management

The application uses React's built-in state management:
- `useState` for component state
- `useEffect` for side effects
- Props for data passing
- Context API for global state (if needed)

## 🚀 Deployment

### Build for Production

\`\`\`bash
npm run build
\`\`\`

This creates a `dist/` folder with optimized production files.

### Deployment Options

1. **Vercel** (Recommended)
   - Connect GitHub repository
   - Automatic deployments on push
   - Environment variables in dashboard

2. **Netlify**
   - Drag and drop `dist/` folder
   - Or connect GitHub repository
   - Configure build settings

3. **Cloudflare Pages**
   - Connect GitHub repository
   - Build command: `npm run build`
   - Output directory: `dist`

### Environment Variables for Production

Update your deployment platform with:
\`\`\`
VITE_API_BASE_URL=https://your-worker-name.your-subdomain.workers.dev
\`\`\`

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check `VITE_API_BASE_URL` in `.env`
   - Ensure backend is running
   - Check CORS settings

2. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check for TypeScript errors
   - Verify all imports

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS classes
   - Verify custom CSS imports

### Development Tips

- Use browser dev tools for debugging
- Check network tab for API calls
- Use React Developer Tools extension
- Monitor console for errors

## 🤝 Contributing

1. Follow the existing code style
2. Use meaningful component and variable names
3. Add comments for complex logic
4. Test on multiple devices and browsers
5. Ensure accessibility compliance

## 📚 Dependencies

### Main Dependencies
- `react` - UI library
- `react-dom` - DOM rendering
- `react-router-dom` - Client-side routing
- `lucide-react` - Icon library
- `clsx` - Conditional class names
- `tailwind-merge` - Tailwind class merging

### Dev Dependencies
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `tailwindcss` - CSS framework
- `eslint` - Code linting
- `typescript` - Type checking

## 📄 License

This project is part of the घे भरारी सेवा भावी संस्था women's empowerment initiative.
\`\`\`
# ghebharariBackend
