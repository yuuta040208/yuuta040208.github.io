let prefectures = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', 
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', 
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', 
    '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', 
    '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', 
    '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', 
    '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];

/**
 * HTML、JSの全ての要素が読み込まれてから呼ばれるイベント
 */
document.addEventListener('deviceready', function() {
    console.log('prefecture.html#deviceready');

    $('#back-btn').on('click', function() {
        window.location.href = 'index.html';
    });

    $('h1.header').html(prefectures[Number(getParameter().code) - 1]);

    console.log(getParameter());

}, false);

// パラメータを取得するメソッド
function getParameter(){
    let paramMap = {};
    let url = location.href; 
    let parameters = url.split('?');

    if(parameters.length > 1) {
        let params = parameters[1].split('&');
        // パラメータ数繰り返し
        for (i = 0; i < params.length; i++) {
           let paramItem = params[i].split('=');
           paramMap[paramItem[0]] = paramItem[1];
        }
    }

    return paramMap;
};