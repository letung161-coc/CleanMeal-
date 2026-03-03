// ============================================================
//  foodData.js – Database thức ăn sạch (dùng trong Backend)
//  20 món với đầy đủ: macros, nguyên liệu, dinh dưỡng, cách làm
// ============================================================

const dishes = [
    {
        id: 1,
        name: "Chicken Breast Salad with Roasted Sesame Dressing",
        category: "Salad",
        badge: "Salad",
        tags: ["Chicken", "Low Carb", "Meal Prep"],
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
        description: "Salad ức gà – giàu protein – ít chất béo, rất thích hợp cho người giảm cân, ăn kiêng, tập gym. Thịt gà mềm, rau tươi giòn kết hợp với sốt mè rang béo nhẹ, thơm ngậy.",
        macros: { cal: 320, carbs: "12g", fats: "10g", protein: "38g" },
        time: "20 min",
        rating: 4.8,
        reviews: 142,
        ingredients: [
            "150g ức gà",
            "50g rau mầm",
            "1/2 quả dưa leo",
            "5 quả cà chua bi",
            "2 thìa sốt mè rang",
            "Muối, tiêu, chanh"
        ],
        nutrition: {
            vitamin_C: "35mg",
            iron: "2.5mg",
            calcium: "60mg",
            fiber: "3g",
            omega3: "0.3g"
        },
        steps: [
            "Luộc hoặc áp chảo ức gà với ít muối và tiêu, thái lát.",
            "Rửa sạch rau mầm, dưa leo thái lát, cà chua bi cắt đôi.",
            "Trộn rau với 1 thìa sốt mè rang.",
            "Xếp gà lên mặt rau, rưới sốt còn lại.",
            "Vắt chút chanh tươi, dùng ngay."
        ]
    },
    {
        id: 2,
        name: "Black Bread + Fried Egg + Avocado",
        category: "Breakfast",
        badge: "Breakfast",
        tags: ["Breakfast", "Quick"],
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
        description: "Món ăn sáng đơn giản – nhanh gọn – đầy đủ dinh dưỡng. Bơ béo tự nhiên kết hợp với trứng ốp la thơm mềm và bánh mì đen cung cấp năng lượng lâu dài.",
        macros: { cal: 380, carbs: "28g", fats: "22g", protein: "18g" },
        time: "10 min",
        rating: 4.7,
        reviews: 98,
        ingredients: [
            "2 lát bánh mì đen",
            "2 quả trứng gà",
            "1/2 quả bơ chín",
            "Muối, tiêu đen",
            "Dầu olive 1 thìa cà phê"
        ],
        nutrition: {
            vitamin_E: "3mg",
            iron: "3mg",
            calcium: "45mg",
            fiber: "6g",
            potassium: "480mg"
        },
        steps: [
            "Nghiền bơ với chút muối và tiêu, phết lên bánh mì.",
            "Đun chảo với dầu olive lửa vừa.",
            "Đập trứng vào chảo, ốp la hoặc chiên 2 mặt tùy thích.",
            "Đặt trứng lên bánh mì, rắc tiêu đen.",
            "Dùng ngay khi còn nóng."
        ]
    },
    {
        id: 3,
        name: "Brown Rice + Pan-Seared Salmon + Boiled Vegetables",
        category: "Meal Prep",
        badge: "Keto",
        tags: ["Dinner", "Meal Prep", "Gluten Free"],
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
        description: "Combo chuẩn eat clean: tinh bột tốt từ gạo lứt + protein từ cá hồi + vitamin từ rau xanh. Hỗ trợ giảm mỡ, tăng cơ, đẹp da.",
        macros: { cal: 480, carbs: "45g", fats: "16g", protein: "42g" },
        time: "35 min",
        rating: 4.9,
        reviews: 215,
        ingredients: [
            "150g phi lê cá hồi",
            "1 chén cơm gạo lứt",
            "100g bông cải xanh",
            "100g cà rốt",
            "1 thìa dầu olive",
            "Muối, tiêu, tỏi, chanh"
        ],
        nutrition: {
            omega3: "2.5g",
            vitamin_D: "15mcg",
            vitamin_B12: "4mcg",
            iron: "3mg",
            selenium: "40mcg"
        },
        steps: [
            "Vo gạo lứt, nấu cơm theo tỷ lệ 1:2 (gạo:nước).",
            "Luộc rau củ với nước sôi có muối trong 5 phút.",
            "Ướp cá hồi với muối, tiêu, tỏi băm 10 phút.",
            "Áp chảo cá hồi với dầu olive lửa vừa, mỗi mặt 4 phút.",
            "Xếp cơm, rau củ và cá hồi vào đĩa. Vắt chanh."
        ]
    },
    {
        id: 4,
        name: "Lemon Cucumber Mint Detox Water",
        category: "Drinks",
        badge: "Detox",
        tags: ["Drinks", "Detox", "Low Carb"],
        image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=600&q=80",
        description: "Nước detox giúp thanh lọc cơ thể, đẹp da, hỗ trợ tiêu hóa và giảm cảm giác thèm ăn.",
        macros: { cal: 15, carbs: "3g", fats: "0g", protein: "0g" },
        time: "5 min",
        rating: 4.5,
        reviews: 310,
        ingredients: [
            "1 quả chanh vàng",
            "1/2 quả dưa leo",
            "10 lá bạc hà tươi",
            "500ml nước lọc",
            "Đá viên tùy thích"
        ],
        nutrition: {
            vitamin_C: "30mg",
            potassium: "120mg",
            magnesium: "10mg",
            fiber: "0.5g"
        },
        steps: [
            "Rửa sạch chanh, dưa leo và lá bạc hà.",
            "Thái mỏng chanh và dưa leo.",
            "Cho vào bình nước 500ml.",
            "Thêm lá bạc hà, thêm đá.",
            "Ngâm trong tủ lạnh 1–2 giờ để ra vị. Dùng trong ngày."
        ]
    },
    {
        id: 5,
        name: "Green Chile Chicken Soup",
        category: "Soup",
        badge: "Chicken",
        tags: ["Chicken", "Dinner", "Gluten Free"],
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
        description: "Soup gà xanh thanh mát, ít béo, giàu protein và vitamin. Thích hợp cho bữa tối nhẹ nhàng.",
        macros: { cal: 340, carbs: "18g", fats: "8g", protein: "36g" },
        time: "40 min",
        rating: 4.6,
        reviews: 87,
        ingredients: [
            "200g ức gà",
            "2 quả ớt xanh",
            "100g đậu xanh",
            "1 củ hành tây",
            "2 tép tỏi",
            "500ml nước dùng gà",
            "Muối, tiêu, rau mùi"
        ],
        nutrition: {
            vitamin_C: "45mg",
            potassium: "520mg",
            iron: "3mg",
            zinc: "4mg",
            fiber: "5g"
        },
        steps: [
            "Luộc ức gà chín tới, xé nhỏ.",
            "Phi thơm tỏi và hành tây với chút dầu olive.",
            "Cho ớt xanh đã thái nhỏ vào xào 2 phút.",
            "Đổ nước dùng vào, thêm đậu xanh, nấu sôi.",
            "Thêm gà xé vào, nêm muối tiêu. Rắc rau mùi khi dùng."
        ]
    },
    {
        id: 6,
        name: "Avocado Tuna Salad Bowl",
        category: "Salad",
        badge: "Seafood",
        tags: ["Seafood", "Low Carb", "Gluten Free"],
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        description: "Bowl đầy đủ dinh dưỡng với cá ngừ giàu protein, bơ béo lành mạnh và rau xanh tươi mát.",
        macros: { cal: 360, carbs: "14g", fats: "20g", protein: "32g" },
        time: "15 min",
        rating: 4.7,
        reviews: 124,
        ingredients: [
            "150g cá ngừ đóng hộp (không dầu)",
            "1/2 quả bơ",
            "50g rau xà lách",
            "1/2 quả dưa leo",
            "10 quả olive",
            "1 thìa dầu olive",
            "Muối, tiêu, chanh"
        ],
        nutrition: {
            omega3: "1.8g",
            vitamin_K: "40mcg",
            potassium: "600mg",
            iron: "2mg",
            folate: "80mcg"
        },
        steps: [
            "Vớt cá ngừ ra khỏi hộp, để ráo.",
            "Thái bơ và dưa leo thành miếng vừa.",
            "Trải rau xà lách vào bowl.",
            "Xếp cá ngừ, bơ, dưa leo, olive lên mặt rau.",
            "Rưới dầu olive, vắt chanh, rắc muối tiêu."
        ]
    },
    {
        id: 7,
        name: "Overnight Chia Oatmeal",
        category: "Breakfast",
        badge: "Breakfast",
        tags: ["Breakfast", "Meal Prep", "Vegetarian"],
        image: "https://images.unsplash.com/photo-1571748982800-fa51082c2224?auto=format&fit=crop&w=600&q=80",
        description: "Bữa sáng siêu dinh dưỡng, chuẩn bị trước 1 đêm, ăn ngay khi thức dậy. Giàu chất xơ và omega-3.",
        macros: { cal: 280, carbs: "38g", fats: "9g", protein: "12g" },
        time: "5 min + ngâm qua đêm",
        rating: 4.8,
        reviews: 193,
        ingredients: [
            "50g yến mạch cán dẹt",
            "2 thìa hạt chia",
            "200ml sữa hạnh nhân",
            "1 thìa mật ong",
            "50g dâu tây hoặc việt quất",
            "1/2 thìa cà phê vani"
        ],
        nutrition: {
            fiber: "8g",
            omega3: "2.5g",
            calcium: "180mg",
            iron: "3.5mg",
            magnesium: "50mg"
        },
        steps: [
            "Trộn yến mạch và hạt chia trong hũ thủy tinh.",
            "Đổ sữa hạnh nhân vào, thêm vani và mật ong.",
            "Khuấy đều, đậy nắp, để tủ lạnh qua đêm (tối thiểu 6 giờ).",
            "Sáng hôm sau lấy ra, thêm trái cây tươi lên trên.",
            "Có thể thêm granola cho thêm độ giòn."
        ]
    },
    {
        id: 8,
        name: "Quinoa Veggie Power Bowl",
        category: "Vegetarian",
        badge: "Vegetarian",
        tags: ["Vegetarian", "Gluten Free", "Meal Prep"],
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80",
        description: "Bowl đầy màu sắc với quinoa – nguồn protein thực vật hoàn chỉnh, kết hợp rau củ nướng và sốt tahini.",
        macros: { cal: 390, carbs: "48g", fats: "14g", protein: "18g" },
        time: "30 min",
        rating: 4.9,
        reviews: 178,
        ingredients: [
            "100g quinoa",
            "100g khoai lang",
            "100g bông cải xanh",
            "1/2 quả ớt chuông đỏ",
            "2 thìa tahini",
            "Chanh, tỏi, muối, tiêu",
            "Dầu olive"
        ],
        nutrition: {
            vitamin_A: "450mcg",
            vitamin_C: "55mg",
            iron: "4mg",
            calcium: "85mg",
            fiber: "7g"
        },
        steps: [
            "Nấu quinoa theo tỷ lệ 1:2 với nước, khoảng 15 phút.",
            "Khoai lang thái miếng, bông cải tách bông, ớt thái dài.",
            "Trộn rau củ với dầu olive, muối, tiêu. Nướng 200°C trong 20 phút.",
            "Pha sốt tahini: trộn tahini + nước cốt chanh + tỏi băm + 2 thìa nước.",
            "Xếp quinoa vào bowl, xếp rau củ xung quanh, rưới sốt."
        ]
    },
    {
        id: 9,
        name: "Greek Yogurt Parfait with Berries",
        category: "Snacks",
        badge: "Snacks",
        tags: ["Snacks", "Breakfast", "Vegetarian"],
        image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80",
        description: "Món ăn vặt lành mạnh với sữa chua Hy Lạp giàu protein, trái cây tươi và granola giòn tan.",
        macros: { cal: 220, carbs: "28g", fats: "5g", protein: "16g" },
        time: "5 min",
        rating: 4.6,
        reviews: 245,
        ingredients: [
            "150g sữa chua Hy Lạp không đường",
            "50g granola",
            "100g hỗn hợp berries (dâu, việt quất, mâm xôi)",
            "1 thìa mật ong",
            "Bạc hà tươi trang trí"
        ],
        nutrition: {
            calcium: "200mg",
            vitamin_C: "25mg",
            probiotics: "có",
            fiber: "4g",
            potassium: "300mg"
        },
        steps: [
            "Cho sữa chua vào ly hoặc bowl.",
            "Rắc granola lên trên.",
            "Xếp berries tươi lên mặt granola.",
            "Rưới mật ong và trang trí bạc hà.",
            "Dùng ngay để granola còn giòn."
        ]
    },
    {
        id: 10,
        name: "Turkey & Hummus Sandwich on Whole Wheat",
        category: "Sandwiches",
        badge: "Meal Prep",
        tags: ["Sandwiches", "Meal Prep", "Quick"],
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
        description: "Bánh mì sandwich dinh dưỡng với thịt gà tây ít béo, hummus giàu chất xơ và rau tươi giòn.",
        macros: { cal: 340, carbs: "36g", fats: "8g", protein: "28g" },
        time: "10 min",
        rating: 4.5,
        reviews: 112,
        ingredients: [
            "2 lát bánh mì nguyên cám",
            "100g thịt gà tây thin-sliced",
            "2 thìa hummus",
            "Xà lách, cà chua, dưa leo",
            "1/4 quả bơ",
            "Muối, tiêu"
        ],
        nutrition: {
            fiber: "6g",
            iron: "3mg",
            vitamin_B6: "0.5mg",
            zinc: "3mg",
            potassium: "400mg"
        },
        steps: [
            "Phết hummus đều lên 2 mặt bánh mì.",
            "Xếp thịt gà tây lên 1 lát bánh.",
            "Thêm xà lách, cà chua thái lát, dưa leo, bơ.",
            "Nêm muối tiêu, đặt lát bánh còn lại.",
            "Cắt chéo, dùng ngay hoặc wrap lại ăn sau."
        ]
    },
    {
        id: 11,
        name: "Baked Egg White Omelette with Spinach",
        category: "Breakfast",
        badge: "Protein",
        tags: ["Breakfast", "Low Carb", "Gluten Free"],
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
        description: "Trứng lòng trắng nướng với rau bina – bữa sáng cực kỳ giàu protein và gần như không chất béo.",
        macros: { cal: 180, carbs: "6g", fats: "2g", protein: "30g" },
        time: "20 min",
        rating: 4.7,
        reviews: 89,
        ingredients: [
            "5 lòng trắng trứng",
            "100g rau bina tươi",
            "1/2 quả ớt chuông",
            "1 tép tỏi",
            "Muối, tiêu, paprika"
        ],
        nutrition: {
            iron: "3mg",
            vitamin_K: "150mcg",
            folate: "90mcg",
            potassium: "350mg",
            vitamin_A: "200mcg"
        },
        steps: [
            "Làm nóng lò 180°C.",
            "Phi thơm tỏi với xịt dầu, xào rau bina và ớt chuông héo.",
            "Đánh bông nhẹ lòng trắng trứng với muối tiêu paprika.",
            "Đổ hỗn hợp trứng lên rau trong khuôn chống dính.",
            "Nướng 15 phút đến khi trứng chín vàng mặt trên."
        ]
    },
    {
        id: 12,
        name: "Shrimp Stir-Fry with Zucchini Noodles",
        category: "Seafood",
        badge: "Seafood",
        tags: ["Seafood", "Low Carb", "Gluten Free"],
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        description: "Mì zucchini thay thế mì truyền thống, xào cùng tôm tươi và sốt tỏi chanh ít calo.",
        macros: { cal: 260, carbs: "10g", fats: "6g", protein: "32g" },
        time: "20 min",
        rating: 4.8,
        reviews: 156,
        ingredients: [
            "200g tôm tươi đã lột",
            "2 quả zucchini",
            "3 tép tỏi",
            "1/2 quả chanh",
            "Dầu olive, muối, tiêu",
            "Ớt tươi tùy thích",
            "Rau mùi"
        ],
        nutrition: {
            iodine: "60mcg",
            selenium: "35mcg",
            vitamin_C: "30mg",
            zinc: "2mg",
            potassium: "450mg"
        },
        steps: [
            "Dùng máy hoặc bào tay tạo sợi mì từ zucchini.",
            "Ướp tôm với muối, tiêu, nước cốt chanh 5 phút.",
            "Phi thơm tỏi với dầu olive, cho tôm vào xào chín đều.",
            "Thêm mì zucchini vào xào nhanh 2 phút.",
            "Rắc rau mùi, vắt thêm chanh tươi."
        ]
    },
    {
        id: 13,
        name: "Lentil & Sweet Potato Curry",
        category: "Vegetarian",
        badge: "Vegetarian",
        tags: ["Vegetarian", "Gluten Free", "Dinner"],
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
        description: "Cà ri đậu lăng và khoai lang giàu protein thực vật, chất xơ và beta-carotene.",
        macros: { cal: 350, carbs: "55g", fats: "7g", protein: "16g" },
        time: "35 min",
        rating: 4.6,
        reviews: 134,
        ingredients: [
            "150g đậu lăng đỏ",
            "200g khoai lang",
            "200ml sữa dừa ít béo",
            "1 hộp cà chua nghiền",
            "1 thìa cà phê nghệ",
            "1 thìa cà phê cumin",
            "Gừng, tỏi, muối"
        ],
        nutrition: {
            vitamin_A: "550mcg",
            iron: "6mg",
            fiber: "12g",
            folate: "180mcg",
            potassium: "700mg"
        },
        steps: [
            "Ngâm đậu lăng 30 phút, xả sạch.",
            "Phi thơm gừng tỏi với dầu, thêm nghệ và cumin.",
            "Cho khoai lang thái miếng vào đảo đều.",
            "Thêm cà chua nghiền, sữa dừa và đậu lăng.",
            "Nấu 25 phút đến khi mềm. Ăn với gạo lứt hoặc bánh mì."
        ]
    },
    {
        id: 14,
        name: "Protein Banana Smoothie",
        category: "Drinks",
        badge: "Protein",
        tags: ["Drinks", "Breakfast", "Quick"],
        image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80",
        description: "Sinh tố giàu protein sau tập gym, kết hợp chuối ngọt tự nhiên, sữa hạnh nhân và protein powder.",
        macros: { cal: 290, carbs: "34g", fats: "5g", protein: "28g" },
        time: "5 min",
        rating: 4.7,
        reviews: 267,
        ingredients: [
            "1 quả chuối đông lạnh",
            "1 muỗng protein powder vanilla",
            "200ml sữa hạnh nhân",
            "1 thìa bơ đậu phộng tự nhiên",
            "1/2 thìa quế",
            "Đá viên tùy thích"
        ],
        nutrition: {
            potassium: "422mg",
            magnesium: "37mg",
            vitamin_B6: "0.5mg",
            fiber: "3g",
            calcium: "200mg"
        },
        steps: [
            "Cho chuối đông lạnh vào máy xay.",
            "Thêm sữa hạnh nhân, protein powder và bơ đậu phộng.",
            "Thêm quế và đá.",
            "Xay 45 giây cho đến khi mịn.",
            "Rót ra ly, thưởng thức ngay."
        ]
    },
    {
        id: 15,
        name: "Tuna Poke Bowl",
        category: "Seafood",
        badge: "Seafood",
        tags: ["Seafood", "Gluten Free", "Meal Prep"],
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        description: "Poke bowl cá ngừ tươi phong cách Hawaii – đầy đủ protein, omega-3, rau tươi và cơm gạo lứt.",
        macros: { cal: 420, carbs: "48g", fats: "10g", protein: "36g" },
        time: "20 min",
        rating: 4.9,
        reviews: 198,
        ingredients: [
            "200g cá ngừ sushi grade, thái hạt lựu",
            "1 chén cơm gạo lứt",
            "50g edamame luộc",
            "1/2 quả bơ",
            "2 thìa sốt soy ít muối",
            "1 thìa dầu mè",
            "Vừng, hành lá"
        ],
        nutrition: {
            omega3: "1.5g",
            vitamin_D: "10mcg",
            iodine: "50mcg",
            potassium: "580mg",
            iron: "3.5mg"
        },
        steps: [
            "Trộn cá ngừ thái hạt lựu với soy sauce và dầu mè.",
            "Nấu cơm gạo lứt chín.",
            "Cho cơm vào bowl, xếp cá ngừ lên.",
            "Thêm edamame, bơ thái lát xung quanh.",
            "Rắc vừng và hành lá, rưới thêm sốt."
        ]
    },
    {
        id: 16,
        name: "Kale & Roasted Chickpea Caesar Salad",
        category: "Salad",
        badge: "Vegetarian",
        tags: ["Salad", "Vegetarian", "Low Carb"],
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
        description: "Salad cải xoăn với đậu gà nướng giòn thay crouton – giàu chất xơ, protein thực vật và vitamin K.",
        macros: { cal: 310, carbs: "32g", fats: "12g", protein: "14g" },
        time: "25 min",
        rating: 4.5,
        reviews: 103,
        ingredients: [
            "100g cải xoăn (kale) thái nhỏ",
            "1 hộp đậu gà 400g",
            "2 thìa sốt caesar ít béo",
            "30g parmesan bào (tùy chọn)",
            "Dầu olive, muối, tiêu, paprika"
        ],
        nutrition: {
            vitamin_K: "480mcg",
            vitamin_C: "80mg",
            iron: "4.5mg",
            fiber: "10g",
            folate: "140mcg"
        },
        steps: [
            "Xả đậu gà, để ráo, trộn với dầu olive, paprika, muối.",
            "Nướng đậu gà 200°C trong 20–25 phút đến khi giòn.",
            "Massage cải xoăn với 1 thìa dầu olive 2 phút.",
            "Trộn sốt caesar vào cải xoăn.",
            "Xếp đậu gà nướng lên mặt, rắc parmesan nếu dùng."
        ]
    },
    {
        id: 17,
        name: "Mango Coconut Chia Pudding",
        category: "Snacks",
        badge: "Snacks",
        tags: ["Snacks", "Vegetarian", "Gluten Free"],
        image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80",
        description: "Pudding hạt chia trái cây nhiệt đới – tráng miệng sạch, thơm ngon và giàu omega-3.",
        macros: { cal: 200, carbs: "28g", fats: "8g", protein: "6g" },
        time: "5 min + 4h ngâm",
        rating: 4.8,
        reviews: 189,
        ingredients: [
            "3 thìa hạt chia",
            "200ml sữa dừa ít béo",
            "1 xoài chín",
            "1 thìa mật ong",
            "Dừa sợi nướng trang trí",
            "Bạc hà"
        ],
        nutrition: {
            omega3: "3g",
            fiber: "8g",
            calcium: "120mg",
            vitamin_C: "40mg",
            magnesium: "60mg"
        },
        steps: [
            "Trộn hạt chia với sữa dừa và mật ong.",
            "Đậy nắp, để tủ lạnh ít nhất 4 giờ hoặc qua đêm.",
            "Xoài thái hạt lựu hoặc xay nhuyễn làm sốt.",
            "Lấy pudding ra, đổ xoài lên trên.",
            "Rắc dừa sợi nướng, trang trí bạc hà."
        ]
    },
    {
        id: 18,
        name: "Lean Beef & Broccoli Stir-Fry",
        category: "Meal Prep",
        badge: "Meal Prep",
        tags: ["Dinner", "Meal Prep", "Gluten Free"],
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
        description: "Thịt bò nạc xào bông cải – món ăn kinh điển eat clean với lượng protein cực cao và sắt dồi dào.",
        macros: { cal: 400, carbs: "20g", fats: "12g", protein: "45g" },
        time: "25 min",
        rating: 4.7,
        reviews: 167,
        ingredients: [
            "200g thịt bò thăn nội",
            "300g bông cải xanh",
            "3 tép tỏi",
            "1 mẩu gừng",
            "2 thìa soy sauce ít muối",
            "1 thìa dầu mè",
            "Tiêu đen, ớt tùy thích"
        ],
        nutrition: {
            iron: "6mg",
            zinc: "8mg",
            vitamin_B12: "3mcg",
            vitamin_C: "90mg",
            potassium: "680mg"
        },
        steps: [
            "Thái bò mỏng ngang thớ, ướp soy sauce tiêu 10 phút.",
            "Tách bông cải, chần qua nước sôi 2 phút.",
            "Phi thơm tỏi gừng với dầu mè.",
            "Cho bò vào xào lửa lớn 2–3 phút.",
            "Thêm bông cải vào xào thêm 2 phút. Nêm lại."
        ]
    },
    {
        id: 19,
        name: "Egg & Veggie Meal Prep Bowls",
        category: "Meal Prep",
        badge: "Breakfast",
        tags: ["Breakfast", "Meal Prep", "Vegetarian"],
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
        description: "Prep sẵn 5 hộp bữa sáng cho cả tuần với trứng luộc, rau củ và ngũ cốc nguyên hạt.",
        macros: { cal: 300, carbs: "32g", fats: "10g", protein: "22g" },
        time: "30 min (cho 5 phần)",
        rating: 4.6,
        reviews: 221,
        ingredients: [
            "5 quả trứng",
            "2 chén quinoa nấu chín",
            "1 quả ớt chuông",
            "100g súp lơ trắng",
            "100g cà rốt",
            "Muối, tiêu, dầu olive"
        ],
        nutrition: {
            vitamin_A: "250mcg",
            iron: "4mg",
            fiber: "5g",
            selenium: "25mcg",
            choline: "150mg"
        },
        steps: [
            "Luộc trứng cứng 10 phút, để nguội, bóc vỏ.",
            "Nấu quinoa theo tỷ lệ 1:2.",
            "Thái nhỏ ớt, súp lơ, cà rốt – nướng hoặc hấp 15 phút.",
            "Chia đều quinoa vào 5 hộp meal prep.",
            "Xếp rau và 1 quả trứng vào mỗi hộp. Giữ lạnh đến 5 ngày."
        ]
    },
    {
        id: 20,
        name: "Watermelon Mint & Feta Salad",
        category: "Salad",
        badge: "Salad",
        tags: ["Salad", "Vegetarian", "Quick"],
        image: "https://images.unsplash.com/photo-1498837167922-41c53b4f0826?auto=format&fit=crop&w=600&q=80",
        description: "Salad dưa hấu thanh mát mùa hè, kết hợp pho mát feta mặn bùi và bạc hà tươi.",
        macros: { cal: 160, carbs: "22g", fats: "6g", protein: "5g" },
        time: "10 min",
        rating: 4.5,
        reviews: 145,
        ingredients: [
            "400g dưa hấu thái miếng",
            "60g phô mai feta",
            "20 lá bạc hà",
            "1/2 quả dưa leo",
            "1 thìa dầu olive",
            "1 thìa giấm balsamic",
            "Muối biển"
        ],
        nutrition: {
            vitamin_C: "20mg",
            vitamin_A: "50mcg",
            potassium: "270mg",
            lycopene: "4.5mg",
            calcium: "90mg"
        },
        steps: [
            "Thái dưa hấu thành miếng tam giác hoặc hình vuông.",
            "Dưa leo thái lát, xếp xen kẽ với dưa hấu vào đĩa.",
            "Bẻ vụn pho mát feta rắc lên mặt.",
            "Rắc lá bạc hà xé nhỏ.",
            "Rưới dầu olive, giấm balsamic và chút muối biển."
        ]
    }
];

module.exports = dishes;
