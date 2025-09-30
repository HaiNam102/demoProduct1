// Service để quản lý hình ảnh sản phẩm
export class ImageService {
  private static readonly PRODUCT_IMAGES = {
    // Electronics
    'laptop': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    'phone': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    'tablet': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    'headphones': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    'watch': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    'camera': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    
    // Clothing
    'shirt': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    'shoes': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    'clothes': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    
    // Bookss
    'book': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    
    // Default images for different categories
    'electronics': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    'clothing': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    'books': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    'home': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    'sports': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    'beauty': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    'fashion': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    'accessories': 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
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
    return 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3';
  }

  // Lấy hình ảnh placeholder
  static getPlaceholderImage(): string {
    return 'https://tse2.mm.bing.net/th/id/OIP.YaDBxhATS_T_T1VenOPbiAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3';
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
