# Product Shop Frontend

Ứng dụng frontend cho hệ thống quản lý sản phẩm, được xây dựng với React, TypeScript và Tailwind CSS.

## Tính năng

- **Trang chủ**: Giao diện chào mừng với thông tin về cửa hàng
- **Danh sách sản phẩm**: Hiển thị tất cả sản phẩm với phân trang và sắp xếp
- **Chi tiết sản phẩm**: Xem thông tin chi tiết của từng sản phẩm
- **Sản phẩm theo danh mục**: Lọc sản phẩm theo danh mục
- **Responsive Design**: Tối ưu cho mọi thiết bị

## Cấu trúc dự án

```
src/
├── component/           # Các component tái sử dụng
│   ├── Header.tsx      # Header với navigation
│   ├── Footer.tsx      # Footer
│   ├── ProductList.tsx # Danh sách sản phẩm
│   ├── ProductDetail.tsx # Chi tiết sản phẩm
│   └── CategoryProducts.tsx # Sản phẩm theo danh mục
├── pages/              # Các trang chính
│   ├── Home.tsx        # Trang chủ
│   ├── Products.tsx    # Trang sản phẩm
│   ├── ProductDetail.tsx # Trang chi tiết sản phẩm
│   ├── CategoryProducts.tsx # Trang sản phẩm theo danh mục
│   └── Categories.tsx  # Trang danh mục
├── services/           # API services
│   └── api.ts         # Service gọi API
├── types/             # TypeScript interfaces
│   └── Product.ts     # Định nghĩa types
└── App.tsx            # Component chính với routing
```

## API Endpoints

Ứng dụng kết nối với backend Spring Boot qua các endpoint:

- `GET /api/v1/products` - Lấy danh sách sản phẩm (có phân trang)
- `GET /api/v1/products/{id}` - Lấy chi tiết sản phẩm
- `GET /api/v1/products/category/{categoryId}` - Lấy sản phẩm theo danh mục

## Cài đặt và chạy

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Chạy ứng dụng:**
   ```bash
   npm run dev
   ```

3. **Build cho production:**
   ```bash
   npm run build
   ```

## Công nghệ sử dụng

- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Vite** - Build tool

## Cấu hình

- **API Base URL**: `http://localhost:8080/api/v1` (có thể thay đổi trong `src/services/api.ts`)
- **Port mặc định**: 5173 (Vite dev server)

## Tính năng UI/UX

- **Responsive Design**: Tối ưu cho desktop, tablet và mobile
- **Loading States**: Hiển thị trạng thái loading
- **Error Handling**: Xử lý lỗi thân thiện
- **Pagination**: Phân trang cho danh sách sản phẩm
- **Sorting**: Sắp xếp theo tên, giá, ngày tạo
- **Search**: Tìm kiếm sản phẩm (UI ready)
- **Vietnamese Localization**: Giao diện tiếng Việt

## Cấu trúc Component

### Header
- Logo và navigation
- Search bar
- User actions (favorites, cart)

### Footer
- Company information
- Quick links
- Contact information
- Social media links

### ProductList
- Grid layout cho sản phẩm
- Pagination controls
- Sort options
- Filter controls

### ProductDetail
- Product image gallery
- Product information
- Quantity selector
- Add to cart functionality
- Breadcrumb navigation

## Styling

Sử dụng Tailwind CSS với:
- **Color Scheme**: Blue primary, gray neutrals
- **Typography**: System fonts với font weights khác nhau
- **Spacing**: Consistent spacing scale
- **Components**: Reusable component classes
- **Responsive**: Mobile-first approach

## Development

Để phát triển thêm tính năng:

1. **Thêm component mới**: Tạo trong `src/component/`
2. **Thêm page mới**: Tạo trong `src/pages/` và cập nhật routing
3. **Thêm API endpoint**: Cập nhật `src/services/api.ts`
4. **Thêm types**: Cập nhật `src/types/Product.ts`

## Deployment

1. Build ứng dụng: `npm run build`
2. Deploy thư mục `dist/` lên web server
3. Cấu hình reverse proxy nếu cần thiết