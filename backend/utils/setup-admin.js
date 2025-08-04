const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/database');

// Connect to database
connectDB();

// Your specific admin credentials
const ADMIN_CREDENTIALS = {
  name: 'John Johngora',
  email: 'johnjohngora@gmail.com',
  password: '8xiYJmuZ04opLKCx',
  phone: '+255755070072',
  role: 'admin'
};

const setupAdmin = async () => {
  try {
    console.log('🔧 Setting up admin user...');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log(`📧 Current admin email: ${existingAdmin.email}`);
      
      // Update existing admin with new credentials
      existingAdmin.name = ADMIN_CREDENTIALS.name;
      existingAdmin.email = ADMIN_CREDENTIALS.email;
      existingAdmin.password = ADMIN_CREDENTIALS.password;
      existingAdmin.phone = ADMIN_CREDENTIALS.phone;
      
      await existingAdmin.save();
      console.log('✅ Admin credentials updated successfully!');
    } else {
      // Create new admin user
      const adminUser = await User.create(ADMIN_CREDENTIALS);
      console.log('✅ Admin user created successfully!');
    }

    console.log('\n🎯 Admin User Details:');
    console.log(`👤 Name: ${ADMIN_CREDENTIALS.name}`);
    console.log(`📧 Email: ${ADMIN_CREDENTIALS.email}`);
    console.log(`🔑 Password: ${ADMIN_CREDENTIALS.password}`);
    console.log(`📱 Phone: ${ADMIN_CREDENTIALS.phone}`);
    console.log(`🔑 Role: ${ADMIN_CREDENTIALS.role}`);
    
    console.log('\n🔐 You can now login with these credentials:');
    console.log(`📧 Email: ${ADMIN_CREDENTIALS.email}`);
    console.log(`🔑 Password: ${ADMIN_CREDENTIALS.password}`);
    
    console.log('\n✅ Admin setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up admin:', error.message);
    process.exit(1);
  }
};

// Run the setup
setupAdmin(); 