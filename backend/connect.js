import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Подключение к MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);  // Остановка приложения при ошибке подключения
  }
};

// Вызов функции подключения
connectDB();
