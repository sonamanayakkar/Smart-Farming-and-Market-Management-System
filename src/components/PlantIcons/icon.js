

export let icon = (name) => {
    const iconMap = {
        // 🌾 Crops / Grains
        rice: "🌾",
        wheat: "🌾",
        maize: "🌽",
        corn: "🌽",
        barley: "🌾",
        millet: "🌾",
        oats: "🌾",
        sorghum: "🌾",

        // 🥜 Pulses / Seeds
        peanut: "🥜",
        groundnut: "🥜",
        chickpea: "🫘",
        lentil: "🫘",
        soybean: "🫘",
        green_gram: "🫘",
        black_gram: "🫘",

        // 🧅 Vegetables
        onion: "🧅",
        garlic: "🧄",
        potato: "🥔",
        sweet_potato: "🍠",
        tomato: "🍅",
        brinjal: "🍆",
        eggplant: "🍆",
        chilli: "🌶️",
        capsicum: "🫑",
        carrot: "🥕",
        beetroot: "🥕",
        radish: "🥕",
        cucumber: "🥒",
        pumpkin: "🎃",
        bottle_gourd: "🥒",
        bitter_gourd: "🥒",
        ridge_gourd: "🥒",
        cabbage: "🥬",
        cauliflower: "🥦",
        broccoli: "🥦",
        spinach: "🥬",
        coriander: "🌿",
        mint: "🌿",
        drumstick: "🌿",
        peas: "🫛",
        beans: "🫛",

        // 🍎 Fruits
        apple: "🍎",
        green_apple: "🍏",
        banana: "🍌",
        mango: "🥭",
        orange: "🍊",
        sweet_lime: "🍊",
        lemon: "🍋",
        grapes: "🍇",
        watermelon: "🍉",
        papaya: "🍈",
        pineapple: "🍍",
        pomegranate: "🍎",
        guava: "🍏",
        lychee: "🍒",
        cherry: "🍒",
        strawberry: "🍓",
        pear: "🍐",
        peach: "🍑",
        plum: "🍑",
        coconut: "🥥",
        avocado: "🥑",

        // 🌿 Cash Crops
        cotton: "☁️",
        sugarcane: "🎋",
        tea: "🍃",
        coffee: "☕",
        rubber: "🌳",
        tobacco: "🚬",

        // 🌻 Flowers (optional)
        sunflower: "🌻",
        rose: "🌹",
        jasmine: "🌼",
        lotus: "🪷"
    };

    if (iconMap[name] == undefined) {
        return '🌱'
    }

    return iconMap[name]
}