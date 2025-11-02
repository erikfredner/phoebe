# In Loving Memory - Memorial Tribute

A beautiful, mobile-first memorial web application designed to honor and celebrate a life well lived.

## Features

- **Mobile-First Responsive Design**: Optimized for all devices, from smartphones to desktop computers
- **Memorial Photo**: Single elegant photo display with subtle hover effects
- **Life Story Section**: Share a meaningful tribute with an expandable "Read More" feature
- **Donation Button**: Single customizable action button for charitable donations
- **Elegant Styling**: Minimalist design with simplified color palette (slate gray and white)
- **GitHub Pages Ready**: Configured for easy deployment

## Customization

To personalize this memorial site:

1. **Image**: Replace the placeholder image in `index.html` with an actual photo (line 23)
2. **Name and Dates**: Update the header text in `index.html` (line 14-15)
3. **Life Story**: Edit the story content in `index.html` (line 45-61)
4. **Donation Link**: Update the href attribute for the donation button (line 73)
5. **Colors**: Modify CSS variables in `style.css` (line 8-14) to match your preferred theme

## Local Development

To view the site locally:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx serve

# Then open http://localhost:8000 in your browser
```

## GitHub Pages Deployment

This site is ready to be published via GitHub Pages:

1. Go to your repository Settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select your branch (e.g., `main` or `copilot/create-in-memoriam-web-app`)
4. Click "Save"
5. Your site will be published at `https://[username].github.io/[repository-name]/`

## Technologies Used

- Pure HTML5, CSS3, and JavaScript (no frameworks required)
- Mobile-first responsive design
- CSS Grid and Flexbox for layouts
- Smooth CSS transitions and animations
- Accessibility features (ARIA labels, focus states, reduced motion support)

## Browser Support

Works on all modern browsers including:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Feel free to use and modify this template for your memorial needs.