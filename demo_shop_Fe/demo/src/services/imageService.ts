// Service để quản lý hình ảnh sản phẩm
export class ImageService {
  private static readonly PRODUCT_IMAGES = {
    // Electronics
    'laptop': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop',
    'phone': 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=400&auto=format&fit=crop',
    'tablet': 'https://images.unsplash.com/photo-1561152044-08a2d3635167?q=80&w=400&auto=format&fit=crop',
    'headphones': 'https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=400&auto=format&fit=crop',
    'watch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop',
    'camera': 'https://images.unsplash.com/photo-1519638831568-d9897f54ed69?q=80&w=400&auto=format&fit=crop',
    
    // Clothing
    'shirt': 'https://images.unsplash.com/photo-1620799140408-edc6d5f93504?q=80&w=400&auto=format&fit=crop',
    'shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop',
    'clothes': 'https://images.unsplash.com/photo-1620799140408-edc6d5f93504?q=80&w=400&auto=format&fit=crop',
    
    // Books
    'book': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
    
    // Default images for different categories
    'electronics': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop',
    'clothing': 'https://images.unsplash.com/photo-1620799140408-edc6d5f93504?q=80&w=400&auto=format&fit=crop',
    'books': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
    'home': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=400&auto=format&fit=crop',
    'sports': 'https://images.unsplash.com/photo-1552674605-db6ffd5ca2ce?q=80&w=400&auto=format&fit=crop',
    'beauty': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=400&auto=format&fit=crop',
    'fashion': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop',
    'accessories': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop',
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
    return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop';
  }

  // Lấy hình ảnh placeholder
  static getPlaceholderImage(): string {
    return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop';
  }

  // Lấy hình ảnh cuối cùng cho sản phẩm
  static getFinalImageUrl(productImageUrl?: string, productName?: string, categoryName?: string): string {
    // Nếu có imageUrl từ server và hợp lệ, sử dụng nó
    if (productImageUrl && productImageUrl.startsWith('http')) {
      return productImageUrl;
    }
    
    // Nếu không có imageUrl, sử dụng hình ảnh mặc định dựa trên tên sản phẩm
    return this.getProductImage(productName || 'product', categoryName);
  }
}
