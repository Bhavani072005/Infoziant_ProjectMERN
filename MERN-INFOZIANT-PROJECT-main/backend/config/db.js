const dns = require('dns');
const mongoose = require('mongoose');

// Configure public DNS servers fallback to prevent querySrv ECONNREFUSED on restrictive networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore in sandboxed environments where setServers is restricted
}

const getMongoUri = () => {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error('MONGODB_URI is required. Configure the MongoDB Atlas or local MongoDB connection in backend/.env.');
  }

  if (uri.includes('<username>') || uri.includes('<password>') || uri.includes('<cluster>')) {
    throw new Error('MONGODB_URI in backend/.env still contains placeholder values (<username>, <password>, or <cluster>). Please update backend/.env with your actual MongoDB connection string.');
  }

  let parsedUri;
  try {
    parsedUri = new URL(uri);
  } catch {
    throw new Error('MONGODB_URI must be a valid MongoDB connection string.');
  }

  const hostname = parsedUri.hostname.toLowerCase();
  const isAtlas = hostname.endsWith('.mongodb.net');
  const isLocal = ['localhost', '127.0.0.1', '::1'].includes(hostname);

  if (
    !['mongodb:', 'mongodb+srv:'].includes(parsedUri.protocol) ||
    (!isAtlas && !isLocal)
  ) {
    throw new Error('MONGODB_URI must point to a MongoDB Atlas cluster (*.mongodb.net) or local MongoDB (localhost).');
  }

  return uri;
};

const connectDB = async () => {
  const uri = getMongoUri();
  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB?.trim() || 'docconnect'
    });
    console.log(`MongoDB Atlas connected successfully (${mongoose.connection.host})`);
  } catch (error) {
    console.error('MongoDB Atlas connection error:', error.message.replace(uri, '[redacted MongoDB URI]'));
    throw error;
  }
};

module.exports = connectDB;
module.exports.getMongoUri = getMongoUri;
