/**
 * 香水資料庫
 * ------------------------------------------------------------
 * 新增香水：複製任一筆物件，修改欄位即可。
 *  - city   ：對應下方 CITIES 的 key（沒有的城市就新增一筆座標）
 *  - image  ：香水外觀圖片（本機 images/<id>.jpg 或網址；留空會顯示示意瓶身）
 *    目前圖片取自 Fragrantica（fimgs.net），僅供本機對照；公開上線前請換成有授權的圖片。
 *  - gender ：男香／女香／中性（依 Fragrantica 定位與一般認知）
 *  - family ：主香調家族，需為 FAMILIES 內的其中一個
 *  - moods  ：感覺形容詞，建議沿用既有詞彙，篩選才會集中
 * 前中後調為公開資訊整理的參考值，不同年份／濃度版本可能略有差異。
 */

window.CITIES = {
  paris:     { name: "巴黎",     country: "法國", continent: "歐洲",   lat: 48.8566, lng: 2.3522 },
  grasse:    { name: "格拉斯",   country: "法國", continent: "歐洲",   lat: 43.6588, lng: 6.9237 },
  london:    { name: "倫敦",     country: "英國", continent: "歐洲",   lat: 51.5074, lng: -0.1278 },
  newyork:   { name: "紐約",     country: "美國", continent: "北美洲",   lat: 40.7128, lng: -74.0060 },
  stockholm: { name: "斯德哥爾摩", country: "瑞典", continent: "歐洲", lat: 59.3293, lng: 18.0686 },
  milan:     { name: "米蘭",     country: "義大利", continent: "歐洲", lat: 45.4642, lng: 9.1900 },
  parma:     { name: "帕爾馬",   country: "義大利", continent: "歐洲", lat: 44.8015, lng: 10.3279 },
  florence:  { name: "佛羅倫斯", country: "義大利", continent: "歐洲", lat: 43.7696, lng: 11.2558 },
  tokyo:     { name: "東京",     country: "日本", continent: "亞洲",   lat: 35.6762, lng: 139.6503 },
  seoul:     { name: "首爾",     country: "韓國", continent: "亞洲",   lat: 37.5665, lng: 126.9780 },
  turin:     { name: "杜林",     country: "義大利", continent: "歐洲", lat: 45.0703, lng: 7.6869 },
  istanbul:  { name: "伊斯坦堡", country: "土耳其", continent: "歐洲", lat: 41.0082, lng: 28.9784 },
  muscat:    { name: "馬斯開特", country: "阿曼", continent: "亞洲",   lat: 23.5859, lng: 58.4059 },
  dubai:     { name: "杜拜",     country: "阿聯", continent: "亞洲",   lat: 25.2048, lng: 55.2708 },
  melbourne: { name: "墨爾本",   country: "澳洲", continent: "大洋洲",   lat: -37.8136, lng: 144.9631 }
};

window.FAMILIES = {
  "花香調":     "#d9869b",
  "柑橘調":     "#e3b23c",
  "木質調":     "#9a7350",
  "琥珀東方調": "#b5652d",
  "馥奇芳香調": "#6f8f6a",
  "水生海洋調": "#5b93b5",
  "美食調":     "#a8674f",
  "綠意調":     "#7da35a",
  "麝香調":     "#b7a4b8",
  "醛香調":     "#c9b27c"
};

