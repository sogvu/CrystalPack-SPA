export const products = [
  {
    id: "roll-bag",
    name: "Túi cuộn (Roll Bag)",
    shortName: "TÚI CUỘN",
    englishName: "ROLL BAG",
    slogan: "Tiện lợi – Dễ xé – Dễ sử dụng",
    features: ["Dễ xé – Tiện lợi", "Dùng 1 lần", "Đựng thực phẩm tươi sống", "Đựng trái cây, thực phẩm"],
    description: "Túi cuộn CrystalPack (Túi Pha Lê) được sản xuất từ hạt nhựa tự hủy thân thiện môi trường, đóng gói dạng cuộn có lõi giấy, đường gân xé chuẩn xác giúp sử dụng dễ dàng. Phù hợp cho hộ gia đình và siêu thị.",
    material: "HDPE Tự Hủy Sinh Học",
    thickness: "0.02 mm",
    safetyCert: "FDA Food Grade, ISO 9001",
    specs: [
      { size: "S", dimension: "15 x 20 cm", quantity: "100 tờ/cuộn", capacity: "1.0 kg" },
      { size: "M", dimension: "20 x 30 cm", quantity: "120 tờ/cuộn", capacity: "2.5 kg" },
      { size: "L", dimension: "30 x 40 cm", quantity: "150 tờ/cuộn", capacity: "5.0 kg" }
    ],
    prices: {
      retail: 25000, // VND per roll
      wholesale: 16000 // VND per roll for distributors
    },
    images: {
      all: "images/bag_default.jpg",
      fresh: "images/bag_fresh.jpg",
      fruits: "images/bag_fruits.jpg",
      snacks: "images/bag_snacks.jpg"
    },
    // Crop coordinates or styling details specifically to show the Roll Bag
    cropClass: "object-[15%_center] scale-[1.3] md:scale-[1.1]",
    // Keywords for smart search query matching
    searchKeywords: ["cuộn", "roll", "xé", "thịt bò", "thịt gà", "cam", "quýt", "táo", "nho", "thịt", "trái cây", "hoa quả", "tươi sống", "thực phẩm"]
  },
  {
    id: "tshirt-bag",
    name: "Túi T-Shirt (Túi có quai)",
    shortName: "TÚI T-SHIRT",
    englishName: "T-SHIRT BAG",
    slogan: "Bền chắc – Nhiều kích thước – Dễ xách – Tiện lợi",
    features: ["Có quai xách", "Chắc chắn – Tiện mang", "Siêu thị, cửa hàng"],
    description: "Túi T-Shirt CrystalPack (Túi Pha Lê) sở hữu quai xách chắc chắn, độ co giãn cực tốt chịu tải trọng cao lên tới 10kg mà không đứt. Bề mặt nhám mờ sang trọng, in mực organic thân thiện môi trường.",
    material: "LDPE Dẻo Dai Cao Cấp",
    thickness: "0.035 mm",
    safetyCert: "Quatest 3 Safety Approved, ISO 14001",
    specs: [
      { size: "S", dimension: "20 x 30 cm", quantity: "50 cái/xấp", capacity: "2.0 kg" },
      { size: "M", dimension: "26 x 40 cm", quantity: "50 cái/xấp", capacity: "5.0 kg" },
      { size: "L", dimension: "35 x 50 cm", quantity: "50 cái/xấp", capacity: "10.0 kg" }
    ],
    prices: {
      retail: 35000, // VND per pack
      wholesale: 22000 // VND per pack for distributors
    },
    images: {
      all: "images/bag_default.jpg",
      fresh: "images/bag_fresh.jpg",
      fruits: "images/bag_fruits.jpg",
      snacks: "images/bag_snacks.jpg"
    },
    cropClass: "object-center scale-[1.3] md:scale-[1.1]",
    searchKeywords: ["quai", "t-shirt", "siêu thị", "chợ", "cá", "cá hồi", "cá chẽm", "poca", "oishi", "lays", "snack", "khoai tây", "bánh kẹo", "đồ khô"]
  },
  {
    id: "zipper-bag",
    name: "Túi Zip (Zipper Bag)",
    shortName: "TÚI ZIP",
    englishName: "ZIPPER BAG",
    slogan: "Khóa kéo tiện lợi – Bảo quản – Chống ẩm – An toàn",
    features: ["Khóa zip kín", "Giữ tươi lâu – Chống ẩm", "Đựng rau, trái cây, đồ khô", "Đựng thực phẩm tươi sống"],
    description: "Túi Zip CrystalPack (Túi Pha Lê) được thiết kế đường seal kép siêu chắc cùng khóa zip đỏ nổi bật, chống thấm nước, giữ kín hơi tuyệt đối. Giúp thực phẩm tươi ngon lâu gấp 3 lần so với túi thông thường.",
    material: "PE Nguyên Sinh Cao Cấp (100% Food-Grade)",
    thickness: "0.05 mm",
    safetyCert: "FDA approved, EU Plastic Regulation compliant",
    specs: [
      { size: "S", dimension: "12 x 17 cm", quantity: "100 cái/hộp", capacity: "0.5 kg" },
      { size: "M", dimension: "18 x 23 cm", quantity: "80 cái/hộp", capacity: "1.5 kg" },
      { size: "L", dimension: "26 x 34 cm", quantity: "50 cái/hộp", capacity: "4.0 kg" }
    ],
    prices: {
      retail: 45000, // VND per box
      wholesale: 29000 // VND per box for distributors
    },
    images: {
      all: "images/bag_default.jpg",
      fresh: "images/bag_fresh.jpg",
      fruits: "images/bag_fruits.jpg",
      snacks: "images/bag_snacks.jpg"
    },
    cropClass: "object-[85%_center] scale-[1.3] md:scale-[1.1]",
    searchKeywords: ["zip", "zipper", "khóa", "tôm", "hải sản", "xà lách", "ớt chuông", "cà chua", "rau", "rau củ", "m&m", "mentos", "kopiko", "ferrero rocher", "kẹo", "bánh", "ngọt", "khô"]
  }
];

export const videos = [
  {
    id: "test-stretch",
    title: "Bài test kéo giãn chịu lực 10kg không rách",
    duration: "0:10",
    thumbnail: "🌱 Test Độ Bền",
    url: "videos/stretch_test.mp4",
    desc: "Thử nghiệm thực tế túi T-Shirt chịu lực nâng 10kg hàng hóa nặng mà không rách hoặc giãn quai xách."
  },
  {
    id: "sterile-packaging",
    title: "Quy trình đóng gói vô trùng chuẩn ISO",
    duration: "0:30",
    thumbnail: "🏭 Nhà Máy ISO",
    url: "videos/sterile_packing.mp4",
    desc: "Tham quan dây chuyền sản xuất khép kín, tự động hóa vô trùng đạt chuẩn ISO và kiểm tra chất lượng FDA."
  },
  {
    id: "vacuum-zip",
    title: "Mẹo hút chân không bằng túi zip tại nhà",
    duration: "0:53",
    thumbnail: "💡 Mẹo Hút Chân Không",
    url: "videos/vacuum_zip.mp4",
    desc: "Hướng dẫn đuổi khí và khóa kín miệng túi zip bằng nước cực kỳ đơn giản để bảo quản thịt cá tươi lâu."
  }
];
