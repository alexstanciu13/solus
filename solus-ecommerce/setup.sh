#!/bin/bash
# Solus E-commerce Setup Script
# Run this once to set up your local development environment

echo "🚀 Setting up Solus E-commerce..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Install dependencies if needed
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Push database schema
echo "🗄️  Setting up database..."
npm run db:push

# Seed database
echo "🌱 Seeding database with sample data..."
npm run db:seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎉 You can now run: npm run dev"
echo ""
echo "📧 Login credentials:"
echo "   Admin: admin@solus.ro / admin123"
echo "   Customer: customer@example.com / customer123"
echo ""
