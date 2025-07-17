# 🌱 Sinh Thái Thông Minh - Smart Ecosystem Management

> Hệ thống quản lý và điều khiển sinh thái thông minh cho Cá, Chó, Mèo

## 🎯 **Tính năng chính**

### 🐠 **Quản lý Cá**
- Monitor nhiệt độ, pH, oxy
- Điều khiển máy cho ăn tự động
- Quản lý đèn LED, lọc nước
- Lịch cho ăn thông minh

### 🐕 **Quản lý Chó**
- Lịch cho ăn và tập thể dục
- Monitor sức khỏe
- Điều khiển thiết bị tự động
- Theo dõi hoạt động

### 🐱 **Quản lý Mèo**
- Quản lý thức ăn tự động
- Monitor môi trường
- Điều khiển đồ chơi
- Theo dõi sức khỏe  
- **Thao tác nhanh**: Các action thường dùng như restart, backup
- **Responsive**: Tối ưu cho mọi thiết bị

## 🎨 Thiết kế

- **Màu chủ đạo**: Xanh rêu (Moss Green) với palette đầy đủ
- **Typography**: Font Poppins
- **Style**: Phong cách enterprise, clean và modern
- **Layout**: Sidebar + Header responsive
- **Icons**: Lucide React icons

## 🛠️ Công nghệ sử dụng

- **Frontend**: React 18 + JavaScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📁 Cấu trúc thư mục

```
src/
├── components/          # Các component tái sử dụng
│   ├── ui/             # UI components cơ bản
│   ├── layout/         # Layout components
│   └── dashboard/      # Dashboard-specific components
├── pages/              # Các trang chính
├── hooks/              # Custom hooks
├── utils/              # Utility functions
├── constants/          # Hằng số và cấu hình
├── services/           # API services (sẵn sàng cho backend)
├── styles/             # CSS và styling
└── assets/             # Hình ảnh và tài nguyên
```

## 🚀 Cài đặt và chạy

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Build production:
```bash
npm run build
```

## 🔧 Cấu hình

### Tailwind CSS
- Đã cấu hình với moss green theme
- Sử dụng Poppins font
- Responsive breakpoints
- Custom components classes

### Vite
- Alias `@` cho src folder
- Hot reload enabled
- Optimized build

## 📱 Responsive Design

- **Mobile**: Sidebar collapse, stack layout
- **Tablet**: Adaptive grid system
- **Desktop**: Full sidebar, multi-column layout

## 🔮 Tính năng sẵn sàng tích hợp

- **API Integration**: Service layer đã chuẩn bị
- **Authentication**: Layout hỗ trợ user management
- **Real-time Updates**: Structure cho WebSocket
- **Dark Mode**: Theme system sẵn sàng
- **Multi-language**: i18n ready

## 🎯 Roadmap

- [ ] Tích hợp với backend API
- [ ] Thêm authentication
- [ ] Real-time monitoring
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Advanced filtering & search
- [ ] Export/Import data
- [ ] Mobile app

## 🤝 Đóng góp

Dự án sử dụng cấu trúc modular, dễ dàng mở rộng và bảo trì:
1. Tạo component mới trong thư mục tương ứng
2. Sử dụng TypeScript patterns (sẵn sàng migrate)
3. Follow existing code style
4. Test trên multiple devices

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

---

**Lưu ý**: Đây là UI/UX module sẵn sàng tích hợp với backend. Tất cả component đã được thiết kế theo chuẩn enterprise và dễ dàng scale up.
