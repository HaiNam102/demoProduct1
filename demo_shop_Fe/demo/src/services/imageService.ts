// Service để quản lý hình ảnh sản phẩm
export class ImageService {
  private static readonly PRODUCT_IMAGES = {
    // Electronics
    'laptop': '/images/products/laptop.svg',
    'phone': '/images/products/phone.svg',
    'tablet': '/images/products/tablet.svg',
    'headphones': '/images/products/headphones.svg',
    'watch': '/images/products/watch.svg',
    'camera': '/images/products/camera.svg',
    
    // Clothing
    'shirt': '/images/products/shirt.svg',
    'shoes': '/images/products/shoes.svg',
    'clothes': '/images/products/shirt.svg',
    
    // Books
    'book': '/images/products/book.svg',
    
    // Default images for different categories
    'electronics': '/images/products/laptop.svg',
    'clothing': '/images/products/shirt.svg',
    'books': '/images/products/book.svg',
    'home': '/images/products/camera.svg',
    'sports': '/images/products/headphones.svg',
    'beauty': '/images/products/phone.svg',
    'fashion': '/images/products/shirt.svg',
    'accessories': '/images/products/watch.svg',
  };

  // Lấy hình ảnh cho sản phẩm dựa trên tên hoặc danh mục
  static getProductImage(productName: string, categoryName?: string): string {
    const name = productName.toLowerCase();
    
    // Tìm kiếm theo tên sản phẩm
    for (const [key, imagePath] of Object.entries(this.PRODUCT_IMAGES)) {
      if (name.includes(key)) {
        return imagePath;
      }
    }
    
    // Nếu không tìm thấy, sử dụng hình ảnh theo danh mục
    if (categoryName) {
      const category = categoryName.toLowerCase();
      for (const [key, imagePath] of Object.entries(this.PRODUCT_IMAGES)) {
        if (category.includes(key)) {
          return imagePath;
        }
      }
    }
    
    // Mặc định sử dụng laptop image
    return '/images/products/laptop.svg';
  }

  // Lấy hình ảnh placeholder
  static getPlaceholderImage(): string {
    return '/images/products/laptop.svg';
  }

  // Kiểm tra xem URL có phải là hình ảnh hợp lệ không
  static isValidImageUrl(url: string): boolean {
    if (!url) return false;
    
    // Kiểm tra nếu là URL từ server
    if (url.startsWith('http')) {
      return true;
    }
    
    // Kiểm tra nếu là đường dẫn local
    if (url.startsWith('/')) {
      return true;
    }
    
    return false;
  }

  // Lấy hình ảnh cuối cùng cho sản phẩm
  static getFinalImageUrl(productImageUrl?: string, productName?: string, categoryName?: string): string {
    // Nếu có imageUrl từ server và hợp lệ, sử dụng nó
    if (this.isValidImageUrl(productImageUrl || '')) {
      return productImageUrl!;
    }
    
    // Nếu không có imageUrl, sử dụng hình ảnh mặc định dựa trên tên sản phẩm
    return this.getProductImage(productName || 'product', categoryName);
  }
}