window.PERFUMES = [
  {
    id: "chanel-no5", name: "N°5", brand: "Chanel", year: 1921, perfumer: "Ernest Beaux",
    family: "醛香調", city: "paris", gender: "女香", image: "images/chanel-no5.jpg",
    notes: { top: ["醛", "橙花", "佛手柑", "檸檬"], middle: ["茉莉", "玫瑰", "鈴蘭", "鳶尾"], base: ["檀香", "香草", "岩蘭草", "麝香"] },
    moods: ["優雅", "經典", "粉感", "奢華"],
    description: "以醛香開場的抽象花束，二十世紀最具代表性的香水之一。"
  },
  {
    id: "chanel-coco-mademoiselle", name: "Coco Mademoiselle", brand: "Chanel", year: 2001, perfumer: "Jacques Polge",
    family: "琥珀東方調", city: "paris", gender: "女香", image: "images/chanel-coco-mademoiselle.jpg",
    notes: { top: ["柳橙", "佛手柑", "柑橘"], middle: ["玫瑰", "茉莉", "依蘭"], base: ["廣藿香", "白麝香", "香草", "岩蘭草"] },
    moods: ["優雅", "性感", "現代", "自信"],
    description: "明亮柑橘接上玫瑰與廣藿香，俐落又有女人味。"
  },
  {
    id: "dior-sauvage", name: "Sauvage EDT", brand: "Dior", year: 2015, perfumer: "François Demachy",
    family: "馥奇芳香調", city: "paris", gender: "男香", image: "images/dior-sauvage.jpg",
    notes: { top: ["佛手柑", "胡椒"], middle: ["花椒", "薰衣草", "粉紅胡椒", "天竺葵", "廣藿香"], base: ["龍涎香醚", "雪松", "岩蘭草"] },
    moods: ["清新", "辛辣", "自信", "陽剛"],
    description: "佛手柑與大量龍涎香醚構成的乾爽辛辣感，辨識度極高。"
  },
  {
    id: "diptyque-philosykos", name: "Philosykos", brand: "Diptyque", year: 1996, perfumer: "Olivia Giacobetti",
    family: "綠意調", city: "paris", gender: "中性", image: "images/diptyque-philosykos.jpg",
    notes: { top: ["無花果葉"], middle: ["無花果", "椰子"], base: ["雪松", "木質調"] },
    moods: ["清新", "自然", "療癒", "中性"],
    description: "希臘夏日無花果樹下的綠葉、果肉與樹皮。"
  },
  {
    id: "diptyque-do-son", name: "Do Son", brand: "Diptyque", year: 2005, perfumer: "Fabrice Pellegrin",
    family: "花香調", city: "paris", gender: "女香", image: "images/diptyque-do-son.jpg",
    notes: { top: ["晚香玉", "橙花", "玫瑰"], middle: ["粉紅胡椒", "海洋調"], base: ["安息香", "麝香"] },
    moods: ["溫柔", "海洋感", "優雅", "花香感"],
    description: "越南海邊的晚香玉，花香中帶一絲鹹鹹海風。"
  },
  {
    id: "mfk-br540", name: "Baccarat Rouge 540", brand: "Maison Francis Kurkdjian", year: 2015, perfumer: "Francis Kurkdjian",
    family: "琥珀東方調", city: "paris", gender: "中性", image: "images/mfk-br540.jpg",
    notes: { top: ["番紅花", "茉莉"], middle: ["琥珀木", "龍涎香"], base: ["冷杉樹脂", "雪松"] },
    moods: ["奢華", "甜美", "神秘", "擴散感"],
    description: "焦糖般的空氣感甜香，擴散力強，近年最受討論的沙龍香之一。"
  },
  {
    id: "guerlain-shalimar", name: "Shalimar", brand: "Guerlain", year: 1925, perfumer: "Jacques Guerlain",
    family: "琥珀東方調", city: "paris", gender: "女香", image: "images/guerlain-shalimar.jpg",
    notes: { top: ["佛手柑", "檸檬", "柑橘"], middle: ["鳶尾", "茉莉", "玫瑰"], base: ["香草", "零陵香豆", "乳香", "皮革"] },
    moods: ["經典", "性感", "溫暖", "奢華"],
    description: "東方調的代表作，佛手柑與煙燻香草的經典對話。"
  },
  {
    id: "hermes-terre", name: "Terre d'Hermès", brand: "Hermès", year: 2006, perfumer: "Jean-Claude Ellena",
    family: "木質調", city: "paris", gender: "男香", image: "images/hermes-terre.jpg",
    notes: { top: ["柳橙", "葡萄柚"], middle: ["胡椒", "天竺葵", "燧石"], base: ["岩蘭草", "雪松", "廣藿香", "安息香"] },
    moods: ["沉穩", "木質感", "中性", "自然"],
    description: "柑橘與礦石、土壤般的岩蘭草，描繪大地的香氣。"
  },
  {
    id: "hermes-nil", name: "Un Jardin sur le Nil", brand: "Hermès", year: 2005, perfumer: "Jean-Claude Ellena",
    family: "綠意調", city: "paris", gender: "中性", image: "images/hermes-nil.jpg",
    notes: { top: ["青芒果", "葡萄柚", "胡蘿蔔"], middle: ["蓮花", "風信子", "燈心草"], base: ["焚香", "鳶尾", "麝香"] },
    moods: ["清新", "自然", "中性", "療癒"],
    description: "尼羅河島嶼上的青芒果與蓮花，水綠透亮。"
  },
  {
    id: "creed-aventus", name: "Aventus", brand: "Creed", year: 2010, perfumer: "Olivier Creed & Erwin Creed",
    family: "柑橘調", city: "paris", gender: "男香", image: "images/creed-aventus.jpg",
    notes: { top: ["佛手柑", "黑醋栗", "蘋果", "檸檬", "粉紅胡椒"], middle: ["鳳梨", "廣藿香", "茉莉"], base: ["樺木", "麝香", "橡苔", "龍涎香", "雪松"] },
    moods: ["自信", "果香感", "煙燻", "陽剛"],
    description: "鳳梨果香配上煙燻樺木，被譽為成功男士的香氣。"
  },
  {
    id: "margiela-lazy-sunday", name: "Replica Lazy Sunday Morning", brand: "Maison Margiela", year: 2013, perfumer: "Louise Turner",
    family: "麝香調", city: "paris", gender: "中性", image: "images/margiela-lazy-sunday.jpg",
    notes: { top: ["梨", "鈴蘭", "醛"], middle: ["鳶尾", "玫瑰", "橙花"], base: ["白麝香", "琥珀", "廣藿香"] },
    moods: ["乾淨", "慵懶", "溫柔", "療癒"],
    description: "剛洗好的白色床單與週日早晨的陽光。"
  },
  {
    id: "margiela-fireplace", name: "Replica By the Fireplace", brand: "Maison Margiela", year: 2015, perfumer: "Marie Salamagne",
    family: "美食調", city: "paris", gender: "中性", image: "images/margiela-fireplace.jpg",
    notes: { top: ["丁香", "粉紅胡椒", "橙花"], middle: ["栗子", "癒創木", "杜松"], base: ["香草", "秘魯香脂", "喀什米爾木"] },
    moods: ["溫暖", "煙燻", "甜美", "療癒"],
    description: "冬夜壁爐邊烤栗子的木頭煙香。"
  },
  {
    id: "ysl-libre", name: "Libre EDP", brand: "Yves Saint Laurent", year: 2019, perfumer: "Anne Flipo & Carlos Benaïm",
    family: "花香調", city: "paris", gender: "女香", image: "images/ysl-libre.jpg",
    notes: { top: ["薰衣草", "柑橘", "黑醋栗", "苦橙葉"], middle: ["薰衣草", "橙花", "茉莉"], base: ["香草", "麝香", "雪松", "龍涎香"] },
    moods: ["自信", "現代", "甜美", "優雅"],
    description: "薰衣草與橙花的衝突美學，陽剛與柔美並存。"
  },
  {
    id: "chloe-edp", name: "Chloé EDP", brand: "Chloé", year: 2008, perfumer: "Michel Almairac & Amandine Marie",
    family: "花香調", city: "paris", gender: "女香", image: "images/chloe-edp.jpg",
    notes: { top: ["牡丹", "荔枝", "小蒼蘭"], middle: ["玫瑰", "鈴蘭", "木蘭"], base: ["雪松", "琥珀"] },
    moods: ["溫柔", "粉感", "花香感", "優雅"],
    description: "粉嫩的玫瑰花瓣，帶著淡淡皂感。"
  },
  {
    id: "lancome-lveb", name: "La Vie Est Belle", brand: "Lancôme", year: 2012, perfumer: "Olivier Polge, Dominique Ropion, Anne Flipo",
    family: "美食調", city: "paris", gender: "女香", image: "images/lancome-lveb.jpg",
    notes: { top: ["黑醋栗", "梨"], middle: ["鳶尾", "茉莉", "橙花"], base: ["果仁糖", "香草", "廣藿香", "零陵香豆"] },
    moods: ["甜美", "溫暖", "活潑", "果香感"],
    description: "鳶尾與果仁糖的甜蜜笑容。"
  },
  {
    id: "jhag-not-a-perfume", name: "Not a Perfume", brand: "Juliette Has a Gun", year: 2010, perfumer: "Romano Ricci",
    family: "麝香調", city: "paris", gender: "中性", image: "images/jhag-not-a-perfume.jpg",
    notes: { top: ["龍涎香醚"], middle: ["龍涎香醚"], base: ["龍涎香醚"] },
    moods: ["乾淨", "中性", "極簡", "膚感"],
    description: "只用單一分子龍涎香醚，像是比較好聞的自己。"
  },
  {
    id: "malle-portrait", name: "Portrait of a Lady", brand: "Frédéric Malle", year: 2010, perfumer: "Dominique Ropion",
    family: "琥珀東方調", city: "paris", gender: "女香", image: "images/malle-portrait.jpg",
    notes: { top: ["玫瑰", "覆盆子", "丁香", "肉桂", "黑醋栗"], middle: ["廣藿香", "檀香", "焚香"], base: ["麝香", "安息香", "琥珀"] },
    moods: ["神秘", "奢華", "性感", "沉穩"],
    description: "大量土耳其玫瑰與焚香、廣藿香，濃郁而華麗。"
  },
  {
    id: "jomalone-wood-sage", name: "Wood Sage & Sea Salt", brand: "Jo Malone London", year: 2014, perfumer: "Christine Nagel",
    family: "水生海洋調", city: "london", gender: "中性", image: "images/jomalone-wood-sage.jpg",
    notes: { top: ["麝葵籽"], middle: ["海鹽"], base: ["鼠尾草", "紅海藻", "葡萄柚"] },
    moods: ["海洋感", "清新", "中性", "自然"],
    description: "英國海岸峭壁上的海風、鹽粒與鼠尾草。"
  },
  {
    id: "jomalone-pear-freesia", name: "English Pear & Freesia", brand: "Jo Malone London", year: 2010, perfumer: "Christine Nagel",
    family: "花香調", city: "london", gender: "女香", image: "images/jomalone-pear-freesia.jpg",
    notes: { top: ["梨", "甜瓜"], middle: ["小蒼蘭", "玫瑰"], base: ["麝香", "廣藿香", "大黃", "琥珀"] },
    moods: ["清新", "果香感", "溫柔", "乾淨"],
    description: "秋天剛成熟的英國梨與白色小蒼蘭。"
  },
  {
    id: "penhaligons-juniper-sling", name: "Juniper Sling", brand: "Penhaligon's", year: 2011, perfumer: "Olivier Cresp",
    family: "馥奇芳香調", city: "london", gender: "中性", image: "images/penhaligons-juniper-sling.jpg",
    notes: { top: ["柳橙", "肉桂", "歐白芷", "黑胡椒"], middle: ["杜松", "小豆蔻", "皮革", "鳶尾"], base: ["黑櫻桃", "紅糖", "岩蘭草"] },
    moods: ["清新", "辛辣", "紳士", "活潑"],
    description: "向 1920 年代倫敦琴酒致敬，冰涼的杜松子氣息。"
  },
  {
    id: "lelabo-santal33", name: "Santal 33", brand: "Le Labo", year: 2011, perfumer: "Frank Voelkl",
    family: "木質調", city: "newyork", gender: "中性", image: "images/lelabo-santal33.jpg",
    notes: { top: ["紫羅蘭", "小豆蔻"], middle: ["鳶尾", "莎草紙"], base: ["檀香", "雪松", "皮革", "龍涎香"] },
    moods: ["木質感", "中性", "沉穩", "都會"],
    description: "乾燥檀香與皮革，城市文青的代表味道。"
  },
  {
    id: "tomford-black-orchid", name: "Black Orchid", brand: "Tom Ford", year: 2006, perfumer: "David Apel & Pierre Negrin",
    family: "琥珀東方調", city: "newyork", gender: "女香", image: "images/tomford-black-orchid.jpg",
    notes: { top: ["松露", "依蘭", "佛手柑", "黑醋栗", "檸檬"], middle: ["蘭花", "辛香料", "蓮花"], base: ["廣藿香", "香草", "焚香", "檀香", "岩蘭草"] },
    moods: ["神秘", "性感", "奢華", "濃郁"],
    description: "黑松露與黑蘭花，暗黑華麗的夜晚香氣。"
  },
  {
    id: "narciso-for-her", name: "For Her EDT", brand: "Narciso Rodriguez", year: 2003, perfumer: "Christine Nagel & Francis Kurkdjian",
    family: "麝香調", city: "newyork", gender: "女香", image: "images/narciso-for-her.jpg",
    notes: { top: ["桂花", "橙花", "佛手柑"], middle: ["麝香", "琥珀"], base: ["香草", "岩蘭草", "廣藿香"] },
    moods: ["性感", "膚感", "乾淨", "優雅"],
    description: "以麝香為核心的柔滑肌膚感。"
  },
  {
    id: "glossier-you", name: "Glossier You", brand: "Glossier", year: 2017, perfumer: "Frank Voelkl",
    family: "麝香調", city: "newyork", gender: "中性", image: "images/glossier-you.jpg",
    notes: { top: ["粉紅胡椒", "鳶尾"], middle: ["麝葵籽", "鳶尾根"], base: ["龍涎香醚", "麝香"] },
    moods: ["膚感", "乾淨", "極簡", "溫柔"],
    description: "貼近肌膚的溫暖麝香，每個人擦起來都不太一樣。"
  },
  {
    id: "byredo-gypsy-water", name: "Gypsy Water", brand: "Byredo", year: 2008, perfumer: "Jérôme Epinette",
    family: "木質調", city: "stockholm", gender: "中性", image: "images/byredo-gypsy-water.jpg",
    notes: { top: ["佛手柑", "檸檬", "胡椒", "杜松"], middle: ["焚香", "松針", "鳶尾"], base: ["琥珀", "香草", "檀香"] },
    moods: ["自由", "木質感", "中性", "自然"],
    description: "森林營火與流浪的自由，清新木質帶微微香草。"
  },
  {
    id: "byredo-mojave-ghost", name: "Mojave Ghost", brand: "Byredo", year: 2014, perfumer: "Jérôme Epinette",
    family: "木質調", city: "stockholm", gender: "中性", image: "images/byredo-mojave-ghost.jpg",
    notes: { top: ["人心果", "麝葵籽"], middle: ["紫羅蘭", "木蘭", "檀香"], base: ["琥珀木", "雪松", "麝香"] },
    moods: ["溫柔", "乾淨", "粉感", "木質感"],
    description: "沙漠中頑強生長的花，柔軟的木質粉感。"
  },
  {
    id: "adp-colonia", name: "Colonia", brand: "Acqua di Parma", year: 1916, perfumer: "—",
    family: "柑橘調", city: "parma", gender: "男香", image: "images/adp-colonia.jpg",
    notes: { top: ["檸檬", "甜橙", "佛手柑"], middle: ["薰衣草", "馬鞭草", "迷迭香", "玫瑰"], base: ["岩蘭草", "檀香", "廣藿香"] },
    moods: ["清新", "經典", "紳士", "乾淨"],
    description: "義大利古龍水的經典，陽光下的柑橘與香草植物。"
  },
  {
    id: "dg-light-blue", name: "Light Blue", brand: "Dolce & Gabbana", year: 2001, perfumer: "Olivier Cresp",
    family: "柑橘調", city: "milan", gender: "女香", image: "images/dg-light-blue.jpg",
    notes: { top: ["檸檬", "蘋果", "雪松", "風鈴草"], middle: ["竹", "茉莉", "白玫瑰"], base: ["雪松", "麝香", "龍涎香"] },
    moods: ["清新", "活潑", "海洋感", "果香感"],
    description: "地中海夏日，檸檬與青蘋果的湛藍氣息。"
  },
  {
    id: "armani-adg", name: "Acqua di Giò Homme", brand: "Giorgio Armani", year: 1996, perfumer: "Alberto Morillas",
    family: "水生海洋調", city: "milan", gender: "男香", image: "images/armani-adg.jpg",
    notes: { top: ["萊姆", "檸檬", "佛手柑", "橙花"], middle: ["海洋調", "迷迭香", "小蒼蘭", "風信子"], base: ["白麝香", "雪松", "橡苔", "廣藿香"] },
    moods: ["海洋感", "清新", "陽剛", "乾淨"],
    description: "潘特萊里亞島的海水與陽光，水生調經典。"
  },
  {
    id: "gucci-bloom", name: "Bloom", brand: "Gucci", year: 2017, perfumer: "Alberto Morillas",
    family: "花香調", city: "florence", gender: "女香", image: "images/gucci-bloom.jpg",
    notes: { top: ["使君子花"], middle: ["晚香玉"], base: ["茉莉"] },
    moods: ["花香感", "濃郁", "優雅", "溫柔"],
    description: "整座盛開的白花花園，晚香玉與茉莉。"
  },
  {
    id: "issey-leau", name: "L'Eau d'Issey", brand: "Issey Miyake", year: 1992, perfumer: "Jacques Cavallier",
    family: "水生海洋調", city: "tokyo", gender: "女香", image: "images/issey-leau.jpg",
    notes: { top: ["蓮花", "小蒼蘭", "仙客來", "玫瑰", "甜瓜"], middle: ["鈴蘭", "百合", "牡丹"], base: ["檀香", "麝香", "桂花", "雪松", "琥珀"] },
    moods: ["乾淨", "清新", "極簡", "花香感"],
    description: "如山泉流過花瓣，九〇年代透明水感花香的代表。"
  },
  {
    id: "aesop-tacit", name: "Tacit", brand: "Aesop", year: 2015, perfumer: "Céline Ellena",
    family: "柑橘調", city: "melbourne", gender: "中性", image: "images/aesop-tacit.jpg",
    notes: { top: ["柚子", "柑橘"], middle: ["羅勒"], base: ["岩蘭草", "丁香"] },
    moods: ["清新", "中性", "自然", "極簡"],
    description: "日本柚子與羅勒葉，清爽帶著草本的安靜感。"
  },
  {
    id: "aesop-hwyl", name: "Hwyl", brand: "Aesop", year: 2017, perfumer: "Barnabé Fillion",
    family: "木質調", city: "melbourne", gender: "中性", image: "images/aesop-hwyl.jpg",
    notes: { top: ["百里香"], middle: ["乳香", "日本扁柏"], base: ["岩蘭草", "苔蘚"] },
    moods: ["煙燻", "沉穩", "木質感", "神秘"],
    description: "日本森林中的扁柏與苔蘚，潮濕的禪意煙霧。"
  },
  {
    id: "nonfiction-santal-cream", name: "Santal Cream", brand: "Nonfiction", year: 2020, perfumer: "—",
    family: "木質調", city: "seoul", gender: "中性", image: "images/nonfiction-santal-cream.jpg",
    notes: { top: ["小豆蔻", "佛手柑"], middle: ["薑", "含羞草", "無花果"], base: ["檀香", "岩蘭草"] },
    moods: ["溫柔", "木質感", "療癒", "中性"],
    description: "陽光灑落的午後，檀香與成熟無花果交織的平靜木質香。"
  },
  {
    id: "nonfiction-gentle-night", name: "Gentle Night", brand: "Nonfiction", year: 2020, perfumer: "—",
    family: "木質調", city: "seoul", gender: "中性", image: "images/nonfiction-gentle-night.jpg",
    notes: { top: ["佛手柑"], middle: ["白茶", "無花果", "麂皮"], base: ["苔蘚", "雪松", "麝香", "香草"] },
    moods: ["溫暖", "溫柔", "沉穩", "中性"],
    description: "黃昏時分的溫柔，白茶、麂皮與奶香香草的平衡。"
  },
  {
    id: "nonfiction-gaiac-flower", name: "Gaiac Flower", brand: "Nonfiction", year: 2020, perfumer: "—",
    family: "木質調", city: "seoul", gender: "中性", image: "images/nonfiction-gaiac-flower.jpg",
    notes: { top: ["佛手柑"], middle: ["野玫瑰"], base: ["琥珀", "香草", "廣藿香", "癒創木"] },
    moods: ["神秘", "性感", "優雅", "煙燻"],
    description: "在木質煙霧中綻放的野花，由清新花香轉為溫暖深沉。"
  },
  {
    id: "nonfiction-the-rose", name: "The Rose", brand: "Nonfiction", year: 2025, perfumer: "—",
    family: "花香調", city: "seoul", gender: "中性", image: "images/nonfiction-the-rose.jpg",
    notes: { top: ["紅莓"], middle: ["天竺葵", "玫瑰", "鳶尾"], base: ["檀香", "岩玫瑰", "麝香"] },
    moods: ["優雅", "神秘", "花香感", "溫柔"],
    description: "玫瑰盛開的瞬間，紅莓與天竺葵帶來一抹神秘。"
  },
  {
    id: "nonfiction-neroli-dream", name: "Neroli Dream", brand: "Nonfiction", year: 2023, perfumer: "—",
    family: "柑橘調", city: "seoul", gender: "中性", image: "images/nonfiction-neroli-dream.jpg",
    notes: { top: ["佛手柑", "苦橙花", "萊姆"], middle: ["橙花", "鈴蘭", "玫瑰"], base: ["琥珀", "麝香"] },
    moods: ["清新", "活潑", "乾淨", "花香感"],
    description: "陽光停留在肌膚上，橙花與粉感麝香迎來新的季節。"
  },
  {
    id: "nonfiction-for-rest", name: "For Rest", brand: "Nonfiction", year: 2023, perfumer: "—",
    family: "木質調", city: "seoul", gender: "中性", image: "images/nonfiction-for-rest.jpg",
    notes: { top: ["萊姆", "柚子", "黑胡椒"], middle: ["玫瑰", "肉豆蔻", "焚香"], base: ["日本扁柏", "喀什米爾木", "麝香"] },
    moods: ["療癒", "木質感", "中性", "自然"],
    description: "森林裡冒著熱氣的溫泉，扁柏、柚子與焚香的休憩時光。"
  },
  {
    id: "nonfiction-forget-me-not", name: "Forget Me Not", brand: "Nonfiction", year: 2020, perfumer: "—",
    family: "綠意調", city: "seoul", gender: "中性", image: "images/nonfiction-forget-me-not.jpg",
    notes: { top: ["羅勒", "粉紅胡椒"], middle: ["綠葉", "梔子花"], base: ["琥珀木"] },
    moods: ["清新", "活潑", "自然", "辛辣"],
    description: "像混入新鮮香草與辛香料的氣泡香檳，喚醒感官。"
  },
  {
    id: "nonfiction-the-beige", name: "The Beige", brand: "Nonfiction", year: 2024, perfumer: "—",
    family: "麝香調", city: "seoul", gender: "中性", image: "images/nonfiction-the-beige.jpg",
    notes: { top: ["玫瑰水", "葡萄柚", "天竺葵"], middle: ["鳶尾", "天芥菜", "茉莉"], base: ["廣藿香", "零陵香豆", "金色木質", "麝香"] },
    moods: ["粉感", "溫柔", "乾淨", "膚感"],
    description: "白麝香輕輕包覆肌膚，鳶尾與零陵香豆的溫暖粉感。"
  },
  {
    id: "nonfiction-the-grey", name: "The Grey", brand: "Nonfiction", year: 2024, perfumer: "—",
    family: "麝香調", city: "seoul", gender: "中性", image: "images/nonfiction-the-grey.jpg",
    notes: { top: ["肉桂", "焚香"], middle: ["苦橙葉", "桂花", "木蘭"], base: ["香附", "安息香", "麝香", "皮革"] },
    moods: ["神秘", "沉穩", "煙燻", "中性"],
    description: "低調卻強烈的暗色麝香，與木蘭形成柔和對比。"
  },
  {
    id: "nonfiction-open-arms", name: "Open Arms", brand: "Nonfiction", year: 2023, perfumer: "—",
    family: "柑橘調", city: "seoul", gender: "中性", image: "images/nonfiction-open-arms.jpg",
    notes: { top: ["苦橙", "苦橙花", "佛手柑"], middle: ["橙花", "苦橙葉", "薰衣草"], base: ["冷杉", "廣藿香", "岩蘭草"] },
    moods: ["療癒", "清新", "自然", "溫柔"],
    description: "苦橙與橙花走向清新木質，像午間休息的片刻。"
  },
  {
    id: "nonfiction-bois-dylang", name: "Bois d'Ylang", brand: "Nonfiction", year: 2025, perfumer: "—",
    family: "花香調", city: "seoul", gender: "中性", image: "images/nonfiction-bois-dylang.jpg",
    notes: { top: ["苦橙葉", "柑橘"], middle: ["依蘭", "晚香玉", "莫諾依花"], base: ["金色木質", "麝香", "檀香"] },
    moods: ["性感", "優雅", "花香感", "溫暖"],
    description: "依蘭與奶油般的晚香玉，襯著溫暖檀香的絲滑花香。"
  },
  {
    id: "nonfiction-simple-garden", name: "Simple Garden", brand: "Nonfiction", year: 2022, perfumer: "—",
    family: "柑橘調", city: "seoul", gender: "中性", image: "images/nonfiction-simple-garden.jpg",
    notes: { top: ["萊姆", "佛手柑", "乳香脂"], middle: ["鼠尾草", "天竺葵", "羅勒"], base: ["麝香", "雪松"] },
    moods: ["清新", "療癒", "自然", "乾淨"],
    description: "萊姆的清苦與雪松的土壤感，在花園裡重新充電。"
  },
  {
    id: "nonfiction-in-the-shower", name: "In The Shower", brand: "Nonfiction", year: 2020, perfumer: "—",
    family: "木質調", city: "seoul", gender: "中性", image: "images/nonfiction-in-the-shower.jpg",
    notes: { top: ["苦橙", "金巴利酒"], middle: ["百里香", "廣藿香"], base: ["癒創木", "雪松", "菸草"] },
    moods: ["清新", "沉穩", "中性", "自然"],
    description: "雨後清晨在森林散步，濕潤土壤與輕盈柑橘。"
  },
  {
    id: "nonfiction-young-memories", name: "Young Memories", brand: "Nonfiction", year: 2025, perfumer: "—",
    family: "綠意調", city: "seoul", gender: "中性", image: "images/nonfiction-young-memories.jpg",
    notes: { top: ["羅勒", "杜松"], middle: ["百花", "薄荷", "天竺葵"], base: ["雪松", "岩蘭草", "冷杉香脂"] },
    moods: ["清新", "活潑", "自然", "療癒"],
    description: "童年奔跑過原野的記憶，薄荷與羅勒的青草香。"
  },
  {
    id: "nonfiction-iris-concrete", name: "Iris Concrete", brand: "Nonfiction", year: 2025, perfumer: "—",
    family: "花香調", city: "seoul", gender: "中性", image: "images/nonfiction-iris-concrete.jpg",
    notes: { top: ["檸檬", "麝葵籽", "綠薄荷"], middle: ["乳香脂", "鳶尾", "白松香"], base: ["雪松", "麝香", "金色木質"] },
    moods: ["優雅", "粉感", "現代", "自信"],
    description: "粉感鳶尾與微苦綠意，優雅又大膽。"
  },
  {
    id: "nonfiction-dew-light", name: "Dew & Light", brand: "Nonfiction", year: 2026, perfumer: "—",
    family: "花香調", city: "seoul", gender: "中性", image: "images/nonfiction-dew-light.jpg",
    notes: { top: ["佛手柑", "檸檬", "粉紅胡椒", "小豆蔻", "梨"], middle: ["牡丹", "木蘭", "玫瑰", "茉莉"], base: ["西普調", "金色木質", "麝香"] },
    moods: ["清新", "乾淨", "優雅", "溫柔"],
    description: "沾著露水的牡丹緩緩綻放，被潔白苔蘚圍繞。"
  },
  {
    id: "nonfiction-tears-in-rain", name: "Tears in Rain", brand: "Nonfiction", year: 2026, perfumer: "—",
    family: "木質調", city: "seoul", gender: "中性", image: "images/nonfiction-tears-in-rain.jpg",
    notes: { top: ["佛手柑", "黑胡椒", "小豆蔻", "芫荽籽", "肉豆蔻"], middle: ["天竺葵", "玫瑰", "紫羅蘭"], base: ["西普調", "橡木", "廣藿香", "岩蘭草", "香附", "乳香"] },
    moods: ["沉穩", "神秘", "木質感", "療癒"],
    description: "雨後寧靜森林的現代木質西普。"
  },
  {
    id: "chanel-bleu-edp", name: "Bleu de Chanel EDP", brand: "Chanel", year: 2014, perfumer: "Olivier Polge",
    family: "木質調", city: "paris", gender: "男香", image: "images/chanel-bleu-edp.jpg",
    notes: { top: ["葡萄柚", "檸檬", "薄荷", "佛手柑", "粉紅胡椒", "醛", "芫荽"], middle: ["薑", "茉莉", "肉豆蔻", "甜瓜"], base: ["焚香", "琥珀", "雪松", "檀香", "琥珀木", "廣藿香", "岩玫瑰"] },
    moods: ["自信", "木質感", "清新", "經典"],
    description: "男香的最大公約數，清新柑橘轉為乾爽木質與焚香。"
  },
  {
    id: "chanel-1957", name: "1957", brand: "Chanel", year: 2019, perfumer: "Olivier Polge",
    family: "麝香調", city: "paris", gender: "中性", image: "images/chanel-1957.jpg",
    notes: { top: ["白麝香", "醛", "佛手柑", "粉紅胡椒", "芫荽"], middle: ["白麝香", "橙花", "茉莉"], base: ["白麝香", "鳶尾", "喀什米爾木", "雪松", "蜂蜜", "香草"] },
    moods: ["乾淨", "膚感", "粉感", "中性"],
    description: "Chanel 精品香水系列的白麝香，BTS 田柾國代言的香氣，乾淨貼膚。"
  },
  {
    id: "chanel-coromandel", name: "Coromandel", brand: "Chanel", year: 2016, perfumer: "Olivier Polge",
    family: "琥珀東方調", city: "paris", gender: "中性", image: "images/chanel-coromandel.jpg",
    notes: { top: ["苦橙", "柑橘", "苦橙花"], middle: ["廣藿香", "鳶尾", "玫瑰", "茉莉"], base: ["白巧克力", "安息香", "琥珀", "乳香", "焚香", "麝香"] },
    moods: ["神秘", "奢華", "沉穩", "中性"],
    description: "廣藿香與白巧克力的華麗東方調，TXT 連俊在用的香水。"
  },
  {
    id: "versace-eros", name: "Eros EDT", brand: "Versace", year: 2012, perfumer: "Aurelien Guichard",
    family: "馥奇芳香調", city: "milan", gender: "男香", image: "images/versace-eros.jpg",
    notes: { top: ["薄荷", "青蘋果", "檸檬"], middle: ["零陵香豆", "龍涎香醚", "天竺葵"], base: ["馬達加斯加香草", "維吉尼亞雪松", "大西洋雪松", "岩蘭草", "橡苔"] },
    moods: ["自信", "甜美", "陽剛", "活潑"],
    description: "薄荷配香草的大眾情人香，社群上長年討論度最高的男香之一。"
  },
  {
    id: "ysl-y-edp", name: "Y EDP", brand: "Yves Saint Laurent", year: 2018, perfumer: "Dominique Ropion",
    family: "馥奇芳香調", city: "paris", gender: "男香", image: "images/ysl-y-edp.jpg",
    notes: { top: ["蘋果", "薑", "佛手柑"], middle: ["鼠尾草", "杜松", "天竺葵"], base: ["琥珀木", "零陵香豆", "雪松", "岩蘭草", "乳香"] },
    moods: ["現代", "自信", "清新", "都會"],
    description: "俐落的鼠尾草與琥珀木，上班日最安全的選擇。"
  },
  {
    id: "azzaro-most-wanted", name: "The Most Wanted Parfum", brand: "Azzaro", year: 2022, perfumer: "Quentin Bisch",
    family: "美食調", city: "paris", gender: "男香", image: "images/azzaro-most-wanted.jpg",
    notes: { top: ["薑"], middle: ["木質調"], base: ["波本香草"] },
    moods: ["溫暖", "甜美", "擴散感", "自信"],
    description: "薑與香草的濃郁組合，擴散力驚人，社群封為「野獸級」香水。"
  },
  {
    id: "tomford-soleil-blanc", name: "Soleil Blanc", brand: "Tom Ford", year: 2016, perfumer: "Sonia Constant",
    family: "花香調", city: "newyork", gender: "中性", image: "images/tomford-soleil-blanc.jpg",
    notes: { top: ["開心果", "佛手柑", "小豆蔻", "粉紅胡椒"], middle: ["晚香玉", "依蘭", "茉莉"], base: ["椰子", "琥珀", "零陵香豆", "安息香"] },
    moods: ["奢華", "溫暖", "性感", "中性"],
    description: "白花與椰子的防曬油氣息，ASTRO 車銀優愛用。"
  },
  {
    id: "gucci-nymph", name: "A Chant for the Nymph", brand: "Gucci", year: 2020, perfumer: "Alberto Morillas",
    family: "花香調", city: "florence", gender: "中性", image: "images/gucci-nymph.jpg",
    notes: { top: ["緬梔花"], middle: ["提亞蕾花", "依蘭"], base: ["香草"] },
    moods: ["溫柔", "甜美", "中性", "花香感"],
    description: "白色緬梔花與香草的柔軟花香，Stray Kids 黃鉉辰在用。"
  },
  {
    id: "byredo-bal-dafrique", name: "Bal d'Afrique", brand: "Byredo", year: 2009, perfumer: "Jérôme Epinette",
    family: "柑橘調", city: "stockholm", gender: "中性", image: "images/byredo-bal-dafrique.jpg",
    notes: { top: ["佛手柑", "萬壽菊", "布枯葉"], middle: ["紫羅蘭", "仙客來"], base: ["岩蘭草", "雪松"] },
    moods: ["清新", "中性", "自由", "木質感"],
    description: "巴黎與非洲交會的明亮柑橘木質，NCT 在赫愛用。"
  },
  {
    id: "diptyque-tam-dao", name: "Tam Dao EDP", brand: "Diptyque", year: 2013, perfumer: "Daniel Moliere",
    family: "木質調", city: "paris", gender: "中性", image: "images/diptyque-tam-dao.jpg",
    notes: { top: ["萊姆", "薑", "芫荽"], middle: ["檀香", "雪松"], base: ["琥珀木", "麝香", "香草"] },
    moods: ["沉穩", "木質感", "療癒", "中性"],
    description: "純粹的奶油檀香，像寺院裡的木頭與線香，ENHYPEN Jay 愛用。"
  },
  {
    id: "jomalone-nectarine-honey", name: "Nectarine Blossom & Honey", brand: "Jo Malone London", year: 2005, perfumer: "Christine Nagel",
    family: "花香調", city: "london", gender: "中性", image: "images/jomalone-nectarine-honey.jpg",
    notes: { top: ["綠葉", "黑醋栗", "苦橙葉"], middle: ["油桃", "洋槐花", "洋槐蜂蜜"], base: ["桃子", "李子", "岩蘭草"] },
    moods: ["甜美", "果香感", "乾淨", "活潑"],
    description: "多汁油桃與蜂蜜，夏天最討喜的甜香，ENHYPEN Jake 愛用。"
  },
  {
    id: "ralph-club", name: "Ralph's Club", brand: "Ralph Lauren", year: 2021, perfumer: "Pascal Gaurin",
    family: "馥奇芳香調", city: "newyork", gender: "男香", image: "images/ralph-club.jpg",
    notes: { top: ["薰衣草", "快樂鼠尾草"], middle: ["維吉尼亞雪松"], base: ["岩蘭草"] },
    moods: ["自信", "木質感", "現代", "都會"],
    description: "薰衣草與雪松的夜店感男香，SEVENTEEN DK 愛用。"
  },
  {
    id: "armaf-cdni", name: "Club de Nuit Intense Man", brand: "Armaf", year: 2015, perfumer: "—",
    family: "柑橘調", city: "dubai", gender: "男香", image: "images/armaf-cdni.jpg",
    notes: { top: ["檸檬", "鳳梨", "佛手柑", "黑醋栗", "蘋果"], middle: ["樺木", "茉莉", "玫瑰"], base: ["麝香", "龍涎香", "廣藿香", "香草"] },
    moods: ["自信", "果香感", "煙燻", "陽剛"],
    description: "公認最接近 Creed Aventus 的平價選擇，社群長紅。"
  },
  {
    id: "afnan-9pm", name: "9PM", brand: "Afnan", year: 2020, perfumer: "—",
    family: "美食調", city: "dubai", gender: "男香", image: "images/afnan-9pm.jpg",
    notes: { top: ["蘋果", "肉桂", "野生薰衣草", "佛手柑"], middle: ["橙花", "鈴蘭"], base: ["香草", "零陵香豆", "琥珀", "廣藿香"] },
    moods: ["甜美", "溫暖", "自信", "擴散感"],
    description: "價格親民卻表現強悍的甜香，TikTok 帶起的中東香水熱潮代表。"
  },
  {
    id: "pdm-layton", name: "Layton", brand: "Parfums de Marly", year: 2016, perfumer: "Hamid Merati-Kashani",
    family: "美食調", city: "paris", gender: "中性", image: "images/pdm-layton.jpg",
    notes: { top: ["蘋果", "薰衣草", "佛手柑", "柑橘"], middle: ["天竺葵", "紫羅蘭", "茉莉"], base: ["香草", "小豆蔻", "檀香", "胡椒", "癒創木", "廣藿香", "零陵香豆"] },
    moods: ["奢華", "溫暖", "甜美", "自信"],
    description: "蘋果與香草包覆的沙龍香，秋冬約會的熱門首選。"
  },
  {
    id: "xerjoff-naxos", name: "Naxos", brand: "Xerjoff", year: 2015, perfumer: "Chris Maurice",
    family: "美食調", city: "turin", gender: "中性", image: "images/xerjoff-naxos.jpg",
    notes: { top: ["薰衣草", "佛手柑", "檸檬"], middle: ["蜂蜜", "肉桂", "喀什米爾木", "小花茉莉"], base: ["菸草葉", "香草", "零陵香豆"] },
    moods: ["奢華", "溫暖", "煙燻", "沉穩"],
    description: "蜂蜜與菸草葉的義式華麗，被視為菸草美食調的標竿。"
  },
  {
    id: "initio-oud-greatness", name: "Oud for Greatness", brand: "Initio Parfums Privés", year: 2018, perfumer: "—",
    family: "琥珀東方調", city: "paris", gender: "中性", image: "images/initio-oud-greatness.jpg",
    notes: { top: ["番紅花", "肉豆蔻", "薰衣草"], middle: ["沉香"], base: ["廣藿香", "麝香"] },
    moods: ["神秘", "奢華", "沉穩", "中性"],
    description: "番紅花與沉香的濃烈存在感，沙龍香裡的話題之作。"
  },
  {
    id: "nishane-hacivat", name: "Hacivat", brand: "Nishane", year: 2017, perfumer: "Jorge Lee",
    family: "柑橘調", city: "istanbul", gender: "中性", image: "images/nishane-hacivat.jpg",
    notes: { top: ["鳳梨", "葡萄柚", "佛手柑"], middle: ["雪松", "廣藿香", "茉莉"], base: ["橡苔", "木質調"] },
    moods: ["清新", "果香感", "中性", "自信"],
    description: "土耳其品牌的鳳梨西普，常被拿來與 Aventus 比較。"
  },
  {
    id: "amouage-interlude-man", name: "Interlude Man", brand: "Amouage", year: 2012, perfumer: "Pierre Negrin",
    family: "琥珀東方調", city: "muscat", gender: "男香", image: "images/amouage-interlude-man.jpg",
    notes: { top: ["奧勒岡", "胡椒", "佛手柑"], middle: ["乳香", "沒藥", "琥珀", "岩玫瑰"], base: ["沉香", "皮革", "檀香", "廣藿香"] },
    moods: ["神秘", "煙燻", "濃郁", "沉穩"],
    description: "阿曼皇室香水品牌的代表作，濃烈的乳香與皮革煙霧。"
  },
  {
    id: "margiela-jazz-club", name: "Replica Jazz Club", brand: "Maison Margiela", year: 2013, perfumer: "Aliénor Massenet",
    family: "美食調", city: "paris", gender: "中性", image: "images/margiela-jazz-club.jpg",
    notes: { top: ["粉紅胡椒", "橙花", "檸檬"], middle: ["蘭姆酒", "爪哇岩蘭草", "快樂鼠尾草"], base: ["菸草葉", "香草", "蘇合香"] },
    moods: ["溫暖", "煙燻", "沉穩", "慵懶"],
    description: "威士忌、菸草與香草，像深夜爵士酒吧的吧台。"
  }
];
