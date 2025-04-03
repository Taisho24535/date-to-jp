// 日付のパターンを定義
const datePatterns = [
    { regex: /(\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})/g, format: "D M Y" },
    { regex: /(January|February|March|April|May|June|July|August|September|October|November|December) (\d{1,2}), (\d{4})/g, format: "M D, Y" }
];

// 月の英語名を日本語の数字に変換
const months = {
    "January": 1, "February": 2, "March": 3, "April": 4,
    "May": 5, "June": 6, "July": 7, "August": 8,
    "September": 9, "October": 10, "November": 11, "December": 12
};

// ページ内のテキストを変換する関数
function convertDates(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        let text = node.nodeValue;

        datePatterns.forEach(pattern => {
            text = text.replace(pattern.regex, (match, p1, p2, p3) => {
                let day, month, year;

                if (pattern.format === "D M Y") {
                    [day, month, year] = [p1, months[p2], p3];
                } else if (pattern.format === "M D, Y") {
                    [day, month, year] = [p2, months[p1], p3];
                }

                return `${year}年${month}月${day}日`;
            });
        });

        node.nodeValue = text;
    } else {
        node.childNodes.forEach(convertDates);
    }
}

// ページ内のすべての要素を処理
convertDates(document.body);
