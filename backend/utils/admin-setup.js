const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/database');

// Connect to database
connectDB();

// Function to create admin user with custom credentials
const createAdminUser = async (adminData) => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log(`📧 Email: ${existingAdmin.email}`);
      console.log('🔄 To update admin credentials, delete the existing admin first.');
      return;
    }

    // Create admin user
    const adminUser = await User.create({
      name: adminData.name || 'Admin User',
      email: adminData.email,
      password: adminData.password,
      phone: adminData.phone || '+255123456789',
      role: 'admin',
      isVerified: true
    });

    console.log('✅ Admin user created successfully!');
    console.log(`👤 Name: ${adminUser.name}`);
    console.log(`📧 Email: ${adminUser.email}`);
    console.log(`📱 Phone: ${adminUser.phone}`);
    console.log(`🔑 Role: ${adminUser.role}`);
    console.log('\n🔐 You can now login with these credentials');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
};

// Function to update admin credentials
const updateAdminCredentials = async (adminData) => {
  try {
    const admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      console.log('❌ No admin user found. Create one first.');
      return;
    }

    // Update admin credentials
    admin.name = adminData.name || admin.name;
    admin.email = adminData.email;
    admin.password = adminData.password;
    admin.phone = adminData.phone || admin.phone;
    
    await admin.save();

    console.log('✅ Admin credentials updated successfully!');
    console.log(`👤 Name: ${admin.name}`);
    console.log(`📧 Email: ${admin.email}`);
    console.log(`📱 Phone: ${admin.phone}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating admin credentials:', error.message);
    process.exit(1);
  }
};

// Function to delete admin user
const deleteAdminUser = async () => {
  try {
    const admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      console.log('❌ No admin user found.');
      return;
    }

    await User.deleteOne({ role: 'admin' });
    console.log('✅ Admin user deleted successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error deleting admin user:', error.message);
    process.exit(1);
  }
};

// Function to show admin info
const showAdminInfo = async () => {
  try {
    const admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      console.log('❌ No admin user found.');
      return;
    }

    console.log('👤 Admin User Information:');
    console.log(`📧 Email: ${admin.email}`);
    console.log(`👤 Name: ${admin.name}`);
    console.log(`📱 Phone: ${admin.phone}`);
    console.log(`🔑 Role: ${admin.role}`);
    console.log(`✅ Verified: ${admin.isVerified}`);
    console.log(`📅 Created: ${admin.createdAt}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fetching admin info:', error.message);
    process.exit(1);
  }
};

// Main execution
const main = () => {
  const command = process.argv[2];
  
  switch (command) {
    case 'create':
      const adminData = {
        name: process.argv[3] || 'Admin User',
        email: process.argv[4],
        password: process.argv[5],
        phone: process.argv[6] || '+255123456789'
      };
      
      if (!adminData.email || !adminData.password) {
        console.log('❌ Usage: node admin-setup.js create "Admin Name" "admin@email.com" "password" "phone"');
        console.log('📝 Example: node admin-setup.js create "John Admin" "admin@neoestates.com" "securepass123" "+255123456789"');
        process.exit(1);
      }
      
      createAdminUser(adminData);
      break;
      
    case 'update':
      const updateData = {
        name: process.argv[3],
        email: process.argv[4],
        password: process.argv[5],
        phone: process.argv[6]
      };
      
      if (!updateData.email || !updateData.password) {
        console.log('❌ Usage: node admin-setup.js update "Admin Name" "admin@email.com" "password" "phone"');
        process.exit(1);
      }
      
      updateAdminCredentials(updateData);
      break;
      
    case 'delete':
      deleteAdminUser();
      break;
      
    case 'info':
      showAdminInfo();
      break;
      
    default:
      console.log('🔧 Neo Estates Admin Setup Tool');
      console.log('\n📋 Available commands:');
      console.log('  create "Name" "email" "password" "phone"  - Create new admin user');
      console.log('  update "Name" "email" "password" "phone"   - Update admin credentials');
      console.log('  delete                                    - Delete admin user');
      console.log('  info                                      - Show admin information');
      console.log('\n📝 Examples:');
      console.log('  node admin-setup.js create "John Admin" "admin@neoestates.com" "securepass123" "+255123456789"');
      console.log('  node admin-setup.js update "John Admin" "newadmin@neoestates.com" "newpass123" "+255123456789"');
      console.log('  node admin-setup.js delete');
      console.log('  node admin-setup.js info');
      break;
  }
};

main(); 