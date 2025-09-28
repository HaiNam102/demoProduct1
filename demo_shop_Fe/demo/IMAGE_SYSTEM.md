# 🖼️ Hệ Thống Hình Ảnh Sản Phẩm

## 📁 Cấu Trúc Thư Mục

```
public/
└── images/
    └── products/
        ├── laptop.svg      # Laptop/Computer
        ├── phone.svg       # Smartphone
        ├── tablet.svg      # Tablet
        ├── headphones.svg  # Headphones/Audio
        ├── watch.svg       # Watch/Accessories
        ├── camera.svg      # Camera/Photography
        ├── book.svg        # Books/Education
        ├── shirt.svg       # Clothing/Fashion
        └── shoes.svg       # Shoes/Footwear
```

## 🔧 Cách Sử Dụng

### 1. Import ImageService

```typescript
import { ImageService } from '../services/imageService';
```

### 2. Sử dụng trong Component

```typescript
// Lấy hình ảnh cho sản phẩm
const imageUrl = ImageService.getFinalImageUrl(
  product.imageUrl,     // URL từ server (nếu có)
  product.name,         // Tên sản phẩm
  product.categoryName  // Tên danh mục
);

// Hiển thị hình ảnh với error handling
<img
  src={imageUrl}
  alt={product.name}
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = ImageService.getPlaceholderImage();
  }}
/>
```

## 🎯 Logic Hoạt Động

### 1. **Ưu tiên theo thứ tự:**
1. **Server Image**: Nếu `product.imageUrl` có giá trị và hợp lệ
2. **Product Name**: Tìm kiếm từ khóa trong tên sản phẩm
3. **Category**: Sử dụng hình ảnh theo danh mục
4. **Default**: Hình ảnh mặc định (laptop.svg)

### 2. **Từ khóa được hỗ trợ:**

#### Electronics:
- `laptop`, `computer` → laptop.svg
- `phone`, `smartphone` → phone.svg
- `tablet`, `ipad` → tablet.svg
- `headphones`, `earphones` → headphones.svg
- `watch`, `smartwatch` → watch.svg
- `camera`, `dslr` → camera.svg

#### Clothing:
- `shirt`, `t-shirt`, `clothes` → shirt.svg
- `shoes`, `sneakers`, `boots` → shoes.svg

#### Books:
- `book`, `books` → book.svg

#### Categories:
- `electronics` → laptop.svg
- `clothing`, `fashion` → shirt.svg
- `books`, `education` → book.svg
- `home`, `furniture` → camera.svg
- `sports`, `fitness` → headphones.svg
- `beauty`, `cosmetics` → phone.svg
- `accessories` → watch.svg

## 🎨 Tính Năng

### ✅ **Auto Image Selection**
- Tự động chọn hình ảnh phù hợp dựa trên tên sản phẩm
- Fallback thông minh theo danh mục
- Error handling tự động

### ✅ **Responsive Design**
- Hình ảnh SVG vector, sắc nét trên mọi màn hình
- Hover effects với scale animation
- Aspect ratio 16:12 nhất quán

### ✅ **Performance**
- SVG nhẹ, load nhanh
- Caching tự động
- Lazy loading support

## 🚀 Demo

Truy cập `/demo-images` để xem demo tất cả hình ảnh sản phẩm.

## 📝 Thêm Hình Ảnh Mới

### 1. Tạo file SVG mới trong `public/images/products/`

### 2. Cập nhật ImageService:

```typescript
private static readonly PRODUCT_IMAGES = {
  // Thêm từ khóa mới
  'new-keyword': '/images/products/new-image.svg',
  
  // Hoặc thêm danh mục mới
  'new-category': '/images/products/new-image.svg',
};
```

### 3. Test với component demo

## 🔧 Customization

### Thay đổi hình ảnh mặc định:

```typescript
// Trong ImageService.getPlaceholderImage()
return '/images/products/your-default.svg';
```

### Thêm logic tùy chỉnh:

```typescript
// Trong ImageService.getProductImage()
if (name.includes('custom-keyword')) {
  return '/images/products/custom-image.svg';
}
```

## 📊 Kích Thước File

| File | Size | Type |
|------|------|------|
| laptop.svg | ~2KB | SVG |
| phone.svg | ~2KB | SVG |
| tablet.svg | ~2KB | SVG |
| headphones.svg | ~2KB | SVG |
| watch.svg | ~2KB | SVG |
| camera.svg | ~2KB | SVG |
| book.svg | ~2KB | SVG |
| shirt.svg | ~2KB | SVG |
| shoes.svg | ~2KB | SVG |

**Total**: ~18KB cho tất cả hình ảnh (rất nhẹ!)

## 🎯 Best Practices

1. **Luôn sử dụng `onError` handler**
2. **Kiểm tra `alt` text cho accessibility**
3. **Sử dụng `ImageService.getFinalImageUrl()` thay vì truy cập trực tiếp**
4. **Test với nhiều tên sản phẩm khác nhau**
5. **Cập nhật ImageService khi thêm sản phẩm mới**
